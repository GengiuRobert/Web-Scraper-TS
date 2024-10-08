const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
import { Browser } from "puppeteer";

//site created for web scraping
const urlToScrape = "https://books.toscrape.com/";

//extract additional infos from the page related to each individual book
const extractAdditionalBooksInfo = async (newPageFromBrowser: any, bookLink: string) => {

    await newPageFromBrowser.goto(bookLink);

    const getWordCount = (text: string) => {
        //we split the text by white spaces and return the length of the array of words
        const words = text.split(/\s+/);
        return words.length;
    };

    //html code of the page
    const pageContent = await newPageFromBrowser.content();

    //load html code to cheerio 
    const $ = cheerio.load(pageContent);

    //extract book description
    const description = $('#product_description + p').text().trim();
    const wordsNumber = getWordCount(description);

    //extract UPC code of book
    const UPC = $('th:contains("UPC")').next().text().trim();

    //extract the number of books available from the stock
    const availability = $('th:contains("Availability")').next().text().trim();
    const stockMatch = availability.match(/\((\d+) available\)/);
    const stock = parseInt(stockMatch ? stockMatch[1] : 'Unknown');

    //extract book genre
    const genre = $('ul.breadcrumb li:nth-child(3)').text().trim();

    return {
        description,
        UPC,
        stock,
        genre,
        wordsNumber
    };
};

//extract all infos about the books from the url
const extractBooksInfo = () => {
    //books article have the same class, so we make an array with all of them
    const books = document.querySelectorAll('.product_pod');
    const arrayFromBooks = Array.from(books);

    //array to store info related to books
    const booksAttributes = [];

    //rating is extracted from class and converted to digit
    const convertRatingToDigit = (rating: string): number => {
        switch (rating) {
            case "One":
                return 1;
                break;
            case "Two":
                return 2;
                break;
            case "Three":
                return 3;
                break;
            case "Four":
                return 4;
                break;
            case "Five":
                return 5;
                break;
            default: return 0;

        }
    }

    const convertPriceToNumber = (priveValue: string): number => {

        if (priveValue === 'Unknown') {
            return 0;
        }

        const cleanCoinChar = priveValue.replace('£', '');
        return parseFloat(cleanCoinChar);
    };

    const getGBP = (priceValue: string): string => {
        if (priceValue.includes("£")) {
            return "£";
        } else if (priceValue === "Unkown") {
            return "Unkown";
        } else {
            return "blank";
        }
    }

    for (const itemBook of arrayFromBooks) {

        //extract image url of the book
        const divImageContainer = itemBook.querySelector('.image_container');
        const imageFromContainer = divImageContainer?.querySelector('img');
        const imageSrc = imageFromContainer?.src;

        //extract rating of the book
        const ratingContainer = itemBook.querySelector('.star-rating');
        const ratingClass = ratingContainer?.classList[1] || "Unknown";
        const ratingConverted = convertRatingToDigit(ratingClass);

        //extract title of the book
        const titleContainer = itemBook.querySelector('h3 a');
        const titleName = titleContainer ? titleContainer.getAttribute('title') : 'Unknown';

        //extract link of the book
        const link = titleContainer ? titleContainer.getAttribute('href') : 'Unknown';
        const fullLink = "https://books.toscrape.com/" + link;

        //extract price of the book
        const priceContainer = itemBook.querySelector('.product_price');
        const priceValueElement = priceContainer?.querySelector('.price_color');
        const priceValueText = priceValueElement ? priceValueElement.textContent : 'Unknown';
        const priceValue = convertPriceToNumber(priceValueText || 'Unknown');

        //extract GBP coin sign
        const signOfGBP = getGBP(priceValueText || 'Unknown');

        booksAttributes.push({
            imageSrc,
            ratingConverted,
            titleName,
            priceValue,
            signOfGBP,
            fullLink
        });
    }

    return booksAttributes;
};

const scrapeAction = async () => {
    //open the browser and go to the url for scraping
    //newPage is a chromium browser page
    //puppeteer uses chormium 
    const browser: Browser = await puppeteer.launch();
    const newPageFromBrowser = await browser.newPage();
    await newPageFromBrowser.goto(urlToScrape);

    const booksData = await newPageFromBrowser.evaluate(extractBooksInfo);

    for (const book of booksData) {
        const bookPageLink = book.fullLink;

        //access the page related to the book and extract stock, description, UPC code
        const additionalData = await extractAdditionalBooksInfo(newPageFromBrowser, new URL(bookPageLink).href);

        Object.assign(book, additionalData);
    }

    fs.writeFileSync('booksData.json', JSON.stringify(booksData, null, 2));

    console.log(booksData);

    //close the broswer, else it is runing and never closes
    await browser.close();
};

export default scrapeAction;
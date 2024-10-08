const mongoose = require('mongoose');
const { Book } = require('./models/bookModel.ts');
const fs = require('fs');
const path = require('path');

const uri = 'mongodb://localhost:27017/web-scraper-db';

async function populate() {
    try {
        await mongoose.connect(uri);
        console.log('Connected!');

        const filePath = path.join(__dirname, '../booksData.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const books = JSON.parse(jsonData);

        for (const book of books) {

            const existingBook = await Book.findOne({ title: book.title });

            if (!existingBook) {
                const newBook = new Book(book);
                await newBook.save();
                console.log(`Book "${book.title}" saved!`);
            } else {
                console.log(`Book "${book.title}" already exists.`);
            }
        }

        console.log("Books population complete.");
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
    }
};

export default populate;
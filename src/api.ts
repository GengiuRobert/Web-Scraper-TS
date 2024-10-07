import express from 'express';
import { Express, Request, Response} from 'express';
import mongoose from 'mongoose'; 
import { Book } from './bookModel.js'; 
const router = express.Router();

interface BookType {
    imageSrc?: string;
    ratingConverted: number;
    titleName: string;
    priceValue: number;
    signOfGBP?: string;
    fullLink?: string;
    description?: string;
    UPC?: string;
    stock?: number;
    genre?: string;
    wordsNumber?: number;
}

//connect to db
mongoose.connect(uri);

//create new book
router.post('/books', async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});


//update book by id
router.put('/books/:id', async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(400).send(error);
    }
});
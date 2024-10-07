import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Book } from './bookModel.js';

const router = express.Router();

// Define the BookType interface
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

// Connect to the database
const uri = "mongodb://localhost:27017/web-scraper-db";
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Create new book
router.post('/books', async (req: Request<{}, {}, BookType>, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read books
router.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update book by ID
router.put('/books/:id', async (req: Request<{ id: string }, {}, Partial<BookType>>, res: Response) => {
    const { id } = req.params; // Destructure the ID from the request parameters
    const updatedBook = req.body; // Body can be a partial BookType

    try {
        const book = await Book.findByIdAndUpdate(id, updatedBook, {
            new: true,
            runValidators: true,
        });

        if (!book) {
            return res.status(404).send('Book not found');
        }

        return res.send(book);
    } catch (error) {
        console.error('Error updating book:', error);
        return res.status(400).send(error);
    }
});

// Delete book by ID
router.delete('/books/:id', async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params; // Destructure the ID from the request parameters

    try {
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).send('Book not found');
        }

        return res.send(book);
    } catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).send(error);
    }
});

export default router;

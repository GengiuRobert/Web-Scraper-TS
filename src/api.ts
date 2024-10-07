import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
const { Book } = require('./bookModel.ts');

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

router.put('/books/:id', async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const book = await Book.findByIdAndUpdate(id, req.body);
        if(!book){
            res.status(500).send({message: "nu merge morti mati"})
        }
        const updatedBook = await Book.findById(id)
        if(updatedBook){
            res.status(201).send(updatedBook)
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/books/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const book = await Book.findByIdAndDelete(id)
        if(!book){
            res.status(404).send({message: "morti mati nu e cartea"})
        }
        else{
            res.status(201).send(book)
        }
        
    }
    catch (error: any){
        res.status(500).send(error)
    }
})

export default router;

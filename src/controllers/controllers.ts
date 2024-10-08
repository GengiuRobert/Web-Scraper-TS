import { Request, Response } from "express";
import { Book } from "../models/bookModel";

//create new book 
const createNewBook = async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: "error at creating a new book" });
    }
};

//read all books
const readAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "error at reading all books" });
    }
};

//update book by id
const updateBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book) {
            res.status(500).send({ message: "something went wrong when updating book by id" });
        }

        const updatedBook = await Book.findById(id);
        if (updatedBook) {
            res.status(201).send(updatedBook);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "error at updating book by id" });
    }
};

//delete book by id
const deleteBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            res.status(404).send({ message: "book does not exist" })
        }
        else {
            res.status(201).send(book)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "something went wrong when deleting by id" });
    }
};

//export modules
module.exports = {
    createNewBook,
    readAllBooks,
    updateBookById,
    deleteBookById,
};
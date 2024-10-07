"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookModel_js_1 = require("./bookModel.js");
const router = express_1.default.Router();
//connect to db
const uri = "mongodb://localhost:27017/web-scraper-db";
mongoose_1.default.connect(uri);
//create new book
router.post('/books', async (req, res) => {
    try {
        const book = new bookModel_js_1.Book(req.body);
        await book.save();
        res.status(201).send(book);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//read books
router.get('/books', async (req, res) => {
    try {
        const books = await bookModel_js_1.Book.find();
        res.send(books);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//update book by id
router.put('/books/:id', async (req, res) => {
    try {
        const book = await bookModel_js_1.Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        return res.send(book);
    }
    catch (error) {
        console.error('Error updating book:', error);
        return res.status(400).send(error);
    }
});
//delete book by id
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await bookModel_js_1.Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send();
        }
        return res.send(book);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.default = router;

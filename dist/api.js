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
//update book by id

import express from "express";
const routerBooks = express.Router();
import controller from "../controllers/controllers";

routerBooks.post('/books', controller.createNewBook);
routerBooks.get('/books', controller.readAllBooks);
routerBooks.put('/books/:id', controller.updateBookById);
routerBooks.delete('/books/:id', controller.deleteBookById);
routerBooks.get('/books/scrape', controller.scrapeBooks);
routerBooks.post('/books/populate', controller.populateDataBaseBooks);

export default routerBooks;
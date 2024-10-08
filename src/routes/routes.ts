import express from "express";
const router = express.Router();
import controller from "../controllers/controllers";

router.post('/books', controller.createNewBook);
router.get('/books', controller.readAllBooks);
router.put('/books/:id', controller.updateBookById);
router.delete('/books/:id', controller.deleteBookById);

export default router;
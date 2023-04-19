import { Router } from "express";
import { methods as booksController } from "../controllers/books.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', booksController.getBooks);  //? GET ALL
router.get('/:id', booksController.getBook); //? GET for ID
router.post('/', booksController.addBook); //? POST
router.put('/:id', booksController.updateBook); //? UPDATE
router.delete('/:id', booksController.deleteBook); //? DELETE for ID



export default router;
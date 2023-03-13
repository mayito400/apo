import { Router } from "express";
import { methods as authorController } from "../controllers/author.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', authorController.getAuthors);  //? GET ALL
router.get('/:id', authorController.getAuthor); //? GET for ID
router.post('/', authorController.addAuthor); //? POST
router.put('/:id', authorController.updateAuthor); //? UPDATE
router.delete('/:id', authorController.deleteAuthor); //? DELETE for ID

export default router;
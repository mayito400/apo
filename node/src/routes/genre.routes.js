import { Router } from "express";
import { methods as genreController } from "../controllers/genre.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', genreController.getGenres);  //? GET ALL
router.get('/:id', genreController.getGenre); //? GET for ID
router.post('/', genreController.addGenre); //? POST
router.put('/:id', genreController.updateGenre); //? UPDATE
router.delete('/:id', genreController.deleteGenre); //? DELETE for ID

export default router;
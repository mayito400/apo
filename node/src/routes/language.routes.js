import { Router } from "express";
import { methods as languagesController } from "../controllers/language.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', languagesController.getLanguages);  //? GET ALL
router.get('/:id', languagesController.getLanguage); //? GET for ID
router.post('/', languagesController.addLanguages); //? POST
router.put('/:id', languagesController.updateLanguage); //? UPDATE
router.put('/UPDT-name/:id', languagesController.updateNameLanguage); // UPDATE name
router.put('/UPDT-prog/:id', languagesController.updateProgrammersLanguage); // UPDATE programmers
router.delete('/:id', languagesController.deleteLanguage); //? DELETE for ID

export default router;
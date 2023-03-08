import { Router } from "express";
import { methods as templateController } from "../controllers/template.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', templateController.getTemplate);  //? GET ALL
router.get('/:id', templateController.getTemplate); //? GET for ID
router.post('/', templateController.addTemplate); //? POST
router.put('/:id', templateController.updateTemplate); //? UPDATE
router.delete('/:id', templateController.deleteTemplate); //? DELETE for ID

export default router;
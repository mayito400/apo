import { Router } from "express";
import { methods as publishingController } from "../controllers/Publishing.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', publishingController.getPublishings);  //? GET ALL
router.get('/:id', publishingController.getPublishing); //? GET for ID
router.post('/', publishingController.addPublishing); //? POST
router.put('/:id', publishingController.updatePublishing); //? UPDATE
router.delete('/:id', publishingController.deletePublishing); //? DELETE for ID

export default router;
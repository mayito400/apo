import { Router } from "express";
import { methods as publisherController } from "../controllers/publisher.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', publisherController.getPublishers);  //? GET ALL
router.get('/:id', publisherController.getPublisher); //? GET for ID
router.post('/', publisherController.addPublisher); //? POST
router.put('/:id', publisherController.updatePublisher); //? UPDATE
router.delete('/:id', publisherController.deletePublisher); //? DELETE for ID

export default router;
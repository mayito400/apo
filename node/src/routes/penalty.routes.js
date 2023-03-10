import { Router } from "express";
import { methods as penaltyController } from "../controllers/penalty.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', penaltyController.getPenaltys);  //? GET ALL
router.get('/:id', penaltyController.getPenalty); //? GET for ID
router.post('/', penaltyController.addPenalty); //? POST
router.put('/:id', penaltyController.updatePenalty); //? UPDATE
router.delete('/:id', penaltyController.deletePenalty); //? DELETE for ID

export default router;
import { Router } from "express";
import { methods as detailloanController } from "../controllers/detail-loan.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', detailloanController.getDetailLoans);  //? GET ALL
router.get('/:id', detailloanController.getDetailLoan); //? GET for ID
router.post('/', detailloanController.addDetailLoan); //? POST
router.put('/:id', detailloanController.updateDetailLoan); //? UPDATE
router.delete('/:id', detailloanController.deleteDetailLoan); //? DELETE for ID

export default router;
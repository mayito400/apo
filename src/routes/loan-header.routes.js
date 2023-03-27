import { Router } from "express";
import { methods as loanHeaderController } from "../controllers/loan-header.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', loanHeaderController.getLoanHeaders);  //? GET ALL
router.get('/:id', loanHeaderController.getLoanHeader); //? GET for ID
router.post('/', loanHeaderController.addLoanHeader); //? POST
router.put('/:id', loanHeaderController.updateLoanHeader); //? UPDATE
router.delete('/:id', loanHeaderController.deleteLoanHeader); //? DELETE for ID

export default router;
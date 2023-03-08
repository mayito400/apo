import { Router } from "express";
import { methods as userController } from "../controllers/user.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', userController.getUsers);  //? GET ALL
router.get('/:id', userController.getUser); //? GET for ID
router.post('/', userController.addUser); //? POST
router.put('/:id', userController.updateUser); //? UPDATE
router.delete('/:id', userController.deleteUser); //? DELETE for ID

export default router;
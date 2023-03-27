import { Router } from "express";
import { methods as roleController } from "../controllers/role.controller"; //* se importa el objeto methods el cual contiene las interacciones a la base de datos
const router = Router();

router.get('/', roleController.getRoles);  //? GET ALL
router.get('/:id', roleController.getRole); //? GET for ID
router.post('/', roleController.addRole); //? POST
router.put('/:id', roleController.updateRole); //? UPDATE
router.delete('/:id', roleController.deleteRole); //? DELETE for ID

export default router;
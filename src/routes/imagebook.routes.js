import { Router } from "express";
import { methods as imagebookController } from "../controllers/imagebook.controller";

const router = Router();

router.get('/',imagebookController.getimagebooks);
router.get('/:id',imagebookController.getimagebook);
router.post('/',imagebookController.addimagebook);
// router.post('/test',imagebookController.multerUpload.single('file'),(req, res)=>{
//     console.log(req.file);

//     res.sendStatus(200)
// });
router.put('/:id',imagebookController.updateimagebook);
router.delete('/:id',imagebookController.deleteimagebook);


export default router;

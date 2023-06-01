import multer from "multer";
import path from 'path';

const MIMETYPES = ['image/jpeg', 'image/png']

const multerUpload = multer({
    dest: path.join(__dirname,'../uploads'),
    // Funcion de filtrado por tipo de archivo
    fileFilter: (req, file, cb)=>{
        if (MIMETYPES.includes(file.mimetype)) cb(null, true)
        else cb(new Error(`Solo se pueden subir imagenes del tipo ${MIMETYPES.join(' ')}`))
    },
    // limite de 10mb por archivo
    limits:{
        fieldSize: 10000000
    }
});

export default multerUpload;
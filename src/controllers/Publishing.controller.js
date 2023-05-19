import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getPublishings = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllPublishings`()'); // GET = SELECT
       

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getPublishing = async (req, res) => { // Get for ID
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetPublishing`(?)', id); // GET = SELECT

        // Valida si el recurso devuelto está vacio
        if(result[0][0] === undefined){
            return res.status(404).json({message: "Editorial de libro no econtrado."});
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//* POST
const addPublishing = async (req, res) => {
    try {
        const { COD_LIBRO, COD_EDITORIAL } = req.body;
        const Publishing = { COD_LIBRO, COD_EDITORIAL };

        if (COD_LIBRO === undefined) {
           return res.status(400).json({ message: "Por favot ingrese el codigo del libro." });
        }

        if (COD_EDITORIAL === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el codigo del editorial." });
         }

        const connection = await getConnection();

        
        await connection.query(`CALL spAddPublishing('${Publishing.COD_LIBRO}','${Publishing.COD_EDITORIAL}');`);

        res.json({ message: "Editorial de libro agregado correctamente"});

    } catch (error) {

        switch (error.errno) {
            case 1062:
                return res.status(404).json({message: "Editorial del libro ya ha sido agregado."})

            case 1060:
                return res.status(404).json({message: "Editorial del libro ya ha sido agregado."})
        
            default:
                res.status(500).send(error.message);
        }    
    }
};

//* DELETE
const deletePublishing = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeletePublishing`(?)', id);

        //Valida si ha sido eliminado
        switch (result.affectedRows) {
            case 0:
           return res.status(404).json({message : "Editorial del libro no existe"});

           case 1:
               return res.status(202).json({ message: "Eliminado"});
       
           default:
               return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde"}); 
       }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//* PUT
const updatePublishing = async (req, res) => {
    try {
        const { id } = req.params;
        const { COD_LIBRO, COD_EDITORIAL } = req.body;
        const Publishing = { COD_LIBRO, COD_EDITORIAL };

         //Valida si los campos estan vacios o no 
        if (COD_LIBRO === undefined) {
            return res.status(400).json({ message: "Por favot ingrese el codigo del libro." });
         }
 
         if (COD_EDITORIAL === undefined) {
             return res.status(400).json({ message: "Por favor ingrese el codigo del editorial." });
          }


        const connection = await getConnection();
         const result = await connection.query(`CALL spUpdatePublishing('${id}','${Publishing.COD_LIBRO}','${Publishing.COD_EDITORIAL}');`);

         switch (result.affectedRows) {

            //Manejo de errores sql
                case 0:
               return res.status(404).json({message : "Sin ningun registro"});
    
               case 1:
                   return res.status(202).json({ message: "Actualizado"});
           
               default:
                   return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde"}); 
           }

    } catch (error) {

        // Manejo de errores sql
        switch (error.errno) {

            // En caso de que ya exista
          case 1062: 
              return res.status(400).json({ message: "El Editorial del libro ya existe y actualizado" });

          default:
              return res.status(500).send(error.message);
        }
    }
};

export const methods = {
    getPublishings,
    getPublishing,
    addPublishing,
    deletePublishing,
    updatePublishing
};
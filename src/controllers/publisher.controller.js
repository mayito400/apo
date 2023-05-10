import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getPublishers = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllPublishers`()'); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getPublisher = async (req, res) => { // Get for ID
    try {
        
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("CALL `spGetPublisher`(?)", id); // GET = SELECT

        if(result[0][0] === undefined){
            return res.status(404).json({ message: "Publisher No encontrado" });


        }

        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addPublisher = async (req, res) => {
    try {
        const { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION } = req.body;

        if (NOM_EDITORIAL === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el Nombre del EDITORIAL." })
        }

        if ( PAIS === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el Nombre del PAIS." })
        }

        if (CIUDAD === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el Nombre de la CIUDAD." })
        }

        if (TELEFONO === undefined) {
            return res.status(400).json({ message: "Por favor ingrese el Numero  de TELEFONO." })
        } 


        const Publisher = { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION };
        const connection = await getConnection();

         await connection.query(`CALL spAddPublisher('${Publisher.NOM_EDITORIAL}','${Publisher.PAIS}','${Publisher.CIUDAD}','${Publisher.TELEFONO}','${Publisher.DIRECCION}');`);


      res.status(201)({ message: "Publisher Added" });
    } catch (error) {
     
            switch (error.errno) {
                case 100:
                return res.status(400).json({ message: "Editorial Ya ha sido publicado "});

                default:
                    return res.status(500).send(error.message);
            }
    }
};

//* DELETE
const deletePublisher = async (req, res) => {
    try {
        
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spDeletePublisher(${id})`);
        
            switch (result.affectedRows) {
                case 0:
                
                    return res.status(400).json({ message: "Editorial no existente"});

                case 1:
                    
                    return res.status(202).json({ message: "Eliminado"});
            
                default:

                    return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde"});
                
            }

    
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updatePublisher = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION } = req.body;
        const Publisher = { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION }

        if (NOM_EDITORIAL === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        if ( PAIS === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        if (CIUDAD === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        if (TELEFONO === undefined) {
            return res.status(400).json({ message: "Bad request. Please fill all field." })
        }


        const connection = await getConnection();

        const result = await connection.query(`CALL spUpdatePublisher('${id}','${Publisher.NOM_EDITORIAL}','${Publisher.PAIS}','${Publisher.CIUDAD}','${Publisher.TELEFONO}','${Publisher.DIRECCION}');`);

        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getPublishers,
    getPublisher,
    addPublisher,
    deletePublisher,
    updatePublisher
};
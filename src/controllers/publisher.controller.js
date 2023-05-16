import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getPublishers = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllPublisher`()'); // GET = SELECT

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getPublisher = async (req, res) => { // Get for ID
    try {
        
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("CALL `spGetPublisher`(?)", id); // GET = SELECT

        //Valida el campo devuelto si esta vacio.
        if(result[0][0] === undefined){
            return res.status(404).json({ message: "Publisher No encontrado" });
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).res.send(error.message);
    }
};

//* POST
const addPublisher = async (req, res) => {
    try {
        const { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION } = req.body;
        const Publisher = { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION };

        //Valida si los campos estan vacios o no 
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


        const connection = await getConnection();

         await connection.query(`CALL spAddPublisher('${Publisher.NOM_EDITORIAL}','${Publisher.PAIS}','${Publisher.CIUDAD}','${Publisher.TELEFONO}','${Publisher.DIRECCION}');`);


      res.status(201)({ message: "Editorial Añadido" });
    } catch (error) {
     
            // Manejo de errores sql
            switch (error.errno) {

                //En caso de que  ya exista
                case 1062:
                return res.status(400).json({ message: "Editorial Ya ha publicado"});

                case 1060:
                return res.status(400).json({ message: "Editorial Ya ha publicado"});

                default:
                    return res.status(500).send(error);
            }
    }
};

//* DELETE
const deletePublisher = async (req, res) => {
    try {
        
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query(`CALL spDeletePublisher(${id})`);
        
            //valida si  ha sido eliminado
            switch (result.affectedRows) {
                case 0:
                
                    return res.status(400).json({ message: "Editorial no existente"});

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
const updatePublisher = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION } = req.body;
        const Publisher = { NOM_EDITORIAL, PAIS, CIUDAD, TELEFONO, DIRECCION }

        //Valida si los campos estan vacios o no 
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

        //Valida si ya a sido actualizado
        switch (result.affectedRows) {
            case 0:
                return res.status(400).json({ message: "Sin ningun resgistro del editorial."});
            case 1:
                return res.status(202).json({ message: "Editorial  Actualizado correctamente."});
            default:
                return res.status(404).json({ message: "Error, intente de nuevo mas tarde."});
        }

        
    } catch (error) {
              // Manejo de errores sql
              switch (error.errno) {

                  // En caso de que ya exista
                case 1062: 
                    return res.status(400).json({ message: "El editorial ingresado ya existe" });
    
                default:
                    return res.status(500).send(error.message);
            }

    }
};

export const methods = {
    getPublishers,
    getPublisher,
    addPublisher,
    deletePublisher,
    updatePublisher
};
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

        const result = await connection.query(`CALL spAddPublishing('${Publishing.COD_LIBRO}','${Publishing.COD_EDITORIAL}');`);

        res.json({ message: "Publishing Added"});

    } catch (error) {

        switch (error.errno) {
            case 1062:
                return res.status(404).json({message: "  "})

            case 1060:
        
            default:
                
        }





        res.status(500).send(error.message);
        
    }
};

//* DELETE
const deletePublishing = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeletePublishing`(?)', id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updatePublishing = async (req, res) => {
    try {
        const { id } = req.params;
        const { COD_LIBRO, COD_EDITORIAL } = req.body;
        const Publishing = { COD_LIBRO, COD_EDITORIAL };

        if (COD_LIBRO === undefined || COD_EDITORIAL === undefined) {
           return res.status(400).json({ message: "Bad request. Please fill all field." })
        }

        const connection = await getConnection();

        const result = await connection.query(`CALL spUpdatePublishing('${id}','${Publishing.COD_LIBRO}','${Publishing.COD_EDITORIAL}');`);


        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getPublishings,
    getPublishing,
    addPublishing,
    deletePublishing,
    updatePublishing
};
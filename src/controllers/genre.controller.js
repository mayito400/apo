import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getGenres = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllGenre`()'); // GET = SELECT
        console.log(result);

        res.json(result[0]);
    }   catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const getGenre = async (req, res) => { // Get for ID
    try {
        
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetGenre`(?)', id); // GET = SELECT
        
        if(result[0][0] === undefined){
            return res.status(404).json({ message: "Genero No ENCONTRADO. Intenta de nuevo"})
        }

        res.json(result[0]);
    }   catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* POST
const addGenre = async (req, res) => {
    try {
        const { NOMBRE } = req.body;
        const Genre = { NOMBRE };

        const connection = await getConnection();
        const result = await connection.query(`CALL spAddGenre('${Genre.NOMBRE}');`);


        if (NOMBRE === undefined) {
           return res.status(404).json({ message: "Escriba el nombre del GENERO." })
        }
         
        res.status(201).json({ message: "Genero AGREGADO" });
    } catch (error) {

        switch (error.errno) {
            case 300:
                return res.status(404).json({ message: "Genero ya ha sido agregado."})
            default:
                return 
        }
    }
};

//* DELETE
const deleteGenre = async (req, res) => {
    try {
        
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteGenre`(?)', id);

        switch (result.affetedRows) {
            case 0:
                return res.status(404).json({ message: "Error al borrar un GENERO."});

            case 1:
                return res.status(202).json({ message: "ELIMINADO"});

            default:
                return res.status(400).json({ message: "Error Intenta de nuevo mas tarde"});
        }

    }   catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

//* PUT
const updateGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOMBRE } = req.body;
        const Genre = { NOMBRE };

        if (NOMBRE === undefined) {
           return res.status(400).json({ message: "Escriba el nombre del GENERO." })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateGenre('${id}', '${Genre.NOMBRE}');`);

        switch (result.affetedRows) {
            case 0:
                return res.status(400).json({ message: "No se encontró el GENERO." })
            case 1:
                return res.status(202).json({ message: "Genero actulizado correctamente."})
            default:
                return res.status(404).json({ message: "Error intenta de nuevo mas tarde."})
        }
        
    }   catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getGenres,
    getGenre,
    addGenre,
    deleteGenre,
    updateGenre
};
import { getConnection } from "../db/database"
// interacciones con la base de datos

//* GET
const getGenres = async (req, res) => { // GET ALL
    try {
        const connection = await getConnection();
        const result = await connection.query('CALL `spGetAllGenre`()'); // GET = SELECT

        res.json(result[0]);
    }   catch (error) {
        res.status(500).send(error.message);
    }
};
const getGenre = async (req, res) => { // Get for ID
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spGetGenre`(?)', id); // GET = SELECT

        //Valida el campo devuelto si esta vacio.
        if(result[0][0] === undefined){
            return res.status(404).json({ message: "Genero no encotrado. Intenta de nuevo"});
        }

        res.json(result[0]);
    }   catch (error) {
        res.status(500).send(error.message);
    }
};

//* POST
const addGenre = async (req, res) => {
    try {
        const { NOMBRE } = req.body;
        const Genre = { NOMBRE };

        const connection = await getConnection();
         await connection.query(`CALL spAddGenre('${Genre.NOMBRE}');`);

        //Valida si los campos estan vacios o no 
        if (NOMBRE === undefined) {
           return res.status(404).json({ message: "Escriba el nombre del GENERO." })
        }
         
        res.status(201).json({ message: "Genero AGREGADO" });
    } catch (error) {
        // Manejo de errores sql
        switch (error.errno) {

            //En caso de que ya exista
            case 1062:
                return res.status(404).json({ message: "Genero ya ha sido agregado."});

                case 1060:
                return res.status(404).json({ message: "Genero ya ha sido agregado."});
            default:
                 res.status(500).send(error.message);
        }
    }
};

//* DELETE
const deleteGenre = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query('CALL `spDeleteGenre`(?)', id);

        //Valida si ha sido eliminado
        switch (result.affectedRows) {
            case 0:
           return res.status(404).json({message : "Genero no existe"});

           case 1:
               return res.status(202).json({ message: "Eliminado"});
       
           default:
               return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde"}); 
       }

    }   catch (error) {
        res.status(500).send(error.message);
    }
};

//* PUT
const updateGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const { NOMBRE } = req.body;
        const Genre = { NOMBRE };

        //Valida si los campos estan vacios o no 
        if (NOMBRE === undefined) {
           return res.status(400).json({ message: "Escriba el nombre del GENERO." })
        }

        const connection = await getConnection();
        const result = await connection.query(`CALL spUpdateGenre('${id}', '${Genre.NOMBRE}');`);

        //Valida si ya a sido actualizado
      switch (result.affectedRows) {

        //Manejo de errores sql
            case 0:
           return res.status(404).json({message : "Sin ningun registro"});

           case 1:
               return res.status(202).json({ message: "Actualizado"});
       
           default:
               return res.status(404).json({ message: "Error, intentelo nuevamente mas tarde"}); 
       }
        
    }   catch (error) {
       
        // Manejo de errores sql
        switch (error.errno) {

            // En caso de que ya exista
          case 1062: 
              return res.status(400).json({ message: "El Genero ingresado ya existe y actualizado" });

          default:
              return res.status(500).send(error.message);
        }
    }
};

export const methods = {
    getGenres,
    getGenre,
    addGenre,
    deleteGenre,
    updateGenre
};
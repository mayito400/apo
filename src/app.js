// Routes
import express from "express";
import morgan from "morgan";
import userRoutes from './routes/user.routes';
import loanHeaderRoutes from './routes/loan-header.routes';
import penaltyRoutes from './routes/penalty.routes';
import genreRoutes from './routes/genre.routes';
import roleRoutes from './routes/role.routes';
import publisherRoutes from './routes/publisher.routes';
import authorRoutes from './routes/author.routes';
import publishingRoutes from './routes/publishing.routes'
import booksRoutes from './routes/books.routes';
import detailloanRoutes from './routes/detail-loan.routes';
import imagebookRoutes from './routes/imagebook.routes'
import fileUpload from "express-fileupload";
// Enviroment Config
import message from "./config/message";
import enviroment from "./config/enviroment";
//---------------------------------------------


const app = express();

// settings
app.set("PORT",process.env.PORT || 4321);

// middlewares: funciones intermedias para que la aplicacion funcione
app.use(morgan('dev'));
app.use(express.json()); // especifica que el servidor entienda json
app.use(fileUpload());
// Routes
app.use('/api/user',userRoutes);
app.use('/api/loan-header',loanHeaderRoutes);
app.use('/api/penalty',penaltyRoutes);
app.use('/api/genre',genreRoutes);
app.use('/api/role',roleRoutes);
app.use('/api/publisher',publisherRoutes);
app.use('/api/author',authorRoutes);
app.use('/api/publishing',publishingRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/detail-loan', detailloanRoutes);
app.use('/api/imagebook', imagebookRoutes);
// app.use('/api/template',templateRoutes);

export default app;
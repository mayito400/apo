import express from "express";
import morgan from "morgan";
// Routes
import userRoutes from './routes/user.routes';
import loanHeaderRoutes from './routes/loan-header.routes';
import penaltyRoutes from './routes/penalty.routes';
import genreRoutes from './routes/genre.routes';
import roleRoutes from './routes/role.routes';
import publisherRoutes from './routes/publisher.routes';
// import authorRoutes from './routes/author.routes';
// Enviroment Config
import message from "./config/message";
import enviroment from "./config/enviroment";
const app = express();

// settings
app.set("PORT",process.env.PORT || 4321);

// middlewares: funciones intermedias para que la aplicacion funcione
app.use(morgan('dev'));
app.use(express.json()); // especifica que el servidor entienda json

// Routes
app.use('/api/user',userRoutes);
app.use('/api/loan-header',loanHeaderRoutes);
app.use('/api/penalty',penaltyRoutes);
app.use('/api/genre',genreRoutes);
app.use('/api/role',roleRoutes);
app.use('/api/publisher',publisherRoutes);
// app.use('/api/author',authorRoutes);
// app.use('/api/template',templateRoutes);

export default app;
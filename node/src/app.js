import express from "express";
import morgan from "morgan";
// Routes
import languageRoutes from './routes/language.routes';
const app = express();

// settings
app.set("port",6491);

// middlewares: funciones intermedias ???
app.use(morgan('dev'));
app.use(express.json()); // especifica que el servidor entienda json

// Routes
app.use('/api/languages',languageRoutes);

export default app;
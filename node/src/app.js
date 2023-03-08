import express from "express";
import morgan from "morgan";
// Routes
import userRoutes from './routes/user.routes';
import templateRoutes from './routes/template.routes';
const app = express();

// settings
app.set("port",6491);

// middlewares: funciones intermedias ???
app.use(morgan('dev'));
app.use(express.json()); // especifica que el servidor entienda json

// Routes
app.use('/api/user',userRoutes);
// app.use('/api/template',templateRoutes);

export default app;
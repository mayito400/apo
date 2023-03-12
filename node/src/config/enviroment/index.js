import path from "path";
import dontenv, { config } from "dotenv";

dontenv.config({
    "path":path.resolve(__dirname,`${process.env.NODE_ENV}.env`)
});

export default config;
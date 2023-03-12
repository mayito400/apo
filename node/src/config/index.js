import app from "../app";
import message from "./message";

export const caseEntorno = () => {

    switch (process.env.NODE_ENV) {
        case "developer":
            message(`server on http://localhost:${app.get("PORT")}`, "success")
            break;
        case "qa":
            message(`server on http://localhost:${app.get("PORT")}`, "warning")
            break;
        case "production":
            message(`server on http://localhost:${app.get("PORT")}`, "danger")
            break;

        default:
            message(`server on http://localhost:${app.get("PORT")}`, "white")
            break;
    }
} 
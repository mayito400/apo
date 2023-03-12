// funcion principal
import app from "./app";
import { caseEntorno } from "./config";

const main=()=>{
    app.listen(app.get("PORT"),caseEntorno);
};

main();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _enviroment = require("./enviroment");
var _default = {
  //* en caso de no encontrar los valores, se mandará un string vacio

  host: process.env.DB_HOST || "",
  database: process.env.DB_NAME || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || ""
};
exports["default"] = _default;
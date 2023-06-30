"use strict";

var _promiseMysql = _interopRequireDefault(require("promise-mysql"));
var _config = _interopRequireDefault(require("../config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//* se crea la conexion a la base de datos
var connection = _promiseMysql["default"].createConnection({
  host: _config["default"].host,
  database: _config["default"].database,
  user: _config["default"].user,
  password: _config["default"].password
});

//* funcion que retorna la conexion
var getConnection = function getConnection() {
  return connection;
};
module.exports = {
  getConnection: getConnection
};
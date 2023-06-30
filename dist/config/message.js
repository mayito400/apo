"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _colors = _interopRequireDefault(require("colors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var message = function message(mensaje, tipo) {
  switch (tipo) {
    case "danger":
      console.log(mensaje.bgRed);
      break;
    case "warning":
      console.log(mensaje.bgYellow);
      break;
    case "success":
      console.log(mensaje.bgGreen);
      break;
    case "info":
      console.log(mensaje.bgBlue);
      break;
    default:
      console.log(mensaje.bgWhite);
      break;
  }
};
var _default = message;
exports["default"] = _default;
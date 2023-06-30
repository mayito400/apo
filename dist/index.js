"use strict";

var _app = _interopRequireDefault(require("./app"));
var _config = require("./config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// funcion principal

var main = function main() {
  _app["default"].listen(_app["default"].get("PORT"), _config.caseEntorno);
};
main();
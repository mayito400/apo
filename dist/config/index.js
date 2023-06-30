"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caseEntorno = void 0;
var _app = _interopRequireDefault(require("../app"));
var _message = _interopRequireDefault(require("./message"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var caseEntorno = function caseEntorno() {
  switch (process.env.NODE_ENV) {
    case "developer":
      (0, _message["default"])("server on http://localhost:".concat(_app["default"].get("PORT")), "success");
      break;
    case "qa":
      (0, _message["default"])("server on http://localhost:".concat(_app["default"].get("PORT")), "warning");
      break;
    case "production":
      (0, _message["default"])("server on http://localhost:".concat(_app["default"].get("PORT")), "danger");
      break;
    default:
      (0, _message["default"])("server on http://localhost:".concat(_app["default"].get("PORT")), "white");
      break;
  }
};
exports.caseEntorno = caseEntorno;
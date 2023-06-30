"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _role = require("../controllers/role.controller");
//* se importa el objeto methods el cual contiene las interacciones a la base de datos
var router = (0, _express.Router)();
router.get('/', _role.methods.getRoles); //? GET ALL
router.get('/:id', _role.methods.getRole); //? GET for ID
router.post('/', _role.methods.addRole); //? POST
router.put('/:id', _role.methods.updateRole); //? UPDATE
router["delete"]('/:id', _role.methods.deleteRole); //? DELETE for ID
var _default = router;
exports["default"] = _default;
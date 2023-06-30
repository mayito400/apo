"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = require("../controllers/user.controller");
//* se importa el objeto methods el cual contiene las interacciones a la base de datos
var router = (0, _express.Router)();
router.get('/', _user.methods.getUsers); //? GET ALL
router.get('/:id', _user.methods.getUser); //? GET for ID
router.post('/', _user.methods.addUser); //? POST
router.put('/:id', _user.methods.updateUser); //? UPDATE
router["delete"]('/:id', _user.methods.deleteUser); //? DELETE for ID
router.patch('/:id', _user.methods.banUser); //? DELETE for ID
var _default = router;
exports["default"] = _default;
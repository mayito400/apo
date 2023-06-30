"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _author = require("../controllers/author.controller");
//* se importa el objeto methods el cual contiene las interacciones a la base de datos
var router = (0, _express.Router)();
router.get('/', _author.methods.getAuthors); //? GET ALL
router.get('/:id', _author.methods.getAuthor); //? GET for ID
router.post('/', _author.methods.addAuthor); //? POST
router.put('/:id', _author.methods.updateAuthor); //? UPDATE
router["delete"]('/:id', _author.methods.deleteAuthor); //? DELETE for ID
var _default = router;
exports["default"] = _default;
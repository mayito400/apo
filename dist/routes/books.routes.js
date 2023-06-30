"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _books = require("../controllers/books.controller");
//* se importa el objeto methods el cual contiene las interacciones a la base de datos
var router = (0, _express.Router)();
router.get('/', _books.methods.getBooks); //? GET ALL
router.get('/:id', _books.methods.getBook); //? GET for ID
router.post('/', _books.methods.addBook); //? POST
router.put('/:id', _books.methods.updateBook); //? UPDATE
router["delete"]('/:id', _books.methods.deleteBook); //? DELETE for ID
var _default = router;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _genre = require("../controllers/genre.controller");
//* se importa el objeto methods el cual contiene las interacciones a la base de datos
var router = (0, _express.Router)();
router.get('/', _genre.methods.getGenres); //? GET ALL
router.get('/:id', _genre.methods.getGenre); //? GET for ID
router.post('/', _genre.methods.addGenre); //? POST
router.put('/:id', _genre.methods.updateGenre); //? UPDATE
router["delete"]('/:id', _genre.methods.deleteGenre); //? DELETE for ID
var _default = router;
exports["default"] = _default;
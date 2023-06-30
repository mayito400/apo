"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _template = require("../controllers/template.controller");
//* se importa el objeto methods el cual contiene las interacciones a la base de datos
var router = (0, _express.Router)();
router.get('/', _template.methods.getTemplate); //? GET ALL
router.get('/:id', _template.methods.getTemplate); //? GET for ID
router.post('/', _template.methods.addTemplate); //? POST
router.put('/:id', _template.methods.updateTemplate); //? UPDATE
router["delete"]('/:id', _template.methods.deleteTemplate); //? DELETE for ID
var _default = router;
exports["default"] = _default;
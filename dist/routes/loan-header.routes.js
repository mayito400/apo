"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _loanHeader = require("../controllers/loan-header.controller");
//* se importa el objeto methods el cual contiene las interacciones a la base de datos
var router = (0, _express.Router)();
router.get('/', _loanHeader.methods.getLoanHeaders); //? GET ALL
router.get('/:id', _loanHeader.methods.getLoanHeader); //? GET for ID
router.post('/', _loanHeader.methods.addLoanHeader); //? POST
router.put('/:id', _loanHeader.methods.updateLoanHeader); //? UPDATE
router["delete"]('/:id', _loanHeader.methods.deleteLoanHeader); //? DELETE for ID
var _default = router;
exports["default"] = _default;
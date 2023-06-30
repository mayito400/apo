"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _detailLoan = require("../controllers/detail-loan.controller");
//* se importa el objeto methods el cual contiene las interacciones a la base de datos
var router = (0, _express.Router)();
router.get('/', _detailLoan.methods.getDetailLoans); //? GET ALL
router.get('/:id', _detailLoan.methods.getDetailLoan); //? GET for ID
router.post('/', _detailLoan.methods.addDetailLoan); //? POST
router.put('/:id', _detailLoan.methods.updateDetailLoan); //? UPDATE
router["delete"]('/:id', _detailLoan.methods.deleteDetailLoan); //? DELETE for ID
var _default = router;
exports["default"] = _default;
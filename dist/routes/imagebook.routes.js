"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _imagebook = require("../controllers/imagebook.controller");
var router = (0, _express.Router)();
router.get('/', _imagebook.methods.getimagebooks);
router.get('/:id', _imagebook.methods.getimagebook);
router.post('/', _imagebook.methods.addimagebook);
// router.post('/test',imagebookController.multerUpload.single('file'),(req, res)=>{
//     console.log(req.file);

//     res.sendStatus(200)
// });
router.put('/:id', _imagebook.methods.updateimagebook);
router["delete"]('/:id', _imagebook.methods.deleteimagebook);
var _default = router;
exports["default"] = _default;
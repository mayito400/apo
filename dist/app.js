"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _message = _interopRequireDefault(require("./config/message"));
var _enviroment = _interopRequireDefault(require("./config/enviroment"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _loanHeader = _interopRequireDefault(require("./routes/loan-header.routes"));
var _genre = _interopRequireDefault(require("./routes/genre.routes"));
var _role = _interopRequireDefault(require("./routes/role.routes"));
var _author = _interopRequireDefault(require("./routes/author.routes"));
var _books = _interopRequireDefault(require("./routes/books.routes"));
var _detailLoan = _interopRequireDefault(require("./routes/detail-loan.routes"));
var _imagebook = _interopRequireDefault(require("./routes/imagebook.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import multerUpload from "./middlewares/multer.js";

// Enviroment Config

// Import routes

//---------------------------------------------

var app = (0, _express["default"])();

// settings
app.set("PORT", process.env.PORT || 4321);

// middlewares: funciones intermedias para que la aplicacion funcione
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json()); // especifica que el servidor entienda json
app.use((0, _expressFileupload["default"])({
  createParentPath: false,
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  abortOnLimit: true,
  responseOnLimit: "El archivo es demasiado grande"
}));
// app.use(multerUpload.single('file'))

// Routes
app.use('/api/user', _user["default"]);
app.use('/api/loan-header', _loanHeader["default"]);
app.use('/api/genre', _genre["default"]);
app.use('/api/role', _role["default"]);
app.use('/api/author', _author["default"]);
app.use('/api/books', _books["default"]);
app.use('/api/detail-loan', _detailLoan["default"]);
app.use('/api/imagebook', _imagebook["default"]);
// app.use('/api/template',templateRoutes);
var _default = app;
exports["default"] = _default;
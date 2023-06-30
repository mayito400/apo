"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;
var _database = require("../db/database");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// interacciones con la base de datos

//* GET
var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var connection, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getConnection)();
        case 3:
          connection = _context.sent;
          _context.next = 6;
          return connection.query("CALL spGetAllUsers()");
        case 6:
          result = _context.sent;
          res.json(result[0]);
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).send(_context.t0.message);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, connection, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return (0, _database.getConnection)();
        case 4:
          connection = _context2.sent;
          _context2.next = 7;
          return connection.query("CALL spGetUser('".concat(id, "')"));
        case 7:
          result = _context2.sent;
          if (!(result[0][0] === undefined)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "El usuario ingresado no existe"
          }));
        case 10:
          res.json(result[0]);
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send(_context2.t0);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function getUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//* POST
var addUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASENA, CORREO, SEXO, ESTADO, COD_ROL, user, connection;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, DNI_USUARIO = _req$body.DNI_USUARIO, NOM_USUARIO = _req$body.NOM_USUARIO, APELL_USUARIO = _req$body.APELL_USUARIO, FECHA_NAC = _req$body.FECHA_NAC, CONTRASENA = _req$body.CONTRASENA, CORREO = _req$body.CORREO, SEXO = _req$body.SEXO, ESTADO = _req$body.ESTADO, COD_ROL = _req$body.COD_ROL;
          user = {
            DNI_USUARIO: DNI_USUARIO,
            NOM_USUARIO: NOM_USUARIO,
            APELL_USUARIO: APELL_USUARIO,
            FECHA_NAC: FECHA_NAC,
            CONTRASENA: CONTRASENA,
            CORREO: CORREO,
            SEXO: SEXO,
            ESTADO: ESTADO,
            COD_ROL: COD_ROL
          }; // Valida si los campos de la peticion están llenos o no
          if (!(DNI_USUARIO === undefined)) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su DNI"
          }));
        case 5:
          if (!(NOM_USUARIO === undefined)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su NOMBRE"
          }));
        case 7:
          if (!(APELL_USUARIO === undefined)) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese sus APELLIDOS"
          }));
        case 9:
          if (!(FECHA_NAC === undefined)) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su FECHA DE NACIMIENTO"
          }));
        case 11:
          if (!(CONTRASENA === undefined)) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su CONTRASENA"
          }));
        case 13:
          if (!(CORREO === undefined)) {
            _context3.next = 15;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su CORREO ELECTRONICO"
          }));
        case 15:
          if (!(SEXO === undefined)) {
            _context3.next = 17;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su SEXO"
          }));
        case 17:
          if (!(ESTADO === undefined)) {
            _context3.next = 19;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su ESTADO"
          }));
        case 19:
          if (!(COD_ROL === undefined)) {
            _context3.next = 21;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su ROL"
          }));
        case 21:
          _context3.next = 23;
          return (0, _database.getConnection)();
        case 23:
          connection = _context3.sent;
          _context3.next = 26;
          return connection.query("CALL spAddUser('".concat(user.DNI_USUARIO, "','").concat(user.NOM_USUARIO, "','").concat(user.APELL_USUARIO, "','").concat(user.FECHA_NAC, "','").concat(user.CONTRASENA, "','").concat(user.CORREO, "','").concat(user.SEXO, "','").concat(user.ESTADO, "','").concat(user.COD_ROL, "');"));
        case 26:
          res.status(201).json({
            message: "Usuario añadido"
          });
          _context3.next = 36;
          break;
        case 29:
          _context3.prev = 29;
          _context3.t0 = _context3["catch"](0);
          _context3.t1 = _context3.t0.errno;
          _context3.next = _context3.t1 === 1062 ? 34 : 35;
          break;
        case 34:
          return _context3.abrupt("return", res.status(400).json({
            message: "El DNI ingresado ya existe"
          }));
        case 35:
          return _context3.abrupt("return", res.status(500).send(_context3.t0.message));
        case 36:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 29]]);
  }));
  return function addUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

//* DELETE
var deleteUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, connection, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return (0, _database.getConnection)();
        case 4:
          connection = _context4.sent;
          _context4.next = 7;
          return connection.query("CALL `spDeleteUser`(?)", id);
        case 7:
          result = _context4.sent;
          _context4.t0 = result.affectedRows;
          _context4.next = _context4.t0 === 0 ? 11 : _context4.t0 === 1 ? 12 : 13;
          break;
        case 11:
          return _context4.abrupt("return", res.status(400).json({
            message: "Usuario no existente"
          }));
        case 12:
          return _context4.abrupt("return", res.status(202).json({
            message: "Usuario eliminado"
          }));
        case 13:
          return _context4.abrupt("return", res.status(404).json({
            message: "Error, intentelo nuevamente mas tarde"
          }));
        case 14:
          _context4.next = 19;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t1 = _context4["catch"](0);
          res.status(500).send(_context4.t1.message);
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 16]]);
  }));
  return function deleteUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//* Put
var updateUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, _req$body2, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASENA, CORREO, SEXO, ESTADO, COD_ROL, user, connection, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, NOM_USUARIO = _req$body2.NOM_USUARIO, APELL_USUARIO = _req$body2.APELL_USUARIO, FECHA_NAC = _req$body2.FECHA_NAC, CONTRASENA = _req$body2.CONTRASENA, CORREO = _req$body2.CORREO, SEXO = _req$body2.SEXO, ESTADO = _req$body2.ESTADO, COD_ROL = _req$body2.COD_ROL;
          user = {
            NOM_USUARIO: NOM_USUARIO,
            APELL_USUARIO: APELL_USUARIO,
            FECHA_NAC: FECHA_NAC,
            CONTRASENA: CONTRASENA,
            CORREO: CORREO,
            SEXO: SEXO,
            ESTADO: ESTADO,
            COD_ROL: COD_ROL
          }; // Valida si los campos de la peticion están llenos o no
          if (!(NOM_USUARIO === undefined)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su NOMBRE"
          }));
        case 6:
          if (!(APELL_USUARIO === undefined)) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Por favor ingrese sus APELLIDOS"
          }));
        case 8:
          if (!(FECHA_NAC === undefined)) {
            _context5.next = 10;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su FECHA DE NACIMIENTO"
          }));
        case 10:
          if (!(CONTRASENA === undefined)) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su CONTRASENA"
          }));
        case 12:
          if (!(CORREO === undefined)) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su CORREO ELECTRONICO"
          }));
        case 14:
          if (!(SEXO === undefined)) {
            _context5.next = 16;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su SEXO"
          }));
        case 16:
          if (!(ESTADO === undefined)) {
            _context5.next = 18;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su ESTADO"
          }));
        case 18:
          if (!(COD_ROL === undefined)) {
            _context5.next = 20;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su ROL"
          }));
        case 20:
          _context5.next = 22;
          return (0, _database.getConnection)();
        case 22:
          connection = _context5.sent;
          _context5.next = 25;
          return connection.query("CALL spUpdateUser('".concat(id, "','").concat(user.NOM_USUARIO, "','").concat(user.APELL_USUARIO, "','").concat(user.FECHA_NAC, "','").concat(user.CONTRASENA, "','").concat(user.CORREO, "','").concat(user.SEXO, "','").concat(user.ESTADO, "','").concat(user.COD_ROL, "');"));
        case 25:
          result = _context5.sent;
          _context5.t0 = result.affectedRows;
          _context5.next = _context5.t0 === 0 ? 29 : _context5.t0 === 1 ? 30 : 31;
          break;
        case 29:
          return _context5.abrupt("return", res.status(400).json({
            message: "Usuario no existente"
          }));
        case 30:
          return _context5.abrupt("return", res.status(202).json({
            message: "Datos del usuario actualizados"
          }));
        case 31:
          return _context5.abrupt("return", res.status(404).json({
            message: "Error, intentelo nuevamente mas tarde"
          }));
        case 32:
          _context5.next = 41;
          break;
        case 34:
          _context5.prev = 34;
          _context5.t1 = _context5["catch"](0);
          _context5.t2 = _context5.t1.errno;
          _context5.next = _context5.t2 === 1062 ? 39 : 40;
          break;
        case 39:
          return _context5.abrupt("return", res.status(400).json({
            message: "El DNI ingresado ya existe"
          }));
        case 40:
          return _context5.abrupt("return", res.status(500).send(_context5.t1.message));
        case 41:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 34]]);
  }));
  return function updateUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//* Patch
var banUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, ESTADO, user, connection, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          ESTADO = req.body.ESTADO;
          user = {
            ESTADO: ESTADO
          }; // Valida si los campos de la peticion están llenos o no
          if (!(ESTADO === undefined)) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "Por favor ingrese su ESTADO"
          }));
        case 6:
          _context6.next = 8;
          return (0, _database.getConnection)();
        case 8:
          connection = _context6.sent;
          _context6.next = 11;
          return connection.query("CALL spBanUser('".concat(id, "','").concat(user.ESTADO, "');"));
        case 11:
          result = _context6.sent;
          _context6.t0 = result.affectedRows;
          _context6.next = _context6.t0 === 0 ? 15 : _context6.t0 === 1 ? 16 : 17;
          break;
        case 15:
          return _context6.abrupt("return", res.status(400).json({
            message: "Usuario no existente"
          }));
        case 16:
          return _context6.abrupt("return", res.status(202).json({
            message: "Estado del usuario actualizado"
          }));
        case 17:
          return _context6.abrupt("return", res.status(404).json({
            message: "Error, intentelo nuevamente mas tarde"
          }));
        case 18:
          _context6.next = 27;
          break;
        case 20:
          _context6.prev = 20;
          _context6.t1 = _context6["catch"](0);
          _context6.t2 = _context6.t1.errno;
          _context6.next = _context6.t2 === 1062 ? 25 : 26;
          break;
        case 25:
          return _context6.abrupt("return", res.status(400).json({
            message: "El DNI ingresado ya existe"
          }));
        case 26:
          return _context6.abrupt("return", res.status(500).send(_context6.t1.message));
        case 27:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 20]]);
  }));
  return function banUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var methods = {
  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  banUser: banUser
};
exports.methods = methods;
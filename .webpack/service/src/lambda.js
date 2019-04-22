(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lambda.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: DEFAULT_QUERY_LIMIT, MAXIMUM_QUERY_LIMIT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_QUERY_LIMIT\", function() { return DEFAULT_QUERY_LIMIT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAXIMUM_QUERY_LIMIT\", function() { return MAXIMUM_QUERY_LIMIT; });\nconst DEFAULT_QUERY_LIMIT = 50;\nconst MAXIMUM_QUERY_LIMIT = 500;\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/controllers/UserController.js":
/*!*******************************************!*\
  !*** ./src/controllers/UserController.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/drakesiemer/Documents/business/TexVet/texvet-api/src/controllers/UserController.js: Support for the experimental syntax 'classProperties' isn't currently enabled (14:12):\\n\\n\\u001b[0m \\u001b[90m 12 | \\u001b[39m  }\\u001b[0m\\n\\u001b[0m \\u001b[90m 13 | \\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 14 | \\u001b[39m  getUsers \\u001b[33m=\\u001b[39m async (req\\u001b[33m,\\u001b[39m res) \\u001b[33m=>\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m           \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 15 | \\u001b[39m    \\u001b[36mtry\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 16 | \\u001b[39m      \\u001b[36mconst\\u001b[39m [users\\u001b[33m,\\u001b[39m itemCount] \\u001b[33m=\\u001b[39m await \\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39muserService\\u001b[33m.\\u001b[39mgetUsers(req)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 17 | \\u001b[39m      \\u001b[36mconst\\u001b[39m response \\u001b[33m=\\u001b[39m makePaginatedResponse(req\\u001b[33m,\\u001b[39m users\\u001b[33m,\\u001b[39m itemCount)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\nAdd @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.\\n    at Parser.raise (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:3851:17)\\n    at Parser.expectPlugin (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:5172:18)\\n    at Parser.parseClassProperty (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:8290:12)\\n    at Parser.pushClassProperty (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:8255:30)\\n    at Parser.parseClassMemberWithIsStatic (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:8194:14)\\n    at Parser.parseClassMember (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:8128:10)\\n    at withTopicForbiddingContext (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:8083:14)\\n    at Parser.withTopicForbiddingContext (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:7185:14)\\n    at Parser.parseClassBody (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:8060:10)\\n    at Parser.parseClass (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:8034:22)\\n    at Parser.parseStatementContent (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:7333:21)\\n    at Parser.parseStatement (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:7291:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:7868:25)\\n    at Parser.parseBlockBody (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:7855:10)\\n    at Parser.parseTopLevel (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:7220:10)\\n    at Parser.parse (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:8863:17)\\n    at parse (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/parser/lib/index.js:11135:38)\\n    at parser (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\\n    at normalizeFile (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\\n    at runSync (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/core/lib/transformation/index.js:44:43)\\n    at runAsync (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/core/lib/transformation/index.js:35:14)\\n    at process.nextTick (/Users/drakesiemer/Documents/business/TexVet/texvet-api/node_modules/@babel/core/lib/transform.js:34:34)\\n    at processTicksAndRejections (internal/process/next_tick.js:74:9)\");\n\n//# sourceURL=webpack:///./src/controllers/UserController.js?");

/***/ }),

/***/ "./src/lambda.js":
/*!***********************!*\
  !*** ./src/lambda.js ***!
  \***********************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handler\", function() { return handler; });\n/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serverless-http */ \"serverless-http\");\n/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _makeApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makeApp */ \"./src/makeApp.js\");\n/* harmony import */ var _makeRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./makeRoutes */ \"./src/makeRoutes.js\");\n/* eslint-disable no-param-reassign */\n\n\n // make the server\n\nconst app = Object(_makeApp__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([_makeRoutes__WEBPACK_IMPORTED_MODULE_2__[\"default\"]]);\nconst handler = serverless_http__WEBPACK_IMPORTED_MODULE_0___default()(app, {\n  request: (request, event, context) => {\n    context.callbackWaitsForEmptyEventLoop = false;\n\n    if (event.source === 'serverless-plugin-warmup') {\n      request.method = 'GET';\n      request.url = '/warmup';\n    }\n  }\n}); // eslint-disable-next-line import/prefer-default-export\n\n\n\n//# sourceURL=webpack:///./src/lambda.js?");

/***/ }),

/***/ "./src/makeApp.js":
/*!************************!*\
  !*** ./src/makeApp.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_paginate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-paginate */ \"express-paginate\");\n/* harmony import */ var express_paginate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_paginate__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mongoose */ \"./src/mongoose.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\n\n\n\n // this function creates the express app that is used both locally and in our\n// hosted environments, including production. Any changes you make here will\n// be reflected everywhere, so be careful.\n\nconst makeApp = makeRoutesFunctions => {\n  const app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n  app.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json());\n  app.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.urlencoded({\n    extended: true\n  })); // keep this before all routes that will use pagination\n\n  app.use(express_paginate__WEBPACK_IMPORTED_MODULE_2___default.a.middleware(_constants__WEBPACK_IMPORTED_MODULE_5__[\"DEFAULT_QUERY_LIMIT\"], _constants__WEBPACK_IMPORTED_MODULE_5__[\"MAXIMUM_QUERY_LIMIT\"]));\n  app.use((req, res, next) => {\n    res.header('Access-Control-Allow-Origin', '*');\n    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');\n    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); // intercepts OPTIONS method\n\n    if (req.method === 'OPTIONS') {\n      // respond with 200\n      res.sendStatus(200);\n    } else {\n      // move on\n      next();\n    }\n  });\n  app.use(helmet__WEBPACK_IMPORTED_MODULE_3___default()());\n  makeRoutesFunctions.forEach(makeRoutes => {\n    makeRoutes(app);\n  });\n  return app;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (makeApp);\n\n//# sourceURL=webpack:///./src/makeApp.js?");

/***/ }),

/***/ "./src/makeRoutes.js":
/*!***************************!*\
  !*** ./src/makeRoutes.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routes_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/user */ \"./src/routes/user/index.js\");\n/* harmony import */ var _routes_user_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/user/auth */ \"./src/routes/user/auth/index.js\");\n\n\n\nconst makeRoutes = app => {\n  // public routes\n  app.use('/public/v1/users', _routes_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); // authenticated routes\n\n  app.use('/auth/v1/users', _routes_user_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (makeRoutes);\n\n//# sourceURL=webpack:///./src/makeRoutes.js?");

/***/ }),

/***/ "./src/mongoose.js":
/*!*************************!*\
  !*** ./src/mongoose.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst mongoDB = process.env.MONGODB_URI;\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect(mongoDB);\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Promise = global.Promise;\nconst db = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection; // eslint-disable-next-line no-console\n\ndb.on('error', console.error.bind(console, 'MongoDB connection error:'));\n/* harmony default export */ __webpack_exports__[\"default\"] = (db);\n\n//# sourceURL=webpack:///./src/mongoose.js?");

/***/ }),

/***/ "./src/routes/user/auth/index.js":
/*!***************************************!*\
  !*** ./src/routes/user/auth/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../controllers/UserController */ \"./src/controllers/UserController.js\");\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nrouter.put('/:id', _controllers_UserController__WEBPACK_IMPORTED_MODULE_1___default.a.updateUser);\nrouter.get('/', _controllers_UserController__WEBPACK_IMPORTED_MODULE_1___default.a.getUsers);\nrouter.get('/:id', _controllers_UserController__WEBPACK_IMPORTED_MODULE_1___default.a.getUser);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/routes/user/auth/index.js?");

/***/ }),

/***/ "./src/routes/user/index.js":
/*!**********************************!*\
  !*** ./src/routes/user/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers/UserController */ \"./src/controllers/UserController.js\");\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_controllers_UserController__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nrouter.post('/', _controllers_UserController__WEBPACK_IMPORTED_MODULE_1___default.a.createUser);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/routes/user/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-paginate":
/*!***********************************!*\
  !*** external "express-paginate" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-paginate\");\n\n//# sourceURL=webpack:///external_%22express-paginate%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serverless-http\");\n\n//# sourceURL=webpack:///external_%22serverless-http%22?");

/***/ })

/******/ })));
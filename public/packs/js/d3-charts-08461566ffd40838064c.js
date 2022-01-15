/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/d3-charts.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/d3-charts.js":
/*!*******************************************!*\
  !*** ./app/javascript/packs/d3-charts.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /home/sandro/workspace/philosophische_insel/app/javascript/packs/d3-charts.js: Unexpected token, expected \",\" (29:36)\n\n  27 |         // Add X axis\n  28 |         const x = d3.scaleLinear()\n> 29 |           .domain([0, data.group_by { |x| x[:value] }.max.last])\n     |                                     ^\n  30 |           .range([ 0, width]);\n  31 |         svg.append(\"g\")\n  32 |           .attr(\"transform\", `translate(0, ${height})`)\n    at Parser._raise (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:807:17)\n    at Parser.raiseWithData (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:800:17)\n    at Parser.raise (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:761:17)\n    at Parser.unexpected (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:9931:16)\n    at Parser.expect (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:9905:28)\n    at Parser.parseExprList (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:12028:14)\n    at Parser.parseArrayLike (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:11932:26)\n    at Parser.parseExprAtom (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:11238:23)\n    at Parser.parseExprSubscripts (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10904:23)\n    at Parser.parseUpdate (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10884:21)\n    at Parser.parseMaybeUnary (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10862:23)\n    at Parser.parseExprOps (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10719:23)\n    at Parser.parseMaybeConditional (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10693:23)\n    at Parser.parseMaybeAssign (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10656:21)\n    at /home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10623:39\n    at Parser.allowInAnd (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:12310:12)\n    at Parser.parseMaybeAssignAllowIn (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10623:17)\n    at Parser.parseExprListItem (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:12070:18)\n    at Parser.parseCallExpressionArguments (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:11102:22)\n    at Parser.parseCoverCallAndAsyncArrowHead (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:11012:29)\n    at Parser.parseSubscript (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10948:19)\n    at Parser.parseSubscripts (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10921:19)\n    at Parser.parseExprSubscripts (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10910:17)\n    at Parser.parseUpdate (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10884:21)\n    at Parser.parseMaybeUnary (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10862:23)\n    at Parser.parseExprOps (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10719:23)\n    at Parser.parseMaybeConditional (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10693:23)\n    at Parser.parseMaybeAssign (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10656:21)\n    at /home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:10623:39\n    at Parser.allowInAnd (/home/sandro/workspace/philosophische_insel/node_modules/@babel/parser/lib/index.js:12304:16)");

/***/ })

/******/ });
//# sourceMappingURL=d3-charts-08461566ffd40838064c.js.map
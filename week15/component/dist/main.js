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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel.view":
/*!***********************!*\
  !*** ./carousel.view ***!
  \***********************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var _create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create.js */ \"./create.js\");\n\n   \n   class Carousel{\n        render(){\n           return \n        Object(_create_js__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"div\",{\"type\":\"startTag\",\"tagName\":\"div\"},\"\\r\\n        \",\n        Object(_create_js__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"img\",{\"type\":\"startTag\",\"tagName\":\"img\",\"isSelfClosing\":true},)\n        ,\"\\r\\n    \")\n        \n        };\n        setAttribute(name, value) {\n            this[name] = value\n        };\n        mountTo(parent){\n            this.render().mountTo(parent)\n        }\n    }\n    \n\n//# sourceURL=webpack:///./carousel.view?");

/***/ }),

/***/ "./create.js":
/*!*******************!*\
  !*** ./create.js ***!
  \*******************/
/*! exports provided: create, Text, Wraper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wraper\", function() { return Wraper; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction create(Cls, attributes) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  console.log(children, 'args');\n  var o;\n\n  if (typeof Cls === 'string') {\n    o = new Wraper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  } // o = new Cls();\n\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === 'string') {\n          child = new Text(child);\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  visit(children);\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root); // for (const child of this.children) {\n      //     child.mountTo(this.root)\n      // }\n    }\n  }]);\n\n  return Text;\n}();\nvar Wraper = /*#__PURE__*/function () {\n  function Wraper(type) {\n    _classCallCheck(this, Wraper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  } // set id(v) {//property\n  //     console.log(v, 'parent::id');\n  // };\n\n\n  _createClass(Wraper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      //attr\n      console.log(name, value);\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // this.root.appendChild(child)\n      // child.mountTo(this.root)\n      this.children.push(child);\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wraper;\n}();\n;\n\n//# sourceURL=webpack:///./create.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create.js */ \"./create.js\");\n/* harmony import */ var _carousel_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.view */ \"./carousel.view\");\n\n // class Carousel {\n//     constructor(config) {\n//         this.children = [];\n//     }\n//     set id(v) {//property\n//         console.log(v, 'parent::id');\n//     };\n//     render() {\n//         let chidren = this.data.map(url => {\n//             let element = <img src={url} alt=\"\" />\n//             element.addEventListener('dragstart', event => { event.preventDefault() });\n//             return element;\n//         })\n//         let root = <div class='carousel'>\n//             {\n//                 chidren\n//             }\n//         </div>\n//         let position = 0;\n//         let nexPic = () => {\n//             let nextPosition = (position + 1) % this.data.length;\n//             let current = chidren[position];\n//             let next = chidren[nextPosition];\n//             current.style.transition = \"ease 0s\";\n//             next.style.transition = \"ease 0s\";\n//             //图片更换位置的开始状态\n//             current.style.transform = `translateX(${- 100 * position}%)`;\n//             next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;\n//             //一帧大概16S\n//             setTimeout(() => {\n//                 current.style.transition = \"ease 0.5s\";\n//                 next.style.transition = \"ease 0.5s\";\n//                 //图片更换位置的结束状态\n//                 current.style.transform = `translateX(${-100 - 100 * position}%)`;\n//                 next.style.transform = `translateX(${-100 * nextPosition}%)`;\n//                 position = nextPosition;\n//             }, 16);\n//             setTimeout(nexPic, 3000);\n//         }\n//         setTimeout(nexPic, 3000);\n//         root.addEventListener('mousedown', event => {\n//             let startX = event.clientX, startY = event.clientY;\n//             let nextPosition = (position + 1) % this.data.length;\n//             let lastPosition = (position + this.data.length - 1) % this.data.length;\n//             let current = chidren[position];\n//             let last = chidren[lastPosition];\n//             let next = chidren[nextPosition];\n//             current.style.transition = 'ease 0s';\n//             last.style.transition = 'ease 0s';\n//             next.style.transition = 'ease 0s';\n//             current.style.transform = `translateX(${- 500 * position}px)`;\n//             last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;\n//             next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;\n//             let move = event => {\n//                 current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;\n//                 last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;\n//                 next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;\n//             };\n//             let up = event => {\n//                 let offset = 0;\n//                 if (event.clientX - startX > 250) {\n//                     offset = 1\n//                 } else if (event.clientX - startX < -250) {\n//                     offset = -1\n//                 }\n//                 //打开transition\n//                 current.style.transition = \"ease 0.5s\";\n//                 last.style.transition = \"ease 0.5s\";\n//                 next.style.transition = \"ease 0.5s\";\n//                 current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;\n//                 last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;\n//                 next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;\n//                 position = (position + this.data.length - offset) % this.data.length;\n//                 document.removeEventListener('mousemove', move);\n//                 document.removeEventListener('mouseup', up);\n//             }\n//             document.addEventListener('mousemove', move);\n//             document.addEventListener('mouseup', up);\n//         });\n//         return root;\n//     }\n//     appendChild(child) {\n//         // this.root.appendChild(child)\n//         // child.mountTo(this.root)\n//         this.children.push(child)\n//     }\n//     setAttribute(name, value) {//attr\n//         console.log(name, value);\n//         // this.root.setAttribute(name, value)\n//         this[name] = value\n//     };\n//     mountTo(parent) {\n//         this.render().mountTo(parent)\n//         // for (const child of this.children) {\n//         //     this.slot.appendChild(child)\n//         // }\n//     }\n// };\n// // let component = <div id='a' style=\"width:100px;height:100px;background-color:pink\">\n// //     <div>text</div>\n// //     <p />\n// //     <div></div>\n// //     <div></div>\n// // </div>;\n\nvar component = new _carousel_view__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"]();\ndebugger;\ncomponent.mountTo(document.body);\nconsole.log(component, 'cc'); // component.setAttribute('id', 'a')\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });
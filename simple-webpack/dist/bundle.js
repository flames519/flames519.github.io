(function (graph) {
      function require(module) {
        eval("console.log(module)")
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        }
        var exports = {};
        // eval(graph[module]["code"])
        function fn(require, exports, code) {
          eval(code);
        }
        fn(localRequire, exports, graph[module]["code"]);
        return exports;
      }
      require("./src/index.js")
    })({"./src/index.js":{"dependencies":{"./js/a.js":"src/js/a.js","./js/b.js":"src/js/b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./js/a.js\");\n\nvar _b = require(\"./js/b.js\");\n\nconsole.log(\"info: \".concat(_a.a, \",\").concat(_b.b));"},"src/js/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = void 0;\nvar a = \"my name is xxx\";\nexports.a = a;"},"src/js/b.js":{"dependencies":{"./c.js":"src/js/c.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = void 0;\n\nvar _c = require(\"./c.js\");\n\nconsole.log(_c.c);\nvar b = \"my code is good\";\nexports.b = b;"},"src/js/c.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.c = void 0;\nvar c = \"c\";\nexports.c = c;"}});
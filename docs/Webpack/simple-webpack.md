# webpack

webpack 目前主流的打包工具，用的懵懵懂懂，翻翻文档，使用是没什么问题

至于内部到底如何运行，如何组合，还是要看源码

这里简单实现了 js 代码的组合

    目录结构
    | simple-webpack
    |--config 配置文件夹
      -- webpack.config.js 配置项目的入口文件和出口目录和文件名
    |--src 项目文件夹
      --index.js 入口文件
      |-- js 模块文件夹
    |--dist 出口文件夹
    |--lib webpack 实现目录
      --app.js 运行webpack
      --webpack.js

```js
// config/webpack.confing.js
// 只实现了js相关文件
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  //
  mode: "development",
};

// src/index.js

import { a } from "./js/a.js";
import { b } from "./js/b.js";

console.log(`info: ${a},${b}`);

// src/js/a.js
export const a = "my name is xxx"

// src/js/b.js
import { c } from "./c.js";
console.log(c);
export const b = "my code is good";

// src/js/c.js
export const c = "c"

// 目标 生产可运行的bundle.js文件

```

开始实现代码

    依赖： 使用babel相关工具解析js代码
    // 读取文件内容生产ast @babel/parser
    // 过滤ast @babel/traverse
    // 解析转化代码 @babel/core @babel/preset-env

```js
// lib/webpack

const fs = require("fs");
const path = require("path");
// 获取项目路径
const dirPath = path.dirname(__dirname);
// 解析文件内容
const parser = require("@babel/parser");
// 过滤ast
const traverse = require("@babel/traverse").default;
// 解析
const babel = require("@babel/core");

module.exports = class Webpack {
  constructor(option) {
    this.entry = option.entry;
    this.output = option.output;
  }
  run() {
    // console.log(this.code());
    const code = this.code(this.entry)
    const { path: filepath, filename } = this.output;
    fs.writeFileSync(path.join(filepath, filename), code, "utf-8");
  }
  code(entry) {
    const graph = JSON.stringify(this.parse(entry));
    // console.log(this.parse(entry));
    // console.log();
    return `(function (graph) {
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
      require("${entry}")
    })(${graph});`;
  }
  parse(filename) {
    const graph = {};
    const content = fs.readFileSync(path.resolve(dirPath, filename), "utf-8");
    // console.log(content);
    // sourceType: "module"
    // 获取ast
    const ast = parser.parse(content, { sourceType: "module" });
    // console.log(ast.program.body[0].source);
    // 筛选ast，获取文件内容中的模块相关内容
    const dependencies = {};
    traverse(ast, {

      ImportDeclaration: ({ node }) => {
        // console.log(node);
        // path.relative(from, to)
        // 求出相对根目录的路径
        const filePath = path.relative(
          dirPath,
          path.join(
            path.resolve(dirPath, path.dirname(filename)),
            node.source.value
          )
        );
        dependencies[node.source.value] = filePath;
      },
    });
    // 将源代码解析
    const { code } = babel.transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });

    // 保存文件依赖和内容
    graph[filename] = {
      dependencies,
      code,
    };

    // 递归
    Object.keys(dependencies)
      .map((f) => this.parse(dependencies[f]))
      .forEach((m) => Object.assign(graph, m));

    // 返回
    return graph;
  }
};

// lib/app.js
const Webpack = require("./webpack");
const config = require("../config/webpack.config");

const webpack = new Webpack(config);
webpack.run();

// 结果
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

```

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
    console.log(this.code());
    const { path: filepath, filename } = this.output;
    fs.writeFileSync(path.join(filepath, filename), this.code(), "utf-8");
  }
  code() {
    const graph = JSON.stringify(this.parse(this.entry));
    console.log(this.parse(this.entry));
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
      require("${this.entry}")
    })(${graph});`;
  }
  parse(filename) {
    const graph = {};
    const content = fs.readFileSync(path.resolve(dirPath, filename), "utf-8");
    // console.log(content);
    // sourceType: "module"
    // 获取ast树
    const ast = parser.parse(content, { sourceType: "module" });
    // console.log(ast.program.body[0].source);
    // 筛选
    const dependencies = {};
    traverse(ast, {
      // 箭头函数指                                             // 有点感动了怎么办
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

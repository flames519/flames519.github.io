const Webpack = require("./webpack");
const config = require("../config/webpack.config");

const webpack = new Webpack(config);
webpack.run();

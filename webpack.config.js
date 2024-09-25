const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const generateConfig = () => {
  const config = {
    entry: {
      main: path.resolve(__dirname, "src/js/index.js"),
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "deploy"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack Output",
        filename: "index.html",
        template: path.resolve(__dirname, "src/index.html"),
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset/resource",
        },
      ],
    },
    devServer: {
      static: path.resolve(__dirname, "deploy"),
      open: true,
      // port: 3000
    },
  };

  return config;
};

module.exports = () => {
  return generateConfig();
};

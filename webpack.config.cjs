const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  target: "node",
};

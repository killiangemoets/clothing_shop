const HtmlWebPackPlugin = require("html-webpack-plugin");

// In this file we don't have the ES6 syntax
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader, css-loader"],
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
    }),
  ],
};

// rules is a way to define Webpack what it needs to do based on certain file types that it encounters

// BABEL allows us to convert files into other files that our browser can understand

// Then we need to bring another loader bc we need to tell Webpack what it should do with CSS. Indeed, it doesn't know how to render and bring in CSS yet.
// => We will bring in 2 new loader:
// Style loader: allows it convert different types of style files
// The CSS loader: allows the CSS to be read by our JavaScript files
// Notes: we could use a SAAS loaer if we wanted to convert SAAS over as well

// The HTML loader: lets us read our HTML file inside of our Reacr application
// The Webpack plugin is what allows us to actually place the output somewhere

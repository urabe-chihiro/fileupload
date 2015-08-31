var webpack = require('webpack');
module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
}

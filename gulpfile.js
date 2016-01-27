var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: './src/main',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'require.specified': 'require.resolve'
    })
  ]
};

gulp.task('server', function(callback) {
  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    stats: {
      colors: true
    }
  });

  server.listen(8080, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    gutil.log('[webpack-dev-server]', 'http://localhost:8080');
  });
});

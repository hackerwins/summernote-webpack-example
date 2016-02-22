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
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*)?$/, loader: 'url-loader?limit=100000' }
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

var serverConfig = Object.assign(config, {
});

gulp.task('server', function(callback) {
  var server = new WebpackDevServer(webpack(serverConfig), {
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

gulp.task('build', function(callback) {
  webpack(config, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('default', ['build']);

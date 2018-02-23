var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var autoprefixer = require('autoprefixer')
var commonWebpackConfig = require('./webpack.common.js')

module.exports = merge(commonWebpackConfig, {
	resolve: {
		alias: {
			'vue$': path.resolve(__dirname, 'node_modules', 'vue', 'dist', 'vue.min.js')
		}
	},
	devtool: 'cheap-module-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('pro')
			}
		}),
		new UglifyJSPlugin({
			exclude: [/\.min\.js$/gi]
		})
	]
})
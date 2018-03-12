var webpack = require('webpack')
var merge = require('webpack-merge')
var commonWebpackConfig = require('./webpack.common.js')
var path = require('path')

module.exports = merge(commonWebpackConfig, {
	resolve: {
		alias: {
			'vue$': path.resolve(__dirname, 'node_modules', 'vue', 'dist', 'vue.js')
		}
	},
	watch: true,
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('dev')
			}
		})
	]
})
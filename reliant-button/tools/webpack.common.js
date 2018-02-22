var path = require('path')
var autoprefixer = require('autoprefixer')

function componentPath (dir) {
	return path.join(dir)
}

module.exports = {
	entry: {
		components: './component.coffee'
	},
	output: {
		path: path.resolve(__dirname, 'demo'),
		publicPath: '/',
		filename: 'component.js'
	},
	resolveLoader: {
		modules: [path.join(__dirname, 'node_modules')]
	},
	resolve: {
		alias: {
			'anime$': path.resolve(__dirname, 'node_modules', 'animejs', 'anime.min.js')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					use: [
						{ loader: 'vue-style-loader' },
						{ loader: 'css-loader' },
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									autoprefixer({
										browsers: ['ie 9-11', 'Firefox >= 30', 'Edge >= 14', 'Chrome >= 30', 'Safari >= 6'],
										grid: true
									})
								]
							}
						},
						{ loader: 'sass-loader' }
					]
				}
			},
			{
				test: /\.coffee$/,
				loader: 'coffee-loader',
				exclude: /node_modules/
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers: ['ie 9-11', 'Firefox >= 30', 'Edge >= 14', 'Chrome >= 30', 'Safari >= 6'],
									grid: true
								})
							]
						}
					},
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.css$/,
				loaders: 'style-loader!css-loader'
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000000'
			}
		]
	}
}
// Include Gulp & tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = setTimeout(function() {browserSync.reload}, 10);
var merge = require('merge-stream');
var path = require('path');
var packageJson = require('./package.json');
var gulpPug = require('gulp-pug');
var pug = require('pug');
var chalk = require('chalk');
var cleanCSS = require('gulp-clean-css');
var gls = require('gulp-live-server');
var notify = require('gulp-notify');
var webpack = require('webpack-stream');
var webpackDevConfig = require('./webpack.dev.js');
var webpackProConfig = require('./webpack.pro.js');
var rename = require('gulp-rename');
var image = require('gulp-image');
var minimist = require('minimist');
var replace = require('gulp-replace');

// Cesium map url
var productionMapUrl = 'http://minsaitsmartwaste-dev.redbilityservers.com/API_Framework3D'

// Environment configuration
var DIST = '../dist';
var dist = function(subpath) {
	return !subpath ? DIST : path.join(DIST, subpath);
};
var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'dev' }
};
var options = minimist(process.argv.slice(2), knownOptions);

// Copy all files at the root level (app)
gulp.task('copy', function() {
	var app = gulp.src([
		'../dev/**/*',
		'!../dev/**/*.pug',
		'!../dev/**/*.scss',
		'!../dev/client/components/**',
		'!../dev/client/components',
		'!../dev/client/mixins/**',
		'!../dev/client/mixins',
		'!../dev/client/store/**',
		'!../dev/client/store',
		'!../dev/client/styles/**',
		'!../dev/client/styles',
		'!../dev/client/views/**',
		'!../dev/client/views',
		'!../dev/pug',
		'!../dev/pug/**/*',
		'!../dev/client/bower_components',
		'!../dev/client/bower_components/**/*',
		'!../dev/cache-config.json',
		'!**/.DS_Store'
	], {
		dot: true
	}).pipe(gulp.dest(dist()));

	// Copy over only the bower_components we need
	// These are things which cannot be vulcanized
	var bower = gulp.src([
		'../dev/client/bower_components/{webcomponentsjs,platinum-sw,sw-toolbox,promise-polyfill}/**/*'
	]).pipe(gulp.dest(dist('client/bower_components')));

	return merge(app, bower)
		.pipe($.size({
			title: 'copy'
		}));
});

// Replace cesium map url
gulp.task('replaceMapUrl', function(){
  gulp.src([
			'../dist/index.html',
			'../dist/client/client.js',
			'../dist/client/resources/cesium/js/main.js'
		])
    .pipe(replace('http://localhost/API_Framework3D', productionMapUrl))
    .pipe(gulp.dest(function(file) {
			return dist(file.base.substr(file.base.indexOf('/dist')+5, file.base.length));
		}));
});

// Optimize images
gulp.task('optimizeImages', function() {
	return gulp.src('../dev/img/**/*')
		.pipe(image({
			jpegRecompress: true,
		}))
		.pipe(gulp.dest(dist('img')));
});

// Compile templates
gulp.task('pug', function() {
	return gulp.src(['../dev/index.pug'])
		.pipe(
			gulpPug({
				pug: pug,
				pretty: true
			})
			.on('error', function(e) {
				console.log(chalk.red(e));
				this.emit('end');
			})
		).on('end', function() {
			// Files compiled announcement
			console.log(chalk.white('--'));
			console.log(chalk.green('Templates Compiled!'));
			console.log(chalk.white('--'));
			console.log(chalk.white(' '));
		})
		.pipe(gulp.dest(dist()))
		// .pipe(gulp.dest('../dev/html'))
		.on('finish', function(){
			browserSync.reload();
		});
});

// Run webpack
gulp.task('webpack', function() {
	setTimeout(function() {
		console.log(chalk.gray('Waiting for webpack...'));
	}, 300);

	if(options.env === 'dev') {
		webpackConfig = webpackDevConfig
	} if (options.env === 'pro') {
		webpackConfig = webpackProConfig
	}

	return gulp.src('../dev/client/components/components.coffee')
		.pipe(webpack( webpackConfig, null, function(err, stats) {
			console.log(chalk.white('--'));
			console.log(chalk.magenta('--> Component Compiled! '), chalk.green(
				stats.toString({
					colors: true,
					assets: false,
					modules: false,
					hash: false,
					version: false
				})
			));
			console.log(chalk.white('--'));
			console.log(chalk.white(' '));
			if (err) {
				notify().write('webpack error!')
				console.log(chalk.red(
					stats.toString({
						colors: true,
						assets: false,
						modules: false,
						hash: false,
						version: false
					})
				));
			}
			browserSync.reload();
		}))
		.pipe(gulp.dest('../demo'));
});

// Watch files for changes & reload
gulp.task('dev', function() {
	var server = gls('serverConfig.js');
	server.start().then(function(result) {
		console.log('Server exited with result:', result);
		process.exit(result.code);
	});
	browserSync.init({
		proxy: 'localhost:3000',
		port: 8888,
		logPrefix: 'localhost',
		notify: true,
		logLevel: 'silent',
		cors: true,
		startPath: '/'
		browser: ['Firefox Developer Edition']
	});
	gulp.start('webpack');
	$.watch('serverConfig.js', server.start.bind(server)); //restart my server
	$.watch(['../demo/index.html'], function() {
		// Files compiled announcement
		console.log(chalk.white('--'));
		console.log(chalk.green('Template changes detected! Refreshing browsers!'));
		console.log(chalk.white('--'));
		console.log(chalk.white(' '));
		browserSync.reload();
	});

	// Autoreload
	$.watch('gulpfile.js', function() {
		var server = gls('serverConfig.js');
		process.exit;
		server.stop();
	});
});

// Build production files
gulp.task('pro', function(cb) {
	runSequence(
		'webpack',
		'copy',
		'optimizeImages',
		'pug',
		'replaceMapUrl',
		cb);
});

// Stop express serve
gulp.task('serveStop', function() {
	var server = gls('serverConfig.js');
	server.stop();
});

gulp.task('compile', function(cb) {
	if(options.env === 'dev') {
		runSequence('dev', cb);
	} else {
		runSequence('pro', cb);
	}
});

// Compile index Styles
gulp.task('indexCompile', function() {
	return gulp.src('../index/style/less/style.less')
		.pipe($.less())
		.pipe(cleanCSS())
		.pipe(gulp.dest('../index/style/css'));
});

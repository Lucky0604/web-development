var gulp = require('gulp');
var gutil = require('gulp-util');
var watchPath = require('gulp-watch-path');
var autoprefixer = require('gulp-autoprefixer');
// gulp.task('default', function() {
// 	gutil.log('message');
// 	gutil.log(gutil.colors.red('error'));
// 	gutil.log(gutil.colors.green('message: ') + 'some');
// })
// 

// config javascript task
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
// use sourcemaps to debug javascript
var sourcemaps = require('gulp-sourcemaps');
// sass task
var sass = require('gulp-ruby-sass');
// image task
var imagemin = require('gulp-imagemin');
// browser-sync
var browserSync = require('browser-sync').create();


// handle errors
var handleError = function(err) {
	var colors = gutil.colors;
	console.log('\n');
	gutil.log(colors.red('Error!'));
	gutil.log('fileName: ' + colors.red(err.fileName));
	gutil.log('lineNumber: ' + colors.red(err.lineNumber));
	gutil.log('message: ' + err.message);
	gutil.log('plugin: ' + colors.yellow(err.plugin));
}
var combiner = require('stream-combiner2');



gulp.task('uglifyjs', function() {
	// 一次编译所有 js 文件
	// 配置 uglifyjs 任务
	var combined = combiner.obj([
			gulp.src('src/js/**/*.js'),
			sourcemaps.init(),
			uglify(),
			sourcemaps.write('./'),
			gulp.dest('dist/js/')
		]);
	combined.on('error', handleError);
})

gulp.task('watchjs', function() {
	gulp.watch('src/js/**/*.js', function(event) {
		var paths = watchPath(event, 'src/', 'dist/');
		/**
		 * paths
		 * 		{
		 * 			srcPath: 'src/js/log.js'
		 * 			srcDir: 'src/js/'
		 * 			distPath: 'dist/js/log.js'
		 * 			distDir: 'dist/js/'
		 * 			srcFilename: 'log.js'
		 * 			distFilename: 'log.js'
		 * 		}
		 * 
		 * 
		 */
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
		gutil.log('Dist ' + paths.distPath);
		// gulp.src(paths.srcPath)
		// 	.pipe(uglify())
		// 	.pipe(gulp.dest(paths.distDir));
		var combined = combiner.obj([
				gulp.src(paths.srcPath),
				uglify(),
				gulp.dest(paths.distDir)
			]);
		combined.on('error', handleError);
	})
})

// 一次编译所有 css 文件
// 配置 minifyss 任务
gulp.task('minifycss', function() {
	gulp.src('src/css/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
			browsers: 'last 2 versions'
		}))
		.pipe()
})

// minify css task
gulp.task('watchcss', function() {
	gulp.watch('src/css/**/*.css', function(event) {
		var paths = watchPath(event, 'src/', 'dist/');

		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
		gutil.log('Dist ' + paths.distPath);

		gulp.src(paths.srcPath)
			.pipe(sourcemaps.init())
			// autoprefixer 解析 CSS 文件并且添加浏览器前缀到CSS规则里
			.pipe(autoprefixer({
				browsers: 'last 2 versions'
			}))
			.pipe(minifycss())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(paths.distPath))
	})
})

// 配置 Sass 任务
gulp.task('watchsass', function() {
	gulp.watch('src/sass/**/*', function(event) {
		var paths = watchPath(event, 'src/sass/', 'dist/css/');

		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
		gutil.log('Dist ' + paths.distPath);
		sass(paths.srcPath)
			.on('error', function(err) {
				console.error('Error!', err.message);
			})
			.pipe(sourcemaps.init())
			.pipe(minifycss())
			.pipe(autoprefixer({
				browsers: 'last 2 versions'
			}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(paths.distDir))
	})
})

gulp.task('sasscss', function() {
	sass('src/sass/')
		.on('error', function(err) {
			console.error('Error!', err.message);
		})
		.pipe(sourcemaps.init())
		.pipe(minifycss())
		.pipe(autoprefixer({
			browsers: 'last 2 versions'
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/css'));
})

// config image task
gulp.task('watchimage', function() {
	gulp.watch('src/images/**/*', function(event) {
		var paths = watchPath(event, 'src/', 'dist/');

		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
		gutil.log('Dist ' + paths.distPath);

		gulp.src(paths.srcPath)
			.pipe(imagemin({
				progressive: true
			}))
			.pipe(gulp.dest(paths.distDir));
	})
})

// browser auto reload
gulp.task('browser-sync', function() {
	var files = [
		'dist/**/*.html',
		'dist/**/*.css',
		'dist/**/*.js',
		'src/**/*.js',
		'src/**/*.scss'
	];
	browserSync.init(files, {
		server: {
			baseDir: './dist'
		}
	});

})

// gulp.task('default', function() {
// 	gulp.watch('src/js/**/*.js', ['uglifyjs']);
// })
gulp.task('default', ['watchjs', 'watchcss', 'watchsass', 'browser-sync']);
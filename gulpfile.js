var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');

var isRelease = false;

gulp.task('setIsRelease', function() {
  isRelease = true;
});


gulp.task('browserify', function() {
	var b = browserify({
		entries: ['src/js/main.js'],
		debug: true
	});
	b.transform("babelify", { presets: ["es2015", "react"] });
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulpif(isRelease, streamify(uglify())))
    .pipe(gulp.dest('./dist'));
});


gulp.task('css', function() {
  return gulp.src('src/less/*.*')
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/less/*.*', ['css']);
  gulp.watch(['src/js/*.*', 'src/common-ui/*.*'], ['browserify']);
});


gulp.task('default', ['html', 'browserify', 'css', 'watch']);
gulp.task('build', ['default']);
gulp.task('release', ['setIsRelease', 'default']);

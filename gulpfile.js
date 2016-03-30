var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var compass = require('gulp-compass');

var webserver = require('gulp-webserver');

// Constants
var SERVER_PORT = 31415;
var sassPath = "./src/scss";
var sassWatchPath = sassPath+'/**/*.scss';
var jsWatchPath = './src/js/*.js';
var outputBaseDirectory = "./build/";
var cssPath = outputBaseDirectory+"styles";
var jsoutput = outputBaseDirectory+"js";
var vendorPath = "./vendor/*.*";
var imagePath = "./images/*.*";
var imageoutputPath = outputBaseDirectory+"images";
var vendoroutputPath = outputBaseDirectory+"vendor";

gulp.task('movejs', function() {
  gulp.src(jsWatchPath)
    .pipe(gulp.dest(jsoutput));
});

gulp.task('movevendor', function() {
  gulp.src(vendorPath)
    .pipe(gulp.dest(vendoroutputPath));
});

gulp.task('moveimages', function() {
  gulp.src(imagePath)
    .pipe(gulp.dest(imageoutputPath));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port:SERVER_PORT
    }));
});

gulp.task('compass', function () {
    return gulp.src(sassPath)
        .pipe(compass({ // have to be same as config.rb
            sass:  sassPath,
            css: cssPath
        }))
        .on('error', function(err) {
            console.log(err.message);
        });
});


gulp.task('compile', ['compass','movejs','movevendor','moveimages']);

gulp.task('watch', function () {
    gulp.watch(sassWatchPath, ['compass']);
    gulp.watch(jsWatchPath, ['movejs']);
});

gulp.task('default', ['webserver','compile','watch']);
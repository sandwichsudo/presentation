var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var compass = require('gulp-compass');

var webserver = require('gulp-webserver');

// Constants
var SERVER_PORT = 31415;
var sassPath = "./src/scss";
var sassWatchPath = sassPath+'/**/*.scss';
var jsPaths = ['./src/js/*.js',];
var outputBaseDirectory = "./build/";
var cssPath = outputBaseDirectory+"styles";
var jsoutput = outputBaseDirectory+"js";

gulp.task('movejs', function() {
  gulp.src(jsPaths)
    .pipe(gulp.dest(jsoutput));
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


gulp.task('compile', ['compass','movejs']);

gulp.task('watch', function () {
    gulp.watch(sassWatchPath, ['compass']);
});

gulp.task('default', ['webserver','watch']);
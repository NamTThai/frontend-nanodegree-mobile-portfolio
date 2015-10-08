// The code is written by consulting Polymer Starter kit:
// https://github.com/PolymerElements/polymer-starter-kit

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var minifyHtml = require('gulp-minify-html');

var mozjpeg = require('imagemin-mozjpeg');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles', function () {
  return gulp.src('public/stylesheets/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.changed('stylesheets', {extension: '.scss'}))
    .pipe($.sass())
    .pipe($.groupConcat({
      "styles.css": "**/*.css"
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.cssmin())
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(minifyHtml({
      empty: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('scripts', function() {
  return gulp.src('public/javascripts/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.changed('javascripts', {extension: '.js'}))
    .pipe($.concat('scripts.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build/javascripts'));
});

gulp.task('images', function () {
  return gulp.src('views/images/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
    })))
    .pipe(gulp.dest('views/images'))
    .pipe($.size({title: 'images'}));
});

gulp.task('html', function() {

});

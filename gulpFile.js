var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob');

gulp.task('styles', function () {
  return gulp.src('public/css/*.css')
    .pipe($.cssmin())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {
  return gulp.src('public/js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', function () {
  return gulp.src('public/img/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  var root = gulp.src(['public/*', '!public/precache.json'], {
    dot: true
  }).pipe(gulp.dest('build'));

  var components = gulp.src(['public/components/*', '!public/components/components.html'])
    .pipe(gulp.dest('build/components'));

  var views = gulp.src(['public/views/**/*'])
    .pipe(gulp.dest('build/views'));

  return merge(root, components, views);
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['build/**', '!build', '!build/bower_components/**']));
gulp.task('clean-deep', del.bind(null, ['build', 'logs', 'node_modules']));

gulp.task('serve', ['default'], function (){
  gulp.watch(['public/components/*', '!public/components/components.html'], ['copy']);
  gulp.watch(['public/css/*.css'], ['styles']);
  gulp.watch(['public/js/*.js'], ['scripts']);
  gulp.watch(['public/img/*'], ['images']);

  return $.nodemon({
    script: 'server',
    ext: 'js ejs json',
    ignore: ['public', 'build']
  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (callback) {
  runSequence(
    ['copy', 'styles', 'scripts'],
    'images',
    callback);
});

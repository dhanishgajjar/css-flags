'use strict';

const gulp = require('gulp'),
      connect = require('gulp-connect'),
      sass = require('gulp-ruby-sass'),
      pug = require('gulp-pug'),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      cleanCSS = require('gulp-clean-css');

gulp.task('connect', function(){
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('sass', () =>
sass('./scss/**/*.scss', {sourcemap: true})
  .on('error', sass.logError)
  .pipe(sourcemaps.write('./', {
    includeContent: false,
    sourceRoot: './scss'
  }))
  .pipe(gulp.dest('css'))
  .pipe(connect.reload())
);

gulp.task('pug', function() {
  return gulp.src('index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./*.pug', ['pug'])
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./minified'));
});

gulp.task('default', ['connect','watch']);
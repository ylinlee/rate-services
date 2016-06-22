'use strict';

var gulp = require('gulp'),
    ngConstant = require('gulp-ng-constant'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    replace = require('gulp-replace'),
    jshint = require('gulp-jshint');

gulp.task('config-constants', function () {
  gulp.src('config-constants.json')
    .pipe(ngConstant())
    .pipe(replace(/"/g, '\''))
    // Writes config.js to dist/ folder
    .pipe(gulp.dest('src/rate-services/constants/'));
});

// Root directory
var rootDirectory = path.resolve('./');
// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

var sourceFiles = [
  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/*.module.js'),
  // Then add all JavaScript files
  path.join(sourceDirectory, '/**/*.js')
];

var lintFiles = [
  'gulpfile.js',
].concat(sourceFiles);

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function () {
  return gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(concat('rate-services.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('rate-services.min.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Process
 */
gulp.task('dist', ['config-constants', 'jshint', 'build']);

gulp.task('watch', function () {
  gulp.watch(['./config-constant.json'], ['config-constants']);
  // Watch JavaScript files
  gulp.watch(sourceFiles, ['dist']);
});

gulp.task('default', ['dist','watch']);
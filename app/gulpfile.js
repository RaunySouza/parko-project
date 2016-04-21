var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    zip = require('gulp-zip'),
    merge = require('merge-stream'),
    nodemon = require('gulp-nodemon');

var clientDir = './client';
var jsDir = clientDir + '/js';
var cssDir = clientDir + '/css';
var imgDir = clientDir + '/img';
var templateDir = clientDir + '/template';

var bowerDep = "./bower_components";

var publicDir = 'public';
var assetsDir = publicDir + '/assets';

gulp.task('develop', function () {
  nodemon({script: './bin/www', ext: 'js hjs json', legacyWatch: true });
});

// Clean
gulp.task('clean', function() {
    return del([publicDir + "/*"]);
});

gulp.task('scripts', function() {
    return gulp.src([
        bowerDep + "/angular/angular.js",
        bowerDep + "/angular-aria/angular-aria.js",
        bowerDep + "/angular-animate/angular-animate.js",
        bowerDep + "/angular-material/angular-material.js",
        bowerDep + "/angular-messages/angular-messages.js",
        bowerDep + "/angular-material-data-table/dist/md-data-table.min.js",
        jsDir + "/main.js"
    ])
    .pipe(concat("main.js"))
    .pipe(gulp.dest(assetsDir + '/js'))
    .pipe(notify({ message: 'Scripts task complete', onLast: true}));
});

gulp.task('styles', function() {
    return gulp.src([
        bowerDep + "/angular-material/angular-material.css",
        bowerDep + "/angular-material-data-table/dist/md-data-table.min.css",
        cssDir + "/main.css"
    ])
    .pipe(cleanCss())
    .pipe(concat("main.css"))
    .pipe(gulp.dest(assetsDir + '/css'))
    .pipe(notify({ message: 'Styles task complete', onLast: true}));
});

gulp.task('images', function() {
    return gulp.src(imgDir + "/**/*")
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(assetsDir + '/img'))
    .pipe(notify({ message: 'Images task complete', onLast: true}));
});

gulp.task('templates', function() {
    return gulp.src(templateDir + '/**/*.html')
    .pipe(gulp.dest(publicDir + '/template'))
    .pipe(notify({message: 'Templates tast complete', onLast: true}));
});

gulp.task('htmls', function() {
    return gulp.src(clientDir + '/*.html')
    .pipe(gulp.dest(publicDir))
    .pipe(notify({message: 'HTMLs tast complete', onLast: true}));
});

gulp.task('build', ['clean'], function() {
    gulp.start('scripts', 'styles', 'images', 'templates', 'htmls');
});

gulp.task('watch', function() {
    gulp.watch(jsDir + '/**/*.js', ['scripts']);
    gulp.watch(bowerDep + '/**/*.js', ['scripts']);
    gulp.watch(cssDir + '/**/*.css', ['styles']);
    gulp.watch(bowerDep + '/**/*.css', ['styles']);
    gulp.watch(imgDir + '/**/*', ['images']);
    gulp.watch(templateDir + '/**/*.html', ['templates']);
    gulp.watch(clientDir + '/*.html', ['htmls']);
});

gulp.task('default', ['develop', 'build']);

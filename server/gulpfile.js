var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    zip = require('gulp-zip'),
    merge = require('merge-stream');

var clientDir = '../client';
var jsDir = clientDir + '/js';
var cssDir = clientDir + '/css';
var imgDir = clientDir + '/img';

var bowerDep = clientDir + "/bower_components";

var publicDir = 'public';
var assetsDir = publicDir + '/assets';

var targetDir = 'target';
var installedDir = targetDir + '/installed';

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

gulp.task('htmls', function() {
    return gulp.src(clientDir + '/*.html')
    .pipe(gulp.dest(publicDir))
    .pipe(notify({message: 'HTMLs tast complete', onLast: true}));
});

gulp.task('build', ['clean'], function() {
    gulp.start('scripts', 'styles', 'images', 'htmls');
});

gulp.task('clean-target', function() {
    return del([targetDir + '/*']);
});

gulp.task('install', ['clean-target'],function() {
    var publicDirPipe = gulp.src(publicDir + '/*')
        .pipe(gulp.dest(installedDir + '/public'));
    var mainJsPipe = gulp.src('main.js')
        .pipe(gulp.dest(installedDir));

    return merge(publicDirPipe, mainJsPipe);
});

gulp.task('deploy', ['install'], function() {
    return gulp.src([installedDir + '/**/*'])
        .pipe(zip('distribuition.zip'))
        .pipe(gulp.dest(targetDir))
        .pipe(notify({message: 'Deploy task finished', onLast: true}));
});

gulp.task('watch', function() {
    gulp.watch(jsDir + '/**/*.js', ['scripts']);
    gulp.watch(bowerDep + '/**/*.js', ['scripts']);
    gulp.watch(cssDir + '/**/*.css', ['styles']);
    gulp.watch(bowerDep + '/**/*.css', ['styles']);
    gulp.watch(imgDir + '/**/*', ['images']);
    gulp.watch(clientDir + '/*.html', ['htmls']);
});

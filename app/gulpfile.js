var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    zip = require('gulp-zip'),
    merge = require('merge-stream'),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon');

var clientDir = './client';
var jsDir = clientDir + '/js';
var cssDir = clientDir + '/css';
var imgDir = clientDir + '/img';
var templateDir = clientDir + '/template';
var tempDir = clientDir + "/tmp";

var bowerDep = "./bower_components";

var publicDir = 'public';
var assetsDir = publicDir + '/assets';

var node;

gulp.task('server', function () {
  nodemon({
      script: 'bin/www.coffee',
      ext: 'coffee',
      env: { 'NODE_ENV': 'development' },
      legacyWatch: false
    })
});

// Clean
gulp.task('clean', function() {
    return del([publicDir + "/*", "!" + publicDir + "/favicon.ico"]);
});

gulp.task('coffee', function() {
    return gulp.src(jsDir + '/**/*.coffee')
        .pipe(coffee({bare: false}).on('error', gutil.log))
        .pipe(gulp.dest(tempDir + '/js'));
});

gulp.task('scripts', ['coffee'], function() {
    return gulp.src([
        bowerDep + "/angular/angular.js",
        bowerDep + "/angular-resource/angular-resource.js",
        bowerDep + "/angular-aria/angular-aria.js",
        bowerDep + "/angular-animate/angular-animate.js",
        bowerDep + "/angular-material/angular-material.js",
        bowerDep + "/angular-messages/angular-messages.js",
        bowerDep + "/angular-material-data-table/dist/md-data-table.min.js",
        bowerDep + "/ngMask/dist/ngMask.min.js",
        bowerDep + "/angular-route/angular-route.min.js",
        tempDir + "/js/directives.js",
        tempDir + "/js/resources.js",
        tempDir + "/js/routes.js",
        tempDir + "/js/login.js",
        tempDir + "/js/controller/controller.js",
        tempDir + "/js/controller/user.js",
        tempDir + "/js/controller/config.js",
        tempDir + "/js/controller/toolbar-controller.js",
        tempDir + "/js/main.js"
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
    gulp.watch([jsDir + '/**/*.coffee', jsDir + '/**/*.js', bowerDep + '/**/*.js'], ['scripts']);
    gulp.watch([cssDir + '/**/*.css', bowerDep + '/**/*.css'], ['styles']);
    gulp.watch(imgDir + '/**/*', ['images']);
    gulp.watch(templateDir + '/**/*.html', ['templates']);
    gulp.watch(clientDir + '/*.html', ['htmls']);
});

gulp.task('default', ['build', 'server', 'watch']);

process.on('exit', function() {
    if (node) node.kill();
});

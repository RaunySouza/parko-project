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
    spawn = require('child_process').spawn;

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
  if (node) node.kill()
    node = spawn('npm', ['start'], {stdio: 'inherit'})
    node.on('close', function (code) {
      if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    });
});

// Clean
gulp.task('clean', function() {
    return del([publicDir + "/*"]);
});

gulp.task('coffee', function() {
  gulp.src(jsDir + '/*.coffee')
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
        jsDir + "/directives.js",
        jsDir + "/resources.js",
        tempDir + "/js/*.js",
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
    gulp.watch(jsDir + '/*.coffee', ['scripts']);
    gulp.watch(jsDir + '/**/*.js', ['scripts']);
    gulp.watch(bowerDep + '/**/*.js', ['scripts']);
    gulp.watch(cssDir + '/**/*.css', ['styles']);
    gulp.watch(bowerDep + '/**/*.css', ['styles']);
    gulp.watch(imgDir + '/**/*', ['images']);
    gulp.watch(templateDir + '/**/*.html', ['templates']);
    gulp.watch(clientDir + '/*.html', ['htmls']);
    gulp.watch(['controllers/**/*.js', 'models/**/*.js', 'modules/**/*.js', 'routes/**/*.js', 'app.js'], ['server']);
});

gulp.task('default', ['build', 'watch']);

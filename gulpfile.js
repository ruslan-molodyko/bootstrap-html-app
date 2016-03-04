/**
 * Created by admin on 04.03.2016.
 */
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    express = require('express'),
    serverport = 5000;

//We only configure the server here and start it only when running the watch task
var server = express();
server.use(express.static('./public'));

gulp.task('serve', function() {
    server.listen(serverport);
    livereload.listen();
});

gulp.task('scripts', function() {
    gulp.src(['src/script/**/*.js'])
        .pipe(browserify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/script'))
        .pipe(livereload());
});

gulp.task('styles', function() {
    gulp.src(['src/stylus/build.styl'])
        .pipe(stylus({compress : true}))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
});

gulp.task('jade', function() {
    var YOUR_LOCALS = {};
    gulp.src('./src/jade/pages/**/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(livereload());
});

gulp.task('default', ['serve', 'scripts', 'styles', 'jade'], function() {
    gulp.watch('src/script/**/**.js', ['scripts']);
    gulp.watch('src/stylus/**/*', ['styles']);
    gulp.watch('src/jade/**/*', ['jade']);
});

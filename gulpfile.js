'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nunjucks = require('gulp-nunjucks-html');
var browserSync = require('browser-sync');
var del = require('del');
var purify = require('gulp-purifycss');
var cleanCSS = require('gulp-clean-css');
var sassTildeImporter = require('node-sass-tilde-importer');

gulp.task('js', function () {
    var b = browserify({
        entries: './src/js/app.js',
        debug: false
    }).transform('babelify', { presets: ['es2015'] });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe( !gutil.env.production ? sourcemaps.init({ loadMaps: true }) : gutil.noop())
        .pipe( !!gutil.env.production ? uglify() : gutil.noop())
        .on('error', gutil.log)
        .pipe( !gutil.env.production ? sourcemaps.write('./') : gutil.noop())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/app.scss')
        .pipe( !gutil.env.production ? sourcemaps.init({ loadMaps: true }) : gutil.noop())
        .pipe(autoprefixer('last 3 versions'))
        .pipe(purify(['./src/js/**/*.js', './src/templates/**/*.html']))
        .pipe(sass({ importer: sassTildeImporter }).on('error', gutil.log))
        .pipe( !!gutil.env.production ? cleanCSS() : gutil.noop())
        .pipe( !gutil.env.production ? sourcemaps.write('./') : gutil.noop())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('./src/templates/*.html')
        .pipe(nunjucks({
            searchPaths: ['./src/templates']
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./dist'));
});

gulp.task('favicon', function() {
    return gulp.src('./src/favicon/**/*.*')
        .pipe(gulp.dest('./dist/favicon'));
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', function() {
    return gulp.src('./src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('clean', function() {
    return del.sync(['./dist']);
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('watch', function () {
    browserSync({
        server: './dist'
    });

    gulp.watch('./src/js/*.js', ['js', 'reload']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/templates/**/*.html', ['html', 'reload']);

    // gulp.watch('./src/favicon/**/*.*', ['favicon', 'reload']);
    // gulp.watch('./src/fonts/**/*.font', ['fonts', 'reload']);
    // gulp.watch('./src/images/**/*.+(png|jpg|jpeg|gif|svg)', ['images', 'reload']);
});

gulp.task('build', ['clean', 'html', 'js', 'sass', 'favicon', 'fonts', 'images']);

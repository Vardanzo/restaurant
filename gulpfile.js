const {series, parallel, task, dest, src} = require('gulp');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');

task('clean', function () {
    return src('./public/*', {read: false})
        .pipe(clean());
});

task('scripts', function() {
    return src('./src/scripts/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(dest('./public/scripts/'))

});

task('scss', function() {
    return src('./src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(dest('./public/styles/'));

});

task('pug', function() {
    return src('./src/pages/**/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(dest('./public/'));
});


exports.default=series('clean', parallel('scripts', 'scss', 'pug'));
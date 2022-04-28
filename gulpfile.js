const {series, watch, parallel, task, dest, src} = require('gulp');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

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
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(dest('./public/styles/'));

});

task('pug', function() {
    return src('./src/pages/**/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(dest('./public/'));
});

task( 'assets', function (){
   return src('./src/assets/**/*')
       .pipe(dest('./public/assets/'))
});

const build = series('clean', parallel('scripts', 'scss', 'pug', 'assets'))

task('dev', function() {
    browserSync.init({
        server: "./public"
    });
    watch(["src/styles/*.scss", "src/scripts/*.js", "src/**/*.pug"], build).on("change", browserSync.reload)
});

exports.build= build;
exports.dev=series(build, "dev");
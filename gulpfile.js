const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const webserver = require('gulp-webserver');
const del = require('del');
const cssHandle = function(){
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'));
}
const htmlHandle = function(){
    return gulp.src('./src/page/*.html')
    .pipe(htmlmin({
        removeAttributeQuotes :true,
        removeComments : true,
        removeEmptyAttributes :true,
        collapseBooleanAttributes : true,
        collapseWhitespace : true,
        minifyCSS : true,
        minifyJS : true
    }))
    .pipe(gulp.dest('./dist/page'));
}
const jsHandle  = function(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({presets:['@babel/preset-env']}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
}
const otherMove = function(){
    return gulp.src('./src/images/*.*')
    .pipe(gulp.dest('./dist/images'));
}
const delHandle = function(){
    return del(['./dist']);
}
const webserverHandle  = function(){
    return gulp.src('./dist')
    .pipe(webserver({
        host : '127.0.0.1',
        port : 8080,
        open : '.page/index.html',
        liverload : true
    }))
}
const watchHandle = function(){
    gulp.watch('./src/css/*.css');
    gulp.watch('./src/js/*.js');
    gulp.watch('./src/page/*.html');
    gulp.watch('./src/images/*.*');
}
module.exports.default = gulp.series(
    delHandle,
    gulp.parallel(cssHandle,htmlHandle,otherMove),
    webserverHandle,
    watchHandle
)

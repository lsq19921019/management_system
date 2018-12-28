﻿/*

1.js/css/html文件压缩

2.文件指纹

3.include

*/

var baseDir = "src/";

var gulp = require('gulp'),
    path = require('path'),
    fs = require('fs'),
    tap = require('gulp-tap'),
    filter = require('gulp-filter'),
    rev = require('gulp-rev-append'),
    include = require('gulp-file-include'),
    uglify = require('gulp-uglify'),
    //2018-12-08/author:liusiqi;
    // minifyCss = require('gulp-minify-css'),已经弃用,css压缩。
    minifyCss = require('gulp-clean-css'),
    minifyHtml = require('gulp-htmlmin'),
    rename = require("gulp-rename"),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    proxyMiddleware = require('http-proxy-middleware');
    var babel = require("gulp-babel");    // 用于ES6转化ES5

gulp.task('build', function () {

    // gulp.watch('src/js/**/*.js', ['toes5']);
    var jsFilter = filter('**/*.js', { restore: true }),
        cssFilter = filter('**/*.css', { restore: true }),
        htmlFilter = filter('**/*.html', { restore: true }),
        tempFilter = filter(baseDir + 'index.html', { restore: true });

    var options = {
        removeComments: true,                 //清除HTML注释
        collapseWhitespace: true,             //压缩HTML
        collapseBooleanAttributes: true,      //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,          //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,     //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,                       //压缩页面JS
        minifyCSS: true                       //压缩页面CSS
    };

    return gulp.src([baseDir + "**/*.*"])
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(minifyCss())
        .pipe(cssFilter.restore)
        .pipe(htmlFilter)
        .pipe(rev())
        .pipe(include())
        .pipe(minifyHtml(options))
        .pipe(htmlFilter.restore)
        .pipe(tempFilter)
        .pipe(rename(function (file) { file.extname }))
        .pipe(tempFilter.restore)
        .pipe(gulp.dest('dist/'));            //输出文件夹
});


// ES6转化为ES5
// 在命令行使用 gulp toes5 启动此任务
// gulp.task('js_main', ['uglify_check'], function(){
//     return gulp.src('./src/js/*.js')
//         .pipe(concat('main.min.js'))    // 合并文件并命名
//         .pipe(babel({                   // 编译es6语法
//             presets: ["@babel/env"],
//             plugins: []
//         }))                  
//         .pipe(gulpif(env==='build', uglify()))  // 判断是否压缩压缩js
//         .pipe(gulp.dest('./dist/js'));
// });
// var middleware = proxyMiddleware('/nw', {
//     target: 'http://test.h5.yzqianbao.com',
//     changeOrigin: true,
//     pathRewrite: {
//     '^/nw': ''
//     },
//     logLevel: 'debug'
// });
const proxy = proxyMiddleware('/nw', {target: 'http://test.h5.yzqianbao.com', changeOrigin: true});
const proxy1 = proxyMiddleware('/system', {target: 'http://test.h5.yzqianbao.com', changeOrigin: true});
gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: baseDir,
            middleware:[proxy,proxy1]
        },
        port:8050
    });

    gulp.watch([baseDir + "**/*.html", baseDir + "**/*.js", baseDir + "**/*.css"]).on('change', browserSync.reload);
});

gulp.task("clean", function() {
    del([
        "dist"
    ]).then()
})


gulp.task('default', function () {
    gulp.start(["build"]);
});

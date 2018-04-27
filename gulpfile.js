/**
 * Created by pl on 2018/4/25
 */

'use strict';

//先载入gulp包，gulp与Node.js一样是轻内核，靠的就是众多的API
var gulp = require('gulp');

/*
* 1.html文件压缩、复制
* */
var htmlmin = require('gulp-htmlmin');
//gulp.task注册一个任务
gulp.task('html', function() {
    // 任务代码放在这，当gulp执行这个任务时会自动执行该函数
    // console.log('Hello World!');
    // gulp.src取一个文件
    gulp.src('signin.html')
    //pipe管道，取到这个文件之后进行某些加工，就像流水线一样。
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        //dest，将文件输送到dist文件夹
        //reload通知所有的浏览器相关文件被改动，要么导致浏览器刷新，要么注入文件，实时更新改动
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/*
* 2.图片复制
* */
gulp.task('image',function () {
    gulp.src('images/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/*
* 3.scss文件编译、压缩、复制
* */
var sass = require('gulp-sass'); //编译sass文件
var autoprefixer = require('gulp-autoprefixer'); //自动添加css前缀
var cssnano = require('gulp-cssnano'); //压缩css文件
gulp.task('style',function () {
    gulp.src('css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/*
* 4.js文件合并、压缩、混淆、复制
*   concat 合并
*   uglify 压缩、混淆
* */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function () {
    gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/*
* 初始化文件服务器
* 监视html、css、js、图片等文件，发生改变执行相应的任务
* */
var browserSync = require('browser-sync').create(); //文件服务器
gulp.task('default',function () {
    //创建静态文件服务器
    browserSync.init({
        server: {
            baseDir: "./", //当前目录
            index: "signin.html" //默认打开文件
        }
    });
    //gulp.watch监视，当文件发生改变执行某些任务
    gulp.watch('signin.html',['html']);
    gulp.watch('images/*.*',['image']);
    gulp.watch('css/*.scss',['style']);
    gulp.watch('js/*.js',['script']);
});

//gulp自动化打包
var path = {
    input: {
        html: 'signin.html',
        css: 'css/*.scss',
        js: 'js/*.js',
        image: 'images/*',
        font: 'font/*'
    },
    output: {
        dist: 'dist'
    }
}
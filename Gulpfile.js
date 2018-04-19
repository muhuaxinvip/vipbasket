var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); 


gulp.task('css', function (callback) {
    $.runSequence('layer','lib','module','pages','js', callback);
});
gulp.task('layer',function() {
    gulp.src(["./src/scss/layer/*.scss"])
    .pipe($.sass())
    .pipe($.autoprefixer({ browsers: ['last 2 version','IE 9'] }))
    .pipe(gulp.dest('./dist/css/layer/'))
});
gulp.task('lib',function() {
    gulp.src(["./src/scss/lib/*.scss"])
    .pipe($.sass())
    .pipe($.autoprefixer({ browsers: ['last 2 version','IE 9'] }))
    .pipe(gulp.dest('./dist/css/lib/'))
});
gulp.task('module',function() {
    gulp.src(["./src/scss/module/*.scss"])
    .pipe($.sass())
    .pipe($.autoprefixer({ browsers: ['last 2 version','IE 9'] }))
    .pipe(gulp.dest('./dist/css/module/'))  
});
gulp.task('pages',function() {
//     gulp.src(["./src/scss/pages/weico-note.scss"])
    gulp.src(["./src/scss/pages/*.scss"])
    .pipe($.sass())
    .pipe($.autoprefixer({ browsers: ['last 2 version','IE 9'] }))
    .pipe(gulp.dest('./dist/css/pages/'))  
});
gulp.task('mincss',function() {
    gulp.src(["./dist/css/pages/vipbasket.css"])
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/pages/'))
});

// 合并、压缩js文件
gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe($.concat('combine.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function () {
    $.watch(['./src/scss/layer/*.scss','./src/scss/lib/*.scss', './src/scss/module/*.scss', './src/scss/pages/*.scss', './src/js/**/*.js'],$.batch(function (events, done) {
        gulp.start('css', done);
    }));
});

//生成字体
gulp.task('font', function() {
   gulp.src(['src/font/*.svg'])
    .pipe($.iconfont({
      fontName: 'weicofont', // required 
      appendCodepoints: true, // recommended option
      prependUnicode: true,
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      round : 10e0, //Path保留小数位（保留小数点一位）
      // descent: -212,  // ascent = fontHeight - descent.
      // fontHeight: 1024,
      // normalize:true
    }))
      .on('codepoints', function(codepoints, options) {
        // CSS templating, e.g. 
        console.log(codepoints, options);
      })
    .pipe(gulp.dest('dist/font/'));
});

// gulp.task('watch', function () {
//     $.watch(['./src/scss/lib/*.scss','./src/scss/module/*.scss','./src/scss/page/*.scss'],$.batch(function (events, done) {
//         gulp.start('css', done);
//     }));
// });
// gulp.task('sass', function () {
//     return gulp.src('./src/scss/*/*.scss')
//         .pipe($.sass().on('error', $.sass.logError))
//         .pipe(gulp.dest('./dist/css'));
// });
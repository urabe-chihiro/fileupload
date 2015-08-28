var gulp = require("gulp"),
    compass = require('gulp-compass'),
    plumber = require("gulp-plumber"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    ejs = require("gulp-ejs"),
    browser = require("browser-sync");

//server
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./",
            open: false
        }
    });
});

//compass
gulp.task('compass',function(){
  return gulp.src('src/scss/**/**.scss')
  .pipe(compass({
    config_file: 'config.rb',
    css: 'dist/',
    sass: 'src/scss/',
    sourcemap: true
  }))
  .pipe(browser.reload({stream:true}));
});

// autoprefixer
gulp.task('autoprefixer', function () {
    return gulp.src( ['assets/css/**/*.css', '!' + 'assets/css/lib/**/*.css'] ) // 読み込みファイル
    //return gulp.src( 'assets/css/**/*.css' )
    .pipe(autoprefixer({
        browsers: ['last 2 versions'] // 対象ブラウザの設定
    }))
    .pipe( gulp.dest( 'assets/css/' ) ); // 書き出しファイル
});

gulp.task('default',['server'],function(){
  gulp.watch('src/scss/**/*.scss', ['compass']);
  gulp.watch("./**/*.html").on("change", browser.reload);
  gulp.watch("src/js/**/*.js").on("change", browser.reload);
  //autoprefixer
  //gulp.watch(['assets/css/**/*.css'],['autoprefixer']);
});
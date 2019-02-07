const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const bs = require('browser-sync').create();
const connect = require('gulp-connect-php');

const baseDir = {
  srcStyles: ['example/assets/sass/style.scss'],
  distStyles: 'example/dist/css',
};

const sassOptions = {
  outputStyle: 'compressed'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions']
};

const plumberOptions = {
  errorHandler: notify.onError("Error: <%= error.message %>")
};

gulp.task('styles-min', () => {
  gulp.src(baseDir.srcStyles)
    .pipe(plumber(plumberOptions))
    .pipe(sassGlob())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cleanCss({}, function logStats(d) {
      console.log(`${d.name}: ${d.stats.originalSize}`);
      console.log(`${d.name}: ${d.stats.minifiedSize}`);
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(baseDir.distStyles))
    .pipe(bs.stream());
});

gulp.task('babel', () => {
  gulp.src('src/date-counter.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', () => {
  gulp.src('src/date-counter.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('connect', () => {
  connect.server({base:'./example', port:8555, keepalive:true});
});

gulp.task('bs', ['connect'], function() {
  bs.init({
      proxy:"localhost:8555",
      baseDir: "./example",
      open:true,
      notify:false
  });
});

// Server
gulp.task('watch', ['styles-min', 'babel', 'minify-js', 'bs'], () => {
  gulp.watch('example/assets/sass/**/*.scss', ['styles-min']);
  gulp.watch('src/*.js', ['babel', 'minify-js']);
  gulp.watch('dist/*.js').on('change', bs.reload);
  gulp.watch('example/*.php').on('change', bs.reload);
});

// Live server for development
gulp.task('default', ['watch']);


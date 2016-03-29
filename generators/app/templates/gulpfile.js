const gulp = require('gulp');
const php = require('gulp-connect-php');
// const gulpWatch = require('gulp-watch');
// const browserSync = require('browser-sync');

// var reload  = browserSync.reload;

// gulp.task('watch', function (){
//   gulp.watch(['**/*.php'], [reload]);
// });

gulp.task('php', function() {
  php.server({
    base: 'www',
    port: 3000,
    hostname: '0.0.0.0',
    keepalive: true
  });
});

// gulp.task('browser-sync',['php'], function() {
//   browserSync({
//     proxy: '127.0.0.1:3010',
//     port: 3000,
//     open: true,
//     notify: false
//   });
// });

gulp.task('default', ['php', 'watch']);

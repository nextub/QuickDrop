var gulp = require('gulp'),
  concat = require('gulp-concat')

// gulp.task('combine', function() {
//   gulp.src([
//     'public/lib/angular/angular.min.js',
//     'public/lib/angular-ui-router/angular-ui-router.min.js',
//     'public/lib/bootstrap/bootstrap.min.js'
//   ])
//   .pipe(concat('bundle.js'))
//   .pipe(gulp.dest('public/'));
// });

gulp.task('templates', function() {
  gulp.src('app/templates/**/*').pipe(gulp.dest('www/templates'));
});

gulp.task('minify', function() {
  gulp.src([
      'app/*.js',
      'app/services/*.js',
      'app/factories/*.js',
      'app/filters/*.js',
      'app/directives/*.js',
      'app/controllers/*.js',
      'app/configs/*.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('www/'));
});


gulp.task('watch', ['minify', 'templates'], function() {
  gulp.watch([
    'app/**/*.js',
    'app/*.js'
  ],[
    'minify'
  ]);
  gulp.watch([
    'app/templates/**/*',
    'app/templates/*'
  ],[
    'templates'
  ]);
});


gulp.task('default', ['watch']);

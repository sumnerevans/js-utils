const codecov = require('gulp-codecov');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('istanbul', () =>
  gulp.src('[!gulpfile]*.js')
  .pipe(istanbul({
    includeUntested: true,
  }))
  .pipe(istanbul.hookRequire())
);

gulp.task('test', ['istanbul'], () =>
  gulp.src('test/*.js')
  .pipe(mocha())
  .pipe(istanbul.writeReports())
  .pipe(istanbul.enforceThresholds({
    thresholds: {
      global: 90,
    },
  }))
);

gulp.task('codecov', ['test'], () =>
  gulp.src('./coverage/lcov.info')
  .pipe(codecov())
);

const codecov = require('gulp-codecov');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('test', () =>
  gulp.src(['*.js'])
  .pipe(istanbul({
    includeUntested: true,
  }))
  .on('finish', () =>
    gulp.src('test/**/*.js')
    .pipe(mocha({
      reporter: 'spec',
    }))
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: ['lcov'],
      reportOpts: {
        dir: './coverage'
      }
    }))
  )
);

gulp.task('codecov', ['test'], () =>
  gulp.src(['./coverage/lcov.info'])
  .pipe(codecov())
);

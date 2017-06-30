const codecov = require('gulp-codecov');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

const config = {
  warningThreshold: 10,
  src: {
    js: '[!gulpfile]*.js',
    tests: 'test/*.js',
    codecov: 'coverage/lcov.info',
  },
};

gulp.task('istanbul', () =>
  gulp.src(config.src.js)
    .pipe(istanbul({
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire())
);

gulp.task('lint', () =>
  gulp.src([config.src.js, config.src.tests])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.results(results => {
      if(results.warningCount > config.warningThreshold) {
        throw new Error(
          'ESLint: Warning count too high\n' +
          `Warning count must be under ${config.warningThreshold}\n` +
          `Saw ${results.warningCount} warnings.`
        );
      }
    }))
    .pipe(eslint.failAfterError())
);

gulp.task('test', ['lint', 'istanbul'], () =>
  gulp.src(config.src.tests)
    .pipe(mocha())
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    })
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
);

gulp.task('codecov', ['test'], () =>
  gulp.src(config.src.codecov)
    .pipe(codecov())
);

gulp.task('default', ['lint', 'test']);

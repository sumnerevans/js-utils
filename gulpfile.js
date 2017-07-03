const codecov = require('gulp-codecov');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

const config = {
  linterWarningThreshold: 10,
  src: {
    js: '[!gulpfile]*.js',
    tests: 'test/*.js',
    codecov: './coverage/lcov.info',
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
      if (results.warningCount > config.linterWarningThreshold) {
        throw new Error(
          'ESLint: Warning count too high\n' +
          `Warning count must be under ${config.linterWarningThreshold}\n` +
          `Saw ${results.warningCount} warnings.`
        );
      }
    }))
    .pipe(eslint.failAfterError())
    .once('error', () => process.exit(1))
);

gulp.task('test', ['istanbul'], () =>
  gulp.src(config.src.tests)
    .pipe(mocha())
    .once('error', () => process.exit(1))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
);

gulp.task('codecov', ['lint', 'test'], () =>
  gulp.src(config.src.codecov)
    .pipe(codecov())
);

gulp.task('default', ['lint', 'test']);

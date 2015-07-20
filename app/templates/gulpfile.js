var gulp = require('gulp');
var gutil = require('gulp-util');
var sh = require('shelljs');

gulp.task('default', ['serve']);

gulp.task('serve', ['ionic-check'], function(done) {
  sh.exec('ionic serve');
});

gulp.task('serve:ios', ['ionic-check'], function(done) {
  sh.exec('ionic emulate ios', function() {
    done();     
  });
});

gulp.task('platform:ios', ['ionic-check'], function(done) {
  sh.exec('ionic state restore', function() {
    sh.exec('ionic platform add ios', function() {
      done();     
    });
  });
});

gulp.task('build:ios', ['ionic-check'], function(done) {
  sh.exec('ionic build ios', function() {
    done();     
  });
});

gulp.task('platform:android', ['ionic-check'], function(done) {
  sh.exec('ionic state restore', function() {
    sh.exec('ionic platform add android', function() {
      done();     
    });
  });
});

gulp.task('serve:android', ['ionic-check'], function(done) {
  sh.exec('ionic emulate android', function() {
    done();     
  });
});

gulp.task('build:android', ['ionic-check'], function(done) {
  sh.exec('ionic build android', function() {
    done();     
  });
});

gulp.task('ionic-check', function(done) {
  if (!sh.which('ionic')) {
    console.log(
      '  ' + gutil.colors.red('Ionic is not installed.'),
      '\n  Ionic CLI is required to start, build, run, and emulate Ionic apps. ',
      '\n  Install it with npm:', gutil.colors.cyan('npm install -g ionic') + '.',
      '\n  Once Ionic CLI is installed, run the last command again.'
    );
    process.exit(1);
  }
  done();
});

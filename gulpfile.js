const eslint = require('gulp-eslint');
const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');

const pkg = require('./package.json');
const course = require('./course.json');

const expectRules = { errorOnFailure: true };
const paths = {
  jsAll: ['*.js', 'src/*.js', 'src/js/**/*.js', 'src/test/**/*.js'],
  jsPublic: ['src/js/**/*.js'],
  jsNotTeacherFiles: ['!src/js/**/*.teacher.js'],
  jsTests: ['src/test/**/*.js'],
};
const plugins = loadPlugins({ camelize: true });
const DESTINATION_FOLDER = 'public/';

gulp.task('build', () => {
  let bundleFiles = paths.jsPublic;
  const newFilename = 'critical';

  if (course.isTeacher === 'false') {
    bundleFiles = bundleFiles.concat(paths.jsNotTeacherFiles);
  }

  return gulp.src(bundleFiles)
    .pipe(plugins.expectFile(expectRules, bundleFiles))
    .pipe(plugins.concat(`${newFilename}.js`))
    .pipe(gulp.dest(`${DESTINATION_FOLDER}js`))
    .pipe(plugins.expectFile(expectRules, `${DESTINATION_FOLDER}js/${newFilename}.js`));
});

gulp.task('lint', () => {
  let jsFiles = paths.jsAll;

  if (course.isTeacher === 'false') {
    jsFiles = jsFiles.concat(paths.jsNotTeacherFiles);
  }

  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], () => {
  const testFiles = paths.jsTests;

  return gulp.src(testFiles, { read: false })
    .pipe(plugins.expectFile(expectRules, testFiles))
    .pipe(plugins.mocha({ reporter: 'nyan' }));
});

function watch(entry) {
  const path = entry || pkg.main;
  plugins.developServer.listen({ path });
  return gulp.watch(paths.jsAll, () => {
    gulp.start('test');
    gulp.start('build');
    plugins.developServer.restart();
  });
}

gulp.task('dev', () => watch());
gulp.task('dev:student', () => watch('app-student'));

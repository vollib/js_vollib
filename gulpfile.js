var gulp = require('gulp');
var coffee = require('gulp-coffee');
var qunit = require('gulp-qunit');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('clean', function (done) {
    require('del')([
        'build',
        'src/coffee/js_vollib.coffee'
    ]).then(function () {
        done();
    });
});

gulp.task('lint', function () {
    return gulp.src([
        'gulpfile.js',
        'src/js/**/*.js',
        'test/**/*.js'
    ]).pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('coffee', function () {
    return gulp.src('src/coffee/**/*.coffee')
        .pipe(coffee({bare: false}))
        .pipe(gulp.dest('build'));
});

gulp.task('qunit', function () {
    return gulp.src('test/**/test_runner.html')
        .pipe(qunit());
});

gulp.task('concat', function () {
    return gulp.src([
        'build/js_vollib/js_vollib.js',
        'build/js_vollib/helpers/helpers.js',
        'build/js_vollib/helpers/*.js',
        'build/js_vollib/black/*.js',
        'build/js_vollib/black_scholes/*.js',
        'build/js_vollib/black_scholes_merton/*.js',
        'build/js_vollib/js_ref/js_ref.js',
        'build/js_vollib/js_ref/black/*.js',
        'build/js_vollib/js_ref/black_scholes/*.js',
        'build/js_vollib/js_ref/black_scholes_merton/*.js',
        'build/js_vollib/js_ref/black/greeks/greeks.js',
        'build/js_vollib/js_ref/black/greeks/*.js',
        'build/js_vollib/js_ref/black_scholes/greeks/greeks.js',
        'build/js_vollib/js_ref/black_scholes/greeks/*.js',
        'build/js_vollib/js_ref/black_scholes_merton/greeks/greeks.js',
        'build/js_vollib/js_ref/black_scholes_merton/greeks/*.js',
        'build/js_vollib/black/greeks/greeks.js',
        'build/js_vollib/black/greeks/*.js',
        'build/js_vollib/black_scholes/greeks/greeks.js',
        'build/js_vollib/black_scholes/greeks/*.js',
        'build/js_vollib/black_scholes_merton/greeks/greeks.js',
        'build/js_vollib/black_scholes_merton/greeks/*.js'
    ])
        .pipe(concat('js_vollib.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('clean-test', function (done) {
    require('del')([
        'test/build'
    ]).then(function () {
        done();
    });
});

gulp.task('concat-test', function () {
    return gulp.src('test/js_vollib/**/*.js')
        .pipe(concat('test_all.js'))
        .pipe(gulp.dest('test/build'));
});


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('build', function (done) {
    runSequence(
        'clean',
        'coffee',
        'concat',
        'check',
        done);
});

gulp.task('check', function (done) {
    runSequence(
        'clean-test',
        'concat-test',
        'lint',
        'qunit',
        done);
});

gulp.task('default', ['build']);

gulp.task('test', ['check']);

var gulp = require('gulp'),
    less = require('gulp-less'),
    open = require('gulp-open'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    livereload = require('gulp-livereload'),
    ngConstant = require('gulp-ng-constant'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber'),
    packagejson = require('./package.json');


gulp.task('scripts', function () {
  var baseDir = __dirname + '/app/js',
    outputDir = __dirname + '/build/js',
    outputFilename = 'app.js';

  gulp.src([
    baseDir + "/*module.js",
    baseDir + "/**/*module.js",
    baseDir + "/**/*.js"
  ])

  .pipe(sourcemaps.init())
  .pipe(concat(outputFilename))
  .pipe(ngAnnotate())
  //.pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(outputDir));
});


gulp.task('js-deps', function () {
  gulp.src([
    './node_modules/lodash/lodash.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
    './node_modules/moment/min/moment.min.js',
    './node_modules/angular/angular.js',
    './node_modules/angular-sanitize/angular-sanitize.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './node_modules/angular-animate/angular-animate.js',
    './node_modules/angular-aria/angular-aria.min.js',
    './node_modules/angular-messages/angular-messages.min.js',
    './node_modules/ngstorage/ngStorage.min.js',
    './node_modules/angular-material/angular-material.min.js',
    './modules/s3.usStates.js',
    './node_modules/angular-jwt/dist/angular-jwt.js',
    './node_modules/screenfull/dist/screenfull.js',
    './node_modules/moment-timezone/builds/moment-timezone-with-data.min.js',
    './node_modules/ng-mask/dist/ngMask.min.js',
    './node_modules/moment-range/dist/moment-range.min.js'
  ])
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('./build/js'));
});


gulp.task('css-deps', function () {
  gulp.src([
      './node_modules/angular-material/angular-material.min.css',
      './node_modules/material-design-iconfont/style.css'
    ])
    .pipe(concat('deps.css'))
    .pipe(gulp.dest('./build/css'));
  gulp.src([
    ])
    .pipe(gulp.dest('./build/font'));
});


gulp.task('templates', function () {
  gulp.src('./app/js/**/*.html')
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload());
});


gulp.task('less', function () {
  gulp.src([
      './app/less/*.less',
    ])
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/css'));
});


gulp.task('copy-index', function () {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./build'));
});


gulp.task('resource-deps', function(){
  gulp.src([
    './app/public/*.*',
    './app/public/img/*.*'
  ]).pipe(gulp.dest('./build/imgs'));
  gulp.src([
    './app/public/font/*/*.*'
  ]).pipe(gulp.dest('./build/font'));
});

gulp.task('constants', function() {
  var myConfig = require('./ng-config.json');
  var envConfig = myConfig[process.env.NG_ENV];
  console.log(myConfig);
  return ngConstant({
    name: 'elf.env',
    constants: envConfig,
    stream: true,
  })
  .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function () {
  gulp.watch([
    './build/**/*.js',
    './build/**/*.css',
    './build/**/*.html'
  ], function (event) {
    return gulp.src(event.path)
      .pipe(livereload());
  });

  gulp.watch(['app/js/*.js', 'app/js/**/*.js'], ['scripts']);
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/js/**/*.html', ['templates']);
  gulp.watch('app/index.html', ['copy-index']);
});

gulp.task('serve', function () {
  var _static = require('node-static'),
    file = new _static.Server('./build', {cache: false});

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      file.serve(request, response);
    }).resume();
  }).listen(5000);
  livereload.listen();
});


// General build
gulp.task('default', [
  'scripts',
  'js-deps',
  'css-deps',
  'templates',
  'less',
  'copy-index',
  'resource-deps',
  'constants'
]);

// Dev build
gulp.task('dev', ['default', 'watch', 'serve']);
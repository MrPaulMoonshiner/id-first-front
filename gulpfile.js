
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reloadd      = browserSync.reload;
var scss         = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });


    gulp.watch("*.html").on("change", reloadd);
    gulp.watch("css/*.css").on("change", reloadd);
});

gulp.task('scss', function() {
    return gulp.src('*.scss')
        .pipe(scss())
        .pipe(cssnano())
        // .pipe(rename({suffix: '.min'}))
        // .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.watch('*.scss', gulp.parallel('scss'));
gulp.task('default', gulp.parallel('scss', 'serve'));
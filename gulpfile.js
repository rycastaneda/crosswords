var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

gulp.task('compilesass', function() {
    // root SASS file (contains all your includes)
    return gulp.src('./sass/index.scss')
        // compile SASS to CSS
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // add vendor prefixes
        .pipe(autoprefixer())
        // change the file name to be a liquid file
        .pipe(concat('theme2.scss.liquid'))
        // remove the extra set of quotations used for escaping the liquid string
        .pipe(replace('"{{', '{{'))
        .pipe(replace('}}"', '}}'))
        // save the file to the theme assets directory
        .pipe(gulp.dest('./assets/'));
});

gulp.task('default', function() {
    // watch all SASS (.scss) files
    gulp.watch(['./sass/**/*.scss'], ['compilesass']);
});
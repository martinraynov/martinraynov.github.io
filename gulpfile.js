var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var cp = require('child_process');
var browserSync = require('browser-sync');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll and page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['sass', 'img', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});

// Production build task
gulp.task('build', ['sass', 'img', 'jekyll-build', 'css-minify']);

// Compile files
gulp.task('sass', function () {
    return gulp.src('assets/css/scss/main.scss')
        .pipe(sass({
            outputStyle: 'expanded', // Keep expanded for development
            onError: browserSync.notify
        }))
        .pipe(prefix({
            browsers: ['> 1%', 'last 2 versions', 'not dead', 'not ie <= 11'],
            cascade: false
        }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

// Minify CSS for production
gulp.task('css-minify', function () {
    return gulp.src('assets/css/main.css')
        .pipe(cleanCSS({
            compatibility: 'ie8',
            level: 2
        }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(gulp.dest('assets/css'));
});

// Compression images
gulp.task('img', function() {
	return gulp.src('assets/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
    .pipe(gulp.dest('_site/assets/img'))
    .pipe(browserSync.reload({stream:true}));
});

// Watch scss, html, img files
gulp.task('watch', function () {
    gulp.watch('assets/css/scss/**/*.scss', ['sass']);
    gulp.watch('assets/js/**/*.js', ['jekyll-rebuild']);
    gulp.watch('assets/img/**/*', ['img']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], ['jekyll-rebuild']);
});

//  Default task
gulp.task('default', ['browser-sync', 'watch']);

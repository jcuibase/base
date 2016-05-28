var gulp 		= require('gulp'),
	uglify 		= require('gulp-uglify'),
	autoprefixer= require('gulp-autoprefixer'),
	sass 		= require('gulp-sass'),
	plumber   	= require('gulp-plumber');		//防止编译错误后，watch函数不在执行

gulp.task('minifyjs', function() {
	return gulp.src('./javascript/*.js')
		.pipe(uglify()) //压缩
		.pipe(gulp.dest('./minified/js')); //输出
});



gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
		//https://github.com/sass/node-sass#options
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({//参数详见https://github.com/postcss/autoprefixer#options
			browsers: [
		    'last 2 versions',
		    'safari 5',
		    'ie 8',
		    'ie 9',
		    'opera 12.1',
		  ],
		  cascade: false
		}))
		.pipe(gulp.dest('./minified/css'));
});

gulp.task('sass:watch', function() {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['minifyjs','sass','sass:watch']);
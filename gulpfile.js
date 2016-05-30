'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'), //语法检查
	uglify = require('gulp-uglify'), //压缩JS
	concat = require('gulp-concat'), //合并文件
	autoprefixer = require('gulp-autoprefixer'), //自动添加css 厂商前缀
	cssmin = require('gulp-minify-css'), //压缩CSS
	imagemin = require('gulp-imagemin'), //压缩图片

	sequence = require('gulp-sequence'), //任务队列-控制人物执行顺序
	stylish = require('jshint-stylish'), //jshint检查输出函数
	rev = require('gulp-rev'), //生成资源的json文件
	collector = require('gulp-rev-collector'), //替换所有的引用
	clean = require('gulp-clean'), //清空文件
	rename = require('gulp-rename'), //文件重命名
	plumber = require('gulp-plumber'); //防止编译错误后，watch函数不在执行


var filePath = {
	inPath: {
		js: './js/**/*.js',
		css: './css/**/*.css',
		image: './images/*',
		html: './html/**/*.html',
		fonts: './fonts/*'
	},
	outPath: {
		js: './dist/js',
		css: './dist/css',
		image: './dist/images',
		html: './dist/html',
		fonts: './dist/fonts'
	},
	revPath: {
		basePath: './dist/rev/**/*.json',
		js: './dist/rev/js',
		css: './dist/rev/css',
		image: './dist/rev/image',
		fonts: './dist/rev/fonts'
	}
};

//检查并且压缩js
gulp.task('jshint', function() {
	return gulp.src(filePath.inPath.js)
		.pipe(plumber())
		.pipe(jshint()) //语法检查
		.pipe(jshint.reporter(stylish)) //检查结果输出
		.pipe(gulp.dest(filePath.outPath.js))
		.pipe(uglify()) //压缩
		.pipe(rename(function(path) {
			path.basename += ".min";
			path.extname = ".js";
		}))
		.pipe(gulp.dest(filePath.outPath.js));
});
//压缩css
gulp.task('minifycss', function() {
	return gulp.src(filePath.inPath.css)
		.pipe(cssmin())
		.pipe(gulp.dest(filePath.outPath.css));
});
//压缩图片
gulp.task('minifyimage', function() {
	return gulp.src(filePath.inPath.image)
		.pipe(imagemin())
		.pipe(gulp.dest(filePath.outPath.image));
});
//合并js
gulp.task('concatjs', function() {
	return gulp.src(filePath.inPath.js)
		//向下面这样可以指定合并文件的顺序
		//gulp.src(['./js/app.js', './js/a.js' , './js/b.js'])
		.pipe(concat('all.js')) //压缩
		.pipe(gulp.dest(filePath.outPath.js + '/all'))
		.pipe(uglify())
		.pipe(rename(function(path) {
			path.dirname += "/all";
			path.basename += ".min";
			path.extname = ".js";
		}))
		.pipe(gulp.dest(filePath.outPath.js));
});

//根据文件的hash码，生成资源文件
gulp.task('revjs', function() {
	return gulp.src(filePath.outPath.js + '/**/*.js')
		.pipe(rev())
		.pipe(rev.manifest())
		.pipe(gulp.dest(filePath.revPath.js));
});
gulp.task('revcss', function() {
	return gulp.src(filePath.outPath.css + '/**/*.css')
		.pipe(rev())
		.pipe(rev.manifest())
		.pipe(gulp.dest(filePath.revPath.css));
});
gulp.task('revimage', function() {
	return gulp.src(filePath.outPath.image + '/*')
		.pipe(rev())
		.pipe(rev.manifest())
		.pipe(gulp.dest(filePath.revPath.image));
});

//替换引用文件路径
gulp.task('revCollHtml', function() {
	return gulp.src([filePath.revPath.basePath, filePath.inPath.html])
		.pipe(collector({
			replaceReved: true,
		}))
		.pipe(gulp.dest(filePath.outPath.html));
});

//替换引用img路径
gulp.task('revCollCss', function() {
	return gulp.src([filePath.revPath.basePath, filePath.outPath.css + '/**/*.css'])
		.pipe(collector())
		.pipe(gulp.dest(filePath.outPath.css));
});
//输出字体文件
gulp.task('outfonts', function() {
	return gulp.src(filePath.inPath.fonts)
		.pipe(gulp.dest(filePath.outPath.fonts));
});

//清空所有已输出文件，避免文件缓存
gulp.task('clean', function() {
	return gulp.src('./dist', {
			read: false
		})
		.pipe(clean());
});
//清空rev
gulp.task('cleanRev', function() {
	return gulp.src('./dist/rev', {
			read: false
		})
		.pipe(clean());
});
//清空已压缩的文件
gulp.task('cleanMin', function() {
	return gulp.src('./dist/+(js|css)', {
			read: false
		})
		.pipe(clean());
});

//定义任务
gulp.task('sequence_all',
	sequence(
		['clean'], ['outfonts'], ['jshint', 'minifyimage', 'minifycss'], ['concatjs'], ['revjs', 'revcss', 'revimage'], ['revCollHtml', 'revCollCss']
	)
);

gulp.task('sequence_rev',
	sequence(
		['cleanRev'], ['revjs', 'revcss', 'revimage'], ['revCollHtml', 'revCollCss']
	)
);

gulp.task('sequence_min',
	sequence(
		['cleanMin'], ['jshint', 'minifyimage', 'minifycss'], ['concatjs']
	)
);

//执行全部
gulp.task('build', ['sequence_all']);
//执行添加版本号码
gulp.task('revFile', ['sequence_rev']);
//压缩js
gulp.task('min', ['sequence_min']);
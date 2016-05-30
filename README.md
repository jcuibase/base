# framework
前端基础构建框架，主要实现功能
压缩JS、CSS、图片
为文件添加版本号

## 执行添加版本号

```
$ gulp revFile
```

## 执行语法检查、压缩js、css
```
$ gulp min
```

## 执行自动化构建全部方法

```
$ gulp build
```

## 语法检查、压缩js、css 任务代码

```js
gulp.task('jshint', function() {
	return gulp.src(filePath.inPath.js)
		.pipe(plumber())				//添加一个流，避免语法检查出错时程序不向下执行
		.pipe(jshint()) 				//语法检查
		.pipe(jshint.reporter(stylish)) //检查结果输出
		.pipe(gulp.dest(filePath.outPath.js))
		.pipe(uglify()) 				//压缩
		.pipe(rename(function(path) {	//压缩后文件更改为min
			path.basename += ".min";
			path.extname = ".js";
		}))
		.pipe(gulp.dest(filePath.outPath.js)); //指定输出
});
```
## gulp所需要依赖的插件

- [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace) - Rewrite occurences of filenames which have been renamed
- [gulp-rev-css-url](https://github.com/galkinrost/gulp-rev-css-url) - Override URLs in CSS files with the revved ones
- [gulp-rev-outdated](https://github.com/shonny-ua/gulp-rev-outdated) - Old static asset revision files filter
- [gulp-rev-collector](https://github.com/shonny-ua/gulp-rev-collector) - Static asset revision data collector
- [rev-del](https://github.com/callumacrae/rev-del) - Delete old unused assets
- [gulp-rev-delete-original](https://github.com/nib-health-funds/gulp-rev-delete-original) - Delete original files after rev
- [gulp-rev-loader](https://github.com/adjavaherian/gulp-rev-loader) - Use rev-manifest with webpack

## License

MIT © [嘉诚信息](http://www.jiachengnet.com/)


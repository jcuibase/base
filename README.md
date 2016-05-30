# framework
前端基础构建框架，主要实现功能
压缩JS、CSS、图片
为文件添加版本号

#### 开始使用时，第一步：在项目的根目录下执行下面命令安装所有插件

```
$ npm install
```

#### 因插件已有功能是将版本号追加到文件名称上，如：

```html
<!-- 插件已有版本号追加方式 -->
<script type="text/javascript" src="../js/app-b6a3ad0a4b.js"></script>
<!-- 更改后 -->
<script type="text/javascript" src="../js/app.js?v=b6a3ad0a4b"></script>
```

#### 所以需要更改一下添加版本号插件
```js
//node_modules\gulp-rev\index.js 	第143行 
manifest[originalFile] = revisionedFile; 
//更新为: 
manifest[originalFile] = originalFile + '?v=' + file.revHash;


//nodemodules\gulp-rev\nodemodules\rev-path\index.js 	第10行
return filename + '-' + hash + ext; 
//更新为: 
return filename + ext;

//node_modules\gulp-rev-collector\index.js 	第31行
if ( path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !== path.basename(key) ) { 
//更新为: 
if ( path.basename(json[key]).split('?')[0] !== path.basename(key) ) {


//node_modules\gulp-rev-collector\index.js 	第105行
regexp: new RegExp( pattern, 'g' ),
//更新为: 
regexp: new RegExp('('+pattern+'\\?v\\=\\w{10}'+'\|'+pattern+')', 'g'),
```
#### 安装插件更改完成后就可以执行下面的命令编译工程了。

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

- [gulp-uglify](https://www.npmjs.com/search?q=gulp-uglify) - 压缩js
- [gulp-autoprefixer](https://github.com/postcss/autoprefixer#options) - 自动处理浏览器前缀
- [gulp-minify-css](https://www.npmjs.com/search?q=gulp-minify-css) - 压缩css
- [gulp-imagemin](https://www.npmjs.com/search?q=gulp-imagemin) - 压缩图片
- [gulp-jshint](https://www.npmjs.com/search?q=gulp-jshint) - 语法检查
- [gulp-clean](https://www.npmjs.com/search?q=gulp-clean) - 删除文件，避免缓存
- [gulp-concat](https://www.npmjs.com/search?q=gulp-concat) - 合并文件
- [gulp-rev-collector](https://www.npmjs.com/search?q=gulp-rev-collector) - 添加文件版本号
- [gulp-sequence](https://www.npmjs.com/search?q=gulp-sequence) - 任务队列，控制任务执行顺序
- [gulp-rename](https://www.npmjs.com/search?q=gulp-rename) - 更改文件名称

## License

MIT © [嘉诚信息](http://www.jiachengnet.com/)


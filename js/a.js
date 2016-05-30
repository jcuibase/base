'use strict';

var A = function(){
	Base.call(this);
}

var getName = 'name';

A.prototype = {
	__proto__ : Base.prototype,
	constructor : A,
	setName : function(name){
		this.name = name || 'A';
	}
}

var obj = new A();
console.log('a.js  输出：' + obj.getName());
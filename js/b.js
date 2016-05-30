'use strict';

var B = function(){}

B.prototype = new Base();

B.prototype.setName = function(name){
	this.name = name || 'B';
}


var bobj = new B();
console.log('b.js  输出：' + bobj.getName());
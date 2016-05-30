'use strict';

var Base = function(name){
	this.name = name || 'Base';
}

Base.prototype = {
	getName : function(){
		return this.name;
	},
	setName : function(name){
		this.name = name;
	}
}
var Base = function(){}

Base.prototype = {
	name : 'gezg',
	getName : function(){
		this.name;
	},
	setName : function(name){
		this.name = name;
	}
}

var base = new Base();

console.log(base.getName());
base.setName('gejunyi');
console.log(base.getName());
/* S for JS
Made by SciPred, 2019. FTU.
Use only for shortcuts and to shorten code length. Obviously!
Introduces new stuff!
Needs Object.assign and Object.defineProperty to work.
*/

if ( Object.assign === undefined ) {
	// Missing in IE
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	( function () {
		Object.assign = function ( target ) {
			if ( target === undefined || target === null ) {
				throw new TypeError( 'Cannot convert undefined or null to object' );
			}
			var output = Object( target );
			for ( var index = 1; index < arguments.length; index ++ ) {
				var source = arguments[ index ];
				if ( source !== undefined && source !== null ) {
					for ( var nextKey in source ) {
						if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {
							output[ nextKey ] = source[ nextKey ];
						}
					}
				}
			}
			return output;
		};
	} )();
}

var S = function(selectors) {
	return document.querySelector(selectors);
};

//NEWCONS
S.Set = function() {
	this.items = [];
};
Object.assign(S.Set.prototype, {
	add: function(set) {
		for (var i=0; i<set.items.length; i++) {
			this.items.push(set.items[i]);
		}
		return this;
	},
	contains: function(item) {
		for (var i=0; i<this.items.length; i++) {
			if (this.items[i] === item) {return true}
		}
		return false;
	},
	empty: function() {
		this.items = [];
		return this;
	},
	intersection: function(set, toNewSet) {
		let a = new this.constructor();
		for (var i=0; i<set.items.length; i++) {
			if (this.contains(set.items[i])) {a.items.push(set.items[i])}
		}
		if (toNewSet) {return a} else {this.items = a.items}
		return this;
	},
	push: function(...items) {
		for (var i=0; i<arguments.length; i++) {
			this.items.push(arguments[i]);
		}
		return this;
	},
	reverse: function() {
		var arr = [];
		for (var i=this.items.length-1; i>-1; i--) {
			arr.push(this.items[i]);
		}
		this.items = arr;
		return this;
	},
	union: function(set, toNewSet) {
		var it = this.items;
		let a = new this.constructor();
		if (toNewSet) {it = a.items;}
		for (var i=0; i<set.items.length; i++) {
			if (!(this.contains(set.items[i]))) {it.push(set.items[i])}
		}
		return it;
	}
});
Object.defineProperty(S.Set.prototype, 'length', {
	get: function() {
		return this.items.length;
	}
});



//NEWELMFUNCS
S.List = function(listItemsArray) {
	this.items = listItemsArray || [];
	this.type = "ul";
};
Object.assign(S.List.prototype, {
	add: function(elementsArray) {
		for (var i=0; i<elementsArray.length; i++) {
			this.items.push(elementsArray[i]);
		}
		return this;
	},
	createList: function() {
		var list = document.createElement(this.type);
		for (var i=0; i<this.items.length; i++) {
			var elm = document.createElement("li");
			elm.innerHTML = this.items[i];
			list.appendChild(elm);
		}
		document.body.appendChild(list);
		return list;
	},
	push: function(...elements) {
		for (var i=0; i<arguments.length; i++) {
			this.items.push(arguments[i]);
		}
		return this;
	},
	toOl: function() {
		this.type = "ol";
		return this;
	},
	toUl: function() {
		this.type = "ul";
		return this;
	}
});



//ELM
S.Element = {
	defBG: function(elm) {elm.style.background = "white"},
	defCol: function(elm) {elm.style.color = "#000000"},
	pos: function(elm, postype) {elm.style.position = postype},
	posAbs: function(elm) {elm.style.position = "absolute"},
	posFixed: function(elm) {elm.style.position = "fixed"},
	posRel: function(elm) {elm.style.position = "relative"},
	posStick: function(elm) {elm.style.position = "sticky"},
	toLB: function(elm) {elm.style.left = 0; elm.style.bottom = 0},
	toLT: function(elm) {elm.style.left = 0; elm.style.top = 0},
	toRB: function(elm) {elm.style.right = 0; elm.style.bottom = 0},
	toRT: function(elm) {elm.style.right = 0; elm.style.top = 0}
};
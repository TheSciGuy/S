/* S for JS
Made by SciPred, 2019. FTU.
Use only for shortcuts and to shorten code length. Obviously!
Introduces new stuff!
Needs Object.assign and Object.defineProperty to work.
Object.assign is automatically set if undefined.
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
	if (typeof selectors !== "object" && selectors.length !== undefined) {return [selectors]}
	return document.querySelector(selectors);
};

//NEWSELFCONS
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



//NEWELMNONCONSFUNCS
S.getMain = function() {return document.body};
S.toggleDisplay = function(elm, customBlockDisplay) {
	var c = customBlockDisplay || "block";
	if (elm.style.display === c) {
		elm.style.display = "none";
	} else {
		elm.style.display = c;
	}
	return elm;
};



//NEWELMCONSFUNCS
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
S.NewElm = function(tag, attributes, style) {
	this.tag = tag || "p";
	this.style = style || {};
	this.attributes = attributes || null;
	this.innerHTML = "";
};
Object.assign(S.NewElm.prototype, {
	create: function() {
		var elm = document.createElement(this.tag);
		if (this.attributes !== null) {Object.assign(elm, this.attributes)}
		Object.assign(elm.style, this.style);
		elm.innerHTML = this.innerHTML;
		return elm;
	}
});



//NEWELMSETCONSFUNCS
S.ListTab = function(list, listItemsArray) {
	if (list === undefined) {return;}
	this.list = list;
	this.items = listItemsArray || [];
	this.display = "list-item";
};
Object.assign(S.ListTab.prototype, {
	set: function() {
		for (var i=0; i<this.items.length; i++) {
			this.items[i].style.display = this.display;
		}
	},
	switch: function() {
		if (this.display === "none") {this.display = "list-item";} else {this.display = "none";}
		this.set();
		return this;
	}
});



//ELM
S.Element = {
	bg: function(elm, bg) {elm.style.background = bg},
	bgB: function(elm) {elm.style.background = "black"},
	bgW: function(elm) {elm.style.background = "white"},
	blink: function(elm) {elm.style.textDecoration = "blink"},
	bold: function(elm) {elm.style.fontWeight = "bold"},
	cenText: function(elm) {elm.style.textAlign = "center"},
	col: function(elm, col) {elm.style.color = col},
	defCol: function(elm) {elm.style.color = "#000000"},
	dispBlock: function(elm) {elm.style.display = "block"},
	dispNone: function(elm) {elm.style.display = "none"},
	fntS6: function(elm) {elm.style.fontSize = "6"},
	fntS10: function(elm) {elm.style.fontSize = "10"},
	fntS12: function(elm) {elm.style.fontSize = "12"},
	fntS20: function(elm) {elm.style.fontSize = "20"},
	fntS30: function(elm) {elm.style.fontSize = "30"},
	fntS36: function(elm) {elm.style.fontSize = "36"},
	fntS40: function(elm) {elm.style.fontSize = "40"},
	fntS50: function(elm) {elm.style.fontSize = "50"},
	full: function(elm) {elm.style.width = "100%"; elm.style.height = "100%"},
	fullH: function(elm) {elm.style.height = "100%"},
	fullW: function(elm) {elm.style.width = "100%"},
	half: function(elm) {elm.style.width = "50%"; elm.style.height = "50%"},
	halfH: function(elm) {elm.style.height = "50%"},
	halfW: function(elm) {elm.style.width = "50%"},
	none: function(elm) {elm.style.textDecoration = "none"},
	oline: function(elm) {elm.style.textDecoration = "overline"},
	olineUline: function(elm) {elm.style.textDecoration = "overline underline"},
	opc: function(elm, val) {elm.style.opacity = val},
	opcHalf: function(elm) {elm.style.opacity = 0.5},
	opcMax: function(elm) {elm.style.opacity = 1},
	opcMin: function(elm) {elm.style.opacity = 0},
	ovf: function(elm, ovftype) {elm.style.overflow = ovftype},
	ovfAuto: function(elm) {elm.style.overflow = "auto"},
	ovfHid: function(elm) {elm.style.overflow = "hidden"},
	ovfScr: function(elm) {elm.style.overflow = "scroll"},
	ovfVis: function(elm) {elm.style.overflow = "visible"},
	pos: function(elm, postype) {elm.style.position = postype},
	posAbs: function(elm) {elm.style.position = "absolute"},
	posFixed: function(elm) {elm.style.position = "fixed"},
	posRel: function(elm) {elm.style.position = "relative"},
	posStat: function(elm) {elm.style.position = "static"},
	posStick: function(elm) {elm.style.position = "sticky"},
	quar: function(elm) {elm.style.width = "25%"; elm.style.height = "25%"},
	quarH: function(elm) {elm.style.height = "25%"},
	quarW: function(elm) {elm.style.width = "25%"},
	sansSerif: function(elm) {elm.style.fontFamily = "sans-serif"},
	serif: function(elm) {elm.style.fontFamily = "serif"},
	toB: function(elm) {elm.style.bottom = 0},
	toL: function(elm) {elm.style.left = 0},
	toLB: function(elm) {elm.style.left = 0; elm.style.bottom = 0},
	toLT: function(elm) {elm.style.left = 0; elm.style.top = 0},
	toR: function(elm) {elm.style.right = 0},
	toRB: function(elm) {elm.style.right = 0; elm.style.bottom = 0},
	toRT: function(elm) {elm.style.right = 0; elm.style.top = 0},
	toT: function(elm) {elm.style.top = 0},
	uline: function(elm) {elm.style.textDecoration = "underline"}
};
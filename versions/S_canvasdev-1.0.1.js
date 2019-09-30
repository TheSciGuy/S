/* S for JS
Made by SciPred, 2019. FTU.
Use only for shortcuts and to shorten code length. Obviously!
Introduces new stuff!
Needs Object.assign and Object.defineProperty to work.
Object.assign is automatically set if undefined.
Not sure with Object.defineProperty though.
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
	if (typeof selectors === "function") {return selectors();}
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



//NEWCONSFUNCS
S.switchBool = function(bool) {
	if (bool === true) {return false} else {return true}
};



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
	dispInline: function(elm) {elm.style.display = "inline-block"},
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
	h: function(elm, heightval) {elm.style.height = heightval},
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
	opcQuar: function(elm) {elm.style.opacity = 0.25},
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
	uline: function(elm) {elm.style.textDecoration = "underline"},
	w: function(elm, widthval) {elm.style.width = widthval}
};



//EVENTS
S.LastEvents = {
	click: "",
	keypress: ""
};
document.addEventListener("keypress", function(e) {S.LastEvents.keypress = e});
document.addEventListener("click", function(e) {S.LastEvents.click = e});



//CANVASCONTEXTS
window.HTMLCanvasElement.prototype.getSContext = function(context) {
	if (context === "2d") {return S.CanvasRenderingContext2D(this);}
	return S.CanvasRenderingContext2D(this);
}
S.CanvasRenderingContext2D = function() {
	var canvas = arguments[0];
	var c = {canvas: {context: canvas.getContext("2d")}};
	Object.freeze(c.canvas);
	//1: THE BASICS
	c.Vec = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};
	Object.assign(c.Vec.prototype, {
		add: function(v) {
			this.x += v.x;
			this.y += v.y;
			return this;
		},
		applyMat: function(m) {
			var x = this.x, y = this.y;
			var e = m.elements;
			this.x = (e[0]*x) + (e[1]*y);
			this.y = (e[2]*x) + (e[3]*y);
			return this;
		},
		clone: function() {
			return new this.constructor(this.x, this.y)
		},
		copy: function(v) {
			return this.set(v.x, v.y);
		},
		equals: function(v) {
			return this.x === v.x && this.y === v.y;
		},
		mul: function(v) {
			this.x *= v.x;
			this.y *= v.y;
			return this;
		},
		set: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		}
	});
	c.Mat = function(n11, n12, n21, n22) {
		n11 = n11 || 1;
		n12 = n12 || 0;
		n21 = n21 || 0;
		n22 = n22 || 1;
		this.elements = [
			n11, n12,
			n21, n22
		];
	};
	Object.assign(c.Mat.prototype, {
		addScale: function(x, y) {
			var e = this.elements;
			return this.scale(e[0]+x, e[3]+y);
		},
		clone: function() {
			var e = this.elements;
			return new this.constructor(e[0], e[1], e[2], e[3]);
		},
		copy: function(mat) {
			var e = mat.elements;
			this.elements = [e[0], e[1], e[2], e[3]];
			return this;
		},
		equals: function(mat) {
			for (var i=0; i<this.elements.length; i++) {
				if (this.elements[i] !== mat.elements[i]) {return false;}
			}
			return true;
		},
		identity: function() {
			return this.set(1, 0, 0, 1);
		},
		mul: function(m) {
			this.elements[0] *= m.elements[0];
			this.elements[1] *= m.elements[1];
			this.elements[2] *= m.elements[2];
			this.elements[3] *= m.elements[3];
			return this;
		},
		mulScale: function(x, y) {
			var e = this.elements;
			return this.scale(e[0]*x, e[3]*y);
		},
		set: function(n11, n12, n21, n22) {
			this.elements = [
				n11, n12,
				n21, n22
			];
			return this;
		},
		scale: function(x, y) {
			var e = this.elements;
			this.elements = [
				x, e[1],
				e[2], y
			];
			return this;
		}
	});
	//2: THE GEOMETRIES
	c.PreGeometry = function() {
		this.stroke = "black";
		this.vertices = [];
		this.movement = new c.Vec();
		this.strokeTransparency = 0.0;
		this.lineWidth = 1;
	};
	var PreGeometry = c.PreGeometry;
	c.Geometry = function() {
		this.fill = undefined;
		this.position = new c.Vec();
		this.transparency = 0.0;
	};
	var Geometry = c.Geometry;
	c.Line = function(startingVec) {
		PreGeometry.call(this);
		this.vertices = [startingVec];
		this.push = function(v) {
			this.vertices.push(v);
			return this;
		};
	};
	c.RegPol = function(sides, size) {
		PreGeometry.call(this);
		Geometry.call(this);
		this.size = size || 100;
		this.sides = sides || 3;
		this.set = function() {
			this.vertices = [];
			this.vertices.push(new c.Vec(this.position.x + this.size * Math.cos(0), this.position.y + this.size * Math.sin(0)));
			for (var i=1; i<this.sides; i++) {
				let p2 = i * 2 * Math.PI;
				let x = this.position.x, y = this.position.y;
				this.vertices.push(new c.Vec(x + this.size * Math.cos(p2 / this.sides), y + this.size * Math.sin(p2 / this.sides)));
			}
		};
		this.set();
	};
	c.Rectangle = function(width, height) {
		PreGeometry.call(this);
		Geometry.call(this);
		this.width = width || 100;
		this.height = height || 100;
		this.vertices = [
			new c.Vec(this.position.x+(this.width/2), this.position.y+(this.height/2)),
			new c.Vec(this.position.x-(this.width/2), this.position.y+(this.height/2)),
			new c.Vec(this.position.x-(this.width/2), this.position.y-(this.height/2)),
			new c.Vec(this.position.x+(this.width/2), this.position.y-(this.height/2))
		];
	};
	c.Square = function(size) {
		PreGeometry.call(this);
		Geometry.call(this);
		this.size = size || 100;
		this.vertices = [
			new c.Vec(this.position.x+(this.size/2), this.position.y+(this.size/2)),
			new c.Vec(this.position.x-(this.size/2), this.position.y+(this.size/2)),
			new c.Vec(this.position.x-(this.size/2), this.position.y-(this.size/2)),
			new c.Vec(this.position.x+(this.size/2), this.position.y-(this.size/2))
		];
	};
	//3: THE PATTERN (ext)
	c.Pattern = function(img) {
		this.image = img;
		this.repetition = "no-repeat";
		this.create = function() {return c.canvas.context.createPattern(this.image, this.repetition)};
	};
	//4: THE OBJECTS
	c.background = "white";
	c.camera = {
		zoom: 100,
		minZoom: 0.01,
		maxZoom: Infinity,
		viewMatrix: new c.Mat(),
		position: new c.Vec(),
		allowNegativeZoom: false
	};
	c.geometries = [];
	c.add = function(geometry) {
		c.geometries.push(geometry);
	};
	c.push = c.geometries.push;
	c.renderer = {
		additionalLineWidth: 0,
		autoClear: true,
		globalTransparency: 0.0
	};
	//5: THE PAUSE SETTINGS
	c.pauseAutoClear = false;
	c.pauseBackground = false;
	c.pauseDoubleStroking = true;
	c.pauseMovements = false;
	c.pauseRendering = false;
	c.pauseZooming = false;
	c.pause = function(obj) {
		if (obj.autoClear === true) {c.pauseAutoClear = S.switchBool(c.pauseAutoClear)}
		if (obj.background === true) {c.pauseBackground = S.switchBool(c.pauseBackground)}
		if (obj.doubleStroking === true) {c.pauseDoubleStroking = S.switchBool(c.pauseDoubleStroking)}
		if (obj.movements === true) {c.pauseMovements = S.switchBool(c.pauseMovements)}
		if (obj.rendering === true) {c.pauseRendering = S.switchBool(c.pauseRendering)}
		if (obj.zooming === true) {c.pauseZooming = S.switchBool(c.pauseZooming)}
	};
	//LAST: THE RENDERING
	c.clear = function() {c.canvas.context.clearRect(0, 0, c.canvas.context.canvas.width, c.canvas.context.canvas.height)};
	c.render = function() {if (c.pauseRendering === false) {
		var ctx = c.canvas.context;
		var canvas = ctx.canvas;
		var cx = c.camera.position.x, cy = c.camera.position.y;
		if (c.renderer.autoClear && c.pauseAutoClear === false) {ctx.clearRect(0, 0, canvas.width, canvas.height)}
		if (c.pauseBackground === false) {canvas.style.background = c.background}
		//prevent flipped camera projection and NaN zoom
		if (c.camera.zoom < c.camera.minZoom) {c.camera.zoom = c.camera.minZoom}
		if (c.camera.zoom > c.camera.maxZoom) {c.camera.zoom = c.camera.maxZoom}
		if (c.camera.zoom < 0 && c.camera.allowNegativeZoom === false) {c.camera.zoom = 0}
		function project(vec) {
			var newvec = new c.Vec(vec.x, vec.y);
			newvec.applyMat(c.camera.viewMatrix);
			if (c.pauseZooming === false) {newvec.mul(new c.Vec(c.camera.zoom/100, c.camera.zoom/100));}
			newvec.add(new c.Vec(cx, cy));
			return newvec;
		}
		var w = canvas.width/2, h = canvas.height/2;
		if (c.pauseMovements === false) {
			for (var i=0; i<c.geometries.length; i++) {
				for (var j=0; j<c.geometries[i].vertices.length; j++) {
					c.geometries[i].vertices[j].add(c.geometries[i].movement);
				}
			}
		}
		for (var i=0; i<c.geometries.length; i++) {
			let geometry = c.geometries[i];
			ctx.lineWidth = geometry.lineWidth + c.renderer.additionalLineWidth;
			let trans = geometry.constructor !== c.Line ? geometry.transparency : 0.0;
			let alpha = 1.0 - geometry.strokeTransparency - c.renderer.globalTransparency;
			if (alpha < 0.0) {alpha = 0.0}
			ctx.globalAlpha = alpha;
			ctx.beginPath();
			var P = project(geometry.vertices[0]);
			ctx.moveTo(P.x + w, -P.y + h);
			for (var j=1; j<geometry.vertices.length; j++) {
				P = project(geometry.vertices[j]);
				ctx.lineTo(P.x + w, -P.y + h);
			}
			//extra for side completion excluding Lines
			if (geometry.constructor !== c.Line) {
				P = project(geometry.vertices[0]);
				ctx.lineTo(P.x + w, -P.y + h);
			}
			ctx.strokeStyle = geometry.stroke;
			ctx.stroke();
			alpha = 1.0 - trans - c.renderer.globalTransparency;
			if (alpha < 0.0) {alpha = 0.0}
			ctx.globalAlpha = alpha;
			if (c.pauseDoubleStroking === false) {ctx.stroke()}
			if (geometry.fill !== undefined) {ctx.fillStyle = geometry.fill; ctx.fill();}
			ctx.closePath();
			//set back
			ctx.globalAlpha = 1.0;
			ctx.lineWidth = 1;
		}
	}};
	return c;
};
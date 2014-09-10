define(function() {
	var C={};
	Number.prototype.mul = function(D) { ////浮点数乘法运算 
		if (!/\./.test(this) && !/\./.test(D)) {
			return this * D
		}
		var G = this;
		var E = D;
		var B = 0, H = G.toString(), F = E.toString();
		if (H.indexOf(".") >= 0) {
			B += H.split(".")[1].length
		}
		if (F.indexOf(".") >= 0) {
			B += F.split(".")[1].length
		}
		return Number(H.replace(".", "")) * Number(F.replace(".", ""))
				/ Math.pow(10, B)
	};
	 C.Tools = {
		C : function(n, m) {//从n场比赛中中任选m场的组合数
			var arr = [];
			(function F(j, h, k) {
				if (k == 0) {
					return arr.push(j)
				}
				for ( var i = 0, len = h.length; i <= len - k; i++) {
					F(j.concat(h[i]), h.slice(i + 1), k - 1);
				}
			})([], n, m);
			return arr;
		},
		P : function(n, m) {  //从B场比赛中中任选D场的排列数
			var arr = [];
			(function F(j, h, k) {
				if (k == 0) {
					return arr.push(j);
				}
				for ( var i = 0, len = h.length; i < len; i++) {
					F(j.concat(h[i]), h.slice(0, i).concat(h.slice(i + 1)),
							k - 1);
				}
			})([], n, m);
			return arr;
		},
		F : function(B) { //阶乘计算
			var D = 1;
			(function E(G) {
				if (G < 0) {
					return D
				}
				for ( var F = G; F > 0; F--) {
					D *= F
				}
			})(B);
			return D
		},
		Sum : function(E) { //传入一个数组 返回数组中每一项的和
			var B = 0;
			(function D(G) {
				for ( var H = 0, F = G.length; H < F; H++) {
					B += Number(G[H])
				}
			})(E);
			return B
		},
		Product : function(E) { //传入一个数组 返回数组中每一项浮点数的乘积，用于计算sp
			var B = 1;
			(function D(G) {
				for ( var H = 0, F = G.length; H < F; H++) {
					B = B.mul(Number(G[H]))
				}
			})(E);
			return B
		},
		numC : function(B, D) {
			var F = this;
			var E = 1;
			(function G(H, I) {
				E = F.numP(H, I) / F.F(I)
			})(B, D);
			return E
		},
		numP : function(B, D) {
			var F = this;
			var E = 1;
			(function G(H, J) {
				if (H < 0 || J < 0) {
					return E
				}
				for ( var I = H; I > H - J; I--) {
					E *= I
				}
			})(B, D);
			return E
		},
		dtC : function(D, I, F) {
			var H = this.C(D, F - I.length);
			var B = [];
			for ( var G = 0; G < H.length; G++) {
				var E = I.concat(H[G]);
				B.push(E)
			}
			return B
		},
		numDtC : function(F, B, D) {
			var E = this;
			if (D < B) {
				return 0
			}
			return this.numC(F, D - B)
		},
		parseURL : function(B) {
			var D = new RegExp("(^|&)" + B + "=([^&]*)(&|$)", "i");
			var E = window.location.search.substr(1).match(D);
			if (E != null) {
				return unescape(E[2])
			}
			return null
		},
		isEmptyObject : function(D) {
			for ( var B in D) {
				return false
			}
			return true
		},
		checkLength : function(E, D) {
			var F = E.get("value"), B = F.length;
			if (B > D) {
				E.set("value", F.substr(0, D));
				return D
			}
			return B
		},
		checkStrOnlyNum : function(G, E, D, B, H) {
			var F = /[^\d]/gi;
			val = G.get("value").replace(F, "");
			H && H(val);
			if (Number(val) < E) {
				val = B ? E : ""
			} else {
				if (Number(val) > D) {
					val = (D == -1) ? val : D
				}
			}
			if (val == 0) {
				val = ""
			}
			G.set("value", val);
			return Number(val)
		},
		bitHandle : function(D, G) {
			var B = D.toString().length;
			if (B < G) {
				var F = "";
				for ( var E = 0; E < G - B; E++) {
					F += "0"
				}
				return F + D
			}
			return D
		},		
		_getInstance : function() {
			var B = null;
			B = document.createElement("input");
			B.type = "hidden";
			B.addBehavior("#default#userData");
			document.body.appendChild(B);
			return B
		},
		isRepeat : function(B) {
			var E = {};
			for ( var D in B) {
				if (E[B[D]]) {
					return true
				}
				E[B[D]] = true
			}
			return false
		},		
		getCompoundPermutationNum : function(D) {
			var B = 1, E = D.length - 1;
			for (; E > -1; --E) {
				B *= D[E].length
			}
			return B
		},
		getCompoundPermutation : function(E, D) {
			var B = E[0].concat(), G = E.length, F = 1, H;
			for (; F < G; ++F) {
				H = E[F];
				if (H.length) {
					B = this.combine(B, H, D)
				}
			}
			return B
		},
		combine : function(F, E, H) {
			var D = [], I = 0, B = F.length, J = E.length, G;
			if (H == undefined) {
				H = ""
			}
			for (; I < B; ++I) {
				for (G = 0; G < J; ++G) {
					D[D.length] = F[I] + H + E[G]
				}
			}
			return D
		},
		getSummationPermutation : function(G, H, D) {
			var L = [], K = G.length, I, B, J, F, E;
			if (D == undefined) {
				D = 9
			}
			if (K == 1) {
				I = G[0];
				if (H == 2) {
					D = Math.min(I, D);
					for (F = 0; F <= D; ++F) {
						E = I - F;
						if (E <= D) {
							L[L.length] = [ F, E ]
						}
					}
				} else {
					if (H > 2) {
						--H;
						for (F = 0; F <= D; ++F) {
							B = I - F;
							J = this.getSummationPermutation([ B ], H, D);
							for (E = 0, K = J.length; E < K; ++E) {
								J[E].splice(0, 0, F)
							}
							L = L.concat(J)
						}
					}
				}
			} else {
				if (K > 1) {
					for (F = 0; F < K; ++F) {
						L = L.concat(this.getSummationPermutation([ G[F] ], H,
								D))
					}
				}
			}
			return L
		},
		paddingTag : function(I, E, B, H) {
			if (typeof I != "string") {
				I = "" + I
			}
			var D = E - I.length, G, F;
			if (H == 1) {
				F = D / 2;
				D = Math.floor(F);
				F = Math.ceil(F)
			}
			G = this.fillString(B, D);
			switch (H) {
			case 1:
				return G + I + this.fillString(B, F);
			case 2:
				return G + I;
			default:
				return I + G
			}
		},
		fillString : function(H, F) {
			var G = F.toString(2), E = H, B = "", D = G.length - 1;
			for (; D > -1; --D) {
				if (G.charAt(D) == "1") {
					B += E
				}
				E += E
			}
			return B;
		}
	};
	 C.JCZQ_Calc = {
				spCache : {},
				countCache : {},
				moneyCache : {},
				passTypeMap : {
					"单关" : [ 1 ],
					"2串1" : [ 2 ],
					"2串3" : [ 2, 1 ],
					"3串1" : [ 3 ],
					"3串3" : [ 2 ],
					"3串4" : [ 3, 2 ],
					"3串7" : [ 3, 2, 1 ],
					"4串1" : [ 4 ],
					"4串4" : [ 3 ],
					"4串5" : [ 4, 3 ],
					"4串6" : [ 2 ],
					"4串11" : [ 4, 3, 2 ],
					"4串15" : [ 4, 3, 2, 1 ],
					"5串1" : [ 5 ],
					"5串5" : [ 4 ],
					"5串6" : [ 5, 4 ],
					"5串10" : [ 2 ],
					"5串16" : [ 5, 4, 3 ],
					"5串20" : [ 3, 2 ],
					"5串26" : [ 5, 4, 3, 2 ],
					"5串31" : [ 5, 4, 3, 2, 1 ],
					"6串1" : [ 6 ],
					"6串6" : [ 5 ],
					"6串7" : [ 6, 5 ],
					"6串15" : [ 2 ],
					"6串20" : [ 3 ],
					"6串22" : [ 6, 5, 4 ],
					"6串42" : [ 6, 5, 4, 3 ],
					"6串50" : [ 4, 3, 2 ],
					"6串57" : [ 6, 5, 4, 3, 2 ],
					"6串63" : [ 6, 5, 4, 3, 2, 1 ],
					"7串1" : [ 7 ],
					"7串7" : [ 6 ],
					"7串8" : [ 7, 6 ],
					"7串21" : [ 5 ],
					"7串35" : [ 4 ],
					"7串120" : [ 7, 6, 5, 4, 3, 2 ],
					"7串127" : [ 7, 6, 5, 4, 3, 2, 1 ],
					"8串1" : [ 8 ],
					"8串8" : [ 7 ],
					"8串9" : [ 8, 7 ],
					"8串28" : [ 6 ],
					"8串56" : [ 5 ],
					"8串70" : [ 4 ],
					"8串247" : [ 8, 7, 6, 5, 4, 3, 2 ],
					"8串255" : [ 8, 7, 6, 5, 4, 3, 2, 1 ],
					"9串1" : [ 9 ],
					"10串1" : [ 10 ],
					"11串1" : [ 11 ],
					"12串1" : [ 12 ],
					"13串1" : [ 13 ],
					"14串1" : [ 14 ],
					"15串1" : [ 15 ]
				},
				analysisSp : function(y, f, e) {
					var A = y.toString() + "|" + f.toString(), 
					p = this.spCache[A], 
					d = false;
					if (typeof p !== "undefined") {
						return p
					}
					_.some(f, function(i) {
						if (y[i].length === 0) {
							d = true;
							return false
						}
					});
					if (d) {
						return null
					}
					this.reg = e;
					var s = e.length - 1, 
					    l = e.concat(), 
					    m = e.concat(), 
					    t = [], 
					    c = [], 
					    z = [], 
					    x = [], 
					    o = [], 
					    n = [], 
					    q = [], 
					    j = [], 
					    g = 0, 
					    k = function(B, i) {
						return B - i
					    }, 
					    r = function(B, i) {
						return i - B
					    }, 
					    v, h, b;
					for ( var u = 0, w = y.length; u < w; u++) {
						v = y[u];
						h = v.length - 1;
						if (h > -1) {
							b = (h === s);
							if (_.indexOf(f, u) < 0) {
								m[h] = m[h] + 1;
								if (b) {
									z.push(v[0]);
									q.push(v[h])
								} else {
									t.push(v[0]);
									o.push(v[h])
								}
							} else {
								l[h] = l[h] + 1;
								if (b) {
									x.push(v[0]);
									j.push(v[h])
								} else {
									c.push(v[0]);
									n.push(v[h])
								}
							}
							g++
						}
					}
					t = t.sort(k);
					c = c.sort(k);
					z = z.sort(k);
					x = x.sort(k);
					o = o.sort(r);
					n = n.sort(r);
					q = q.sort(r);
					j = j.sort(r);
					return this.spCache[A] = {
						minArr : x.concat(c).concat(z).concat(t),
						maxArr : j.concat(n).concat(q).concat(o),
						dSpArr : l,
						tSpArr : m,
						mustDHitCount : x.length,
						mustTHitCount : z.length,
						danCount : x.length + c.length,
						count : g
					}
				},
				_calBaseCount : function(c, b) {
					var f = 0;
					if (c.length === 0 || b === 0) {
						return 0
					}
					var h = c.toString() + "|" + b, e = this.countCache[h];
					if (typeof e === "number") {
						return e
					}
					if (b === 1) {
						for ( var g = c.length; --g > -1;) {
							f += c[g] * (g + 1)
						}
						return this.countCache[h] = f
					}
					var j = C.Tools.Sum(c);
					if (j === b) {
						f = 1;
						for ( var g = c.length; --g > -1;) {
							f *= Math.pow(g + 1, c[g])
						}
						return this.countCache[h] = f
					}
					for ( var g = c.length; --g > -1;) {
						if (c[g] > 0) {
							var d = c.concat();
							--d[g];
							f = (g + 1)
									* arguments.callee.apply(this, [ d,
											b - 1 ])
									+ arguments.callee.apply(this, [ d,
											b ]);
							return this.countCache[h] = f
						}
					}
					return this.countCache[h] = f
				},
				calCount : function(c, e, d, g, f) {
					/*args:
					 * c:布尔值
					 * e:已选比赛各场选择的sp值 eg：[[1.53,3.35],[1.92],[2.00,3.15]]
					 * d:已设过胆的数组 eg：[0,3,4,7]
					 * g:串关种类 eg：["2串1","3串1","3串3","3串4"]
					 * f:模板
					 * */
					
					var b = this.analysisSp(e, d, f);
					if (!b) {
						return 0
					}
					return this._calCount(c, b.dSpArr, b.tSpArr, g,
							b.danCount, b.count)
				},
				_calCount : function(q, h, d, n, c, l) {
					//q:bollean  h:sp胆数组  d:sp拖数组  n:串关种类  c:胆数量  l:
					var j = 0, e;
					if (_.isArray(n)) {
						for ( var g = n.length; --g > -1;) {
							j += arguments.callee.apply(this, [ q, h,
									d, n[g], c, l ])
						}
						return j
					}
					var o = h.toString() + "|" + d.toString() + "|" + n, b = this.countCache[o];
					if (typeof b !== "undefined") {
						return b
					}
					e = isNaN(parseInt(n)) ? 1 : parseInt(n);
					if ((!q) && (l > e)) {
						var p = this.separateArray(d, e - c);
						for ( var g = p.length; --g > -1;) {
							j += arguments.callee.apply(this,
									[ true, [], this.addArray(p[g], h),
											n, 0, e ])
						}
						return this.countCache[o] = j
					}
					var k = this.passTypeMap[n], f = 0;
					for ( var g = k.length; --g > -1;) {
						if (c >= k[g]) {
							j += this._calBaseCount(h, k[g])
						} else {
							if (c < k[g] && c > 0) {
								f = this._calBaseCount(h, c);
								j += f
										* this._calBaseCount(d, k[g]
												- c)
							} else {
								j += this._calBaseCount(d, k[g])
							}
						}
					}
					return this.countCache[o] = j
				},
				separateArray : function(d, f) {
					var e = C.Tools.C(this.transArrayToMatch(d), f), c = [];
					for ( var g = e.length; --g > -1;) {
						c.push(this.transArrayToNum(e[g]))
					}
					return c
				},
				transArrayToMatch : function(b) {
					var c = [];
					for ( var e = b.length; --e > -1;) {
						for ( var d = b[e]; --d > -1;) {
							c.push(e + 1)
						}
					}
					return c
				},
				transArrayToNum : function(b) {
					var c = this.reg.concat();
					for ( var d = b.length; --d > -1;) {
						c[b[d] - 1]++
					}
					return c
				},
				addArray : function(e, c) {
					var b = Math.max(e.length, c.length), d = [];
					for ( var f = b; --f > -1;) {
						d[f] = this.numFormat(e[f])
								+ this.numFormat(c[f])
					}
					return d
				},
				numFormat : function(b) {
					return isNaN(b) ? 0 : b
				},
				calculateMinAward : function(d, c, b, n) {
					var r = 0, f = this.passTypeMap, j = [], g = 0, q = b.length, e = 100, p = this.moneyCache, m, l, k, h, o;
					for (; g < q; ++g) {
						m = f[b[g]];
						l = m[m.length - 1];
						if (d) {
							if (l < e) {
								j.length = 0;
								e = l
							} else {
								if (l > e) {
									continue
								}
							}
						}
						j[j.length] = l
					}
					h = c.toString() + "|min|";
					for (g = j.length; --g > -1;) {
						l = j[g];
						o = h + l + "\u4e321";
						k = p[o];
						if (k == undefined) {
							if (d) {
								k = p[o] = parseFloat(C.Tools.Product(
										c.slice(0, l)).toFixed(2))
							}
						}
						r += k
					}
					return r
				},
				calExtreme : function(d, f, e, i, h) {
					var c = this.analysisSp(f, e, h), g, b;
					if (!c) {
						return 0
					}
					g = this._calMinExtreme(d, c.minArr, i, c.danCount,
							c.mustDHitCount, c.mustTHitCount);
					b = this._calMaxExtreme(d, c.maxArr, i, c.danCount);
					return {
						min : g,
						max : b
					}
				},
				_calMinExtreme : function(D, x, p, w, k, t) {
					var v, q, r, e, l, c, B;
					if (_.isArray(p)) {
						if (p.length == 0) {
							return "0"
						}
						var A = this.passTypeMap;
						p.sort(function(m, j) {
							var i = A[m], b = A[j];
							return i[i.length - 1] - b[b.length - 1]
						});
						p = p[0]
					}
					var E = "min|" + x.toString() + "|" + p + "|" + w
							+ "|" + k + "|" + t, g = this.moneyCache[E];
					if (typeof g !== "undefined") {
						return g
					}
					v = x.length;
					r = this.passTypeMap[p];
					e = x.slice(0, w);
					l = x.slice(w);
					q = r[r.length - 1];
					B = k + t;
					if ((!D) && (x.length > q)) {
						var h = Math.min(q, w), d = Math.max(k, q - v
								+ w), f = [];
						c = C.Tools.dtC(l, e, q);
						for ( var u = d; u <= h; u++) {
							var o = 0;
							for ( var s = c.length; --s > -1;) {
								var z = c[s], y;
								if (q >= B) {
									y = z.slice(0, u).concat(
											z.slice(w, w + q - u));
									o += C.Tools.Product(y)
								} else {
									y = C.Tools.dtC(z.slice(w, w + t),
											z.slice(0, u), q);
									$.each(y, function(b) {
										o += C.Tools.Product(b);
									})
								}
							}
							f.push(o)
						}
						f = f.sort(function(j, i) {
							return j - i
						});
						return this.moneyCache[E] = f[0].toFixed(2)
					}
					if (q >= w + t) {
						c = x.slice(0, q);
						return this.moneyCache[E] = C.Tools.Product(c)
								.toFixed(2)
					} else {
						var o = 0;
						c = x.slice(0, w + t);
						z = C.Tools.C(c, q);
						$.each(z, function(b) {
							o += C.Tools.Product(b)
						});
						return this.moneyCache[E] = o.toFixed(2)
					}
				},
				_calMaxExtreme : function(r, e, p, c) {
					var n = 0, f, o, k, d, l;
					if (_.isArray(p)) {
						for ( var h = p.length; --h > -1;) {
							n += parseFloat(arguments.callee.apply(
									this, [ r, e, p[h], c ]))
						}
						return n.toFixed(2)
					}
					var q = "max|" + e.toString() + "|" + p + "|" + c, b = this.moneyCache[q];
					if (typeof b !== "undefined") {
						return b
					}
					f = isNaN(parseInt(p)) ? 1 : parseInt(p);
					o = this.passTypeMap[p];
					k = e.slice(0, c);
					d = e.slice(c);
					if ((!r) && (e.length > f)) {
						l = C.Tools.dtC(d, k, f);
						for ( var h = l.length; --h > -1;) {
							n += Number(arguments.callee.apply(this, [
									true, l[h], p, 0 ]))
						}
						return this.moneyCache[q] = n.toFixed(2)
					}
					for ( var h = o.length; --h > -1;) {
						l = C.Tools.dtC(d, k, o[h]);
						for ( var g = l.length; --g > -1;) {
							n += Number(C.Tools.Product(l[g])
									.toFixed(2))
						}
					}
					return this.moneyCache[q] = n.toFixed(2)
				}
			};
	 return C;
});
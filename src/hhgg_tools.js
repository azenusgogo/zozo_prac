/* pub-1|2012-09-13 23:21:02 */YUI.add("tools", function(A) {
			Number.prototype.mul = function(D) {
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
				C : function(B, D) {
					var E = [];
					(function F(J, H, K) {
						if (K == 0) {
							return E.push(J)
						}
						for (var I = 0, G = H.length; I <= G - K; I++) {
							F(J.concat(H[I]), H.slice(I + 1), K - 1)
						}
					})([], B, D);
					return E
				},
				P : function(B, D) {
					var E = [];
					(function F(J, H, K) {
						if (K == 0) {
							return E.push(J)
						}
						for (var I = 0, G = H.length; I < G; I++) {
							F(J.concat(H[I]), H.slice(0, I).concat(H.slice(I
											+ 1)), K - 1)
						}
					})([], B, D);
					return E
				},
				F : function(B) {
					var D = 1;
					(function E(G) {
						if (G < 0) {
							return D
						}
						for (var F = G; F > 0; F--) {
							D *= F
						}
					})(B);
					return D
				},
				Sum : function(E) {
					var B = 0;
					(function D(G) {
						for (var H = 0, F = G.length; H < F; H++) {
							B += Number(G[H])
						}
					})(E);
					return B
				},
				Product : function(E) {
					var B = 1;
					(function D(G) {
						for (var H = 0, F = G.length; H < F; H++) {
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
						for (var I = H; I > H - J; I--) {
							E *= I
						}
					})(B, D);
					return E
				},
				dtC : function(D, I, F) {
					var H = this.C(D, F - I.length);
					var B = [];
					for (var G = 0; G < H.length; G++) {
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
					for (var B in D) {
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
						for (var E = 0; E < G - B; E++) {
							F += "0"
						}
						return F + D
					}
					return D
				},
				setCookie : function(F, G, B) {
					if (B < 0) {
						this.removeCookie(F);
						return
					}
					var E = new Date(), B = B || (24 * 60 * 60);
					E.setTime(E.getTime() + B * 1000);
					if (window.localStorage) {
						var I = {
							val : G,
							timestamp : E.getTime()
						};
						localStorage.setItem(F, A.JSON.stringify(I))
					} else {
						try {
							var D = this._getInstance();
							D.expires = E.toUTCString();
							D.setAttribute(F, G);
							D.save(F)
						} catch (H) {
						}
					}
				},
				getCookie : function(D) {
					if (window.localStorage) {
						var F = localStorage.getItem(D);
						if (F) {
							F = A.JSON.parse(localStorage.getItem(D));
							if (new Date().getTime() < F.timestamp) {
								return F.val
							}
						}
						return null
					} else {
						try {
							var B = this._getInstance();
							B.load(D);
							return B.getAttribute(D) || null
						} catch (E) {
							return null
						}
					}
				},
				removeCookie : function(E) {
					if (window.localStorage) {
						localStorage.removeItem(E)
					} else {
						try {
							var B = this._getInstance();
							B.load(E);
							B.removeAttribute(E);
							var D = new Date();
							D.setTime(D.getTime() - 1);
							B.expires = D.toUTCString();
							B.save(E)
						} catch (F) {
						}
					}
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
					for (var D in B) {
						if (E[B[D]]) {
							return true
						}
						E[B[D]] = true
					}
					return false
				},
				baseBallRandom : function(F, B, H, J, E) {
					var D = [], I;
					for (var G = 0; G < F; G++) {
						if (E == "floor") {
							I = Math.floor(Math.random() * B)
						} else {
							I = Math.ceil(Math.random() * B)
						}
						if (J) {
							I = (I < 10) ? "0" + I : I
						}
						if (!H && A.Array.indexOf(D, I) >= 0) {
							G--;
							continue
						}
						D[D.length] = I
					}
					return D
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
									L[L.length] = [F, E]
								}
							}
						} else {
							if (H > 2) {
								--H;
								for (F = 0; F <= D; ++F) {
									B = I - F;
									J = this.getSummationPermutation([B], H, D);
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
								L = L.concat(this.getSummationPermutation(
										[G[F]], H, D))
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
						case 1 :
							return G + I + this.fillString(B, F);
						case 2 :
							return G + I;
						default :
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
					return B
				}
			}
		});
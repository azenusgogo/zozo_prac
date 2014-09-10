/*pub-1|2012-07-17 15:42:45*/YUI.add("SMatchFilter", function(A) {
	C.SMatchFilter = {
		filters : [],
		registerFilter : function(B) {
			var D = this.filters;
			D[D.length] = B
		},
		isVisible : function(B) {
			var E = this.filters, D = E.length;
			for (; --D > -1;) {
				if (!E[D].isVisible(B)) {
					return false
				}
			}
			return true
		},
		reset : function() {
			var E = this.filters, D = 0, B = E.length;
			for (; D < B; ++D) {
				E[D].reset()
			}
		}
	}
});/* pub-1|2013-04-17 11:21:31 */
YUI.add("SUtil", function(a) {
	C.SUtil = {
		nodeCache : {},
		hookHandler : function(d, c) {
			var b = arguments;
			return function() {
				d.apply(c, [].slice.call(b, 2))
			}
		},
		indexOfArray : function(e, d) {
			if (Array.indexOf) {
				return e.indexOf(d)
			}
			for ( var c = 0, b = e.length; c < b; ++c) {
				if (e[c] === d) {
					return c
				}
			}
			return -1
		},
		formatDateTime : function(b) {
			return b ? (this.formatDate(b) + " " + this.formatTime(b)) : ""
		},
		formatDate : function(d) {
			var b = d.getFullYear() + "-", c = d.getMonth() + 1;
			b += (c < 10 ? "0" + c : c) + "-";
			c = d.getDate();
			b += (c < 10 ? "0" + c : c);
			return b
		},
		formatTime : function(d) {
			var c = d.getHours(), b = (c < 10 ? "0" + c : c) + ":";
			c = d.getMinutes();
			b += c < 10 ? "0" + c : c;
			return b
		},
		lazyRender : function(c) {
			var b = false;
			if (c) {
				if (b = c.getAttribute("loaded") != "true") {
					c.setAttribute("loaded", "true");
					c.append(a.Node.create("<div>"
							+ c.one("xmp").get("innerHTML") + "</div>"))
				}
			}
			return b
		},
		bindDigitValidator : function(g, e, b, f, d, h) {
			var c = this;
			d = d || window;
			g.setStyle("imeMode", "disabled");
			g.on("keydown", this.verifyDigitInput);
			g.on("keyup",
					function(k) {
						var i = k.target, j = c.checkNumber(i.get("value"), e,
								b, true);
						c.setNodeValue(i, j);
						if (typeof f == "function") {
							f.call(d, j || 0, i)
						}
					});
			g.on("blur", function(k) {
				var i = k.target, j;
				j = c.checkNumber(i.get("value"), e, b, h);
				c.setNodeValue(i, j);
				if (typeof f == "function") {
					f.call(d, j, i)
				}
			})
		},
		verifyDigitInput : function(c) {
			var b = c.keyCode;
			if (b > 57 && (b < 96 || b > 105)) {
				c.halt()
			}
		},
		checkNumber : function(d, e, b, g) {
			if (g && d === "") {
				return d
			}
			d = parseInt(d);
			if (typeof e == "function") {
				e = e()
			}
			if (typeof b == "function") {
				b = b()
			}
			var c = isNaN(e), f = isNaN(b);
			if (isNaN(d)) {
				return c ? "" : e
			}
			if (!c && d <= e) {
				return e
			}
			if (!f && d >= b) {
				return b
			}
			return typeof d == "number" ? d : ""
		},
		bindPlaceHolder : function(e, d, c, b) {
			b = b || window;
			e.setAttribute("input", "");
			e.set("value", typeof d == "function" ? d() : d);
			e.on("focus", function(g) {
				var f = g.currentTarget;
				f.setAttribute("blured", "0");
				if (!f.getAttribute("input").length) {
					f.removeClass("placeholder");
					f.set("value", "")
				}
			});
			e.on("blur", function(h) {
				var f = h.currentTarget, g = f.get("value");
				if (f.getAttribute("blured") != "1") {
					f.setAttribute("blured", "1");
					f.setAttribute("input", g);
					if (!g.length) {
						f.addClass("placeholder");
						f.set("value", typeof d == "function" ? d() : d)
					}
					if (typeof c == "function") {
						c.call(b, g, f)
					}
				}
			})
		},
		setValueWithPlaceholder : function(c, d, b) {
			d = d == undefined ? "" : "" + d;
			c.setAttribute("input", d);
			if (d.length) {
				c.set("value", d);
				c.removeClass("placeholder")
			} else {
				c.addClass("placeholder");
				c.set("value", typeof b == "function" ? b() : b)
			}
		},
		getNode : function(e, b) {
			var d = this.nodeCache, c = d[e];
			if (!c) {
				b = b || a;
				c = d[e] = b.one(e)
			}
			return c
		},
		setNodeValue : function(b, c) {
			if (b.get("value") != "" + c) {
				b.set("value", c)
			}
		},
		toFixed : function(c, e) {
			var d = "" + c, b = d.indexOf(".") + e + 1;
			if (b > e && b < d.length) {
				c = d.substring(0, b)
			}
			return parseFloat(c).toFixed(2)
		},
		toFixedLength : function(g, e, f) {
			var b = g.replace(/[\u4e00-\u9fa5]/g, "\r\r"), d = g.length, c;
			if (b.length > e) {
				f = f || "";
				e -= f.length;
				b = b.substring(0, e);
				if (/.\r$/.test(b)) {
					b = b.substring(0, b.length - 1)
				}
				c = b.replace(/\r\r/g, "\r").length;
				return c < d ? g.substring(0, c) + f : g
			}
			return g
		},
		resizeFrame : function() {
			if (parent != window) {
				a.on("load", function(f) {
					try {
						parent.document.getElementsByTagName
					} catch (f) {
						document.domain = "taobao.com"
					}
					var c = window, b = parent.document
							.getElementsByTagName("iframe"), d = b.length;
					while (--d > -1) {
						try {
							if (b[d].contentWindow == c) {
								b[d].style.height = a.one("body").get(
										"offsetHeight")
										+ "px";
								break
							}
						} catch (f) {
						}
					}
				})
			}
		}
	}
});/* pub-1|2014-03-06 10:38:57 */
YUI
		.add(
				"SMatchView",
				function(a) {
					C.SMatchView = {
						manager : null,
						matchesHidden : [],
						expiredVisible : false,
						leagueColor : {},
						syncTeam : true,
						nodeWin : null,
						nodeMatchTitle : null,
						nodeMatchList : null,
						nodeMatches : [],
						popObjs : [],
						nodeShowAll : null,
						nodeHiddenCount : null,
						nodeViewExpiredChk : null,
						nodeViewExpiredTxt : null,
						nodeReturnTop : null,
						inited : false,
						init : function(f) {
							if (!this.inited) {
								a.mix(this, f, true);
								this.publish("mouseOverOnMatchRow", {
									emitFacade : true,
									defaultFn : this.mouseOverOnMatchHandler
								});
								this.publish("mouseOutOnMatchRow", {
									emitFacade : true,
									defaultFn : this.mouseOutOnMatchHandler
								});
								this.publish("clickOnMatchRow", {
									emitFacade : true,
									defaultFn : this.clickOnMatchHandler
								});
								this.publish("showMatch", {
									emitFacade : true,
									defaultFn : this.showMatchHandler
								});
								this.publish("hideMatch", {
									emitFacade : true,
									defaultFn : this.hideMatchHandler
								});
								var n = this, o = this.nodeMatches, k = o.length, l = this.nodeMatchTitle, c = this.nodeWin = a
										.one(window), m = this.syncTeam, e, g, p, d, b, h;
								for (; --k > -1;) {
									e = o[k];
									p = e.row;
									if (p instanceof Array) {
										for (h = p.length; --h > -1;) {
											this._initMatchRow(p[h], k)
										}
									} else {
										this._initMatchRow(p, k)
									}
									if (b = e.bet) {
										d = e.team;
										for (h = b.length; --h > -1;) {
											if (m && (g = d[h])) {
												g.setAttribute("match", k);
												g.setAttribute("ball", h)
											}
											if (g = b[h]) {
												g.setAttribute("match", k);
												g.setAttribute("ball", h)
											}
										}
									}
									this.setGameColor(e.game)
								}
								this.initShowAllAction();
								this.initExpiredDisplayAction();
								if (l) {
									this.matchTitleY = l.getY();
									this.matchTitleHeight = l
											.get("offsetHeight")
								}
								c.on("scroll", function(i) {
									n.refreshView()
								});
								c.on("resize", function(i) {
									n.refreshView()
								});
								this.refreshView();
								a.one("body").on("click", function(i) {
									n.hideAllPopBox()
								});
								this.inited = true
							}
							return this
						},
						_initMatchRow : function(d, c) {
							if (d) {
								var b = this;
								d.setAttribute("index", c);
								d.on("mouseover", function(g) {
									var f = g.currentTarget;
									b.fire("mouseOverOnMatchRow", {
										nodeRow : f,
										nodeTarget : g.target,
										index : f.getAttribute("index")
									})
								});
								d.on("mouseout", function(g) {
									var f = g.currentTarget;
									b.fire("mouseOutOnMatchRow", {
										nodeRow : f,
										nodeTarget : g.target,
										index : f.getAttribute("index")
									})
								});
								d.on("click", function(g) {
									var f = g.currentTarget;
									b.fire("clickOnMatchRow", {
										nodeRow : f,
										nodeTarget : g.target,
										index : f.getAttribute("index")
									})
								})
							}
						},
						clickOnMatchHandler : function(f) {
							var g = f.nodeRow, d = f.nodeTarget, c = parseInt(this
									.getSPIndex(d)), b = f.index;
							if (typeof c == "number" && !isNaN(c)
									&& !g.hasClass("expired")) {
								this.bet(b, c)
							}
						},
						bet : function(c, d, b) {
							b = this.toggleBetSelection(c, d, b);
							this.fire("bet", {
								matchIndex : c,
								spIndex : d,
								selected : b
							})
						},
						mouseOverOnMatchHandler : function(b) {
							this.toggleMatchHover(b.nodeRow, b.nodeTarget,
									b.index, true)
						},
						mouseOutOnMatchHandler : function(b) {
							this.toggleMatchHover(b.nodeRow, b.nodeTarget,
									b.index, false)
						},
						toggleMatchHover : function(f, d, b, e) {
							var c = parseInt(this.getSPIndex(d));
							if (typeof c == "number" && !isNaN(c)) {
								if (this.syncTeam) {
									this.toggleTeamHover(b, c, e)
								}
								this.toggleBetHover(b, c, e)
							}
							if (e) {
								f.addClass("hover")
							} else {
								f.removeClass("hover")
							}
						},
						getSPIndex : function(b) {
							return b.getAttribute("ball")
									|| b.ancestor().getAttribute("ball")
						},
						clearBetSelection : function(b) {
							var c = this.nodeMatches[b].bet, d = c.length, e;
							for (; --d > -1;) {
								if (e = c[d]) {
									e.removeClass("selected")
								}
							}
						},
						toggleBetSelection : function(d, g, c) {
							var b = c, j = this.nodeMatches[d], h = j.bet, f, e;
							if (h && (h = (h[g] || h[g[0]]))) {
								if (c === undefined) {
									b = !h.hasClass("selected")
								}
								f = b ? "addClass" : "removeClass";
								if (g instanceof Array) {
									for (e = g.length; --e > -1;) {
										j.bet[g[e]][f]("selected")
									}
								} else {
									j.bet[g][f]("selected")
								}
							}
							return b
						},
						toggleTeamHover : function(b, d, c) {
							var f = this.nodeMatches[b], e = f.team;
							if (e && (e = e[d])) {
								if (c) {
									if (!e.hasClass("hover")) {
										e.addClass("hover")
									}
								} else {
									e.removeClass("hover")
								}
							}
						},
						toggleBetHover : function(b, d, c) {
							var f = this.nodeMatches[b], e = f.bet;
							if (e && (e = e[d])) {
								if (c) {
									if (!e.hasClass("hover")) {
										e.addClass("hover")
									}
								} else {
									e.removeClass("hover")
								}
							}
						},
						initShowAllAction : function() {
							var b = this, c = this.nodeShowAll;
							if (c) {
								c.on("click", function(d) {
									b.showAllMatches()
								})
							}
						},
						initExpiredDisplayAction : function() {
							var b = this, d = this.nodeViewExpiredChk, c = this.nodeViewExpiredTxt;
							if (d) {
								d.set("checked", this.expiredVisible);
								d.on("click", function(f) {
									b.toggleExpiredDisplay(f.target
											.get("checked"))
								});
								if (c) {
									c.on("click", function(g) {
										var h = b.nodeViewExpiredChk, f = !h
												.get("checked");
										h.set("checked", f);
										b.toggleExpiredDisplay(f)
									})
								}
							}
						},
						addPopBox : function(c) {
							var b = this.popObjs;
							b[b.length] = c
						},
						hideAllPopBox : function() {
							var d = this.popObjs, c = d.length, b;
							for (; --c > -1;) {
								if ((b = d[c])
										&& typeof b.hidePopBox == "function") {
									d[c].hidePopBox()
								}
							}
						},
						refreshMatchDisplay : function(b) {
							this.toggleMatchDisplay(b, C.SMatchFilter
									.isVisible(b))
						},
						toggleMatchDisplay : function(c, h) {
							var g = !c.expired || this.expiredVisible, b = c.index, j = this.nodeMatches[b].row, e = this.matchesHidden, f, d;
							h = h && g;
							f = j[0] || j;
							if (f && h == f.hasClass("hidden")) {
								this.fire((h ? "show" : "hide") + "Match", {
									nodeMatch : j
								})
							}
							if (b != undefined) {
								d = C.SUtil.indexOfArray(e, b);
								if (!h && g) {
									if (d < 0) {
										e[e.length] = b
									}
								} else {
									if (d > -1) {
										e.splice(d, 1)
									}
								}
							}
						},
						showMatchHandler : function(c) {
							var d = c.nodeMatch, b;
							if (d instanceof Array) {
								for (b = d.length; --b > -1;) {
									d[b].removeClass("hidden")
								}
							} else {
								d.removeClass("hidden")
							}
						},
						hideMatchHandler : function(d) {
							var f = d.nodeMatch, c, b;
							if (f instanceof Array) {
								for (b = f.length; --b > -1;) {
									if (c = f[b]) {
										c.addClass("hidden")
									}
								}
							} else {
								f.addClass("hidden")
							}
						},
						toggleExpiredDisplay : function(g) {
							this.expiredVisible = g;
							var e = this.manager;
							if (e) {
								var f = e.matches, d, b, c;
								for (c = 0, d = f.length; c < d; ++c) {
									b = f[c];
									if (b.expired) {
										this.refreshMatchDisplay(b)
									}
								}
							}
							this.refreshHiddenCount()
						},
						resetExpiredMatch : function() {
							var b = this.nodeViewExpiredChk;
							if (b) {
								b.set("checked", false)
							}
							this.toggleExpiredDisplay(false)
						},
						showAllMatches : function() {
							C.SMatchFilter.reset();
							var c = this.manager;
							if (c) {
								var d = c.matches, b = d.length;
								for (; --b > -1;) {
									this.toggleMatchDisplay(d[b], true)
								}
							}
							this.refreshHiddenCount()
						},
						refreshHiddenCount : function() {
							var b = this.nodeHiddenCount, d = this.matchesHidden.length, c;
							if (b) {
								if (c = b.one("em")) {
									c.set("text", d)
								}
								if (d) {
									b.removeClass("visHidden")
								} else {
									b.addClass("visHidden")
								}
							}
							this.fire("matchdisplayswitch");
							this.refreshView()
						},
						reset : function() {
							this.resetExpiredMatch();
							this.showAllMatches()
						},
						setTime : function(b, c) {
							this.nodeMatches[b].time.set("text", C.SUtil
									.formatTime(c))
						},
						setSP : function(b, d, c, e) {
							var f = this.nodeMatches[b];
							if (e && f) {
								if ((node = f.sp) && (node = node[d])) {
									node.set("text", e)
								}
								if ((node = f.spTendency) && (node = node[d])) {
									if (e > c) {
										node.removeClass("down").addClass("up")
									} else {
										if (e == c) {
											node.removeClass("up").removeClass(
													"down")
										} else {
											node.removeClass("up").addClass(
													"down")
										}
									}
								}
							}
						},
						refreshView : function() {
							this.refreshMatchHead();
							this.refreshTopReturn();
							this.fire("viewRefresh")
						},
						refreshMatchHead : function() {
							var f = this.matchTitleY, b = this.matchTitleHeight, d = this.nodeMatchTitle, c = this.nodeMatchList, e = this.nodeWin
									.get("scrollTop");
							if (d) {
								if (e >= f
										&& e < (c.getY()
												+ c.get("offsetHeight") - b)) {
									d.addClass("fixed");
									c.setStyle("marginTop", b + "px");
									if (a.UA.ie == 6) {
										d.setStyle("top", a.one(window).get(
												"scrollTop"))
									}
								} else {
									d.removeClass("fixed");
									c.setStyle("marginTop", "0")
								}
							}
						},
						refreshTopReturn : function() {
							var b = this.nodeReturnTop;
							if (b) {
								if (this.nodeWin.get("scrollTop") == 0) {
									b.addClass("hidden")
								} else {
									b.removeClass("hidden")
								}
							}
						},
						setGameColor : function(b) {
							if (b) {
								var e = this.leagueColor, d = b.get("text"), c = e[d];
								if (!c) {
									c = e.defaultColor;
									if (c && c instanceof Array) {
										c = c.pop()
									}
									if (c) {
										e[d] = c
									}
								}
								if (c) {
									b.setStyle("backgroundColor", c)
								}
							}
						}
					};
					a.augment(C.SMatchView, a.EventTarget)
				});/* pub-1|2013-04-24 12:59:11 */
YUI.add("SMatch", function(b) {
	var a = C.SMatch = function(c) {
		this.init(c)
	};
	a.prototype = {
		index : 0,
		matchId : "",
		date : null,
		gameName : "",
		sportName : "",
		matchName : "",
		concede : 0,
		hostTeam : "",
		visitTeam : "",
		sp : null,
		expired : false,
		init : function(c) {
			b.mix(this, c, true);
			this.spSelected = []
		},
		selectSP : function(h, g) {
			var c = false, d = this.spSelected, j = this.sp, e, k, f;
			if (g) {
				if (h instanceof Array) {
					for (f = h.length; --f > -1;) {
						k = Number(h[f]);
						if (C.SUtil.indexOfArray(d, k) < 0) {
							d.push(k);
							c = true
						}
					}
				} else {
					if (C.SUtil.indexOfArray(d, h) < 0) {
						d.push(h);
						c = true
					}
				}
				d.sort(function(l, i) {
					return j[l] - j[i]
				})
			} else {
				if (h instanceof Array) {
					for (f = h.length; --f > -1;) {
						k = Number(h[f]);
						if ((e = C.SUtil.indexOfArray(d, k)) > -1) {
							c = true;
							d.splice(e, 1)
						}
					}
				} else {
					if ((e = C.SUtil.indexOfArray(d, h)) > -1) {
						c = true;
						d.splice(e, 1)
					}
				}
			}
			return c
		},
		clearSPSelected : function() {
			this.spSelected.length = 0
		},
		parseSP : function(c) {
			return c ? c.split(",") : []
		},
		setSP : function(e) {
			if (e && !this.expired) {
				e = this.parseSP(e);
				var h = this.sp, g = h.length, d = C.SUtil, c, f;
				for (; --g > -1;) {
					f = parseFloat(e[g]);
					if (!isNaN(f)) {
						c = h[g];
						if (f < 0) {
							f = Math.abs(f)
						}
						f = h[g] = d.toFixed(f, 2);
						this.fire("spupdate", {
							matchIndex : this.index,
							spIndex : g,
							oldValue : c,
							newValue : f
						})
					}
				}
			}
		}
	};
	b.augment(a, b.EventTarget)
});/* pub-1|2013-11-22 15:40:24 */
YUI
		.add(
				"SBetCalculator",
				function(a) {
					C.SBetCalculator = {
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
							//y:[[2.5,1,2],[3.55,2.11]]    f:设过胆的比赛index[0,1]
							var A = y.toString() + "|" + f.toString(), 
							p = this.spCache[A], 
							d = false;
							if (typeof p !== "undefined") {
								return p
							}
							a.Array.some(f, function(i) {
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
									if (a.Array.indexOf(f, u) < 0) {
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
							if (a.Lang.isArray(n)) {
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
							if (a.Lang.isArray(p)) {
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
											a.Array.each(y, function(b) {
												o += C.Tools.Product(b)
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
								a.Array.each(z, function(b) {
									o += C.Tools.Product(b)
								});
								return this.moneyCache[E] = o.toFixed(2)
							}
						},
						_calMaxExtreme : function(r, e, p, c) {
							var n = 0, f, o, k, d, l;
							if (a.Lang.isArray(p)) {
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
					}
				});/* pub-1|2013-02-21 11:51:54 */
YUI
		.add(
				"SMatchManager",
				function(Y) {
					C.SMatchManager = {
						matches : [],
						matchMap : {},
						view : null,
						spUrl : "",
						spInterval : 1000,
						init : function(config) {
							Y.mix(this, config, true);
							this.initData();
							var view = this.view, self = this;
							if (view) {
								view.manager = this;
								view.on("bet", function(e) {
									self.bet(e.selected, e.matchIndex,
											e.spIndex)
								})
							}
							this.initSPUpdater()
						},
						initData : function() {
							var self = this, matches = this.matches, matchMap = this.matchMap, i = 0, size = matches.length, match;
							for (; i < size; ++i) {
								match = matches[i];
								matchMap[match.matchId] = match;
								match
										.on(
												"spupdate",
												function(e) {
													var view = self.view, matchIndex = e.matchIndex, spIndex = e.spIndex, oldValue = e.oldValue, newValue = e.newValue;
													if (view) {
														view.setSP(matchIndex,
																spIndex,
																oldValue,
																newValue)
													}
													if (oldValue != newValue
															&& C.SUtil
																	.indexOfArray(
																			self.matches[matchIndex].spSelected,
																			spIndex) > -1) {
														C.SBasket
																.calculateBetInfo()
													}
												})
							}
						},
						bet : function(selected, matchIndex, spIndex) {
							var match = this.matches[matchIndex], SBasket = C.SBasket;
							if (!match.expired
									&& match.selectSP(spIndex, selected)) {
								if (selected) {
									SBasket.addBet(match)
								} else {
									SBasket.removeBet(match)
								}
							}
						},
						initSPUpdater : function() {
							var spUrl = this.spUrl;
							if (spUrl) {
								this.spUrl = "http://" + location.host + spUrl;
								this.scheduleSPUpdater()
							}
						},
						scheduleSPUpdater : function() {
							var spInterval = this.spInterval, self = this;
							if (spInterval > 0) {
								setTimeout(function() {
									self.getSPData()
								}, spInterval)
							}
						},
						getSPData : function() {
							var spUrl = this.spUrl, self = this;
							if (spUrl) {
								spUrl += (spUrl.indexOf("?") < 0 ? "?" : "&")
										+ "t=" + new Date().getTime();
								Y.io(spUrl, {
									type : "get",
									on : {
										complete : function(id, o) {
											var data = o.responseText;
											if (!/^\s*$/g.test(data)) {
												self.updateSp(eval("(" + data
														+ ")"))
											}
										}
									}
								})
							}
						},
						updateSp : function(sp) {
							if (sp) {
								var matchMap = this.matchMap, match, i;
								for (i in sp) {
									if (sp.hasOwnProperty(i)) {
										if (match = matchMap[i]) {
											match.setSP(sp[i])
										}
									}
								}
							}
							this.scheduleSPUpdater()
						}
					}
				});/* pub-1|2013-06-04 14:28:39 */
YUI
		.add(
				"SBasket",
				function(a) {
					C.SBasket = {
						unitMoney : 2,
						awardPercentage : 65,
						orderMx1 : true,
						unitBonus : true,
						matches : [],
						nodeMatchCount : null,
						nodeBasket : null,
						passTypes : [],
						passTypeMap : {},
						passTypeSelected : [],
						maxPassType : 0,
						nodePassType : null,
						multiple : 1,
						minMultiple : 1,
						maxMultiple : 9999,
						nodeMultipleInput : null,
						nodeMultipleSub : null,
						nodeMultipleAdd : null,
						nodeMultipleTip : null,
						danNodes : [],
						dans : [],
						betCount : 0,
						nodeBetCount : null,
						moneyCount : 0,
						nodeMoneyCount : null,
						nodeAwardCount : null,
						nodeStopTime : null,
						init : function(b) {
							this.publish("betcalculate", {
								emitFacade : true,
								defaultFn : this.calculateBetHandler
							});
							a.mix(this, b, true);
							this.awardPercentage /= 100;
							this.initDan();
							this.initPassType();
							this.initMultiple()
						},
						initPassType : function() {
							var b = this, g = this.passTypes, f = this.passTypeMap, c = g.length, e, d;
							for (; --c > -1;) {
								e = g[c];
								f[e.name] = e;
								if (d = e.node) {
									if (d.get("checked")) {
										this.addPassTypeSelected(e.name)
									}
									if (!(e.disabled = d.get("disabled"))) {
										d.on("click", function(i) {
											i.stopPropagation();
											var h = i.target;
											b.selectPassType(h.get("value"), h
													.get("checked"))
										});
										d.ancestor().on("click", function(j) {
											var i = j.target.one("input");
											var h = !i.get("checked");
											i.set("checked", h);
											b.selectPassType(i.get("value"), h)
										})
									}
								}
							}
						},
						selectPassType : function(e, d) {
							var c = this.passTypeSelected, b = C.SUtil
									.indexOfArray(c, e);
							if (d) {
								if (b < 0) {
									this.addPassTypeSelected(e)
								}
							} else {
								if (b > -1) {
									c.splice(b, 1)
								}
							}
							this.validateDan();
							this.fire("passtypechange", {
								passType : e,
								selected : d
							});
							this.calculateBetInfo()
						},
						addPassTypeSelected : function(d) { //很吊 仔细再看一遍
							var b = this.passTypeSelected, c = this.passTypeMap;
							b.push(d);
							b.sort(function(i, g) {
								var h = c[i], j = c[g], k = h.m, f = j.m, e = k - f;
								if (!e) {
									k = h.n;
									f = j.n;
									e = k - f
								}
								return e
							})
						},
						togglePassType : function() {
							var e = this.matches.length, d = this.maxPassType, g = this.passTypes, b = g.length, f, c;
							d = d > 0 ? Math.min(e, d) : e;
							for (; --b > -1;) {
								f = g[b].node;
								if (f) {
									c = f.ancestor();
									if (g[b].m > d) {
										c.addClass("hidden");
										if (f.get("checked") && !g[b].disabled) {
											f.set("checked", false);
											this.selectPassType(f.get("value"),
													false)
										}
									} else {
										c.removeClass("hidden")
									}
								}
							}
							this.fire("passtypedisplayswitch")
						},
						addBet : function(c) {
							var e = this.matches, b = C.SUtil, d = b
									.indexOfArray(e, c) < 0;
							if (d) {
								e.push(c);
								this.togglePassType();
								this.validateDan();
								this.updateCount(); //更新视图：您一共选择了：几 场比赛
								this.updateStopTime()
							}
							this.fire("betadd", {
								match : c,
								newBet : d
							});
							this.calculateBetInfo()
						},
						removeBet : function(d) {
							var b = d.spSelected.length;
							if (!b) {
								var f = this.matches, c = C.SUtil, e = c
										.indexOfArray(f, d);
								if (e > -1) {
									f.splice(e, 1)
								}
								this.togglePassType();
								this.selectDan(d.index, false);
								this.validateDan();
								this.updateCount();
								this.updateStopTime()
							}
							this.fire("betremove", {
								match : d,
								hasBet : b
							});
							this.calculateBetInfo()
						},
						clearBet : function() {
							var d = this.matches, c = d.length, f = C.SMatchView, g = this.passTypes, b, e;
							for (; --c > -1;) {
								b = d[c];
								f.clearBetSelection(b.index);
								b.clearSPSelected()
							}
							for (c = g.length; --c > -1;) {
								e = g[c].node;
								if (e.get("checked")) {
									e.set("checked", false)
								}
							}
							d.length = this.passTypeSelected.length = 0;
							this.validateDan();
							f.showAllMatches();
							this.updateCount();
							this.updateStopTime();
							this.fire("betclear");
							this.calculateBetInfo()
						},
						initDan : function() {
							var c = this, b = C.SMatchView.nodeMatches, e = b.length, d = this.danNodes, g, f;
							for (; --e > -1;) {
								g = b[e];
								f = d[e] = g.dan;
								if (f) {
									f.set("checked", false);
									f.set("value", e);
									f.on("click", function(i) {
										i.stopPropagation();
										var h = i.target;
										c.setDan(h.get("value"), h
												.get("checked"))
									});
									f.ancestor().on("click", function(j) {
										var i = j.target.one("input");
										if (!i.get("disabled")) {
											var h = !i.get("checked");
											i.set("checked", h);
											c.setDan(i.get("value"), h)
										}
									})
								}
							}
						},
						setDan : function(b, c) {
							this.selectDan(parseInt(b), c);
							this.validateDan();
							this.calculateBetInfo()
						},
						selectDan : function(b, d) { //设胆 如果Dan集合中有就去掉，没有就加入
							var e = this.dans, c = C.SUtil.indexOfArray(e, b);
							if (d) {
								if (c < 0) {
									e[e.length] = b
								}
							} else {
								if (c > -1) {
									e.splice(c, 1)
								}
							}
						},
						validateDan : function() {
							var k = this.dans.length, b = this.danNodes, f = b.length, j = this.passTypeSelected, m = this.matches.length, h = C.SMatchManager.matches, o, c, e, l, d, n, g;
							if (o = j[0]) {
								o = this.passTypeMap[o];
								if (j.length == 1 && o.n == 1 && o.m == m) {
									d = l = true
								} else {
									e = o.m - 1
								}
							} else {
								e = m - 1
							}
							if (!d) {
								d = k > e;
								l = k == e
							}
							for (; --f > -1;) {
								if (c = b[f]) {
									g = !h[f].spSelected.length;
									n = c.get("checked");
									if (n) {
										if (d || g) {
											n = false;
											c.set("checked", false);
											this.selectDan(f, false)
										}
									}
									c.set("disabled", g || (l && !n))
								}
							}
						},
						initMultiple : function() {
							var b = this, c;
							if (c = this.nodeMultipleAdd) {
								c.on("click", function(d) {
									b.increaseMultiple();
								})
							}
							if (c = this.nodeMultipleSub) {
								c.on("click", function(d) {
									b.decreaseMultiple();
								})
							}
							if (c = this.nodeMultipleInput) {
								if (this.multiple > 0) {
									c.set("value", this.multiple)
								}
								C.SUtil.bindDigitValidator(c, this.minMultiple,
										this.maxMultiple, this.setMultiple,
										this);
							}
							if (c = this.nodeMultipleTip) {
								c.set("text", this.maxMultiple)
							}
						},
						increaseMultiple : function() {
							var b = C.SUtil.checkNumber(this.multiple + 1,
									this.minMultiple, this.maxMultiple);
							this.setMultiple(b);
							this.nodeMultipleInput.set("value", b);
						},
						decreaseMultiple : function() {
							var b = C.SUtil.checkNumber(this.multiple - 1,
									this.minMultiple, this.maxMultiple);
							this.setMultiple(b);
							this.nodeMultipleInput.set("value", b);
						},
						setMultiple : function(b) {
							if (this.multiple != b) {
								this.multiple = b || 0;
								this.calculateBetInfo();
							}
						},
						calculateBetInfo : function(b) {
							var c = this;
							clearTimeout(this.timerCalculator);
							if (b) {
								this._calculateBetInfoHandler();
							} else {
								this.timerCalculator = setTimeout(function() {
									c._calculateBetInfoHandler()
								}, 100)
							}
						},
						_calculateBetInfoHandler : function() {
							this.fire("betcalculate", {
								matches : C.SMatchManager.matches,
								matchSelected : this.matches,
								passTypes : this.passTypeSelected,
								dans : this.dans
							})
						},
						calculateBetHandler : function(f) {
							var c = 0, b = 0, g = this.orderMx1, d;
							if (f.matchSelected.length && f.passTypes.length) {
								c = this.statisticBetCount(g);
								b = this.calculateMoney(c);
								d = this.calculateAward(g);
							}
							this.setBetCount(c);
							this.setMoney(b);
							this.setAwardCount(d ? d.min : 0, d ? d.max : 0);
						},
						statisticBetCount : function(b) { //b:true
							return C.SBetCalculator.calCount(b, this
									.getSPSelected(), this.dans,
									this.passTypeSelected, this
											.getSPBetTemplate());
						},
						getSPBetTemplate : function() {
							var b = this.spTemplate, c, d;
							if (!b) {
								b = [];
								if (c = C.SMatchManager.matches[0]) {
									b = c.sp.concat();
									for (d = b.length; --d > -1;) {
										b[d] = 0
									}
								}
								this.spTemplate = b;
							}
							return b;
						},
						getSPSelected : function() {
							var c = [], h = C.SMatchManager.matches, e, g, b, f, d;
							for (f = h.length; --f > -1;) {
								b = c[f] = [];
								e = h[f];
								g = e.spSelected;
								for (d = g.length; --d > -1;) {
									b[d] = e.sp[g[d]]
								}
							}
							return c;
						},
						calculateMoney : function(c) {
							var b = (this.multiple * c * this.unitMoney) || 0;
							return b
						},
						calculateAward : function(b) { //b:true
							var c = C.SBetCalculator.calExtreme(b, this
									.getSPSelected(), this.dans,
									this.passTypeSelected, this
											.getSPBetTemplate());
							if (c) {
								c.min = this._fixAward(c.min);
								c.max = this._fixAward(c.max);
							}
							return c;
						},
						_fixAward : function(c) {
							var b = this.unitBonus ? this.unitMoney : 1;
							return C.SUtil.toFixed(c * b * this.multiple
									* this.awardPercentage, 2)
						},
						updateStopTime : function() {
							var c = this.nodeStopTime, b;
							if (c) {
								b = c.ancestor();
								time = this.getStopTime();
								c.set("text", time);
								if (time) {
									b.removeClass("visHidden")
								} else {
									b.addClass("visHidden")
								}
							}
						},
						getEarlyMatch : function(f) {
							var e = f.length - 1, g, c, b, d;
							if (e > -1) {
								c = f[e];
								g = c.stopTime;
								for (; --e > -1;) {
									b = f[e];
									d = b.stopTime;
									if (d < g) {
										g = d;
										c = b
									}
								}
							}
							return c
						},
						getMatches : function(f) {
							var d = this.matches;
							if (f) {
								var e = 0, c = d.length, b = [], g;
								for (; e < c; ++e) {
									g = d[e];
									if (f.call(this, g, e, d)) {
										b.push(g)
									}
								}
								d = b
							}
							return d
						},
						getStopTime : function(d) {
							var b = this.getEarlyMatch(this.matches), c;
							if (b) {
								c = b.stopTime
							}
							if (!d) {
								c = C.SUtil.formatDateTime(c)
							}
							return c
						},
						updateCount : function() {
							this.nodeMatchCount
									.set("text", this.matches.length)
						},
						toggleSelected : function(b) {
							if (b) {
								this.showBetMatches()
							} else {
								C.SMatchView.reset()
							}
						},
						showBetMatches : function() {
							C.SMatchFilter.reset();
							var d = C.SMatchView, e = C.SMatchManager.matches, c = e.length, b;
							for (; --c > -1;) {
								b = e[c];
								if (!b.expired) {
									d
											.toggleMatchDisplay(b,
													b.spSelected.length)
								}
							}
							d.resetExpiredMatch()
						},
						getMoney : function() {
							return this.moneyCount
						},
						setMoney : function(c) {
							this.moneyCount = c;
							var b = this.nodeMoneyCount;
							if (b) {
								b.set("text", c)
							}
						},
						getBetCount : function() {
							return this.betCount
						},
						setBetCount : function(b) {
							this.betCount = b;
							var c = this.nodeBetCount;
							if (c) {
								c.set("text", b)
							}
						},
						setAwardCount : function(c, b) {
							var d = this.nodeAwardCount;
							if (d) {
								d
										.set(
												"text",
												isNaN(c) || isNaN(b) ? "\u65e0\u6cd5\u8ba1\u7b97"
														: c == b ? c : c
																+ " ~ " + b)
							}
						}
					};
					a.augment(C.SBasket, a.EventTarget)
				});/* pub-1|2012-07-17 15:42:45 */
YUI
		.add(
				"SColumnFilter",
				function(B) {
					var A = C.SColumnFilter = function(D) {
						B.mix(this, D, true);
						this.init();
						C.SMatchFilter.registerFilter(this)
					};
					A.prototype = {
						filterProperty : "",
						init : function() {
							var E = this, D = E.view, F = this.nodeBox;
							this.nodeHandle.on("click", function(I) {
								I.stopPropagation();
								var G = E.view, H = I.currentTarget, J = !H
										.hasClass("active");
								if (G) {
									G.hideAllPopBox()
								}
								E.toggleFilterBox(J)
							});
							F.on("click", function(G) {
								G.stopPropagation()
							});
							F.one(".btn-select-all").on("click", function(G) {
								G.preventDefault();
								E.cancelFilter()
							});
							F.one(".btn-deselect").on("click", function(G) {
								G.preventDefault();
								E.defilter()
							});
							F.one(".btn-close").on("click", function(G) {
								G.preventDefault();
								E.toggleFilterBox(false)
							});
							if (D) {
								D.addPopBox(this)
							}
						},
						initFilter : function() {
							if (!this.states) {
								var H = this.types = {}, M = this.states = [], F = this.matches, E = F.length, J = [], L = this.filterProperty, K, G, D, I;
								for (; --E > -1;) {
									G = F[E];
									D = G[L];
									K = H[D];
									if (!K) {
										K = H[D] = {
											visible : true,
											matches : []
										};
										J[J.length] = D
									}
									I = K.matches;
									I[I.length] = G;
									M[E] = true
								}
								J.sort(function(O, N) {
									return O.localeCompare(N)
								});
								this.render(J)
							}
						},
						render : function(I) {
							var K = this, L = I.length, H = this.types, F = this.nodeChkContainer, G = 0, E, J, D;
							for (; G < L; ++G) {
								D = I[G];
								E = F.appendChild(B.Node.create("<li>"));
								E.on("click",
										function(O) {
											O.stopPropagation();
											var N = O.currentTarget
													.one("input"), M = !N
													.get("checked");
											N.set("checked", M);
											K.filter(N.get("value"), M)
										});
								J = H[D].node = E
										.appendChild(B.Node
												.create('<input type="checkbox" checked value="'
														+ D + '" />'));
								J.on("click", function(N) {
									N.stopPropagation();
									var M = N.target;
									K.filter(M.get("value"), M.get("checked"))
								});
								E.appendChild("&nbsp;<span>" + D + "</span>")
							}
						},
						hidePopBox : function() {
							this.toggleFilterBox(false)
						},
						toggleFilterBox : function(E) {
							var D = this.nodeHandle;
							if (E) {
								this.initFilter();
								D.addClass("active")
							} else {
								D.removeClass("active")
							}
						},
						filter : function(G, K) {
							var I = this.types[G];
							if (I.visible != K) {
								I.visible = K;
								var E = this.states, D = this.view, J = I.matches, H = J.length, F;
								for (; --H > -1;) {
									F = J[H];
									E[F.index] = K;
									if (D) {
										D.refreshMatchDisplay(F)
									}
								}
								if (D) {
									D.refreshHiddenCount()
								}
							}
						},
						cancelFilter : function() {
							var E = this.types, F, D;
							for (D in E) {
								if (E.hasOwnProperty(D)) {
									F = E[D];
									if (!F.visible) {
										F.node.set("checked", true);
										this.filter(D, true)
									}
								}
							}
						},
						defilter : function() {
							var E = this.types, F, G, D;
							for (D in E) {
								if (E.hasOwnProperty(D)) {
									F = E[D];
									G = !F.visible;
									F.node.set("checked", G);
									this.filter(D, G)
								}
							}
						},
						isVisible : function(E) {
							var D = this.states;
							return D ? D[E.index] : true
						},
						reset : function() {
							this.resetState();
							this.resetCheckbox()
						},
						resetState : function() {
							var D = this.states;
							if (D) {
								var G = this.matches, F = G.length, E = this.types;
								for (; --F > -1;) {
									D[F] = true
								}
								for (F in E) {
									if (E.hasOwnProperty(F)) {
										E[F].visible = true
									}
								}
							}
						},
						resetCheckbox : function() {
							var E = this.types, D;
							if (E) {
								for (D in E) {
									if (E.hasOwnProperty(D)) {
										E[D].node.set("checked", true)
									}
								}
							}
						}
					}
				});/* pub-1|2013-02-21 11:51:54 */
YUI
		.add(
				"SGroupFilter",
				function(A) {
					C.SGroupFilter = {
						groupBy : "date",
						groups : {},
						singleToggleEnabled : true,
						states : [],
						nodesGroupSwitch : {},
						init : function(D) {
							A.mix(this, D, true);
							var N = this, E = this.groups, M = this.groupBy, I = this.matches, H = 0, O = I.length, J, L, G;
							for (; H < O; ++H) {
								J = I[H];
								G = J[M];
								L = E[G];
								if (!L) {
									L = E[G] = []
								}
								L[L.length] = J
							}
							if (this.singleToggleEnabled) {
								A
										.one("#MatchList")
										.on(
												"click",
												function(S) {
													var R = S.target;
													if (R.hasClass("hid")) {
														S.preventDefault();
														var Q = R
																.ancestor("tr"), P = N.matches[Q
																.getAttribute("index")];
														N.toggleMatchDisplay(P,
																false)
													}
												})
							}
							var K = this.nodesGroupSwitch;
							var B = A.all(".hidDay"), H = B.size(), F;
							for (; --H > -1;) {
								F = B.item(H);
								K[F.getAttribute("group")] = F;
								F.on("click", function(Q) {
									var P = Q.currentTarget;
									if (P.get("tagName") != "INPUT") {
										Q.preventDefault()
									}
									N.toggleGroupDisplay(P
											.getAttribute("group"), P
											.hasClass("show"))
								})
							}
							this.resetStates();
							C.SMatchFilter.registerFilter(this)
						},
						toggleMatchDisplay : function(D, E) {
							var B = this.view;
							this.states[D.index] = E;
							this.validGroupDisplayHandle(D);
							if (B) {
								B.refreshMatchDisplay(D);
								B.refreshHiddenCount()
							}
						},
						validGroupDisplayHandle : function(D) {
							var H = false, F = D[this.groupBy], G = this.groups[F], E = G.length, B = this.states;
							for (; --E > -1;) {
								if (B[G[E].index]) {
									H = true;
									break
								}
							}
							this.refreshGroupDisplayHandle(F, H)
						},
						toggleGroupDisplay : function(G, I) {
							var B = this.view, H = this.groups[G], D = this.states, F = H.length, E;
							for (; --F > -1;) {
								E = H[F];
								D[E.index] = I;
								if (B) {
									B.refreshMatchDisplay(E)
								}
							}
							this.refreshGroupDisplayHandle(G, I);
							if (B) {
								B.refreshHiddenCount()
							}
						},
						refreshGroupDisplayHandle : function(B, E) {
							var D = this.nodesGroupSwitch[B];
							if (D) {
								if (E) {
									D.replaceClass("show", "hide")
								} else {
									D.replaceClass("hide", "show")
								}
								if (D = D.one("span")) {
									D.set("text", E ? "\u9690\u85cf"
											: "\u663e\u793a")
								}
							}
						},
						isVisible : function(B) {
							return this.states[B.index]
						},
						reset : function() {
							this.resetStates();
							this.resetGroupButton()
						},
						resetStates : function() {
							var E = this.matches, B = this.states, D = E.length;
							for (; --D > -1;) {
								B[D] = true
							}
						},
						resetGroupButton : function() {
							var B = this.nodesGroupSwitch;
							for (i in B) {
								if (B.hasOwnProperty(i)) {
									B[i].replaceClass("show", "hide");
									B[i].one("span")
											.set("text", "\u9690\u85cf")
								}
							}
						}
					}
				});/* pub-1|2013-04-17 11:21:31 */
YUI
		.add(
				"SOrder",
				function(b) {
					var a = {
						action : "order/orderAction",
						lotteryTypeId : "",
						orderType : "",
						numberStrings : "",
						multiple : "",
						totalNum : "",
						totalFee : "",
						event_submit_do_buy : "1",
						_tb_token_ : "",
						scheme : "",
						open : "",
						schemeTitle : "",
						schemeDesc : "",
						profitPct : "",
						totalShare : "",
						shareCnt : "",
						reserveShare : "",
						perFee : ""
					};
					C.SOrder = {
						minBetCount : 1,
						minGroupMoney : 2,
						maxBetMoney : 0,
						ballValues : [],
						brokerPercentage : 0,
						splitNum : 1,
						buyNum : 1,
						guaranteeNum : 0,
						minPerFee : 0.2,
						perFee : 0.2,
						groupStopTimeLength : 900000,
						nodePay : null,
						nodeGroupPay : null,
						nodeGroupDialog : null,
						nodeMask : null,
						orderUrl : "/lottery/lottery_order.htm",
						orderData : {},
						nodeForm : null,
						nodeOrderField : {},
						nodeGroupField : {},
						init : function(d) {
							b.mix(this, d, true);
							this.orderData = b.mix(a, this.orderData, true);
							var c = this, e = this.orderUrl, g = this.nodePay, f = this.nodeGroupPay;
							if (e) {
								this.orderUrl = "http://" + location.host + e
							}
							if (g) {
								g.on("click", function(h) {
									h.preventDefault();
									if (!h.target.hasClass("disabled")) {
										c.buy()
									}
								});
								this.publish("beforebuy", {
									emitFacade : true,
									defaultFn : function() {
										c.order(c.getOrderData(0))
									}
								})
							}
							if (f) {
								f.on("click", function(h) {
									h.preventDefault();
									if (!h.target.hasClass("disabled")) {
										c.groupBuy()
									}
								});
								this.publish("beforegroupbuy", {
									emitFacade : true,
									defaultFn : function() {
										c.toggleGroupOrderDialog(true)
									}
								})
							}
						},
						buy : function() {
							if (this.verifyOrder(0)) {
								this.fire("beforebuy")
							}
						},
						groupBuy : function() {
							if (this.verifyOrder(1)) {
								this.fire("beforegroupbuy")
							}
						},
						getOrderData : function(c) {
							var e = this.orderData, h = C.SBasket, g = this.nodeGroupField, f, d;
							e.orderType = c;
							e.numberStrings = this.getBetString();
							e.multiple = h.multiple;
							e.totalNum = h.getBetCount();
							e.totalFee = h.getMoney();
							if (c == 1 && g) {
								e.scheme = 1;
								f = g.open;
								if (f instanceof b.NodeList) {
									for (d = f.size(); --d > -1;) {
										if (f.item(d).get("checked")) {
											e.open = f.item(d).get("value");
											break
										}
									}
								}
								f = g.schemeTitle;
								e.schemeTitle = f ? b.Lang.trim(f.get("value"))
										: "";
								f = g.schemeDesc;
								e.schemeDesc = f ? b.Lang.trim(f.get("value"))
										: "";
								e.profitPct = this.brokerPercentage;
								e.totalShare = this.splitNum;
								e.shareCnt = this.buyNum;
								e.reserveShare = this.guaranteeNum;
								e.perFee = this.perFee
							}
							return e
						},
						order : function(c) {
							b.Node.getDOMNode(this.fillForm(c)).submit()
						},
						fillForm : function(e) {
							var c = this.nodeForm, g = this.nodeOrderField, f, d;
							if (!c) {
								c = this.nodeForm = b
										.one("body")
										.appendChild(
												b.Node
														.create("<form method='post' action='"
																+ this.orderUrl
																+ "'></form>"))
							}
							for (d in e) {
								if (e.hasOwnProperty(d)) {
									if (f = g[d]) {
										f.set("value", e[d])
									} else {
										g[d] = c.appendChild(b.Node
												.create("<input name='" + d
														+ "' value='" + e[d]
														+ "'/>"))
									}
								}
							}
							return c
						},
						getBetString : function() { //组装数据 投注按钮向后台提交的字符串格式：
							var r = "", p = C.SBasket, h = p.matches, m = p.dans, l = C.SUtil, f = 0, q = h.length, d = this.ballValues, k = p.passTypeSelected, e = p.passTypeMap, g, n, o, c;
							for (; f < q; ++f) {
								if (f) {
									r += "/"
								}
								g = h[f];
								r += g.matchId
										+ (l.indexOfArray(m, g.index) < 0 ? ""
												: "#") + ":";
								n = g.spSelected.concat().sort(function(j, i) {
									return j - i
								});
								for (c = n.length; --c > -1;) {
									n[c] = d[n[c]]
								}
								r += n.join(",")
							}
							r += "_";
							for (f = 0, q = k.length; f < q; ++f) {
								if (f) {
									r += "^"
								}
								o = e[k[f]];
								c = o.m;
								r += c + (c > 1 ? "*" + o.n : "")
							}
							return r
						},
						verifyOrder : function(i) {
							var m = false, k = C.SBasket, d = this.minBetCount, n = k.multiple, h = k.minMultiple, l = k.maxMultiple, g = this.maxBetMoney, f = this.minGroupMoney, e = b.Box.alert, j = this;
							k.calculateBetInfo(true);
							if (k.matches.length < d) {
								e("\u8bf7\u81f3\u5c11\u9009\u62e9" + d
										+ "\u573a\u6bd4\u8d5b\uff01")
							} else {
								if (!k.passTypeSelected.length) {
									e("\u8bf7\u9009\u62e9\u8fc7\u5173\u65b9\u5f0f\uff01")
								} else {
									if (h > 0 && n < h) {
										e("\u6295\u6ce8\u500d\u6570\u81f3\u5c11\u4e3a"
												+ h + "\u500d\uff01")
									} else {
										if (l > 0 && n > l) {
											e("\u6295\u6ce8\u500d\u6570\u4e0d\u80fd\u8d85\u8fc7"
													+ l + "\u500d\uff01")
										} else {
											if (this.verifyStopTime(i)) {
												var c = k.getMoney();
												if (g > 0 && c > g) {
													e("\u6295\u6ce8\u91d1\u989d\u4e0d\u80fd\u8d85\u8fc7"
															+ g
															+ "\u5143\uff01")
												} else {
													if (i == 1 && f > 0
															&& c < f) {
														e("\u5408\u4e70\u65f6\u6295\u6ce8\u91d1\u989d\u4e0d\u80fd\u5c11\u4e8e"
																+ f
																+ "\u5143\uff01")
													} else {
														m = true
													}
												}
											}
										}
									}
								}
							}
							return m
						},
						verifyStopTime : function(e) {
							var c = true, d = this, g = C.SBasket
									.getMatches(function(i, h) {
										var j = i.stopTime;
										if (j
												&& (j.getTime() - (e ? d.groupStopTimeLength
														: 0)) < new Date()
														.getTime()) {
											return true
										}
									}), f = g.length;
							for (; --f > -1;) {
								g[f] = g[f].matchName
							}
							if (g.length) {
								c = false;
								b.Box
										.alert("\u201c"
												+ g.join("\u3001")
												+ "\u201d\u6295\u6ce8\u5df2\u622a\u6b62\uff0c\u8bf7\u9009\u62e9\u5176\u4ed6\u6bd4\u8d5b\u6295\u6ce8\uff01")
							}
							return c
						},
						toggleGroupOrderDialog : function(i) {
							this.initGroupOrderDialog();
							var h = this.nodeMask, e = this.nodeGroupDialog;
							if (i) {
								this.resetGroupOrder();
								var g = b.one(document), d = g.get("docHeight"), c = b
										.one(window).get("winHeight"), f = g
										.get("docScrollY");
								h.setStyle("height", d + "px").removeClass(
										"hidden");
								e.setStyle("top", f + (c - 512) / 2 + "px")
										.removeClass("hidden")
							} else {
								h.addClass("hidden");
								e.addClass("hidden")
							}
						},
						initGroupOrderDialog : function() {
							var d = this, c = C.SUtil, e = this.nodeGroupDialog, g = this.nodeGroupField, f;
							if (c.lazyRender(e)) {
								if (f = g.schemeTitle = e.one(g.schemeTitle)) {
									f.on("keyup", function(h) {
										d.checkLength(h.currentTarget, 20)
									})
								}
								if (f = g.schemeDesc = e.one(g.schemeDesc)) {
									f.on("keyup", function(h) {
										d.checkLength(h.currentTarget, 50)
									})
								}
								if (f = g.profitPct = e.one(g.profitPct)) {
									C.SUtil.bindDigitValidator(f, 0, 10,
											this.setBrokerMoney, this)
								}
								if (f = g.totalShare = e.one(g.totalShare)) {
									C.SUtil.bindDigitValidator(f, 1,
											function() {
												return parseInt(C.SBasket
														.getMoney()
														/ d.minPerFee)
											}, this.setSplitNum, this)
								}
								if (f = g.shareCnt = e.one(g.shareCnt)) {
									C.SUtil.bindDigitValidator(f, 1,
											function() {
												return d.splitNum
														- d.guaranteeNum
											}, this.setBuyNum, this)
								}
								if (f = g.reserveShare = e.one(g.reserveShare)) {
									C.SUtil.bindDigitValidator(f, 0,
											function() {
												return d.splitNum - d.buyNum
											}, this.setGuaranteeNum, this)
								}
								g.betCount = e.one(g.betCount);
								g.multiple = e.one(g.multiple);
								g.money = e.one(g.money);
								g.stopTime = e.one(g.stopTime);
								g.open = e.all(g.open);
								g.minPercent = e.one(g.minPercent);
								g.minCount = e.one(g.minCount);
								g.fee = e.one(g.fee);
								g.guaranteeFee = e.one(g.guaranteeFee);
								g.perFee = e.one(g.perFee);
								g.agree = e.one(g.agree);
								if (f = e.one(g.submitBtn)) {
									f.on("click", function(h) {
										h.halt();
										if (d.verifyGroupOrder()) {
											d.order(d.getOrderData(1))
										}
									})
								}
								if (f = e.one(g.closeBtn)) {
									f.on("click", function(h) {
										d.toggleGroupOrderDialog(false)
									})
								}
							}
						},
						resetGroupOrder : function() {
							var f = this.nodeGroupField, c = this.orderData, e = C.SBasket, d;
							if (d = f.betCount) {
								d.set("text", e.getBetCount())
							}
							if (d = f.multiple) {
								d.set("text", e.multiple)
							}
							if (d = f.money) {
								d.set("text", e.getMoney())
							}
							if (d = f.stopTime) {
								d.set("text", e.getStopTime())
							}
							if ((d = f.open) && (d = d.item(0))) {
								d.set("checked", true)
							}
							if (d = f.schemeTitle) {
								d.set("value", c.schemeTitle || "");
								this.checkLength(d, 20)
							}
							if (d = f.schemeDesc) {
								d.set("value", c.schemeDesc || "");
								this.checkLength(d, 50)
							}
							if (d = f.profitPct) {
								d.set("value", this.brokerPercentage = 0)
							}
							if (d = f.totalShare) {
								d.set("value", this.splitNum = 1)
							}
							if (d = f.shareCnt) {
								d.set("value", this.buyNum = 1)
							}
							if (d = f.reserveShare) {
								d.set("value", this.guaranteeNum = 0)
							}
							if (d = f.minPercent) {
								d.set("text", 1)
							}
							if (d = f.guaranteeFee) {
								d.set("text", 0)
							}
							this.perFee = this.minPerFee;
							this.updateGroupFee()
						},
						checkLength : function(e, f) {
							var d = e.get("value"), c = d.length;
							if (c > f) {
								e.set("value", d.substring(0, f))
							}
							e.get("parentNode").one(".str").set("text", f - c)
						},
						setBrokerMoney : function(c) {
							if (c != this.brokerPercentage) {
								this.brokerPercentage = c;
								var d = this.nodeGroupField.minPercent;
								if (d) {
									d.set("text", c || 1)
								}
								this.updateGroupFee()
							}
						},
						setSplitNum : function(c) {
							if (c != this.splitNum) {
								this.splitNum = c;
								this.updateGroupFee()
							}
						},
						setBuyNum : function(c) {
							if (c != this.buyNum) {
								this.buyNum = c;
								this.updateGroupFee()
							}
						},
						setGuaranteeNum : function(c) {
							if (c != this.guaranteeNum) {
								this.guaranteeNum = c;
								var d = this.nodeGroupField.guaranteeFee;
								if (d) {
									d.set("text", c.mul(this.perFee))
								}
								this.updateGroupFee()
							}
						},
						updateGroupFee : function() {
							var g = this.nodeGroupField, i = this.splitNum, k = this.buyNum, c = this.guaranteeNum, h = C.SBasket
									.getMoney(), f = this.brokerPercentage, e;
							var j = this.perFee = Math.max(h / i,
									this.minPerFee);
							if (e = g.perFee) {
								e.set("text", j)
							}
							if (i < k + c) {
								k = this.buyNum = Math.min(i, k);
								if (e = g.shareCnt) {
									e.set("value", k)
								}
								c = this.guaranteeNum = Math.min(i - k, c);
								if (e = g.reserveShare) {
									e.set("value", c)
								}
							}
							if (e = g.fee) {
								e.set("text", k.mul(j))
							}
							var d = Math.ceil((f || 1) / 100 * h / j);
							if (e = g.minCount) {
								e.set("text", d)
							}
						},
						verifyGroupOrder : function() {
							var c = false, g = this.nodeGroupField, d = b.Box.alert, e;
							if (!this.verifyStopTime(1)) {
							} else {
								if ((e = g.schemeTitle)
										&& !b.Lang.trim(e.get("value"))) {
									d("\u65b9\u6848\u6807\u9898\u4e0d\u80fd\u4e3a\u7a7a\uff01")
								} else {
									if ((e = g.schemeDesc)
											&& !b.Lang.trim(e.get("value"))) {
										d("\u5408\u4e70\u5ba3\u8a00\u4e0d\u80fd\u4e3a\u7a7a\uff01")
									} else {
										var f = "" + this.perFee, h = f
												.split(".")[1];
										if (h && h.length > 2) {
											d("\u6bcf\u4efd\u91d1\u989d\u5fc5\u987b\u80fd\u6574\u9664\u5230\u5206\uff01")
										} else {
											if ((e = g.minCount)
													&& (f = parseInt(e
															.get("text")))
													&& (this.buyNum < f)) {
												d("\u81f3\u5c11\u8981\u8ba4\u8d2d"
														+ f
														+ "\u4efd\u4ee5\u4e0a\uff01")
											} else {
												if ((e = g.agree)
														&& !e.get("checked")) {
													d("\u8bf7\u9605\u8bfb\u300a\u5f69\u7968\u7535\u8bdd\u77ed\u4fe1\u4ee3\u8d2d\u89c4\u5219\u300b\u5e76\u540c\u610f\u65b9\u53ef\u6295\u6ce8\uff01")
												} else {
													c = true
												}
											}
										}
									}
								}
							}
							return c
						}
					};
					b.augment(C.SOrder, b.EventTarget)
				});
/* pub-1|2013-08-22 10:13:04 */YUI.add("rule", function(a) {
	Number.prototype.mul = function(c) {
		if (!/\./.test(this) && !/\./.test(c)) {
			return this * c
		}
		var f = this;
		var d = c;
		var b = 0, g = f.toString(), e = d.toString();
		if (g.indexOf(".") >= 0) {
			b += g.split(".")[1].length
		}
		if (e.indexOf(".") >= 0) {
			b += e.split(".")[1].length
		}
		return Number(g.replace(".", "")) * Number(e.replace(".", ""))
				/ Math.pow(10, b)
	};
	C.Rule = {
		subArray : function(b, d) {
			var c = this;
			a.Array.each(d, function(e) {
						c.delArrayVal(b, e)
					});
			return b
		},
		delArrayVal : function(c, f) {
			var e = this;
			for (var d = 0, b = c.length; d < b; d++) {
				if (c[d] == f) {
					c.splice(d, 1);
					break
				}
			}
		},
		getEarlyTime : function(d) {
			var e = this;
			var f = d[0];
			for (var c = 0, b = d.length; c < b; c++) {
				if (e._getEarlyTime(d[c], f) == d[c]) {
					f = d[c]
				}
			}
			return f
		},
		_getEarlyTime : function(g, f) {
			var e = this, d = /[- :]/gi;
			var c = Number(g.replace(d, "")), b = Number(f.replace(d, ""));
			if (c > b) {
				return f
			} else {
				return g
			}
		},
		_getTime : function(c) {
			var b = c.match(/(\d+)/g).concat(0);
			return new Date(b[0], parseInt(b[1] - 1), b[2], b[3], b[4], b[5])
		},
		runTime : function(g, j) {
			var n = this, b = g.split(" ")[0].split("-"), c = g.split(" ")[1]
					.split(":");
			var q = Number(b[0]), i = Number(b[1]) - 1, p = Number(b[2]);
			var l = Number(c[0]), e = Number(c[1]);
			var s = new Date();
			s.setFullYear(q);
			s.setMonth(i);
			s.setDate(p);
			s.setHours(l);
			s.setMinutes(e);
			var t = new Date(s.getTime() - j * 60 * 1000);
			var o = t.getMonth() + 1, f = t.getDate(), r = t.getHours(), k = t
					.getMinutes();
			o = o < 10 ? "0" + o : o;
			f = f < 10 ? "0" + f : f;
			r = r < 10 ? "0" + r : r;
			k = k < 10 ? "0" + k : k;
			return t.getFullYear() + "-" + o + "-" + f + " " + r + ":" + k
		},
		toFixed : function(d, h) {
			var g = d.toString(), c = g.split(".");
			var f = c[1] || "";
			if (f.length < h) {
				for (var e = 0, b = h - f.length; e < b; e++) {
					f += "0"
				}
			} else {
				f = f.substring(0, h)
			}
			return {
				str : c[0] + "." + f,
				num : parseFloat(c[0] + "." + f)
			}
		},
		inArray : function(d, c) {
			var f = false;
			for (var e = 0, b = c.length; e < b; e++) {
				if (c[e] == d) {
					f = true;
					break
				}
			}
			return f
		},
		indexOfArray : function(e, d) {
			if (Array.indexOf) {
				return e.indexOf(d)
			}
			for (var c = 0, b = e.length; c < b; ++c) {
				if (e[c] === d) {
					return c
				}
			}
			return -1
		},
		getCombineCount : function(g, d) {
			var e = 1, c = 1;
			for (var f = 1; f <= d; f++) {
				e *= g--;
				c *= f
			}
			return e / c
		},
		getPassTypeObj : function() {
			return {
				"2\u4e321" : [2],
				"3\u4e321" : [3],
				"4\u4e321" : [4],
				"5\u4e321" : [5],
				"6\u4e321" : [6],
				"7\u4e321" : [7],
				"8\u4e321" : [8]
			}
		},
		getAllPassTypeObj : function() {
			return {}
		},
		_countCache : {},
		_calCount : function(f, c) {
			var h = this;
			var l = f.toString() + "|" + c, b = C.Rule._countCache[l];
			if (typeof b == "number") {
				return b
			}
			var j = 0;
			for (var e = 0, k = f.length; e < k; e++) {
				j += f[e]
			}
			if (j < c) {
				return 0
			}
			if (c == 1) {
				var g = 0, e = 1;
				a.Array.each(f, function(i) {
							g += i * e;
							e++
						});
				return C.Rule._countCache[l] = g
			} else {
				if (j == c) {
					var g = 1, e = 1;
					a.Array.each(f, function(i) {
								g *= Math.pow(e, i);
								e++
							});
					return C.Rule._countCache[l] = g
				}
			}
			for (e = 0; e < k; e++) {
				if (f[e] > 0) {
					var d = f.concat();
					--d[e];
					return C.Rule._countCache[l] = (e + 1)
							* arguments.callee(d, c - 1)
							+ arguments.callee(d, c)
				}
			}
			return C.Rule._countCache[l] = 0
		},
		calculateCount : function(b, e, d, i) { //b:拖比赛数组 e：胆比赛数组 d：胆数量  i：passtype里的每一项eg（"2串1"）
			var h = this;
			var g = 0;
			var c = h.getAllPassTypeObj()[i];
			if (d > 0) {
				var f = [];
				if (!c) {
					return
				}
				a.Array.each(c, function(j) {
							if (j <= d) {
								f.push(j)
							} else {
								g += h._calCount(b, j - d)
							}
						});
				g *= h._calCount(e, d);
				a.Array.each(f, function(j) {
							g += h._calCount(e, j)
						})
			} else {
				if (!c) {
					return
				}
				a.Array.each(c, function(j) {
							g += h._calCount(b, j)
						})
			}
			return g
		},
		calculateAllCount : function(e) {
			var h = this, i = 0;
			if (e.length == 0) { //没选串关类型 直接返回   参数e：选的串关类型
				return 0
			}
			var g = C.MatchManager.makeDTArray(), c = g.m, d = g.t, f = g.d, k = g.tMatch, l = g.dMatch, b = g.dCount, j = C.MatchManager.selMatchCount;
			if (C.DataCache.hasRepeat) {
				a.Array.each(e, function(q) { //e :数组 已选择过关的种类
					var passTypeMap = q.charAt(0) == "单" ? 1 : Number(q.charAt(0)), 
							m = q.slice(2) == "" ? 1 : Number(q.slice(2));
					if (m == 1) { //如果是单关
						i += h.calculateCount(d, f, b, q)//
					} else {
						if (p == j) {
							var n = C.Match.prototype.ballArray.concat();
							i += h.calculateCount(c, n, 0, q)
						} else {
							var o = h.C(k, p - b);
							a.Array.each(o, function(r) {
										var s = C.MatchManager.makeTArray(r
												.concat(l));
										n = C.Match.prototype.ballArray
												.concat();
										i += h.calculateCount(s, n, 0, q)
									})
						}
					}
				})
			} else {
				a.Array.each(e, function(m) {
							i += h.calculateCount(d, f, b, m)
						})
			}
			return i
		},
		C : function(b, c) {
			var d = [];
			(function e(j, g, k) {
				if (k == 0) {
					return d.push(j)
				}
				for (var h = 0, f = g.length; h <= f - k; h++) {
					e(j.concat(g[h]), g.slice(h + 1), k - 1)
				}
			})([], b, c);
			return d
		},
		combine : function(h, g, m) {
			var l = [];
			if (h.length == 0) {
				return g
			}
			if (g.length == 0) {
				return h
			}
			if (m) {
				for (var f = 0; f < h.length; f++) {
					for (var e = 0; e < g.length; e++) {
						var c = h[f], b = g[e];
						for (var d = 0; d < b.length; d++) {
							c = c.concat(b[d])
						}
						l.push(c)
					}
				}
			} else {
				for (var e = 0; e < g.length; e++) {
					var c = h, b = g[e];
					for (var d = 0; d < b.length; d++) {
						c = c.concat(b[d])
					}
					l.push(c)
				}
			}
			return l
		},
		isArray : function(b) {
			return b && typeof b === "object" && typeof b.length === "number"
					&& typeof b.splice === "function"
					&& !(b.propertyIsEnumerable("length"))
		}
	}
});/* pub-1|2013-08-22 09:54:46 */
YUI.add("modelFramework", function(Y) {
	window.domCache = {
		getOne : function(key) {
			if (typeof this[key] === "undefined") {
				this[key] = Y.one(key)
			}
			return this[key]
		},
		getAll : function(key) {
			if (typeof this[key] === "undefined") {
				this[key] = Y.all(key)
			}
			return this[key]
		}
	};
	C.DataCache = {
		orderType : "DG",
		StopTime : [],
		hiddenRace : [],
		leagueColor : {
			"\u4e16\u754c\u676f" : "world-cup",
			"\u6b27\u6d32\u676f" : "euro-cup",
			"\u7f8e\u6d32\u676f" : "america-cup",
			"\u4e9a\u6d32\u676f" : "asia-cup",
			"\u975e\u6d32\u676f" : "africa-cup",
			"\u8054\u5408\u4f1a\u676f" : "fifa-cup",
			"\u82f1\u8d85" : "#ff0000",
			"\u610f\u7532" : "#0066ff",
			"\u897f\u7532" : "#006736",
			"\u5fb7\u7532" : "#89008a",
			"\u6cd5\u7532" : "#663333",
			"\u8461\u8d85" : "#042359",
			"\u8377\u7532" : "#ff6400",
			"\u82ac\u8d85" : "#ff6699",
			"\u745e\u8d85" : "#008888",
			"\u632a\u8d85" : "#042359",
			"J\u8054\u8d5b" : "#292929",
			"K\u8054\u8d5b" : "#ca0264",
			"\u82cf\u8d85" : "#646499",
			"\u4fc4\u8d85" : "#cb6602",
			"\u6bd4\u7532" : "#ff01fb",
			"\u5965\u7532" : "#8d8d8d",
			"\u4e39\u8d85" : "#b8b8b8",
			"\u5df4\u897f\u7532" : "#fda307",
			"\u7f8e\u804c" : "#630338",
			"\u745e\u58eb\u8d85" : "#25ed75",
			"\u6377\u514b\u7532" : "#995956",
			"\u7231\u8d85" : "#6834ff",
			"\u6fb3\u8d85" : "#736357",
			"\u4e2d\u8d85" : "#8dc63f",
			"\u7f57\u7532" : "#00a99d",
			"\u571f\u8d85" : "#c69c6d",
			"\u82f1\u51a0" : "#ff3536",
			"\u82f1\u7532" : "#e72c5b",
			"\u610f\u4e59" : "#68a4ff",
			"\u897f\u4e59" : "#02c901",
			"\u5fb7\u4e59" : "#cc00cc",
			"\u6cd5\u4e59" : "#e26d6d",
			"\u8377\u4e59" : "#fda307",
			"\u82ac\u7532" : "#d796ac",
			"\u745e\u7532" : "#4db5b9",
			"\u632a\u7532" : "#43ba57",
			"J2\u8054\u8d5b" : "#666666",
			"\u5965\u4e59" : "#f68e56",
			"\u8db3\u603b\u676f" : "#ed1c24",
			"\u82f1\u8054\u676f" : "#ed145b",
			"\u56fd\u738b\u676f" : "#f26522",
			"\u610f\u5927\u5229\u676f" : "#0076a3",
			"\u5fb7\u56fd\u676f" : "#197b30",
			"\u6cd5\u56fd\u676f" : "#8c6239",
			"\u6b27\u51a0\u676f" : "#2e3192",
			"\u6b27\u7f57\u5df4" : "#a186be",
			"\u5929\u7687\u676f" : "#acd373",
			"\u81ea\u7531\u676f" : "#ec008c",
			"\u745e\u5178\u676f" : "#c7b299",
			"\u82ac\u5170\u676f" : "#a67c52",
			"\u632a\u5a01\u676f" : "#998675",
			"\u4e39\u9ea6\u676f" : "#827b00",
			"\u6bd4\u5229\u65f6\u676f" : "#a0410d"
		},
		standbyColors : ["#acd373", "#a864a8", "#82ca9c", "#3cb878", "#fbaf5d",
				"#f5989d", "#f26d7d", "#6dcff6", "#00bff3", "#7accc8"],
		appearLeague : [],
		hasAdjust : false,
		ballNo : 0,
		updateSp : [],
		isbf : false,
		containDg : false,
		hasRepeat : true,
		lotteryName : ""
	};
	C.Match = function() {
		this.init.apply(this, arguments)
	};
	C.Match.prototype = {
		init : function(tr, index) {
			this.tr = tr;
			this.ballEls = [];
			this.ballCheckboxs = [];
			this.ballSpEls = [];
			this.sp = [];
			this.index = index;
			this.selectedArray = [];
			var that = this;
			var i = 0;
			Y.on("available", function() {
				tr.all(".balllist .ball").each(function(ballEl) {
					ballEl.setAttribute("data-matchindex", index);
					ballEl.setAttribute("data-ballindex", i);
					that.ballEls[i] = ballEl;
					that.ballSpEls[i] = ballEl.one("span");
					that.sp[i] = parseFloat(ballEl.one("span").get("innerHTML"));
					i++
				})
			}, ".balllist")
		},
		getNo : function() {
			var that = this, tr = that.tr;
			this._no = tr.one(".num").get("innerHTML");
			return this._no
		},
		getNum : function() {
			var that = this, tr = that.tr;
			that._num = tr.one(".hid").getAttribute("num-matchindex");
			return that._num
		},
		getLeague : function() {
			var that = this, tr = that.tr;
			that._league = tr.one(".league").get("innerHTML");
			return that._league
		},
		getHomeTeam : function() {
			var that = this, tr = that.tr;
			that._homeTeam = tr.one(".homeTeam span a").get("innerHTML");
			return that._homeTeam
		},
		getAwayTeam : function() {
			var that = this, tr = that.tr;
			that._awayTeam = tr.one(".awayTeam span a").get("innerHTML");
			return that._awayTeam
		},
		getAdjustedGoal : function() {
			var that = this, tr = that.tr;
			that._adjustedGoal = tr.one(".adjust").get("innerHTML");
			return that._adjustedGoal
		},
		isAdjusted : function() {
			var that = this, adjustedGoal = that.getAdjustedGoal();
			that._adjusted = parseFloat(adjustedGoal) != 0;
			return that._adjusted
		},
		isExpired : function() {
			var that = this, tr = that.tr;
			that._expired = tr.hasClass("expired");
			return that._expired
		},
		removed : false,
		_hidden : false,
		show : function() {
			var that = this, tr = that.tr;
			if (!that._hidden) {
				return
			}
			var tbody = tr.ancestor("tbody");
			if (!Dom.getElementsByClassName("on", "s", tbody)[0]) {
				this.tr.style.display = ""
			}
			this._hidden = false;
			Dom.removeClass(this.tr, "J_Toggle")
		},
		hide : function() {
			if (this._hidden) {
				return
			}
			this.tr.style.display = "none";
			this._hidden = true;
			Dom.addClass(this.tr, "J_Toggle")
		},
		setSp : function(spa) {
			if (!spa) {
				return
			}
			for (var i = 0; i < C.DataCache.ballNo; i++) {
				var sp = spa[i].split(":")[0], _status = spa[i].split(":")[1], numsp = Number(sp);
				if (_status == "down" || _status == "up") {
					this.ballSpEls[i].removeClass("down").removeClass("up")
							.addClass(_status)
				} else {
					if (_status == "0") {
						this.ballSpEls[i].removeClass("down").removeClass("up")
					} else {
						if (_status == undefined) {
							if (numsp > this.sp[i]) {
								this.ballSpEls[i].removeClass("down")
										.addClass("up")
							} else {
								if (numsp == this.sp[i]) {
									this.ballSpEls[i].removeClass("up")
											.removeClass("down")
								} else {
									this.ballSpEls[i].removeClass("up")
											.addClass("down")
								}
							}
						}
					}
				}
				this.ballSpEls[i]
						.set("innerHTML", C.Rule.toFixed(numsp, 2).str);
				this.sp[i] = numsp
			}
		},
		ballText : [],
		ballValue : [],
		ballArray : [],
		_initSelDom : function() {
		},
		select : function(ballIndex) {
			var that = this;
			for (var i = 0; i < C.DataCache.ballNo; i++) {
				if (that.selectedArray[i] == ballIndex) {
					return
				}
			}
			that.ballEls[ballIndex].addClass("selected");
			that.selectedArray.push(Number(ballIndex));
			this._initSelDom()
		},
		selectAll : function() {
			for (var i = 0; i < C.DataCache.ballNo; i++) {
				this.select(i)
			}
		},
		deselect : function(ballIndex) {
			var that = this;
			for (var i = 0; i < C.DataCache.ballNo; i++) {
				if (that.selectedArray[i] == ballIndex) {
					that.ballEls[ballIndex].removeClass("selected");
					that.selectedArray.splice(i, 1);
					that._initSelDom()
				}
			}
		},
		deselectAll : function() {
			for (var i = 0; i < C.DataCache.ballNo; i++) {
				this.deselect(i)
			}
		},
		_dan : false,
		isDan : function() {
			return this._dan
		},
		setDan : function(checked) {
			var that = this;
			that._dan = checked;
			if (that.danCheckbox) {
				that.danCheckbox.set("checked", checked)
			}
		},
		disableDan : function(disabled) {
			var that = this;
			if (disabled) {
				that.setDan(false)
			}
			if (that.danCheckbox) {
				that.danCheckbox.set("disabled", disabled)
			}
		}
	};
	C.UpdateSp = {
		spCache : {},
		isIntimeUp : true,
		init : function(obj) {
			var that = this;
			that.url = obj.url;
			that.interval = obj.interval;
			setInterval(function() {
						that.async()
					}, that.interval)
		},
		async : function() {
			var that = this;
			Y.io(that.url, {
						type : "get",
						on : {
							complete : function(id, o) {
								that.spCache = eval("(" + o.responseText + ")");
								that.isIntimeUp
										? C.MatchManager.updateSp(that.spCache)
										: C.MatchManager
												.updateSomeSp(that.spCache)
							}
						}
					})
		}
	};
	C.MatchManager = {
		matches : [],
		matchHash : {},
		selMatchCount : 0,
		danCount : 0,
		showMatch : [],
		selPassTypes : [],
		ticketCount : 0,
		curPassType : "freedom",
		getMatchByTr : function(tr) {
			var that = this, matches = that.matches;
			for (var i = 0, len = matches.length; i < len; i++) {
				if (matches[i].tr == tr) {
					return matches[i]
				}
			}
		},
		getDanSelMatch : function() {
			var that = this;
			that.selMatchCount = 0;
			that.danCount = 0;
			Y.Array.each(that.matches, function(match) {
						if (match.selectedArray.length > 0) {
							that.selMatchCount++;
							match.disableDan(false);
							if (match.isDan()) {
								that.danCount++
							}
						}
					})
		},
		makeDTArray : function() {
			var that = this;
			var mArr = C.Match.prototype.ballArray.concat(), 
			    tArr = C.Match.prototype.ballArray.concat(),
			    dArr = C.Match.prototype.ballArray.concat(), 
			    tMatch = [], dMatch = [], dCount = 0;
			Y.Array.each(that.matches, function(match) {
						var selCount = match.selectedArray.length;
						if (selCount > 0) {
							if (match.isDan()) {
								dArr[selCount - 1]++;
								dCount++;
								dMatch.push(match)
							} else {
								tArr[selCount - 1]++;
								tMatch.push(match)
							}
							mArr[selCount - 1]++
						}
					});
			return {
				m : mArr,
				t : tArr,
				d : dArr,
				tMatch : tMatch,
				dMatch : dMatch,
				dCount : dCount
			}
		},
		makeTArray : function(tMatch) {
			var tArr = C.Match.prototype.ballArray.concat();
			Y.Array.each(tMatch, function(match) {
						tArr[match.selectedArray.length - 1]++
					});
			return tArr
		}
	}
});/* pub-1|2013-01-21 13:14:46 */
YUI.add("rewardScope", function(A) {
	C.BonusDetail = {
		selectedMatches : [],
		_danCount : 0,
		multi : 1,
		totalAmount : 0,
		_passTypeObj : null,
		mArray : [],
		_maxNumSpArray : [],
		_minNumSpArray : [],
		_bonusCache : {},
		_multiStr : null,
		_calculateBonus : function(L, O, D, M, G) {
			var I = this, K = "", N = 0, M = M || 0, G = G || 0, E = L.length;
			for (var H = 0; H < E; H++) {
				K += L[H].info + ","
			}
			var J = O + "|" + D + "|" + M + "|" + G + "|" + K.slice(0, -1), B = C.BonusDetail._bonusCache[J];
			if (B) {
				return B
			}
			if (C.Rule.isArray(O)) {
				A.Array.each(O, function(P) {
							N += Number(I._calculateBonus(L, P, D, M, G))
						});
				return C.BonusDetail._bonusCache[J] = N.toFixed(2)
			}
			var M = M || 0;
			if (M == 0) {
				return C.BonusDetail._bonusCache[J] = I._calculateBonusNoDan(L,O, D)
			} else {
				var F = O.charAt(0) == "\u5355" ? 1 : Number(O.charAt(0));
				if (E == F) {
					return C.BonusDetail._bonusCache[J] = I._calculateBonusNoDan(L, O, D)
				} else {
					return C.BonusDetail._bonusCache[J] = I._calculateBonusDan(
							L, O, D, M, G)
				}
			}
		},
		_calculateBonusNoDan : function(V, N, K) {
			var I = this, O = "", F = 0, J = V.length;
			for (var R = 0; R < J; R++) {
				O += V[R].info + ","
			}
			var G = N + "|" + K + "|" + O.slice(0, -1), L = C.BonusDetail._bonusCache[G];
			if (L) {
				return L
			}
			var H = I._passTypeObj[N], P = N.charAt(0) == "\u5355"
					? 1
					: Number(N.charAt(0)), M = N.slice(2) == "" ? 1 : Number(N
					.slice(2));
			if (J == P) {
				if (M == 1) {
					if (K < P) {
						return 0
					}
					var S = 1;
					for (var R = 0; R < J; R++) {
						S *= V[R].sp
					}
					F = S * 2
				} else {
					A.Array.each(H, function(X) {
								var W = (X == 1) ? "\u5355\u5173" : X
										+ "\u4e321";
								F += Number(I._calculateBonusNoDan(V, W, K))
							})
				}
			} else {
				var B = [], D = H[H.length - 1], E = (D > P - (J - K)) ? D : P
						- (J - K), Q = (P > K) ? K : P;
				for (var R = E; R <= Q; R++) {
					var U = C.Rule.C(V.slice(0, K), R), T = C.Rule.C(
							V.slice(K), P - R);
					B = C.Rule.combine(U, T, true);
					A.Array.each(B, function(W) {
								F += Number(I._calculateBonusNoDan(W, N, R))
							})
				}
			}
			return C.BonusDetail._bonusCache[G] = F.toFixed(2)
		},
		_calculateBonusDan : function(T, M, J, F, B) {
			var H = this, N = "", I = T.length;
			for (var P = 0; P < I; P++) {
				N += T[P].info + ","
			}
			var G = M + "|" + J + "|" + F + "|" + B + "|" + N.slice(0, -1), L = C.BonusDetail._bonusCache[G];
			if (L) {
				return L
			}
			if ((B > F) || (B > J)) {
				return 0
			}
			var E = 0, D = [], K = J - B, O = M.charAt(0) == "\u5355"
					? 1
					: Number(M.charAt(0)), S = T.slice(0, F);
			for (var P = 0; P <= K; P++) {
				if (P > (O - F) || (I - (F + K)) < (O - P - F)) {
					continue
				}
				var R = C.Rule.C(T.slice(F, F + K), P);
				var Q = C.Rule.C(T.slice(F + K), O - P - F);
				D = C.Rule.combine(R, Q, true);
				D = C.Rule.combine(S, D, false);
				A.Array.each(D, function(V) {
							if (B < F) {
								var U = V.splice(B, (F - B));
								V = V.concat(U)
							}
							E += Number(H._calculateBonusNoDan(V, M, B + P))
						})
			}
			return C.BonusDetail._bonusCache[G] = E.toFixed(2)
		},
		calBonusScope : function() {
			var H = this, O = H.multi, L = H.mArray[H.mArray.length - 1].m, N = H.selectedMatches.length, K = 0, G = 0;
			var I = C.Match.prototype.ballArray.length - 1, M = C.MatchManager
					.makeDTArray(), D = C.DataCache._minDHit = M.d[I], E = C.DataCache._minHit = M.m[I];
			L = Math.max(E, L);
			if (H._danCount == 0) {
				K = H._calculateBonus(H._minNumSpArray,
						C.MatchManager.selPassTypes, L);
				G = H._calculateBonus(H._maxNumSpArray,
						C.MatchManager.selPassTypes, N)
			} else {
				G = H._calculateBonus(H._maxNumSpArray,
						C.MatchManager.selPassTypes, N, H._danCount,
						H._danCount);
				var J = (L < H._danCount) ? L : H._danCount, B = [];
				for (var F = D; F <= J; F++) {
					K = H._calculateBonus(H._minNumSpArray,
							C.MatchManager.selPassTypes, L, H._danCount, F);
					if (K != 0) {
						B.push(Number(K))
					}
				}
				K = B.sort(function(Q, P) {
							return Q - P
						})[0]
			}
			return {
				min : (K * O).toFixed(2),
				max : (G * O).toFixed(2)
			}
		},
		_calBonusNoRepeat : function(P, F) {
			var H = this;
			var J = F + "|" + P.toString(), D = C.BonusDetail._bonusCache[J];
			if (D) {
				return D
			}
			var I = P.length;
			if (I < F) {
				return C.BonusDetail._bonusCache[J] = {
					count : 0,
					bonus : 0,
					strArr : []
				}
			}
			if (I == F) {
				var M = 1, N = [];
				A.Array.each(P, function(Q) {
							M *= Q.sp;
							N.push(Q.info)
						});
				M *= 2 * C.BonusDetail.multi;
				N = [N.join("×"), C.BonusDetail._multiStr,
						C.Rule.toFixed(M, 2).num, "\u5143"];
				N.bonus = M;
				return C.BonusDetail._bonusCache[J] = {
					count : 1,
					bonus : M,
					strArr : [N]
				}
			} else {
				if (F == 1) {
					var E = 0, O = [], G = 0;
					A.Array.each(P, function(Q) {
								var S = Q.sp * 2 * C.BonusDetail.multi;
								E += S;
								var R = [Q[0], C.BonusDetail._multiStr,
										C.Rule.toFixed(S, 2).num, "\u5143"];
								R.bonus = S;
								G++;
								O.push(R)
							});
					return C.BonusDetail._bonusCache[J] = {
						count : G,
						bonus : E,
						strArr : O
					}
				}
			}
			var B = P.slice(0, I - 1);
			var L = arguments.callee(B, F), K = arguments.callee(B, F - 1);
			var G = L.count + K.count;
			var E = L.bonus + K.bonus * P[I - 1].sp;
			var O = L.strArr.concat();
			A.Array.each(K.strArr, function(S, R) {
						var Q = S.concat();
						Q[0] += "×" + P[I - 1][0];
						var T = S.bonus * P[I - 1].sp;
						Q[2] = C.Rule.toFixed(T, 2).str;
						Q.bonus = T;
						O.push(Q)
					});
			return C.BonusDetail._bonusCache[J] = {
				count : G,
				bonus : E,
				strArr : O
			}
		},
		_danCalCache : {},
		_calculateBonusNoRepeat : function(Q, E) {
			var I = this;
			var J = Q.length;
			var K = J < I._danCount ? J : I._danCount;
			if (J < E) {
				return {
					count : 0,
					bonus : 0,
					strArr : []
				}
			}
			if (K < E) {
				if (K > 0) {
					var O = I._calBonusNoRepeat(Q.slice(K, Q.length), E - K);
					var D, F;
					var H = Q.slice(0, K).toString(), B = I._danCalCache[H];
					if (B) {
						D = B.sp;
						F = B.str
					} else {
						D = 1;
						var N = [];
						for (var G = 0; G < K; G++) {
							D *= Q[G].sp;
							N.push(Q[G].info)
						}
						F = N.join("×");
						I._danCalCache[H] = {
							sp : D,
							str : F
						}
					}
					var M = O.bonus * D;
					var P = O.strArr.concat();
					A.Array.each(P, function(S, R) {
								P[R] = S.concat();
								if (F) {
									P[R][0] = F + "×" + S[0]
								}
								P[R][2] = C.Rule.toFixed(S.bonus * D, 2).num
							});
					return {
						count : O.count,
						bonus : C.Rule.toFixed(M, 2).num,
						strArr : P
					}
				} else {
					var L = I._calBonusNoRepeat(Q, E);
					return {
						count : L.count,
						bonus : C.Rule.toFixed(L.bonus, 2).num,
						strArr : L.strArr
					}
				}
			} else {
				var L = I._calBonusNoRepeat(Q.slice(0, K), E);
				return {
					count : L.count,
					bonus : C.Rule.toFixed(L.bonus, 2).num,
					strArr : L.strArr
				}
			}
		},
		calBonusScopeNoRepeat : function() {
			var G = this, H = [], K = G.multi;
			for (var E = G.selectedMatches.length; E > 0; E--) {
				var D = 0, F = 0, J = 0;
				var I = G._maxNumSpArray.slice(0, E);
				var B = G._minNumSpArray.slice(0, E);
				A.Array.each(G.mArray, function(O) {
							var L = G._calculateBonusNoRepeat(I, O.m);
							var N = G._calculateBonusNoRepeat(B, O.m);
							D += L.bonus * O.times;
							F += N.bonus * O.times;
							var M = L.count * O.times;
							J += M
						});
				if (J == 0) {
					continue
				}
				H.push({
							max : (D * K).toFixed(2),
							min : (F * K).toFixed(2)
						})
			}
			return {
				max : H[0].max,
				min : H[H.length - 1].min
			}
		},
		init : function() {
			var L = this;
			if (C.MatchManager.ticketCount <= 0) {
				domCache.getOne("#rewardScope").set("innerHTML",
						"0\u5143 ~ 0\u5143");
				return
			}
			L.selectedMatches = [];
			L._danCount = 0;
			for (var I = 0, N = C.MatchManager.matches.length; I < N; I++) {
				var J = C.MatchManager.matches[I];
				if (J.selectedArray.length > 0) {
					L.selectedMatches.push(J);
					if (J.isDan()) {
						L._danCount++
					}
					var E = null, M = null;
					for (var G = 0; G < J.selectedArray.length; G++) {
						var B = J.selectedArray[G];
						if (E === null) {
							E = M = J.sp[B]
						} else {
							E = J.sp[B] < E ? J.sp[B] : E;
							M = J.sp[B] > M ? J.sp[B] : M
						}
					}
					J.minSp = E;
					J.maxSp = M
				}
			}
			L.multi = C.MatchManager.getMultiple();
			L.totalAmount = C.MatchManager.ticketCount * 2 * L.multi;
			L._passTypeObj = C.Rule.getAllPassTypeObj();
			var P = [];
			for (var I = 0, N = C.MatchManager.selPassTypes.length; I < N; I++) {
				var D = L._passTypeObj[C.MatchManager.selPassTypes[I]];
				for (var G = 0, F = D.length; G < F; G++) {
					var K = D[G] - 1;
					P[K] = P[K] ? (P[K] + 1) : 1
				}
			}
			L.mArray.length = 0;
			for (I = P.length - 1; I >= 0; I--) {
				if (P[I] > 0) {
					L.mArray.push({
								m : I + 1,
								times : P[I]
							})
				}
			}
			var H = L.selectedMatches.concat();
			H.sort(function(T, S) {
				if ((T.isDan() && S.isDan()) || (!T.isDan() && !S.isDan())) {
					var R = T.ballValue.length, U = T.selectedArray.length, V = S.selectedArray.length;
					if (((U === R) && (V === R)) || ((U !== R) && (V !== R))) {
						return S.maxSp - T.maxSp
					}
					if (U === R) {
						return -1
					}
					if (V === R) {
						return 1
					}
				}
				if (T.isDan()) {
					return -1
				}
				if (S.isDan()) {
					return 1
				}
				return S.maxSp - T.maxSp
			});
			L._maxNumSpArray.length = 0;
			A.Array.each(H, function(S) {
						var T = S.maxSp, R = {};
						R.info = ["[" + S.getNo() + "]" + T];
						R.sp = T;
						L._maxNumSpArray.push(R)
					});
			var O = L.selectedMatches.concat();
			O.sort(function(T, S) {
				if ((T.isDan() && S.isDan()) || (!T.isDan() && !S.isDan())) {
					var R = T.ballValue.length, U = T.selectedArray.length, V = S.selectedArray.length;
					if (((U === R) && (V === R)) || ((U !== R) && (V !== R))) {
						return T.minSp - S.minSp
					}
					if (U === R) {
						return -1
					}
					if (V === R) {
						return 1
					}
				}
				if (T.isDan()) {
					return -1
				}
				if (S.isDan()) {
					return 1
				}
				return T.minSp - S.minSp
			});
			L._minNumSpArray.length = 0;
			A.Array.each(O, function(S) {
						var T = S.minSp, R = {};
						R.info = ["[" + S.getNo() + "]" + T];
						R.sp = T;
						L._minNumSpArray.push(R)
					});
			if (C.DataCache.hasRepeat) {
				var Q = L.calBonusScope()
			} else {
				var Q = L.calBonusScopeNoRepeat()
			}
			domCache.getOne("#rewardScope").set("innerHTML",
					Q.min + "\u5143 ~ " + Q.max + "\u5143")
		}
	}
});/* pub-1|2013-08-22 09:54:45 */
YUI.add("viewFramework", function(Y) {
	Y.mix(C.MatchManager, {
		allBalls : domCache.getAll("#raceMain .balllist .ball"),
		getMultiple : function() {
			return Number(domCache.getOne("#multiple").get("value"))
		},
		setTotalCount : function() {
			var that = this;
			domCache.getOne("#betNum").set("innerHTML", that.ticketCount)
		},
		setTotalAmount : function() {
			var that = this, totalAmount = domCache.getOne("#betFee");
			totalAmount.set("innerHTML", that.getMultiple() * that.ticketCount
							* 2)
		},
		updateSp : function(sp) {
			if (!sp) {
				return
			}
			for (var num in sp) {
				if (sp.hasOwnProperty(num)) {
					var match = C.MatchManager.matchHash[num];
					if (match) {
						match.setSp(sp[num].split(","))
					}
				}
			}
		},
		updateSomeSp : function(sp) {
			var that = this;
			if (!sp) {
				return
			}
			for (var num in sp) {
				if (sp.hasOwnProperty(num)) {
					var match = C.MatchManager.matchHash[num];
					if (match && C.Rule.inArray(match, that.showMatch)) {
						match.setSp(sp[num].split(","))
					}
				}
			}
		},
		updateOneSp : function(sp, match) {
			var that = this;
			if (!sp) {
				return
			}
			for (var num in sp) {
				if (sp.hasOwnProperty(num)) {
					if (match && match.getNum() == num) {
						match.setSp(sp[num].split(","))
					}
				}
			}
		},
		validateTip : function() {
			var that = this;
			var orderList = domCache.getOne("#orderList"), tip = domCache
					.getOne(".selectRace .tip"), stopSale = domCache
					.getOne(".selectRace .stopSale");
			var minRaceNo = 2;
			C.DataCache.containDg && (minRaceNo = 1);
			if (that.selMatchCount >= minRaceNo) {
				tip.addClass("hidden");
				stopSale.removeClass("hidden")
			} else {
				tip.removeClass("hidden");
				stopSale.addClass("hidden")
			}
		},
		update : function() {
			var that = this;
			if (!that.passCheckboxs) {
				that._initPassType()
			}
			that.getDanSelMatch();
			that.validateTip();
			var selPassTypes = that.selPassTypes;
			selPassTypes.length = 0;
			var passTypeObj = C.Rule.getPassTypeObj(), allPassTypeObj = C.Rule
					.getAllPassTypeObj();
			domCache.getAll("#" + that.curPassType + "Type input").each(
					function(checkbox) {
						if (that.curPassType == "all") {
							passTypeObj = allPassTypeObj
						}
						if (checkbox.get("value").charAt(0) == "\u5355") {
							var firstNum = 1
						} else {
							var firstNum = Number(checkbox.get("value")
									.match(/\d*/gi)[0])
						}
						if (firstNum > that.selMatchCount) {
							checkbox.set("checked", false);
							checkbox.ancestor("li").addClass("hidden")
						} else {
							checkbox.ancestor("li").removeClass("hidden");
							checkbox.set("disabled", false)
						}
						var label = checkbox.get("parentNode");
						if (checkbox.get("checked")) {
							selPassTypes.push(checkbox.get("value"));
							label.addClass("checked")
						} else {
							label.removeClass("checked")
						}
					});
			if (selPassTypes[0]) {
				var m = passTypeObj[selPassTypes[0]][0], firstNum = selPassTypes[0]
						.charAt(0) == "\u5355" ? 1 : Number(selPassTypes[0]
						.charAt(0));
				if (m == 1 || firstNum == that.selMatchCount) {
					Y.Array.each(that.matches, function(match) {
								match.disableDan(true)
							});
					that.danCount = 0
				} else {
					if (that.danCount + 1 == m) {
						Y.Array.each(that.matches, function(match) {
									if (!match.isDan()) {
										match.disableDan(true)
									}
								})
					} else {
						if (that.danCount >= m) {
							Y.Array.each(that.matches, function(match) {
										match.setDan(false)
									});
							that.danCount = 0
						}
					}
				}
			} else {
				if (that.danCount >= that.selMatchCount) {
					Y.Array.each(that.matches, function(match) {
								match.disableDan(false);
								match.setDan(false)
							});
					that.danCount = 0
				} else {
					if (that.danCount + 1 == that.selMatchCount) {
						Y.Array.each(that.matches, function(match) {
									if (!match.isDan()) {
										match.disableDan(true)
									}
								})
					}
				}
			}
			for (var i = 0, len = that.passCheckboxs.length; i < len; i++) {
				if (passTypeObj[that.passCheckboxs[i].get("value")][0] <= that.danCount) {
					that.passCheckboxs[i].set("disabled", true)
				} else {
					break
				}
			}
			for (var i = 0, len = that.allPassCheckboxs.length; i < len; i++) {
				if (allPassTypeObj[that.allPassCheckboxs[i].get("value")][0] <= that.danCount) {
					that.allPassCheckboxs[i].set("disabled", true)
				} else {
					break
				}
			}
			domCache.getOne(".selMatchCount em").set("innerHTML",
					that.selMatchCount);
			that.ticketCount = C.Rule.calculateAllCount(selPassTypes);
			that.setTotalCount();
			that.setTotalAmount();
			C.BonusDetail.init()
		},
		delayUpdate : function() {
			var that = this;
			setTimeout(function() {
						that.update()
					}, 0)
		},
		_handleDeselect : function(target) {
			var that = this;
			var matchIndex = target.getAttribute("data-matchindex"), ballIndex = target
					.getAttribute("data-ballindex");
			that.matches[matchIndex].deselect(ballIndex);
			that.update()
		},
		_handleRemove : function(target) {
			var that = this;
			var matchIndex = target.ancestor("li")
					.getAttribute("data-matchindex");
			that.matches[matchIndex].deselectAll();
			that.update()
		},
		clearFreedomPass : function() {
			var that = this;
			Y.Array.each(that.passCheckboxs, function(n) {
						n.set("checked", false);
						n.get("parentNode").removeClass("checked")
					})
		},
		clearAllPass : function() {
			var that = this;
			Y.Array.each(that.allPassCheckboxs, function(n) {
						n.set("checked", false);
						n.get("parentNode").removeClass("checked")
					})
		},
		clearPass : function() {
			var that = this;
			if (that.curPassType == "freedom") {
				that.clearAllPass()
			} else {
				if (that.curPassType == "all") {
					that.clearFreedomPass()
				}
			}
		},
		_initPassType : function() {
			var that = this;
			if (that.passCheckboxs) {
				return
			}
			var passTypeObj = C.Rule.getPassTypeObj(), allPassTypeObj = C.Rule
					.getAllPassTypeObj(), freedomType = domCache
					.getAll("#freedomType"), allType = domCache
					.getAll("#allType");
			var passCheckboxs = that.passCheckboxs = [], allPassCheckboxs = that.allPassCheckboxs = [];
			var fragment = Y.one(document.createDocumentFragment()), allFragment = Y
					.one(document.createDocumentFragment());
			for (var p in passTypeObj) {
				if (passTypeObj.hasOwnProperty(p)) {
					var li = Y.Node
							.create('<li class="hidden"><span><input type="checkbox" value="'
									+ p + '" /> ' + p + "</span></li>");
					fragment.append(li);
					var checkbox = li.one('input[type="checkbox"]');
					passCheckboxs.push(checkbox)
				}
			}
			for (var p in allPassTypeObj) {
				if (allPassTypeObj.hasOwnProperty(p)) {
					var li = Y.Node
							.create('<li class="hidden"><span><input type="checkbox" value="'
									+ p + '" /> ' + p + "</span></li>");
					allFragment.append(li);
					var checkbox = li.one('input[type="checkbox"]');
					allPassCheckboxs.push(checkbox)
				}
			}
			freedomType.append(fragment);
			allType.append(allFragment);
			var lis = domCache.getAll("#passTypeTab .tabNav li"), contents = domCache
					.getAll("#passTypeTab .tabPannel");
			lis.on("click", function(e) {
						var target = e.currentTarget, index = lis
								.indexOf(target);
						that.curPassType = target.getAttribute("rel");
						that.clearPass();
						lis.removeClass("current");
						target.addClass("current");
						contents.addClass("hidden");
						contents.item(index).removeClass("hidden");
						that.delayUpdate()
					});
			freedomType.concat(allType).on("click", function(e) {
						var target = e.target, bUpdate = false;
						if (target.getAttribute("type") == "checkbox") {
							bUpdate = true;
							target.get("parentNode").addClass("checked")
						} else {
							if (target.get("tagName") == "SPAN") {
								var obj = target.one("input");
								if (!obj.get("disabled")) {
									obj.set("checked", !obj.get("checked"));
									bUpdate = true;
									target.addClass("checked")
								}
							}
						}
						if (bUpdate) {
							that.delayUpdate()
						}
					})
		},
		upStopTime : function(node) {
			var that = this;
			if (typeof node == "string") {
				C.Rule.delArrayVal(C.DataCache.StopTime, node)
			} else {
				var tr = node.ancestor("tr"), balls = node
						.ancestor(".balllist").all(".ball");
				var curTime = tr.getAttribute("rel");
				var i = 0;
				balls.each(function(n) {
							if (n.hasClass("selected")) {
								i++
							}
						});
				if (i > 0) {
					C.DataCache.StopTime.push(curTime)
				} else {
					if (C.DataCache.StopTime.length > 0) {
						C.Rule.delArrayVal(C.DataCache.StopTime, curTime)
					}
				}
			}
			var earlytime = C.Rule.getEarlyTime(C.DataCache.StopTime);
			domCache.getOne(".selectRace .stopSale em").set("innerHTML",
					earlytime)
		},
		toggleColumn : function(index) {
			var that = this, num = 0, allBalls = that.allBalls;
			var _hiddenRace = [];
			Y.Array.each(C.DataCache.hiddenRace, function(n) {
						_hiddenRace.push(that.matches[n])
					});
			var showMatch = C.Rule.subArray(that.matches.concat(), _hiddenRace);
			for (var i = 0, len = showMatch.length; i < len; i++) {
				if (C.Rule.inArray(index, showMatch[i].selectedArray)) {
					num++
				}
			}
			if (num == showMatch.length) {
				for (var i = index, len = allBalls.size(); i < len; i += C.DataCache.ballNo) {
					var ball = allBalls.item(i);
					if (ball.ancestor("tr").hasClass("hidden")) {
						continue
					}
					ball.removeClass("selected");
					that.matches[ball.getAttribute("data-matchindex")]
							.deselect(ball.getAttribute("data-ballindex"));
					that.update();
					that.upStopTime(ball)
				}
			} else {
				for (var i = index, len = allBalls.size(); i < len; i += C.DataCache.ballNo) {
					var ball = allBalls.item(i);
					if (ball.ancestor("tr").hasClass("hidden")) {
						continue
					}
					if (ball.hasClass("selected")) {
						continue
					}
					ball.addClass("selected");
					that.matches[ball.getAttribute("data-matchindex")]
							.select(ball.getAttribute("data-ballindex"));
					that.update();
					that.upStopTime(ball)
				}
			}
		},
		ballCallback : function(obj) {
			var that = this, _obj = obj.get("parentNode");
			var match = that.matches[_obj.getAttribute("data-matchindex")];
			if (match) {
				var ballIndex = _obj.getAttribute("data-ballindex");
				if (_obj.hasClass("selected")) {
					match.deselect(ballIndex)
				} else {
					match.select(ballIndex)
				}
				that.delayUpdate();
				that.upStopTime(_obj)
			}
		},
		initAllMatch : function() {
			var i = 0, that = this;
			domCache.getAll("#raceMain .ballLine").each(function(n) {
						var match = new C.Match(n, i);
						that.matches.push(match);
						that.matchHash[match.getNum()] = match;
						i++
					});
			if (C.DataCache.isbf) {
				that.showMatch.push(that.matches[0])
			}
		},
		init : function() {
			var that = this;
			Y.on("contentready", function() {
						that.allBalls = Y.all("#raceMain .balllist .ball");
						if (domCache.getAll(".raceTitle .toggleColumn")) {
							domCache.getAll(".raceTitle .toggleColumn").on(
									"click", function(e) {
										var obj = e.currentTarget;
										var index = domCache
												.getAll(".raceTitle .toggleColumn")
												.indexOf(obj);
										that.toggleColumn(index)
									})
						}
						that.initAllMatch();
						domCache.getOne("#raceMain").on("click", function(e) {
									var obj = e.target;
									if (obj.get("parentNode").hasClass("ball")) {
										that.ballCallback(obj)
									}
									if (C.DataCache.isbf) {
										that.selectDonkeyman(obj)
									}
								})
					}, "#raceMain");
			Y.on("available", function() {
						domCache.getOne("#orderList").on("click", function(e) {
							var target = e.target;
							if (target.get("type") == "checkbox") {
								that.matches[target.get("value")].setDan(target
										.get("checked"));
								that.delayUpdate()
							} else {
								if (target.get("tagName") == "A"
										&& target.ancestor(".selBall")) {
									e.halt();
									that._handleDeselect(target
											.get("parentNode"))
								} else {
									if (target.hasClass("closeRace")) {
										that._handleRemove(target);
										C.MatchManager.upStopTime(target
												.getAttribute("rel"))
									}
								}
							}
						})
					}, "#orderList");
			Y.on("domready", function() {
						that._initPassType()
					})
		}
	}, true);
	C.Donkeyman = {
		gtime : 15,
		init : function() {
			var that = this;
			var needRaceNo = 0;
			Y.on("contentready", function() {
				domCache.getOne("#submitPay").on("click", function(e) {
					e.halt();
					if (e.target.hasClass("nopay")) {
						return
					}
					var stopTime = C.Rule.getEarlyTime(C.DataCache.StopTime), stop = C.Rule
							._getTime(stopTime), now = new Date(), arr = [];
					if (now >= stop) {
						Y.Array.each(C.MatchManager.matches, function(match) {
							if (match.selectedArray.length == 0) {
								return
							}
							if (C.Rule._getTime(match.tr.getAttribute("rel")) <= now) {
								arr.push(match.tr.one(".num").get("innerHTML"))
							}
						});
						Y.Box
								.alert(arr.join("\u3001")
										+ "\u6295\u6ce8\u5df2\u622a\u6b62\uff0c\u8bf7\u9009\u62e9\u5176\u4ed6\u6bd4\u8d5b\u6295\u6ce8");
						return
					}
					needRaceNo = C.DataCache.containDg ? 1 : 2;
					if (C.MatchManager.selMatchCount < needRaceNo) {
						Y.Box.alert("\u8bf7\u81f3\u5c11\u9009\u62e9"
								+ needRaceNo + "\u573a\u6bd4\u8d5b\uff01");
						return
					} else {
						if (C.MatchManager.selPassTypes.length <= 0) {
							Y.Box
									.alert("\u8bf7\u9009\u62e9\u8fc7\u5173\u65b9\u5f0f\uff01");
							return
						}
					}
					if (domCache.getOne("#multiple").get("value") == "") {
						Y.Box
								.alert("\u8bf7\u8f93\u5165\u6295\u6ce8\u500d\u6295\u6570\uff01");
						return
					}
					C.DataCache.orderType = "DG";
					C.SubmitOrder._submit()
				});
				domCache.getOne("#makeGroupOrder").on("click", function(e) {
							e.halt();
							if (e.target.hasClass("nogroup")) {
								return
							}
							that.groupObj = domCache.getOne("#mkGroupOrder");
							var canGroup = that.checkGroup();
							if (!canGroup) {
								return
							}
							that.show();
							that.lazyRender(that.groupObj);
							Y.use("groupOrder", function(Y) {
										C.GroupOrder
												.init(C.DataCache.lotteryName)
									});
							C.DataCache.orderType = "HM"
						});
				domCache.getOne("#multiple").on("keyup", function(e) {
							var target = e.currentTarget, reg = /\D/g;
							target.set("value", target.get("value").replace(
											reg, ""));
							C.MatchManager.setTotalAmount();
							C.BonusDetail.init()
						})
			}, ".confirmPay")
		},
		show : function() {
			var that = this, mask = that.mask = domCache.getOne("#maskPannel"), forSelect = that.forSelect = domCache
					.getOne("#forSelect"), docHeight = Y.one(document)
					.get("docHeight"), winHeight = Y.one(window)
					.get("winHeight"), scrollY = Y.one(document)
					.get("docScrollY");
			Y.one("html").setStyles({
						height : winHeight + "px",
						overflow : "hidden"
					}).set("scrollTop", scrollY);
			mask.setStyle("height", docHeight + "px").removeClass("hidden");
			if (Y.UA.ie == "6") {
				forSelect.setStyle("height", docHeight + "px")
						.removeClass("hidden")
			}
			that.groupObj.setStyle("top",
					scrollY + (winHeight - 512) / 2 + "px")
					.removeClass("hidden")
		},
		hid : function() {
			var that = this, scrollY = Y.one(document).get("docScrollY");
			Y.one("html").setStyles({
						height : "auto",
						overflow : "auto"
					}).set("scrollTop", scrollY);
			that.mask.addClass("hidden");
			that.forSelect.addClass("hidden");
			that.groupObj.addClass("hidden")
		},
		lazyRender : function(node) {
			if (node.getAttribute("loaded") == "true") {
				return
			}
			node.setAttribute("loaded", "true");
			var str = node.one("xmp").get("innerHTML");
			node.append(Y.Node.create("<div>" + str + "</div>"))
		},
		checkGroup : function() {
			var that = this, sta = false, totalAmount = Number(domCache
					.getOne("#betFee").get("innerHTML"));
			if (totalAmount < 8) {
				Y.Box
						.alert("\u5408\u4e70\u91d1\u989d\u4e0d\u80fd\u5c11\u4e8e8\u5143\uff01")
			} else {
				sta = true
			}
			return sta
		}
	};
	C.RaceFilter = {
		init : function() {
			var that = this;
			Y.on("contentready", function() {
						domCache.getAll(".adjustHandle input").set("checked",
								true);
						that.bindHidOne();
						that.bindShowAll();
						that.bindLeague();
						that.bindAdjusted();
						that.bindDay()
					}, "#raceMain")
		},
		bindDay : function() {
			var that = this;
			domCache.getOne("#raceMain").on("click", function(e) {
				var obj = e.target;
				if (obj.hasClass("ctrlShow")) {
					obj.set("innerHTML", "\u663e\u793a");
					obj.addClass("ctrlHid").removeClass("ctrlShow");
					domCache.getOne("#raceMain ." + obj.getAttribute("rel"))
							.all("tr").each(function(tr) {
										that.hidOne(tr)
									});
					domCache.getOne("#raceMain table").setStyle("height", "1%");
					if (Y.UA.ie == 6) {
						setTimeout(function() {
							var raceTitle = domCache.getOne(".raceTitle");
							if (raceTitle.hasClass("raceTitFix")) {
								var scroll = Y.one("window").get("scrollTop"), gapY = C.Ancillary._gapY;
								if (scroll >= gapY) {
									raceTitle.setStyle("top", scroll - gapY
													+ 37 + "px")
								} else {
									raceTitle.removeClass("raceTitFix");
									raceTitle.setStyle("top", "")
								}
							}
						}, 50)
					}
				} else {
					if (obj.hasClass("ctrlHid")) {
						obj.set("innerHTML", "\u9690\u85cf");
						obj.addClass("ctrlShow").removeClass("ctrlHid");
						domCache
								.getOne("#raceMain ." + obj.getAttribute("rel"))
								.all("tr").each(function(tr) {
											that.showOne(tr)
										})
					}
				}
			})
		},
		bindAdjusted : function() {
			var that = this, adjust = that.adjust = [], notAdjust = that.notAdjust = [];
			if (!C.DataCache.hasAdjust) {
				return
			}
			domCache.getAll("#raceMain tbody tr").each(function(n) {
						if (n.one(".adjust").get("innerHTML") == 0) {
							notAdjust.push(n)
						} else {
							adjust.push(n)
						}
					});
			var _sta = true;
			domCache.getAll(".adjustHandle span").on("click", function(e) {
						var obj = e.target;
						C.DataCache.hiddenRace.length = 0;
						if (obj.get("tagName").toLowerCase() == "em") {
							var _input = obj.get("parentNode").one("input");
							if (!_input.get("checked")) {
								_input.set("checked", true)
							} else {
								_input.set("checked", false)
							}
						}
						var inputs = domCache.getAll(".adjustHandle input");
						if (inputs.item(0).get("checked")) {
							that.renderAdjust("show")
						} else {
							that.renderAdjust("hid")
						}
						if (inputs.item(1).get("checked")) {
							that.renderNotAdjust("show")
						} else {
							that.renderNotAdjust("hid")
						}
						if (Y.UA.ie == 7 || Y.UA.ie == 8) {
							if (_sta) {
								_sta = false;
								domCache.getOne("#raceMain").setStyles({
											overflow : "hidden",
											height : ""
										})
							} else {
								_sta = true;
								domCache.getOne("#raceMain").setStyles({
											overflow : "",
											height : "100%"
										})
							}
						}
					})
		},
		bindLeague : function() {
			var that = this;
			that.selMain = domCache.getOne("#selRacheMain");
			domCache.getOne("#selRace .trigEl").on("click", function(e) {
						var obj = e.currentTarget;
						domCache.getOne("#selTimeMain").addClass("hidden");
						domCache.getOne("#selTime .trigEl")
								.removeClass("toggleBg");
						if (!obj.hasClass("toggleBg")) {
							that.selMain.removeClass("hidden");
							C.Donkeyman.lazyRender(that.selMain);
							obj.addClass("toggleBg");
							if (Y.one("#leagues")) {
								return
							}
							setTimeout(function() {
										Y.use("filterRaceByLeague",
												function(Y) {
													C.FilterRaceByLeague.init()
												})
									}, 0)
						} else {
							if (obj.hasClass("toggleBg")) {
								obj.removeClass("toggleBg");
								that.selMain.addClass("hidden")
							}
						}
					})
		},
		renderAdjust : function(state) {
			var that = this;
			Y.Array.each(that.adjust, function(v) {
						eval("that." + state + "One(v)")
					})
		},
		renderNotAdjust : function(state) {
			var that = this;
			Y.Array.each(that.notAdjust, function(v) {
						eval("that." + state + "One(v)")
					})
		},
		bindHidOne : function() {
			var that = this;
			domCache.getOne("#raceMain").on("click", function(e) {
						var obj = e.target;
						if (obj.hasClass("hid")) {
							that.hidOne(obj.ancestor("tr"))
						}
					})
		},
		hidOne : function(tr) {
			var that = this;
			tr.addClass("hidden");
			if (tr.one(".balllist .ball")) {
				var _index = tr.one(".balllist .ball")
						.getAttribute("data-matchindex")
			} else {
				var _index = tr.one("xmp").getAttribute("data-matchindex")
			}
			if (!C.Rule.inArray(_index, C.DataCache.hiddenRace)) {
				C.DataCache.hiddenRace.push(_index)
			}
			that.upHidNo()
		},
		justHidOne : function(tr) {
			var that = this;
			tr.addClass("hidden")
		},
		showOne : function(tr) {
			var that = this;
			tr.removeClass("hidden");
			if (tr.one(".balllist .ball")) {
				var _index = tr.one(".balllist .ball")
						.getAttribute("data-matchindex")
			} else {
				var _index = tr.one("xmp").getAttribute("data-matchindex")
			}
			C.Rule.delArrayVal(C.DataCache.hiddenRace, _index);
			that.upHidNo()
		},
		bindShowAll : function() {
			var that = this, trig = domCache.getOne("#showAllRace");
			trig.on("click", function(e) {
						if (C.DataCache.hiddenRace.length == 0) {
							return
						}
						that.showAll();
						that.upHidNo()
					})
		},
		showAll : function() {
			var that = this, trs = domCache.getAll("#raceMain tbody tr");
			Y.Array.each(C.DataCache.hiddenRace, function(n) {
						trs.item(Number(n)).removeClass("hidden")
					});
			if (Y.one("#leagues")) {
				domCache.getAll("#leagues input").set("checked", true)
			}
			if (domCache.getOne(".fiveRace input")) {
				domCache.getAll(".fiveRace input").set("checked", false)
			}
			domCache.getAll(".adjustHandle input").set("checked", true);
			domCache.getAll("#raceMain .hidDay").addClass("ctrlShow")
					.removeClass("ctrlHid").set("innerHTML", "\u9690\u85cf");
			C.DataCache.hiddenRace.length = 0
		},
		upHidNo : function() {
			var that = this, no = C.DataCache.hiddenRace.length;
			if (no == 0) {
				domCache.getOne("#hidRace").addClass("visHidden");
				return
			} else {
				domCache.getOne("#hidRace").removeClass("visHidden")
			}
			domCache.getOne("#hidRace em").set("innerHTML", no)
		}
	};
	C.SubmitOrder = {
		_submit : function() {
			var that = this, one = domCache.getOne;
			if (C.DataCache.maxMultiple) {
				var mul = Number(one("#multiple").get("value"));
				if (mul > C.DataCache.maxMultiple) {
					Y.Box
							.alert("\u6295\u6ce8\u500d\u6295\u4e0d\u5f97\u8d85\u8fc7"
									+ C.DataCache.maxMultiple + "\u500d\uff01");
					return
				}
			}
			if (C.DataCache.maxFee) {
				var fee = Number(one("#betFee").get("innerHTML"));
				if (fee > C.DataCache.maxFee) {
					Y.Box
							.alert("\u6295\u6ce8\u91d1\u989d\u4e0d\u5f97\u8d85\u8fc7"
									+ C.DataCache.maxFee + "\u5143!");
					return
				}
			}
			var orderForm = one("#orderForm");
			C.Donkeyman.lazyRender(orderForm);
			setTimeout(function() {
						that.fillForm();
						Y.Node.getDOMNode(orderForm).submit()
					}, 0)
		},
		fillForm : function() {
			var that = this, one = domCache.getOne;
			var orderForm = that.orderForm = one("#orderForm"), numstring = one("#number_strings"), multiple = one("#_multiple"), total_num = one("#total_num"), total_fee = one("#total_fee"), order_type = one("#order_type"), scheme = one("#scheme"), _perFee = one("#_perFee"), schemeTitle = one("#schemeTitle"), schemeDesc = one("#schemeDesc"), profitPct = one("#profitPct"), totalShare = one("#totalShare"), shareCnt = one("#shareCnt"), _open = one("#_open"), reserveShare = one("#reserveShare");
			numstring.set("value", that.getString());
			multiple.set("value", one("#multiple").get("value"));
			total_num.set("value", one("#betNum").get("innerHTML"));
			total_fee.set("value", one("#betFee").get("innerHTML"));
			if (C.DataCache.orderType == "DG") {
				order_type.set("value", 0)
			} else {
				if (C.DataCache.orderType == "HM") {
					order_type.set("value", 1)
				}
			}
			if (C.GroupOrder) {
				scheme.set("value", 1);
				_perFee.set("value", one("#mkGroupOrder .s4 .fee")
								.get("innerHTML").replace("\uffe5", ""));
				schemeTitle.set("value", C.GroupOrder.title.get("value"));
				schemeDesc.set("value", C.GroupOrder.declaration.get("value"));
				profitPct.set("value", C.GroupOrder.brokerage.get("value"));
				totalShare.set("value", C.GroupOrder.splitnum.get("value"));
				shareCnt.set("value", C.GroupOrder.buynum.get("value"));
				domCache.getAll('#mkGroupOrder input[type="radio"]').each(
						function(n) {
							if (n.get("checked")) {
								_open.set("value", n.get("value"))
							}
						});
				reserveShare.set("value", one("#mkGroupOrder .minnum")
								.get("value"));
				if (C.YCHMOrderData) {
					var oForm = Y.Node.getDOMNode(orderForm);
					Y.Object.each(C.YCHMOrderData, function(v, k) {
								if (oForm[k]) {
									oForm[k].value = v
								} else {
									var ipt = document.createElement("input");
									ipt.type = "hidden";
									ipt.name = k;
									ipt.value = v;
									oForm.appendChild(ipt)
								}
							})
				}
			}
		},
		getString : function() {
			var strArr = [];
			Y.Array.each(C.MatchManager.matches, function(match) {
						if (match.selectedArray.length == 0) {
							return
						}
						var s = match.getNum();
						if (match.isDan()) {
							s += "#"
						}
						s += ":";
						var ballArr = [];
						Y.Array.each(match.selectedArray.sort(), function(
										ballIndex) {
									ballArr.push(match.ballValue[ballIndex])
								});
						s += ballArr.join(",");
						strArr.push(s)
					});
			var strArr = [strArr.join("/"), "_"];
			var passArr = [];
			Y.Array.each(C.MatchManager.selPassTypes, function(passType) {
						if (passType == "\u5355\u5173") {
							passArr.push("1")
						} else {
							passArr.push(passType.replace("\u4e32", "*"))
						}
					});
			strArr.push(passArr.join("^"));
			return strArr.join("")
		}
	};
	C.Ancillary = {
		init : function() {
			var that = this;
			Y.on("domready", function() {
						that.returnTop();
						that.raceTitle();
						if (Y.UA.ie == 6) {
							that.trHover();
							that.ballHover()
						}
						that.bindSwitchTime();
						that._floatip();
						new Y.Lazyload(Y.all("textarea.lazyrender"))
					})
		},
		_floatip : function() {
			var that = this;
			new Y.Floatip(Y.all(".floatip"), {
						floatip_class : "float-tip"
					})
		},
		_gapY : 0,
		raceTitle : function() {
			var that = this;
			var raceTitle = domCache.getOne(".raceTitle"), raceMain = domCache
					.getOne("#raceMain"), gapY = raceTitle.getY();
			that._gapY = gapY;
			var timer = null;
			Y.one(window).on("scroll", function(e) {
				clearTimeout(timer);
				timer = setTimeout(function() {
							var obj = e.currentTarget;
							if (obj.get("scrollTop") >= gapY) {
								raceTitle.addClass("raceTitFix");
								raceMain.setStyle("marginTop", "40px");
								if (Y.UA.ie == 6) {
									raceTitle.setStyle("top", Y.one(window)
													.get("scrollTop")
													- gapY + 38)
								}
							} else {
								raceTitle.removeClass("raceTitFix");
								raceMain.setStyle("marginTop", "0")
							}
						}, 100)
			})
		},
		returnTop : function() {
			var that = this, timer = null;
			var returnTop = domCache.getOne("#returnTop");
			Y.one(window).on("scroll", function(e) {
				clearTimeout(timer);
				timer = setTimeout(function() {
							var obj = e.currentTarget;
							if (obj.get("scrollTop") == 0) {
								returnTop.addClass("hidden")
							} else {
								returnTop.hasClass("hidden")
										&& returnTop.removeClass("hidden")
							}
						}, 100)
			})
		},
		trHover : function() {
			var that = this;
			var trs = domCache.getAll("#raceMain tbody tr");
			trs.on("mouseenter", function(e) {
						var obj = e.currentTarget;
						obj.addClass("trhover")
					});
			trs.on("mouseleave", function(e) {
						var obj = e.currentTarget;
						obj.removeClass("trhover")
					})
		},
		ballHover : function() {
			var that = this;
			var balls = domCache.getAll("#raceMain .balllist .ball");
			balls.on("mouseenter", function(e) {
						var obj = e.currentTarget;
						obj.addClass("hover")
					});
			balls.on("mouseleave", function(e) {
						var obj = e.currentTarget;
						obj.removeClass("hover")
					})
		},
		bindSwitchTime : function() {
			var that = this;
			var times = domCache.getAll("#selTimeMain li input"), type = "", trigger = domCache
					.getOne("#selTime .trigEl");
			var typeobj = {
				stoptime : "\u505c\u552e\u65f6\u95f4",
				racetime : "\u6bd4\u8d5b\u65f6\u95f4"
			};
			trigger.on("click", function(e) {
						var obj = e.currentTarget;
						that.switchTime(obj);
						domCache.getOne("#selRacheMain").addClass("hidden");
						domCache.getOne("#selRace .trigEl")
								.removeClass("toggleBg")
					});
			times.on("click", function(e) {
						var obj = e.currentTarget;
						times.set("checked", false);
						obj.set("checked", true);
						that.selMain.addClass("hidden");
						that.prenode.removeClass("extrabor");
						trigger.removeClass("toggleBg");
						type = obj.get("value");
						trigger.one("span").set("innerHTML", typeobj[type]);
						domCache.getAll("#raceMain .ballLine .time").each(
								function(n) {
									n.set("innerHTML", n.getAttribute(type))
								})
					})
		},
		switchTime : function(obj) {
			var that = this;
			var prenode = that.prenode = obj.ancestor("ul").one(".li-num"), selMain = that.selMain = domCache
					.getOne("#selTimeMain");
			if (!obj.hasClass("toggleBg")) {
				obj.addClass("toggleBg");
				prenode.addClass("extrabor");
				selMain.removeClass("hidden")
			} else {
				obj.removeClass("toggleBg");
				prenode.removeClass("extrabor");
				selMain.addClass("hidden")
			}
		}
	}
});
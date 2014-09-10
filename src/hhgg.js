YUI.add("jczq-common", function(a) {
	C.JCZQ = {
		nodeMatchTitle : null,
		nodeTimeHandle : null,
		nodeBasket : null,
		nodeBasketContent : null,
		nodeBasketHandle : null,
		nodePassType : null,
		nodeBetTip : null,
		tipInfo : "\u8bf7\u81f3\u5c11\u9009\u62e9<em></em>\u573a\u6bd4\u8d5b\u8fdb\u884c\u6295\u6ce8",
		nodeViewBet : null,
		init : function(c) {
			c = c || {};
			var b = this;
			a.on("contentready", function() {
						b.initView(c)
					}, ".mainbody")
		},
		initView : function(b) {
			var c = this.loadFromDOM();
			this.initMatchManager(b, c);
			this.initTimeSwitch();
			this.initFilter();
			this.initBasket(b);
			this.refreshBasketPosition();
			this.initOrder(b);
			this.initTip()
		},
		loadFromDOM : function() {
			var j = {}, b = this.nodeMatchList = a.one("#MatchList"), o = b
					.all("tbody tr"), c = j.matches = [], n = j.nodes = [], m = C.SMatch, r = 0, l = o
					.size(), t, u;
			for (; r < l; ++r) {
				t = o.item(r);
				u = t.getAttribute("matchId");
				var e = t.one(".game"), p = t.one(".time"), k = t.one(".win"), q = t
						.one(".loss"), f = q.one("span"), h = k.one("span"), g = t
						.one(".home-team"), d = t.one(".visit-team"), s = t
						.one(".concede em");
				c[r] = new m({
					expired : t.hasClass("expired"),
					date : t.getAttribute("date"),
					matchId : u,
					gameName : e.get("text"),
					matchName : t.one(".num").get("text"),
					matchTime : new Date(parseInt(p.getAttribute("matchTime"))),
					stopTime : new Date(parseInt(p.getAttribute("stopTime"))),
					hostTeam : g.one("a").get("text"),
					visitTeam : d.one("a").get("text"),
					concede : s ? parseFloat(s.get("text")) : 0,
					sp : [parseFloat(f.get("text")), parseFloat(h.get("text"))],
					index : r
				});
				n[r] = {
					row : t,
					game : e,
					time : p,
					team : [d, g],
					bet : [q, k],
					sp : [f, h],
					dan : t.one(".dan input")
				}
			}
			return j
		},
		initMatchManager : function(d, i) {
			var g = this.nodeMatchTitle = a.one("#MatchTitle"), f = this.nodeMatchList, h = C.SMatchView, b = a
					.one("#ToggleExpired"), c = this, i, e;
			e = {
				syncTeam : d.syncTeam == undefined ? true : d.syncTeam,
				expiredVisible : d.expiredVisible,
				nodeMatchTitle : g,
				nodeMatchList : f,
				nodeMatches : i.nodes,
				nodeShowAll : a.one("#showAllRace"),
				nodeViewExpiredChk : b ? b.one("input") : null,
				nodeViewExpiredTxt : b ? b.one("em") : null,
				nodeHiddenCount : a.one("#hidRace"),
				nodeReturnTop : a.one("#ReturnTop")
			};
			if (d.getSPIndex) {
				e.getSPIndex = d.getSPIndex
			}
			h.init(e);
			h.on("clickOnMatchRow", function(k) {
						var j = k.nodeTarget.ancestor();
						if (j.hasClass("visit-team") || j.hasClass("home-team")) {
							k.preventDefault()
						}
					});
			h.on("matchdisplayswitch", function(j) {
				if (!C.SMatchView.matchesHidden.length
						&& C.SBasket.matches.length != C.SMatchManager.matches.length) {
					c.refreshSelectedViewButton(false)
				}
			});
			C.SMatchManager.init({
						matches : i.matches,
						spUrl : d.spUrl,
						spInterval : d.spInterval,
						view : h
					});
			return h
		},
		initTimeSwitch : function() {
			var c = this, d = this.nodeMatchTitle, e = this.nodeTimeHandle = d
					.one("#TimeTitle"), b;
			e.on("click", function(g) {
						g.stopPropagation();
						var f = g.currentTarget, h = !f.hasClass("active");
						C.SMatchView.hideAllPopBox();
						c.toggleTimeSelectionBox(h)
					});
			e = d.one("#TimeSelectBox").one("ul");
			e.on("click", function(f) {
						f.stopPropagation()
					});
			b = e.all("li");
			b.on("click", function(h) {
						var f = h.currentTarget, g = f.one("input");
						g.set("checked", true);
						c.switchTimeDisplay(g.get("value"), f.one("div")
										.get("text"));
						c.toggleTimeSelectionBox(false)
					});
			b.item(1).one("input").set("checked", true);
			C.SMatchView.addPopBox(this)
		},
		hidePopBox : function() {
			this.toggleTimeSelectionBox(false)
		},
		toggleTimeSelectionBox : function(c) {
			var b = this.nodeTimeHandle;
			if (c) {
				b.addClass("active")
			} else {
				b.removeClass("active")
			}
		},
		switchTimeDisplay : function(f, d) {
			var g = C.SMatchManager.matches, c = g.length, e = C.SMatchView, b;
			for (; --c > -1;) {
				if (e) {
					b = g[c];
					e.setTime(b.index, b[f])
				}
			}
			this.nodeTimeHandle.all("span").set("text", d)
		},
		initFilter : function() {
			var f = C.SMatchView, g = C.SMatchManager.matches, b = C.SColumnFilter, e = this.nodeMatchTitle, c, d;
			c = {
				view : f,
				matches : g
			};
			C.SGroupFilter.init(c);
			d = this.columnFilters = [];
			d[0] = new b({
						view : f,
						matches : g,
						filterProperty : "gameName",
						nodeHandle : e.one("#GameTitle"),
						nodeBox : e.one("#GameSelectBox"),
						nodeChkContainer : e.one("#GameType")
					})
		},
		initBasket : function(f) {
			var n = this, l = C.SBasket, m = this.nodeBasket = a
					.one("#BetBasket"), i = this.nodePassType = m
					.one("#PassType"), c = f.minBetCount || 1, g = f.singlePassType, j;
			j = {
				awardPercentage : f.awardPercentage || 65,
				maxMultiple : f.maxMultiple || 99999,
				passTypes : g ? [{
							name : "\u5355\u5173",
							node : m.one("#PassType1x1"),
							m : 1,
							n : 1
						}] : [{
							name : "2\u4e321",
							node : m.one("#PassType2x1"),
							m : 2,
							n : 1
						}, {
							name : "3\u4e321",
							node : m.one("#PassType3x1"),
							m : 3,
							n : 1
						}, {
							name : "4\u4e321",
							node : m.one("#PassType4x1"),
							m : 4,
							n : 1
						}, {
							name : "5\u4e321",
							node : m.one("#PassType5x1"),
							m : 5,
							n : 1
						}, {
							name : "6\u4e321",
							node : m.one("#PassType6x1"),
							m : 6,
							n : 1
						}, {
							name : "7\u4e321",
							node : m.one("#PassType7x1"),
							m : 7,
							n : 1
						}, {
							name : "8\u4e321",
							node : m.one("#PassType8x1"),
							m : 8,
							n : 1
						}, {
							name : "3\u4e323",
							node : m.one("#PassType3x3"),
							m : 3,
							n : 3
						}, {
							name : "3\u4e324",
							node : m.one("#PassType3x4"),
							m : 3,
							n : 4
						}, {
							name : "4\u4e324",
							node : m.one("#PassType4x4"),
							m : 4,
							n : 4
						}, {
							name : "4\u4e325",
							node : m.one("#PassType4x5"),
							m : 4,
							n : 5
						}, {
							name : "4\u4e326",
							node : m.one("#PassType4x6"),
							m : 4,
							n : 6
						}, {
							name : "4\u4e3211",
							node : m.one("#PassType4x11"),
							m : 4,
							n : 11
						}, {
							name : "5\u4e325",
							node : m.one("#PassType5x5"),
							m : 5,
							n : 5
						}, {
							name : "5\u4e326",
							node : m.one("#PassType5x6"),
							m : 5,
							n : 6
						}, {
							name : "5\u4e3210",
							node : m.one("#PassType5x10"),
							m : 5,
							n : 10
						}, {
							name : "5\u4e3216",
							node : m.one("#PassType5x16"),
							m : 5,
							n : 16
						}, {
							name : "5\u4e3220",
							node : m.one("#PassType5x20"),
							m : 5,
							n : 20
						}, {
							name : "5\u4e3226",
							node : m.one("#PassType5x26"),
							m : 5,
							n : 26
						}, {
							name : "6\u4e326",
							node : m.one("#PassType6x6"),
							m : 6,
							n : 6
						}, {
							name : "6\u4e327",
							node : m.one("#PassType6x7"),
							m : 6,
							n : 7
						}, {
							name : "6\u4e3215",
							node : m.one("#PassType6x15"),
							m : 6,
							n : 15
						}, {
							name : "6\u4e3220",
							node : m.one("#PassType6x20"),
							m : 6,
							n : 20
						}, {
							name : "6\u4e3222",
							node : m.one("#PassType6x22"),
							m : 6,
							n : 22
						}, {
							name : "6\u4e3235",
							node : m.one("#PassType6x35"),
							m : 6,
							n : 35
						}, {
							name : "6\u4e3242",
							node : m.one("#PassType6x42"),
							m : 6,
							n : 42
						}, {
							name : "6\u4e3250",
							node : m.one("#PassType6x50"),
							m : 6,
							n : 50
						}, {
							name : "6\u4e3257",
							node : m.one("#PassType6x57"),
							m : 6,
							n : 57
						}, {
							name : "7\u4e327",
							node : m.one("#PassType7x7"),
							m : 7,
							n : 7
						}, {
							name : "7\u4e328",
							node : m.one("#PassType7x8"),
							m : 7,
							n : 8
						}, {
							name : "7\u4e3221",
							node : m.one("#PassType7x21"),
							m : 7,
							n : 21
						}, {
							name : "7\u4e3235",
							node : m.one("#PassType7x35"),
							m : 7,
							n : 35
						}, {
							name : "7\u4e32120",
							node : m.one("#PassType7x120"),
							m : 7,
							n : 120
						}, {
							name : "8\u4e328",
							node : m.one("#PassType8x8"),
							m : 8,
							n : 8
						}, {
							name : "8\u4e329",
							node : m.one("#PassType8x9"),
							m : 8,
							n : 9
						}, {
							name : "8\u4e3228",
							node : m.one("#PassType8x28"),
							m : 8,
							n : 28
						}, {
							name : "8\u4e3256",
							node : m.one("#PassType8x56"),
							m : 8,
							n : 56
						}, {
							name : "8\u4e3270",
							node : m.one("#PassType8x70"),
							m : 8,
							n : 27
						}, {
							name : "8\u4e32247",
							node : m.one("#PassType8x247"),
							m : 8,
							n : 247
						}],
				maxPassType : g ? 1 : 8,
				unitBonus : !g,
				nodeMatchCount : m.one("#SelMatchCount"),
				nodeStopTime : m.one("#StopSaleTime"),
				nodePassType : i,
				nodeBetCount : m.one("#BetCount"),
				nodeAwardCount : m.one("#BetAward"),
				nodeMoneyCount : m.one("#BetMoney"),
				nodeMultipleInput : m.one("#BetMultipleCount"),
				nodeMultipleTip : m.one("#BetMultipleTip"),
				nodeBasket : m
			};
			l.init(j);
			var e = this.nodeBetTip = m.one("#BetHint");
			e.set("innerHTML", f.tipInfo || this.tipInfo);
			e.one("em").set("text", c);
			l.on("passtypedisplayswitch", function(o) {
						n.matchChangeOnBasket()
					});
			l.on("passtypechange", function(o) {
						n.passTypeChangeOnBasket(o.passType, o.selected)
					});
			var b = this.nodeMorePassTypeHandle = m.one("#MorePassTypeHandle");
			if (b) {
				var k = this.nodeChkMorePassType = b.one("input"), h = this.nodeMorePassTypeBox = m
						.one("#MorePassTypeBox");
				b.on("click", function(o) {
							n.toggleMorePassType(h.hasClass("hidden"))
						});
				k.on("click", function(o) {
							o.preventDefault()
						});
				h.one("#BtnCloseMorePass").on("click", function(o) {
							o.preventDefault();
							n.toggleMorePassType(false)
						})
			}
			var d = this.nodeViewBet = m.one("#ViewSelMatch");
			d.on("click", function(p) {
						var o = p.target;
						n.toggleSelectedMatch(o.get("checked"))
					});
			C.SMatchView.on("viewRefresh", function(o) {
						n.refreshBasketPosition()
					});
			return l
		},
		toggleMorePassType : function(e) {
			var b = this.nodeMorePassTypeBox, c = this.nodeMorePassTypeHandle, d;
			if (e) {
				d = a.UA.ie;
				b.setStyle("width", (d != 6 && d != 7)
								|| C.SBasket.passTypes[25].node
										.get("parentNode").hasClass("hidden")
								? "auto"
								: "435px");
				b.removeClass("hidden");
				b.setStyle("top", -b.get("offsetHeight") + 7 + "px");
				b.setStyle("left", c.get("offsetLeft") + 74 + "px");
				c.setStyle("left", c.get("offsetLeft"));
				c.addClass("active");
				c.one("span").replaceClass("up", "down")
			} else {
				b.addClass("hidden");
				c.removeClass("active");
				c.one("span").replaceClass("down", "up")
			}
		},
		refreshBasketPosition : function() {
			var b = this.nodeBasket, c = this.nodeMatchList;
			if (a.DOM.winHeight()
					- (c.getY() + c.get("offsetHeight") - a.one(window)
							.get("scrollTop")) > b.get("offsetHeight") + 20) {
				b.removeClass("race-basket-fixed")
			} else {
				b.addClass("race-basket-fixed")
			}
		},
		refreshSelectedViewButton : function(c) {
			var b = this.nodeViewBet;
			b.set("checked", c)
		},
		toggleSelectedMatch : function(b) {
			this.refreshSelectedViewButton(b);
			C.SBasket.toggleSelected(b)
		},
		matchChangeOnBasket : function(g) {
			var k = C.SBasket, h = k.matches.length, c = C.SOrder.minBetCount, d = this.nodeBetTip, j = this.nodePassType;
			if (h < c) {
				d.removeClass("hidden");
				j.addClass("hidden")
			} else {
				d.addClass("hidden");
				j.removeClass("hidden")
			}
			try {
				var b = this.nodeMorePassTypeHandle, f = b.hasClass("active");
				this.toggleMorePassType(false);
				if (h < c + 1) {
					b.addClass("hidden");
					b.one("input").set("checked", false)
				} else {
					b.removeClass("hidden");
					if (f) {
						this.toggleMorePassType(true)
					}
				}
			} catch (i) {
			}
		},
		passTypeChangeOnBasket : function(g, d) {
			try {
				var b = this.nodeMorePassTypeBox.all("input"), c = b.size(), d = false;
				for (; --c > -1;) {
					if (b.item(c).get("checked")) {
						d = true;
						break
					}
				}
				this.nodeChkMorePassType.set("checked", d)
			} catch (f) {
			}
		},
		initOrder : function(d) {
			var b = C.SOrder, c = this.nodeBasket, e;
			e = {
				ballValues : d.ballValues,
				minBetCount : d.minBetCount || 1,
				maxBetMoney : d.maxBetMoney || 20000,
				minGroupMoney : d.minGroupMoney || 8,
				nodePay : c.one("#BtnPay"),
				nodeGroupPay : c.one("#BtnGroupPay"),
				nodeGroupDialog : a.one("#mkGroupOrder"),
				orderData : d.orderData,
				nodeMask : a.one("#maskPannel"),
				nodeGroupField : {
					schemeTitle : ".title",
					schemeDesc : ".declaration",
					profitPct : ".brokerage",
					totalShare : ".splitnum",
					shareCnt : ".buynum",
					reserveShare : ".minnum",
					open : "input[type='radio']",
					betCount : "#groupBet",
					multiple : "#groupMultiple",
					money : "#groupAmount",
					stopTime : "#groupStopTime",
					minPercent : ".buy-percent",
					minCount : ".buy-minnum",
					fee : ".buy-minfee",
					guaranteeFee : ".minfee",
					perFee : ".fee",
					agree : "#isAgree",
					submitBtn : "#groupSubmit",
					closeBtn : "#cancelGroup"
				}
			};
			if (d.orderUrl) {
				e.orderUrl = d.orderUrl
			}
			if (d.getBetString) {
				e.getBetString = d.getBetString
			}
			b.init(e);
			return b
		},
		initTip : function() {
			new a.Floatip(a.all(".float-tip"), {
						float_class : "float-tip-box",
						anim : true
					})
		}
	}
});/* pub-1|2014-03-27 11:14:18 */
YUI.add("hhgg-bonus", function(a) {
	Array.prototype.filter = function(e) {
		var b = [], d = arguments[1];
		for (var c = 0; c < this.length; c++) {
			if (e.call(d, this[c])) {
				b.push(this[c])
			}
		}
		return b
	};
	C.SBonus = {
		betArray : [],
		betMap : {},
		init : function() {
			var h = this.betArray, b = this.betMap;
			for (var e = 0; e < 6; e++) {
				for (var d = 0; d < 6; d++) {
					if ((e == 3 && d > 3) || (e > 3 && d > 2)) {
						continue
					}
					h.push({
								name : e + "" + d,
								sum : e + d,
								diff : Math.abs(e - d),
								spf : (e > d) ? 3 : (e < d ? 0 : 1)
							})
				}
			}
			h.push({
						name : "90",
						sum : 7,
						spf : 3
					}, {
						name : "99",
						sum : 7,
						spf : 1
					}, {
						name : "09",
						sum : 7,
						spf : 0
					});
			for (e = h.length; e--;) {
				var k = h[e], g = {}, f = k.sum, c = k.spf;
				g["bf-" + k.name] = 1;
				g["jqs-" + f] = 1;
				g["spf-" + c] = 1;
				if (c == 3) {
					if (f > 2) {
						g["bqc-03"] = 1
					}
					g["bqc-13"] = 1;
					g["bqc-33"] = 1
				} else {
					if (c == 1) {
						if (f > 1) {
							g["bqc-01"] = 1;
							g["bqc-31"] = 1
						}
						g["bqc-11"] = 1
					} else {
						if (c == 0) {
							g["bqc-00"] = 1;
							g["bqc-10"] = 1;
							if (f > 2) {
								g["bqc-30"] = 1
							}
						}
					}
				}
				b[k.name] = g
			}
		},
		getBonusRange : function(c, d) {
			var b = this.getHitList(c);
			return {
				min : this.getMinBonus(b, d),
				max : this.getMaxBonus(b, d)
			}
		},
		getMinBonus : function(b, e) {
			var c = e.sort()[0].slice(0, 1), d = this.sortHitList(b.min, false);
			d.tList = d.tList.slice(0, c - d.dList.length);
			return this.getBonus(d, c)
		},
		getMaxBonus : function(d, h) {
			var g = this.sortHitList(d.max, true), f = 0;
			for (var e = 0, c = h.length; e < c; e++) {
				var b = Number(h[e].slice(0, 1));
				b = isNaN(b) ? 1 : b;
				f += this.getBonus(g, b)
			}
			return f
		},
		getBonus : function(p, c) {
			var q = p.dList.length, o, m, d, t, b, s = 0;
			if (q) {
				m = this.combine(p.dList)
			}
			d = this.combine2(p.tList, c - q);
			o = q ? this.combine([m, d]) : d;
			for (var h = 0, e = o.length; h < e; h++) {
				t = o[h].toString().split(",");
				b = 1;
				for (var g = 0, f = t.length; g < f; g++) {
					b *= parseFloat(t[g])
				}
				s += b
			}
			return s
		},
		sortHitList : function(c, f) {
			var e = [], d = [], g = 0, b = c.length, h;
			f = f ? -1 : 1;
			c.sort(function(j, i) {
						if (j.isdan === i.isdan) {
							return (j.sum > i.sum ? 1 : -1) * f
						} else {
							return j.isdan ? -1 : 1
						}
					});
			for (; g < b; g++) {
				h = c[g];
				if (h.isdan) {
					e.push(h)
				} else {
					d.push(h)
				}
			}
			return {
				list : c,
				dList : e,
				tList : d
			}
		},
		getHitList : function(e) {
			var h = [], c = [], g, d;
			for (var f = 0, b = e.length; f < b; f++) {
				g = e[f];
				if (g) {
					d = this.getSgBound(g);
					h.push(d.min);
					c.push(d.max)
				}
			}
			h.sort(function(j, i) {
						return j.sum > i.sum ? 1 : -1
					});
			c.sort(function(j, i) {
						return j.sum > i.sum ? -1 : 1
					});
			return {
				min : h,
				max : c
			}
		},
		getSgBound : function(t) {
			var v = this.betArray, e = t.split("|"), y = t.indexOf("D") > -1, w = 9000000000, h = -1, x, c, b, g;
			for (var u = 0, q = v.length; u < q; u++) {
				var f = v[u], m = this.combine(this.filterInvalidOpts(e, f)), d, o;
				if (m.length) {
					for (var s = 0, r = m.length; s < r; s++) {
						o = m[s];
						d = 0;
						for (var p = o.length; p--;) {
							o[p] = parseFloat(o[p].split("#")[1]) || 1;
							d += o[p]
						}
						if (d > h) {
							h = d;
							c = o.concat();
							g = f.name
						}
						if (d < w) {
							w = d;
							x = o.concat();
							b = f.name
						}
					}
				}
			}
			x.sum = w;
			x.bf = b;
			c.sum = h;
			c.bf = g;
			x.isdan = c.isdan = y;
			return {
				min : x,
				max : c
			}
		},
		filterInvalidOpts : function(e, h) {
			var c = this, d = [], g = 0, b = e.length;
			for (; g < b; g++) {
				var f = e[g].split(",").filter(function(i) {
							return c.testByBf(i, h)
						});
				if (f.length) {
					d.push(f)
				}
			}
			return d
		},
		testByBf : function(d, b) {
			if (d.indexOf("rqspf") === 0) {
				return this.testRqSpfByBf(d, b)
			}
			var c = this.betMap[b.name];
			return d.split("#")[0] in c
		},
		testRqSpfByBf : function(d, b) {
			var c = parseInt(d.split("#")[0].split("@")[1], 10);
			if (c > 0) {
				if (b.name == "09") {
					if (c === 1) {
						return d.indexOf("rqspf-0") === 0
								|| d.indexOf("rqspf-1") === 0
					}
					return d.indexOf("rqspf-") === 0
				}
				if (b.spf < 1) {
					if (c < b.diff) {
						return d.indexOf("rqspf-0") === 0
					} else {
						if (c === b.diff) {
							return d.indexOf("rqspf-1") === 0
						}
					}
				}
				return d.indexOf("rqspf-3") === 0
			} else {
				c = Math.abs(c);
				if (b.name == "90") {
					if (c === 1) {
						return d.indexOf("rqspf-3") === 0
								|| d.indexOf("rqspf-1") === 0
					}
					return d.indexOf("rqspf-") === 0
				}
				if (b.spf > 0) {
					if (c < b.diff) {
						return d.indexOf("rqspf-3") === 0
					} else {
						if (c === b.diff) {
							return d.indexOf("rqspf-1") === 0
						}
					}
				}
				return d.indexOf("rqspf-0") === 0
			}
		},
		combine : function(d, f) {
			var h = 0, e = [], c = [], b = (typeof f === "function");
			function g(k, p) {
				if (p >= k.length) {
					if (!b || f(code) !== false) {
						e.push(c.concat())
					}
					c.length = p - 1
				} else {
					var o = k[p];
					for (var m = 0, l = o.length; m < l; m++) {
						c.push(o[m]);
						g(k, p + 1)
					}
					if (p) {
						c.length = p - 1
					}
				}
			}
			if (d.length) {
				g(d, h)
			}
			return e
		},
		combine2 : function(g, d, h) {
			var c = 0, f = [], j = [], e = g.length, b = (typeof h === "function");
			function i(l, r) {
				if (j.length >= d) {
					if (!b || h(code) !== false) {
						f.push(j.concat())
					}
					j.length--
				} else {
					for (var m = r; m < e; m++) {
						var q = l[m];
						for (var p = 0, o = q.length; p < o; p++) {
							j.push(q[p]);
							i(l, m + 1)
						}
					}
					if (r) {
						j.length--
					}
				}
			}
			if (e && e >= d) {
				i(g, c)
			}
			return f
		}
	}
});/* pub-1|2014-05-04 13:30:22 */
YUI.add("jczq-hhgg", function(f) {
	f.mix(f.NodeList.prototype, {
				toArray : function() {
					var g = [];
					this.each(function(h) {
								g.push(h)
							});
					return g
				}
			}, true);
	var a = C.JCZQ, b = a.initView, d = a.initMatchManager, c = a.initBasket, e = a.initOrder;
	f.mix(a, {
		initView : function(h) {
			C.SBonus.init();
			var i = f.one("#MatchTitle");
			this.nodeAreas = {
				tr0 : i.one(".spf-title"),
				tr1 : i.one(".rqspf-title"),
				"1" : i.one(".bf-title"),
				"2" : i.one(".jqs-title"),
				"3" : i.one(".bqc-title")
			};
			h.getSPIndex = function(l) {
				try {
					return l.getAttribute("ball")
							|| l.ancestor(".betli").getAttribute("ball")
				} catch (m) {
					return NaN
				}
			};
			b.call(this, h);
			var j = C.SMatchView, g = this;
			j.on("mouseOverOnMatchRow", function(l) {
						l.preventDefault();
						g.mouseOnMatchHandler(l.nodeRow, l.nodeTarget, l.index,
								true)
					});
			j.on("mouseOutOnMatchRow", function(l) {
						l.preventDefault();
						g.mouseOnMatchHandler(l.nodeRow, l.nodeTarget, l.index,
								false)
					});
			j.on("clickOnMatchRow", function(l) {
						if (!g.clickOnMatchHandler(l.nodeRow, l.nodeTarget,
								l.index)) {
							l.preventDefault()
						}
					});
			j.on("bet", function(l) {
						g.betHandler(l.matchIndex, l.spIndex, l.selected)
					});
			j.after("bet", function(l) {
						g.afterBetHandler(l.matchIndex, l.spIndex, l.selected)
					});
			j.on("showMatch", function(n) {
						n.preventDefault();
						var o = n.nodeMatch, l = o.length, m;
						o[0].removeClass("hidden");
						for (; --l > 0;) {
							if ((m = o[l]) && m.hasClass("tr-active")) {
								m.removeClass("hidden")
							}
						}
					});
			var k = C.Tools.parseURL("mids");
			if (k) {
				CP.use("jczq-hhgg-url-bet", function(l) {
						})
			}
		},
		loadFromDOM : function() {
			var z = {}, l = this.nodeMatchList = f.one("#MatchList"), F = l
					.all(".bet-tr"), E = l.all(".bf-tr"), B = l.all(".jqs-tr"), w = l
					.all(".bqc-tr"), g = z.matches = [], M = z.nodes = [], O = C.SMatch, W = 0, r = F
					.size(), K = [3, 3, 31, 8, 9], V, U, T, v, I, R, Q, P;
			for (R = Q = P = 0; W < r; ++W) {
				T = F.item(W);
				v = T.getAttribute("matchId");
				var D = T.one(".time"), A = T.one(".game"), L = T
						.one(".home-team"), u = T.one(".visit-team"), H = T
						.one(".spf-bet"), x = T.one(".rqspf-bet"), N = T
						.one(".bf-bet"), n = T.one(".jqs-bet"), t = T
						.one(".bqc-bet"), y = [H, x, N, n, t], S = [], s = [], X = [], J = [T], h = [
						H, x], m;
				I = E.item(R);
				if (I && (I.getAttribute("matchId") != v)) {
					I = null
				} else {
					++R
				}
				J.push(I);
				h.push(I);
				I = B.item(Q);
				if (I && (I.getAttribute("matchId") != v)) {
					I = null
				} else {
					++Q
				}
				J.push(I);
				h.push(I);
				I = w.item(P);
				if (I && (I.getAttribute("matchId") != v)) {
					I = null
				} else {
					++P
				}
				J.push(I);
				h.push(I);
				for (V = 0; V < 5; ++V) {
					I = y[V];
					if (I.hasClass("disabled")) {
						for (U = K[V]; --U > -1;) {
							S.push(null);
							s.push(null);
							X.push(0)
						}
					} else {
						if (I = h[V]) {
							S = S.concat(I.all(".betli").toArray());
							m = I.all(".betli span");
							s = s.concat(m.toArray());
							X = X.concat(m.get("text"))
						}
					}
				}
				var G = T.one(".positive") || T.one(".negative");
				g[W] = new O({
					date : T.getAttribute("date"),
					matchId : v,
					matchNum : T.one(".num").get("text"),
					gameName : T.one(".game").get("text"),
					matchName : T.one(".num").get("text"),
					matchTime : new Date(parseInt(D.getAttribute("matchTime"))),
					stopTime : new Date(parseInt(D.getAttribute("stopTime"))),
					hostTeam : L.one("a").get("text"),
					visitTeam : u.one("a").get("text"),
					sp : X,
					concede : G ? parseFloat(G.get("text")) : 0,
					index : W
				});
				M[W] = {
					row : J,
					time : D,
					team : [L, u],
					bet : S,
					sp : s,
					dan : T.one(".dan input"),
					game : A
				}
			}
			return z
		},
		mouseOnMatchHandler : function(g, j, l, k) {
			var i = j.get("tagName"), h = (i == "LI") ? j : j.ancestor("li"), j = (i == "TD")
					? j
					: j.ancestor("td"), p = k
					? f.Node.prototype.addClass
					: f.Node.prototype.removeClass, m = k
					? f.NodeList.prototype.addClass
					: f.NodeList.prototype.removeClass, q, o, n;
			if (g.hasAttribute("rel")) {
				if (g.hasClass("bf-tr")) {
					q = h && h.ancestor("ul")
				}
				g = C.SMatchView.nodeMatches[l].row[0]
			} else {
				q = h
			}
			p.call(g, "hover");
			if (j.hasClass("bet")
					&& (o = this.nodeAreas[j.getAttribute("rel")])) {
				p.call(o, "area-hover");
				if (h && h.hasClass("betli")) {
					p.call(h, "hover")
				}
			}
			if (q) {
				n = q.hasClass("home") ? 0 : q.hasClass("visit") ? 1 : -1;
				if (n > -1) {
					C.SMatchView.toggleTeamHover(l, n, k)
				}
			}
		},
		clickOnMatchHandler : function(y, s, k) {
			var l = s.get("tagName"), A = l == "TD" ? s : s.ancestor("td"), v, u;
			if (A.hasClass("visit-team") || A.hasClass("home-team")
					|| A.hasClass("disabled")) {
				return false
			}
			if (A.hasClass("bf-bet") || A.hasClass("jqs-bet")
					|| A.hasClass("bqc-bet")) {
				var x = A.one("span"), p = x.get("text"), q = parseInt(A
						.getAttribute("rel")), B = C.SMatchView, o = B.nodeMatches[k].row, n;
				if (A.hasClass("bet-active")) {
					this.collapseMatch(A, o[q])
				} else {
					for (v = 4; --v > 0;) {
						if (v != q && (n = o[v]) && n.hasClass("tr-active")) {
							this.collapseMatch(y.one("."
											+ n.getAttribute("rel")), n)
						}
					}
					A.addClass("bet-active");
					if (p == "\u5c55\u5f00") {
						x.set("text", "\u6536\u8d77")
					} else {
						A.removeClass("bet-selected")
					}
					if (s = o[q]) {
						s.removeClass("hidden").addClass("tr-active")
					}
				}
				B.refreshView()
			} else {
				var r = C.SBasket, t = r.maxPassType, h = l == "LI" ? s : s
						.ancestor("li"), w = [], g, z, m;
				if (h && h.hasClass("all") && (g = h.ancestor("ul"))) {
					switch (parseInt(A.getAttribute("rel"))) {
						case 1 :
							if (g.hasClass("home")) {
								z = 6;
								m = 18
							} else {
								if (g.hasClass("deuce")) {
									z = 19;
									m = 23
								} else {
									z = 24;
									m = 36
								}
							}
							r.maxPassType = 4;
							break;
						case 2 :
							z = 37;
							m = 44;
							if (t > 6) {
								r.maxPassType = 6
							}
							break;
						case 3 :
							z = 45;
							m = 53;
							r.maxPassType = 4
					}
					for (v = z, u = 0; v <= m; ++v, ++u) {
						w[u] = v
					}
					C.SMatchView.bet(k, w, !this.isAllBeted(k, z, m));
					C.SBasket.togglePassType()
				}
			}
			return true
		},
		collapseMatch : function(i, h) {
			var g = i.one("span"), j = g.get("text");
			i.removeClass("bet-active");
			if (j == "\u6536\u8d77") {
				g.set("text", "\u5c55\u5f00")
			} else {
				i.addClass("bet-selected")
			}
			if (h) {
				h.addClass("hidden").removeClass("tr-active")
			}
		},
		betHandler : function(g, i, h) {
			var l = C.SBasket, k = l.maxPassType, j = k;
			if (h) {
				if ((i > 5 && i < 37) || i > 44) {
					j = 4
				} else {
					if (i > 36 && i < 45 && k > 6) {
						j = 6
					}
				}
				if (j != k) {
					C.SBasket.maxPassType = j;
					C.SBasket.togglePassType()
				}
			}
		},
		afterBetHandler : function(n, g, h) {
			var p = C.SBasket, l = p.maxPassType, o = 8;
			this.refreshAllBet(n, g);
			if (!h) {
				var k = p.matches, j = k.length, m;
				for (; --j > -1;) {
					m = k[j].spSelected;
					f.Array.find(m, function(i) {
								if ((i > 5 && i < 37) || i > 44) {
									o = 4;
									return true
								} else {
									if (i > 36 && i < 45 && o > 6) {
										o = 6
									}
								}
							})
				}
				if (o != l) {
					C.SBasket.maxPassType = o;
					C.SBasket.togglePassType()
				}
			}
		},
		refreshAllBet : function(g, m) {
			var l = "", n, k, i, j, h;
			m = m instanceof Array ? m[0] : m;
			if (m > 5 && m < 37) {
				n = 1;
				k = 6;
				i = 36;
				if (m < 19) {
					l = ".home ";
					j = 6;
					h = 18
				} else {
					if (m < 24) {
						l = ".deuce ";
						j = 19;
						h = 23
					} else {
						l = ".visit ";
						j = 24;
						h = 36
					}
				}
			} else {
				if (m > 36 && m < 45) {
					n = 2;
					k = j = 37;
					i = h = 44
				} else {
					if (m > 44) {
						n = 3;
						k = j = 45;
						i = h = 53
					}
				}
			}
			if (n) {
				this.toggleAllBetSelection(g, n, l, this.isAllBeted(g, j, h));
				this.refreshSPCount(g, n, k, i)
			}
		},
		refreshSPCount : function(q, h, l, m) {
			var p = C.SMatchManager.matches[q].spSelected, n = p.length, o = 0, j = C.SMatchView.nodeMatches[q].row[0], g, k;
			for (; --n >= -1;) {
				g = p[n];
				if (g >= l && g <= m) {
					++o
				}
			}
			if (k = j.one(h == 1 ? ".bf-bet span" : h == 2
					? ".jqs-bet span"
					: ".bqc-bet span")) {
				k.set("innerHTML", o
								? "\u5df2\u9009<em>" + o + "</em>"
								: "\u6536\u8d77")
			}
		},
		isAllBeted : function(g, i, h) {
			return this.getBetSPCount(g, i, h) == h - i + 1
		},
		getBetSPCount : function(g, l, j) {
			var h = C.SMatchManager.matches[g].spSelected, k = h.length, m = 0;
			for (; --k > -1;) {
				if (h[k] >= l && h[k] <= j) {
					++m
				}
			}
			return m
		},
		toggleAllBetSelection : function(h, k, i, g) {
			var j = C.SMatchView.nodeMatches[h].row[k].one(i + ".all");
			if (j) {
				j[g ? "addClass" : "removeClass"]("selected")
			}
		},
		initBasket : function(h) {
			var g = this, i = c.call(this, h);
			i.on("betcalculate", function(j) {
						j.preventDefault();
						g.calculateBet(j.matches, j.passTypes, j.dans)
					});
			f.on("contentready", function() {
				var k = ["3", "1", "0", "3", "1", "0", "10", "20", "21", "30",
						"31", "32", "40", "41", "42", "50", "51", "52", "90",
						"00", "11", "22", "33", "99", "01", "02", "12", "03",
						"13", "23", "04", "14", "24", "05", "15", "25", "09",
						"0", "1", "2", "3", "4", "5", "6", "7", "33", "31",
						"30", "13", "11", "10", "03", "01", "00"], 
						l = [
						"\u80dc", "\u5e73", "\u8d1f", "\u80dc", "\u5e73",
						"\u8d1f", "1:0", "2:0", "2:1", "3:0", "3:1", "3:2",
						"4:0", "4:1", "4:2", "5:0", "5:1", "5:2",
						"\u80dc\u5176\u4ed6", "0:0", "1:1", "2:2", "3:3",
						"\u5e73\u5176\u4ed6", "0:1", "0:2", "1:2", "0:3",
						"1:3", "2:3", "0:4", "1:4", "2:4", "0:5", "1:5", "2:5",
						"\u8d1f\u5176\u4ed6", "0\u7403", "1\u7403", "2\u7403",
						"3\u7403", "4\u7403", "5\u7403", "6\u7403", "7+\u7403",
						"\u80dc\u80dc", "\u80dc\u5e73", "\u80dc\u8d1f",
						"\u5e73\u80dc", "\u5e73\u5e73", "\u5e73\u8d1f",
						"\u8d1f\u80dc", "\u8d1f\u5e73", "\u8d1f\u8d1f"], j = function() {
					var m = {}, n = [];
					f.Array.each(C.SBasket.matches, function(q) {
						if (q.spSelected.length == 0) {
							return
						}
						var r = [], o = q.sp, p = q.index, t = {}, s;
						f.Array.each(q.spSelected, function(v) {
							if (v < 3) {
								s = "1"
							} else {
								if (v < 6) {
									s = "10"
								} else {
									if (v < 37) {
										s = "2"
									} else {
										if (v < 45) {
											s = "3"
										} else {
											s = "4"
										}
									}
								}
							}
							var x = "", y = o[v], u = k[v];
							r.push(u + "$" + y + "$" + s);
							x = "[" + q.hostTeam;
							if (s == "10") {
								var z = C.SMatchView.nodeMatches[p].row[0], w = z
										.one(".negative")
										|| z.one(".positive");
								x += "(" + w.get("innerHTML") + ")"
							}
							x += " " + l[v] + " " + y + "]";
							t[s + "_" + u] = x
						});
						m[q.matchId] = {
							id : q.matchId,
							map : t,
							numberString : q.matchId + ":" + r.join(";")
						};
						if (f.Array.indexOf(C.SBasket.dans, p) >= 0) {
							n.push(q.matchId)
						}
					});
					return {
						matches : m,
						dans : n
					}
				};
				f.one("#yc-optimize").on("click", function(s) {
					var o = C.SOrder.minBetCount, r = C.SBasket, n = r.passTypeSelected, p = r.multiple, m = r.moneyCount, q = r.betCount;
					if (r.matches.length < o) {
						f.Box.alert("\u8bf7\u81f3\u5c11\u9009\u62e9" + o
								+ "\u573a\u6bd4\u8d5b\uff01");
						return
					}
					if (n.length <= 0) {
						f.Box
								.alert("\u8bf7\u9009\u62e9\u8fc7\u5173\u65b9\u5f0f\uff01");
						return
					}
					if (p == "") {
						f.Box
								.alert("\u8bf7\u8f93\u5165\u6295\u6ce8\u500d\u6295\u6570\uff01");
						return
					}
					if (m > 200000) {
						f.Box
								.alert("\u6295\u6ce8\u91d1\u989d\u9700\u5c0f\u4e8e200000\u5143\uff01");
						return
					}
					if (!C.YCOptimize) {
						f.use("jczq-yc-optimize", function(v) {
							C.YCOptimize = new v.Optimize({
								playtype : 9,
								url : "http://taobao.yescheers.com/jczq/spf/jjyh/v2/",
								resultArray : k
							});
							var u = j();
							C.YCOptimize.render({
										matches : u.matches,
										dans : u.dans,
										passtype : n,
										bt : p,
										fee : m,
										num : q
									})
						})
					} else {
						var t = j();
						C.YCOptimize.render({
									matches : t.matches,
									dans : t.dans,
									passtype : n,
									bt : p,
									fee : m,
									num : q
								})
					}
				})
			}, "#yc-optimize")
		},
		calculateBet : function(m, i, o) { //i:过关类型   o：胆数量
			var n = 0, j = 0, k = 0, p = 0, q = C.SBasket, l, h, g = C.SBonus;
			if (m.length >= 2 && i.length) {
				h = this.analysisSp(m, o);
				n = this.getBetCount(m, o, i, h);
				j = q.calculateMoney(n);
				l = g.getBonusRange(h.betOptions, i);
				k = l.min * q.multiple * q.unitMoney;
				p = l.max * q.multiple * q.unitMoney
			}
			q.setBetCount(n);
			q.setMoney(j);
			q.setAwardCount(k.toFixed(2), p.toFixed(2))
		},
		analysisSp : function(g, I) {
			var O = C.SOrder.ballValues, P = [], o = [], H = [], m = [], s = [], D = [], G = [], v = [], x = [], L = [], q, z, M, y, h, p, K, N, r, A, n, E, l, R, Q, F, t, w, J, k, u, S, B;
			for (R = g.length; --R > -1;) {
				isMust = false;
				M = H[R] = [];
				y = D[R] = [];
				h = G[R] = [];
				p = v[R] = [];
				K = x[R] = [];
				N = L[R] = [];
				q = g[R];
				z = q;//q.spSelected; //z:每场比赛选择的sp值
				if (z.length > 0) {
					S = [];
					r = [];
					A = [];
					n = [];
					E = [];
					l = [];
					for (Q = -1; ++Q < z.length;) {
						F = z[Q]; //F:每场比赛每一个选择的sp值
						t = q.sp[F];
						M[Q] = t;
						B = O[F];
						if (F >= 0 && F <= 2) {
							y.push(t);
							r.push("spf-" + B + "#" + t)
						} else {
							if (F >= 3 && F <= 5) {
								h.push(t);
								A
										.push("rqspf-" + B + "@" + q.concede
												+ "#" + t)
							} else {
								if (F >= 6 && F <= 36) {
									p.push(t);
									n.push("bf-" + B + "#" + t)
								} else {
									if (F >= 37 && F <= 44) {
										K.push(t);
										E.push("jqs-" + B + "#" + t)
									} else {
										N.push(t);
										l.push("bqc-" + B + "#" + t)
									}
								}
							}
						}
					}
					J = (f.Array.indexOf(I, R) >= 0);
					if (r.length) {
						S.push(r.join(","))
					}
					if (A.length) {
						S.push(A.join(","))
					}
					if (n.length) {
						S.push(n.join(","))
					}
					if (E.length) {
						S.push(E.join(","))
					}
					if (l.length) {
						S.push(l.join(","))
					}
					P.push(S.join("|") + (J ? "D" : ""));
					o[o.length] = u
				}
			}
			return {
				_spSelected : o,
				spSelected : H,
				spfSpSelected : D,
				rqspfSpSelected : G,
				bfSpSelected : v,
				jqsSpSelected : x,
				bqcSpSelected : L,
				betOptions : P
			}
		},
		getBetCount : function(k, n, m, g) {
			var h = this.spTemplate, l = C.SBetCalculator, j;
			if (!h) {
				if (match = k[0]) {
					h = match.sp.concat();
					for (j = h.length; --j > -1;) {
						h[j] = 0
					}
				}
				this.spTemplate = h
			}
			return l.calCount(true, g.spSelected, n, m, h)
		},
		getBetExtreme : function(u, g, h) {
			var x = this, w = C.SBasket, r = u.length, y = h.extremeDSp, q = h.extremeTSp, n = 0, t = 0, p, k, o, l, v, s;
			y = C.Tools.C(y, r);
			if (r > 1) {
				y = f.Array.filter(y, function(i) {
							o = true;
							l = false;
							v = null;
							s = null;
							i = i.sort(function(m, j) {
										return m.matchId > j.matchId
									});
							f.Array.each(i, function(j) {
										if (v) {
											o = o && (v !== j.matchId)
										}
										v = j.matchId;
										s = j.playType
									});
							if (o) {
								return true
							}
							return false
						})
			}
			f.Array.each(g, function(m, j) {
						p = [];
						k = m.slice(0, 1);
						if (y.length) {
							f.Array.each(y, function(i) {
										p = p.concat(C.Tools.dtC(q, i, k))
									})
						} else {
							p = C.Tools.C(q, k)
						}
						p = x.getFilterArrayResult(p);
						t += C.Tools.Sum(p.max);
						if (j === 0) {
							n = p.min;
							n = (n.length > 0) ? n[0] : 0
						}
					});
			n = w.multiple * n * w.unitMoney;
			t = w.multiple * t * w.unitMoney;
			return {
				min : n.toFixed(2),
				max : t.toFixed(2)
			}
		},
		getFilterArrayResult : function(m) {
			var l, k, p, n, h, o, g = [], q = [];
			f.Array.each(m, function(i) {
						l = true;
						k = false;
						h = 1;
						o = 1;
						p = null;
						n = null;
						i = i.sort(function(r, j) {
									return r.matchId > j.matchId
								});
						f.Array.each(i, function(j) {
									if (p) {
										l = l && (p !== j.matchId)
									}
									p = j.matchId;
									n = j.playType;
									h = h.mul(parseFloat(j.min));
									o = o.mul(parseFloat(j.max))
								});
						if (l) {
							g.push(h);
							q.push(o)
						}
					});
			return {
				min : g.sort(f.Array.numericSort),
				max : q
			}
		},
		initOrder : function(h) {
			h.ballValues = ["3", "1", "0", "3", "1", "0", "10", "20", "21",
					"30", "31", "32", "40", "41", "42", "50", "51", "52", "90",
					"00", "11", "22", "33", "99", "01", "02", "12", "03", "13",
					"23", "04", "14", "24", "05", "15", "25", "09", "0", "1",
					"2", "3", "4", "5", "6", "7", "33", "31", "30", "13", "11",
					"10", "03", "01", "00"];
			h.getBetString = this.getBetString;
			var g = e.call(this, h)
		},
		getBetString : function() {
			var p = "", t = C.SBasket, k = t.matches, r = t.dans, q = C.SUtil, w = 0, s = k.length, x = this.ballValues, z = t.passTypeSelected, m = t.passTypeMap, n, g, u, v, A, y, h, o, l;
			for (; w < s; ++w) {
				if (w) {
					p += "/"
				}
				n = k[w];
				p += n.matchId + (q.indexOfArray(r, n.index) < 0 ? "" : "#")
						+ ":";
				g = n.spSelected.sort();
				h = {
					"1" : [],
					"10" : [],
					"2" : [],
					"3" : [],
					"4" : []
				};
				for (v = -1; ++v < g.length;) {
					A = g[v];
					y = x[A];
					if (A < 3) {
						o = "1"
					} else {
						if (A < 6) {
							o = "10"
						} else {
							if (A < 37) {
								o = "2"
							} else {
								if (A < 45) {
									o = "3"
								} else {
									o = "4"
								}
							}
						}
					}
					h[o].push(y)
				}
				f.each(["1", "10", "2", "3", "4"], function(i) {
							if (h.hasOwnProperty(i) && (l = h[i]) && l.length) {
								p += l.join(",") + "$" + i + ";"
							}
						});
				p = p.slice(0, -1)
			}
			p += "_";
			for (w = 0, s = z.length; w < s; ++w) {
				if (w) {
					p += "^"
				}
				u = m[z[w]];
				p += u.m + "*" + u.n
			}
			return p
		}
	}, true)
});
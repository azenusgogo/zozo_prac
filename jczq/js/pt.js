(function(j, h, f, k, g) {
	f
			.regBaseCom2Lib(
					"COMS.JC.BetArea",
					"onDisplay onPosition onSelectOption onRemoveOption onDel onClear onChange",
					{
						config : {
							oneDaySelect : "dl[gamedate]",
							oneGameSelect : "dd[matchcode],dd[relation]",
							oneOptionSelect : "em[index][gametype]",
							oneOptionIndex : "index",
							oneOptionGameType : "gametype",
							oneOptionSp : "sp",
							hoverGame : "even",
							hoverOption : "hover",
							selectOption : "active",
							isStopSelOptPropagation : false,
							gameWrapSelector : ".gameSelect",
							attentionGameWrapSelect : ".attentionInner",
							unAttentionGameWrapSelect : ".unAttention",
							attentionTitSelector : "",
							attentionMenuSelector : "",
							attentionTitTmp : "我关注的赛事 ({0}场比赛)",
							saveAttentionURL : "/jc/jcquery_saveFollowedLeague.html",
							titleSelect : "dt",
							gameDateWrapTmp : "<dl {0}> <dt>{1}</dt></dl>",
							gameTypes : null,
							gameId : null
						},
						cache : {
							gameDateInfo : {},
							gameInfo : {},
							selectGameInfo : {
								length : 0
							}
						},
						init : function(u) {
							var v = this.config, s = this.cache, r = /(\S+)Selector$/;
							h.extend(v, u);
							for (var t in v) {
								if (f.getType(t) == "string" && r.test(t)) {
									s[RegExp.$1] = h(v[t])
								}
							}
							if (!s.gameWrap || !s.gameWrap.length) {
								alert("betArea初始化错误，没有找到页面元素");
								return this
							}
							s.attentionGameWrap = s.gameWrap
									.find(v.attentionGameWrapSelect);
							s.unAttentionGameWrap = s.gameWrap
									.find(v.unAttentionGameWrapSelect);
							if (!v.gameTypes || !v.gameTypes.length) {
								alert("betArea初始化错误，没有找到玩法类型");
								return this
							}
							c.call(this);
							n.call(this);
							e.call(this);
							a.call(this);
							this.hoverGame().hoverGameOption()
						},
						get : function() {
							var r = this;
							return {
								selectGameInfo : r.cache.selectGameInfo,
								gameInfo : r.cache.gameInfo,
								gameDateInfo : r.cache.gameDateInfo
							}
						},
						getMapKeyList : function(t) {
							var s = [];
							if (!t || !h.isPlainObject(t)) {
								return s
							}
							for (var r in t) {
								if (r != "length") {
									s.push(r)
								}
							}
							return s
						},
						hoverGame : function() {
							var r = this.config.hoverGame;
							this.cache.gameWrap.delegate(
									this.config.oneGameSelect,
									"mouseenter mouseleave", function() {
										var s = h(this), t = s
												.attr("matchCode")
												|| s.attr("relation");
										if (!t) {
											return
										}
										if (s.hasClass(r)) {
											s.removeClass(r)
										} else {
											s.addClass(r)
										}
									});
							return this
						},
						hoverGameOption : function() {
							var s = this, u = this.config, t = this.cache.gameInfo, v = u.hoverOption, r = u.selectOption;
							this.cache.gameWrap.delegate(
									this.config.oneOptionSelect,
									"mouseenter mouseleave", function(A) {
										var y = h(this), z = y
												.parents(u.oneGameSelect), B = z
												.attr("matchCode")
												|| z.attr("relation"), x = y
												.attr(u.oneOptionIndex), w = y
												.attr(u.oneOptionGameType);
										if (!B || t[B].isStop) {
											return
										}
										if (!y.hasClass(r)) {
											if (A.type == "mouseover") {
												s.findGameOption(B, w, x)
														.addClass(v)
											} else {
												s.findGameOption(B, w, x)
														.removeClass(v)
											}
										}
									});
							return this
						},
						findGameOption : function(x, r, v) {
							var t = this.cache, w = this.config, v = +v, s, u = t.gameInfo;
							if (!x || !u[x]) {
								return
							}
							s = u[x].optionMap;
							if (r && v >= 0) {
								if (s[r] && s[r][v]) {
									return s[r][v]
								}
							} else {
								return s
							}
						},
						selectOption : function(u, r, s, t) {
							return f.getStopRecursionFn(o, this)(u, r, s, t)
						},
						removeOption : function(t, r, s) {
							return f.getStopRecursionFn(d, this)(t, r, s)
						},
						del : function(r) {
							return f.getStopRecursionFn(q, this)(r)
						},
						clear : function() {
							return f.getStopRecursionFn(b, this)()
						},
						display : function(r, s) {
							r = +r;
							if (!r) {
								return this
							}
							switch (r) {
								case (1) :
									this.displayByGameInfo(s);
									break;
								case (2) :
									this.displayByLeagueid(s);
									break;
								case (3) :
									this.displayByMap(s);
									break
							}
							return this
						},
						displayByGameInfo : function(x) {
							var H = f.getType(x), F = {};
							if (H != "object") {
								return this
							}
							var G, z, C, r, y = this.cache.gameInfo, D = this.cache.selectGameInfo, s = x.isRq, B = x.isFrq, u = x.isStop, w = x.isSelect, A, E = x.isHot;
							for (var v in y) {
								G = true;
								z = true;
								C = true;
								r = true;
								A = y[v];
								if (w === true && (!D || !D.length || !D[v])) {
									r = false
								}
								if (A.isStop && f.getType(u) == "boolean") {
									G = u
								}
								if (f.getType(s) == "boolean"
										&& f.getType(B) == "boolean"
										&& f.getType(A.score) != "undefined") {
									z = A.score == 0 ? B : s
								}
								if (E === true
										&& f.getType(A.isHot) == "boolean") {
									C = A.isHot
								}
								F[v] = G && z && C && r;
								this.displayOneGame(v, F[v])
							}
							this.callEvent("onDisplay", F);
							return this
						},
						displayByLeagueId : function(s) {
							var x = f.getType(s), w, r, v = {}, u = this.cache.gameInfo;
							if (x != "object") {
								return this
							}
							for (w in u) {
								for (r in s) {
									if (u[w].leagueId == r) {
										v[w] = !!s[r];
										this.displayOneGame(w, !!s[r])
									}
								}
							}
							this.callEvent("onDisplay", v);
							return this
						},
						displayByMap : function(w) {
							var v = f.getType(w), u = {}, s, r = this.cache.gameInfo;
							if (v != "object") {
								return this
							}
							for (s in w) {
								if (r[s]) {
									u[s] = !!w[s];
									this.displayOneGame(s, !!w[s])
								}
							}
							this.callEvent("onDisplay", u);
							return this
						},
						displayAllGame : function() {
							var w = this.cache.gameDateInfo, u = {}, t, s, r = this, v;
							for (t in w) {
								for (s in w[t]) {
									h.each(w[t][s].game, function() {
												u[this] = true;
												r.displayOneGame(this, true)
											});
									v = w[t][s].wrap;
									v.removeClass("closeData")
											.find(".cuspText")
											.html('隐藏<i class="cusp"></i>')
								}
							}
							this.callEvent("onDisplay", u);
							return this
						},
						displayOneGame : function(u, r) {
							var s = this.cache.gameInfo, t = s[u];
							if (!t && f.getType(r) != "boolean") {
								return this
							}
							t && t.ele.css("display", r ? "" : "none");
							t
									&& t.relationEle
									&& t.relationEle.css("display", r
													? ""
													: "none");
							return this
						}
					});
	var o = function(t, z, u, s) {
		var r = this.cache, w = this.config, y, x = r.selectGameInfo, v = x[t];
		u = +u;
		if (!t || !z || u < 0) {
			return this
		}
		y = this.findGameOption(t, z, u);
		if (y && y.length) {
			s = y.attr("sp")
		}
		s = +s;
		if (!(s >= 0) || x[t] && x[t][z] && x[t][z][u]) {
			return this
		}
		if (!x[t] && x.length > 14) {
			f.alert("啊偶，选择的比赛不能超过15场哦");
			return this
		}
		if (this.callEvent("onSelectOption", t, z, u, s, x) === false) {
			return this
		}
		if (!r.selectGameInfo) {
			r.selectGameInfo = {
				length : 0
			}
		}
		if (!v) {
			v = {};
			r.selectGameInfo[t] = v;
			r.selectGameInfo.length += 1
		}
		if (!v[z]) {
			v[z] = {
				length : 0
			}
		}
		v[z][u] = s;
		v[z].length += 1;
		y && y.addClass(w.selectOption).removeClass(w.hoverOption);
		this.callEvent("onChange", t, z, u, s)
	}, d = function(y, r, w) {
		var t = this.cache, x = this.config, s, v = t.selectGameInfo, u = v[y];
		w = +w;
		if (!y || !r || w < 0) {
			return this
		}
		if (u && u[r] && u[r][w] >= 0) {
			if (this.getMapKeyList(u).length == 1 && u[r].length == 1) {
				this.del(y)
			} else {
				if (this.callEvent("onRemoveOption", y, r, w, v) === false) {
					return this
				}
				if (u[r].length == 1) {
					delete u[r]
				} else {
					delete u[r][w];
					u[r].length -= 1
				}
				s = this.findGameOption(y, r, w);
				s && s.length && s.removeClass(x.selectOption);
				this.callEvent("onChange", y, r, w)
			}
		}
	}, q = function(w) {
		var t = this.cache, v = this.config, s, r, u;
		if (!w || !t.selectGameInfo[w]) {
			return this
		}
		if (t.selectGameInfo.length == 1) {
			this.clear()
		} else {
			if (this.callEvent("onDel", w) === false) {
				return this
			}
			delete t.selectGameInfo[w];
			t.selectGameInfo.length -= 1;
			s = this.findGameOption(w);
			if (s) {
				for (r in s) {
					for (u in s[r]) {
						s[r][u].removeClass(v.selectOption)
					}
				}
			}
			this.callEvent("onChange", w)
		}
		return this
	}, b = function() {
		var v, t = this.cache, x = this.config, s, u = t.selectGameInfo, r, w;
		if (!u.length) {
			return this
		}
		if (this.callEvent("onClear", t.selectGameInfo) === false) {
			return this
		}
		t.selectGameInfo = {
			length : 0
		};
		for (v in u) {
			if (v == "length") {
				continue
			}
			s = this.findGameOption(v);
			if (s) {
				for (r in s) {
					for (w in s[r]) {
						s[r][w].removeClass(x.selectOption)
					}
				}
			}
		}
		this.callEvent("onChange");
		return this
	}, a = function() {
		var s = this, t = s.config, r = this.cache;
		r.gameWrap.delegate(t.oneOptionSelect, "click", function(z) {
			var A = h(this), u = A.closest(t.oneGameSelect), w = u
					.attr("matchcode")
					|| u.attr("relation"), B = A.attr(t.oneOptionGameType), x = A
					.attr(t.oneOptionIndex), v = t.selectOption, C = r.gameInfo[w], y = r.selectGameInfo[w];
			if (C.isStop) {
				return this
			}
			if (!B || f.indexOf(t.gameTypes, B) == -1) {
				alert("gameTypes或者oneOptionSelect配置错误")
			}
			x = +x;
			if (A.hasClass(v)) {
				s.removeOption(w, B, x)
			} else {
				s.selectOption(w, B, x)
			}
			if (t.isStopSelOptPropagation) {
				z.stopPropagation()
			}
		});
		return this
	}, n = function() {
		var s = this, u, r = this.cache.attentionMenu, t;
		if (!this.config.saveAttentionURL || !r.length) {
			return this
		}
		t = function() {
			u && k.clearTimeout(u);
			u = k.setTimeout(function() {
						r.find(".gameSeleList").hide()
					}, 200)
		};
		r.bind("mouseenter", function() {
					u && k.clearTimeout(u);
					u = k.setTimeout(function() {
								r.find(".gameSeleList").show()
							}, 200)
				}).bind("mouseleave", t).delegate(".makeSure", "click",
				function() {
					if (r.find(".isSave").hasClass("icoFx_active")) {
						if (!j.easyNav.isLogin()) {
							j.easyNav.login2(function(v) {
										if (!v) {
											m.call(s)
										}
									});
							return
						} else {
							m.call(s)
						}
					}
					t()
				}).delegate(".isSave", "click", function() {
					var v = h(this);
					v.toggleClass("icoFx_active")
				}).delegate("li", "mouseenter mouseleave", function() {
					var v = h(this);
					if (!v.hasClass("select")) {
						if (v.hasClass("hover")) {
							v.removeClass("hover")
						} else {
							v.addClass("hover")
						}
						v.attr("title", "关注赛事将置顶显示")
					} else {
						v.attr("title", "点击取消关注")
					}
				}).delegate("li", "click", function() {
					var z = h(this), v = z.attr("leagueId"), w = s.cache.gameInfo, y;
					if (v) {
						if (z.hasClass("select")) {
							z.removeClass("select").addClass("hover");
							y = false
						} else {
							z.addClass("select").removeClass("hover");
							if (!h.isIE678) {
								z.addClass("selectAnimation");
								k.setTimeout(function() {
											z.removeClass("selectAnimation")
										}, 300)
							}
							y = true
						}
						for (var x in w) {
							if (w[x].leagueId == v) {
								w[x].isAttention = y
							}
						}
						l.call(s, v)
					}
				});
		return this
	}, m = function() {
		var w = this.config, s = this.cache, t = this, v = [], r, u = s.attentionMenu
				.find("li[leagueid]");
		u.each(function() {
					var y = h(this), x = [this.getAttribute("leagueid")];
					if (y.hasClass("select")) {
						x.push(1)
					} else {
						x.push(0)
					}
					v.push(x.join(":"))
				});
		j.post(w.saveAttentionURL, {
					gameId : w.gameId,
					leagueIdArr : v.toString()
				}, function(y, x) {
					var z = s.attentionMenu.find(".yelTips");
					if (y) {
						f.alert("对不起发生系统异常")
					} else {
						if (x == -2) {
							easyNav.login()
						} else {
							if (x == 100) {
								f.alert("保存成功")
							} else {
								if (/^[-1&]*$/.test(x)) {
									f.alert(x.split("&")[1])
								}
							}
						}
					}
				})
	}, l = function(B) {
		var z = this.config, r = this.cache, D, v, E, u, C, t = [], A, s = 0, F = r.gameDateInfo, y = r.gameInfo;
		for (C in y) {
			if (y[C].leagueId == B) {
				D = y[C].ele;
				v = y[C].gameDate;
				t.push(v);
				if (y[C].isAttention) {
					if (!F.attention[v]) {
						p.call(this, C, v, "attention")
					}
					if (f.indexOf(F.attention[v].game, C) < 0) {
						i.call(this, C, v, "attention")
					}
				} else {
					if (!F.unAttention[v]) {
						p.call(this, C, v, "unAttention")
					}
					if (f.indexOf(F.unAttention[v].game, C) < 0) {
						i.call(this, C, v, "unAttention")
					}
				}
			}
		}
		A = [];
		for (var w in F) {
			for (var C in F[w]) {
				E = F[w][C];
				if (f.indexOf(t, C) > -1) {
					u = 0;
					for (var x = 0; x < E.game.length; x++) {
						if (!y[E.game[x]].isStop) {
							u++
						}
					}
					E.wrap.find(z.titleSelect + " span.matchSize").html(u)
				}
				if (!E.game.length) {
					A.push(E.wrap);
					delete F[w][C]
				} else {
					if (w == "attention") {
						s += E.game.length
					}
				}
			}
		}
		r.attentionTit.html(h.format(z.attentionTitTmp, s));
		if (!s) {
			r.attentionGameWrap.hide()
		} else {
			r.attentionGameWrap.show()
		}
		for (x = 0; x < A.length; x++) {
			if (A[x]) {
				A[x].remove()
			}
		}
		A = null;
		this.callEvent("onPosition", B);
		return this
	}, p = function(w, t, z) {
		var u = this.config.gameDateWrapTmp, F = this.cache.gameInfo[w], E = this.cache.gameDateInfo, D = this.cache.attentionGameWrap, r = this.cache.unAttentionGameWrap, v, A, x, s, y = [], C = z === "attention"
				? D
				: r;
		if (z == "attention") {
			A = E.unAttention[t].wrap.find("dt").html()
		} else {
			A = E.attention[t].wrap.find("dt").html()
		}
		v = h.format(u, ["gamedate = '" + t + "'", A]);
		for (var B in E[z]) {
			y.push(B)
		}
		y.push(t);
		f.sortNum(y);
		x = f.indexOf(y, t);
		s = C.find(this.config.oneDaySelect + "[gameDate]");
		if (s.length) {
			if (x == 0) {
				s.eq(0).before(v)
			} else {
				s.eq(x - 1).after(v)
			}
		} else {
			C.append(v)
		}
		E[z][t] = {
			wrap : C.find(this.config.oneDaySelect + '[gameDate="' + t + '"]'),
			game : [],
			gameEle : []
		};
		return this
	}, i = function(u, s, x) {
		var t = this.cache.gameInfo, z = this.cache.gameDateInfo, A = t[u], v = z[x][s], w, y, r = v.game;
		r.push(u);
		f.sortNum(r);
		x = (x == "attention" ? "unAttention" : "attention");
		y = z[x][s].game;
		w = f.indexOf(y, u);
		if (w > -1) {
			y.splice(w, 1);
			z[x][s].gameEle = [];
			h.each(y, function(B, C) {
						z[x][s].gameEle.push(t[C].ele)
					})
		}
		w = f.indexOf(r, u);
		if (r.length == 1) {
			v.wrap.append(A.ele);
			A.relationEle && v.wrap.append(A.relationEle)
		} else {
			if (w == 0) {
				y = v.gameEle[0].eq(0);
				y.before(A.ele);
				A.relationEle && y.before(A.relationEle)
			} else {
				y = v.gameEle[w - 1];
				y = y.eq(y.length - 1);
				u = y.attr("matchCode");
				t[u].relationEle
						&& (y = t[u].relationEle
								.eq(t[u].relationEle.length - 1));
				A.relationEle && y.after(A.relationEle);
				y.after(A.ele)
			}
		}
		v.gameEle = [];
		h.each(r, function(B, C) {
					v.gameEle.push(t[C].ele)
				})
	}, e = function() {
		var s = this, u = this.config, r = this.cache, t = function() {
			var x = r.gameInfo, y = h(this), z = {}, w, v = y
					.parents(u.oneDaySelect);
			if (v.hasClass("closeData")) {
				v.removeClass("closeData");
				w = true;
				y.html('隐藏<i class="cusp"></i>')
			} else {
				v.addClass("closeData");
				w = false;
				y.html('展开<i class="cusp"></i>')
			}
			v.find(u.oneGameSelect).filter("[matchcode]").each(function() {
						var A = this.getAttribute("matchcode");
						if (x[A]) {
							if (x[A].ele.css("display") === "none") {
								z[A] = false
							} else {
								z[A] = w
							}
						}
					});
			s.callEvent("onDisplay", z)
		};
		this.cache.gameWrap.delegate(u.oneDaySelect + " .cuspText", "click", t);
		return this
	}, c = function() {
		var y = this.config, s = this.cache, t, v, x, u, r, w = {
			attention : {},
			unAttention : {}
		};
		s.gameWrap.find(y.oneDaySelect).each(function() {
			var z = h(this), A = z.attr("gamedate");
			z.find(y.oneGameSelect).each(function() {
				var G = h(this), J = G.attr("matchcode"), Q = G.attr("score"), M = G
						.attr("starttime"), D = G.attr("endtime"), P = G
						.attr("isstop"), L = G.attr("matchnumcn"), N = G
						.attr("hostname"), I = G.attr("guestname"), H = G
						.attr("leagueid"), T = G.attr("leaguename"), R = G
						.attr("hostteamid"), O = G.attr("visitteamid"), K = G
						.attr("isattention"), B = G.attr("ishot"), S = G
						.attr("matchid"), C = G.attr("relation"), F, E;
				P = P == "1" ? true : false;
				K = K == "1" ? true : false;
				B = B == "1" ? true : false;
				if (J) {
					F = s.gameInfo[J] || {};
					F = h.extend(F, {
								score : Q,
								startTime : M,
								endTime : D,
								matchnumcn : L,
								hostName : N,
								guestName : I,
								isStop : P,
								isHot : B,
								leagueId : H,
								gameDate : A,
								hostTeamId : R,
								visitTeamId : O,
								isAttention : K,
								matchId : S,
								leagueName : T,
								wrap : z
							});
					F.ele = F.ele ? F.ele.add(G) : G;
					s.gameInfo[J] = F
				} else {
					if (C) {
						E = s.gameInfo[C];
						E
								&& (E.relationEle = E.relationEle
										? E.relationEle.add(G)
										: E.relationEle = G)
					}
				}
			})
		});
		for (u in s.gameInfo) {
			x = s.gameInfo[u];
			r = x.relationEle && x.relationEle.length ? x.ele
					.add(x.relationEle) : x.ele;
			x.option = r.find(y.oneOptionSelect);
			x.optionMap = {};
			x.option.each(function() {
						var B = h(this), z = B.attr("gameType"), A = B
								.attr("index");
						x.optionMap[z] = x.optionMap[z] || {};
						x.optionMap[z][A] = x.optionMap[z][A]
								? x.optionMap[z][A].add(B)
								: B
					});
			v = x.isAttention ? "attention" : "unAttention";
			if (w[v][x.gameDate]) {
				t = f.indexOf(w[v][x.gameDate]["game"], u);
				if (t > -1) {
					w[v][x.gameDate]["gameEle"][t].add(x.ele)
				} else {
					w[v][x.gameDate]["game"].push(u);
					w[v][x.gameDate]["gameEle"].push(x.ele)
				}
			} else {
				w[v][x.gameDate] = {
					wrap : x.wrap,
					game : [u],
					gameEle : [x.ele]
				}
			}
		}
		s.gameDateInfo = w;
		return this
	}
})(Core, jQuery, Game, window);
(function(i, h, e, j, f) {
	e.regBaseCom2Lib("COMS.JC.BetPool",
			"onChange onDel onSelectOption onRemoveOption onClear onChangeDan",
			{
				config : {
					wrapSelector : "#selectGamePool",
					clearBtnSelector : "#btnclear",
					oneOptionSelect : "a[gametype][index]",
					delBtnSelect : ".icoDel",
					danBtnSelect : ".icoDan",
					danActiveCls : "icoDanSele",
					danDisabledCls : "icoDanDis",
					optionWrapSelect : ".gameOption[matchCode]",
					optionListWrapSelect : ".betList",
					oneGameTitleSelect : ".gameTitle[matchCode]",
					wrapBodySelect : "tbody",
					teamData : null,
					gameTypes : null,
					oneGameTmp : [
							'<tr matchcode="{matchCode}" class="gameTitle">',
							"<th>",
							'<a class="icoDel" href="javascript:;"></a>{matchnumcn}',
							"</th>", '<th class="tr">{hostName}</th>', "{VS}",
							'<th class="tl">{guestName}</th>', "{dan}",
							"</tr>",
							'<tr class="gameOption" matchCode={matchCode}>',
							"{option}", "</tr>"].join(""),
					VSTmp : "<th></th>",
					danTmp : '<th><a href="javascript:;" class="icoDan"></a></th>',
					selectOptionTmp : '<a index="{0}" gameType={1} matchcode={2} href="javascript:;" class="{3}">{4}</a>',
					optionTmp : ['<td colspan="{colspan}" class="betList">',
							"{optionList}", "</td>",].join(""),
					isDan : true,
					serialize : null
				},
				cache : {
					selectGameInfo : {
						length : 0
					},
					wrap : null,
					wrapBody : null
				},
				init : function(r) {
					var s = this.config, p = this.cache, o = /(\S+)Selector$/;
					h.extend(s, r);
					for (var q in s) {
						if (e.getType(q) == "string" && o.test(q)) {
							p[RegExp.$1] = h(s[q])
						}
					}
					if (!p.wrap || !p.wrap.length) {
						alert("betPool组件初始化错误，容器加载有误");
						return this
					}
					if (s.wrapBodySelect) {
						p.wrapBody = p.wrap.find(s.wrapBodySelect)
					} else {
						p.wrapBody = p.wrap
					}
					if (!p.wrapBody.length) {
						alert("betPool组件初始化错误，容器加载有误");
						return this
					}
					if (!s.teamData) {
						alert("betPool组件初始化错误，teamData必须配置");
						return this
					}
					if (!s.gameTypes) {
						alert("betPool组件初始化错误，gameTypes必须配置");
						return this
					}
					a.call(this);
					c.call(this)
				},
				get : function() {
					return this.cache.selectGameInfo
				},
				getMapKeyList : function(q) {
					var p = [];
					if (!q || !h.isPlainObject(q)) {
						return p
					}
					for (var o in q) {
						if (o != "length") {
							p.push(o)
						}
					}
					return p
				},
				selectOption : function(v, o, p, s, r, u, q, t) {
					return e.getStopRecursionFn(m, this)(v, o, p, s, r, u, q, t)
				},
				removeOption : function(u, o, p, r, t, q, s) {
					return e.getStopRecursionFn(d, this)(u, o, p, r, t, q, s)
				},
				del : function(o) {
					return e.getStopRecursionFn(n, this)(o)
				},
				clear : function() {
					return e.getStopRecursionFn(b, this)()
				},
				setDisableDan : function(s) {
					var q = this, r = this.cache.selectGameInfo, t = this.config, p = false, o = function(
							v, w, u) {
						if (u === true) {
							v.attr("disabled", "disabled")
									.addClass(t.danDisabledCls);
							if (v.hasClass(t.danActiveCls)) {
								p = true;
								v.attr("checked", "")
										.removeClass(t.danActiveCls);
								r[w].isDan = false
							}
						} else {
							if (u === false) {
								v.attr("disabled", "")
										.removeClass(t.danDisabledCls)
							}
						}
					};
					if (e.getType(s) == "object") {
						this.cache.wrapBody.find(this.config.danBtnSelect)
								.each(function() {
									var u = h(this), v = u
											.closest("[matchcode]")
											.attr("matchcode");
									o(u, v, s[v])
								});
						p && q.callEvent("onChangeDan")
					}
					if (e.getType(s) == "boolean") {
						this.cache.wrapBody.find(this.config.danBtnSelect)
								.each(function() {
									var u = h(this), v = u
											.closest("[matchcode]")
											.attr("matchcode");
									o(u, v, s)
								});
						p && q.callEvent("onChangeDan")
					}
					return this
				},
				setDan : function(p) {
					var o = this.cache.selectGameInfo, q = this.config;
					this.cache.wrapBody.find(this.config.danBtnSelect).each(
							function() {
								var r = h(this), s = r.parents("[matchcode]")
										.attr("matchcode");
								if (p[s] === true) {
									r.attr("checked", "checked")
											.addClass(q.danActiveCls).attr(
													"disabled", "")
											.removeClass(q.danDisabledCls);
									o[s].isDan = true
								} else {
									if (p[s] === false) {
										r.attr("checked", "")
												.removeClass(q.danActiveCls);
										o[s].isDan = false
									}
								}
							});
					this.callEvent("onChangeDan")
				},
				serialize : function() {
					var o = this.cache, w, t, r, u, p = this.config.teamData, x, z = o.selectGameInfo, A, v, y = [], s, q = this.config.serialize;
					if (h.isFunction(q)) {
						return q(z)
					} else {
						s = this.getMapKeyList(z);
						e.sortNum(s);
						for (u = 0; u < s.length; u++) {
							w = s[u];
							v = [];
							v.push(w);
							A = [];
							for (t in z[w].sp) {
								x = p[t];
								for (r in z[w].sp[t]) {
									if (r == "length") {
										continue
									}
									A.push(x[r][2])
								}
							}
							v.push(A.join("."));
							if (z[w].isDan) {
								v.push(1)
							} else {
								v.push(0)
							}
							y.push(v.join(":"))
						}
						return y.join(" ")
					}
				}
			});
	var m = function(t, z, u, q, y, p, A, r) {
		var w = this.config, o = this.cache, x = o.selectGameInfo, s = o.gameInfo, v = x[t];
		u = +u;
		r = +r;
		isNaN(r) && (r = "");
		q = +q;
		if (!t || !z || u < 0 || !y || !p || !A || !(q >= 0)) {
			return this
		}
		if (x[t] && x[t]["sp"] && x[t]["sp"][z] && x[t]["sp"][z][u]) {
			return this
		}
		if (this.callEvent("onSelectOption", t, z, u, x) === false) {
			return this
		}
		if (!v) {
			v = {
				matchnumcn : y,
				hostName : p,
				guestName : A,
				isDan : false,
				sp : {}
			};
			if (e.getType(r) == "number") {
				v.score = r
			}
			o.selectGameInfo[t] = v;
			o.selectGameInfo.length += 1
		}
		if (!v.sp[z]) {
			v.sp[z] = {
				length : 0
			}
		}
		q = +q || 0;
		v.sp[z][u] = q;
		v.sp[z].length += 1;
		k.call(this, t);
		this.callEvent("onChange", t, z, u, q)
	}, d = function(r, y, s, w, p, z, q) {
		var o = this.cache, u = this.config, x, v = o.selectGameInfo, t = v[r];
		s = +s;
		if (!r || !y || s < 0 || !w || !p || !z) {
			return this
		}
		if (v[r] && v[r]["sp"][y] && v[r]["sp"][y][s] >= 0) {
			if (this.getMapKeyList(t.sp).length == 1 && t.sp[y].length == 1) {
				this.del(r)
			} else {
				if (this.callEvent("onRemoveOption", r, y, s, v) === false) {
					return this
				}
				if (t.sp[y].length == 1) {
					delete t.sp[y]
				} else {
					delete t.sp[y][s];
					t.sp[y].length -= 1
				}
				k.call(this, r);
				this.callEvent("onChange", r, y, s)
			}
		}
	}, n = function(r) {
		var p = this.cache, q = this.config, o;
		if (!r || !p.selectGameInfo[r]) {
			return this
		}
		if (p.selectGameInfo.length == 1) {
			this.clear()
		} else {
			if (this.callEvent("onDel", r) === false) {
				return this
			}
			delete p.selectGameInfo[r];
			p.selectGameInfo.length -= 1;
			p.wrapBody.find(q.optionWrapSelect).filter('[matchCode="' + r
					+ '"]').remove();
			p.wrapBody.find(q.oneGameTitleSelect).filter('[matchCode="' + r
					+ '"]').remove();
			this.callEvent("onChange", r)
		}
		return this
	}, b = function() {
		var q, o = this.cache, s = this.config, r = o.wrapBody, p = o.selectGameInfo;
		if (p.length) {
			if (this.callEvent("onClear", o.selectGameInfo) === false) {
				return this
			}
			o.selectGameInfo = {
				length : 0
			};
			r.html("");
			this.callEvent("onChange")
		}
		return this
	}, g = function(u, w) {
		var t = [], z, A, s, r, B, x, y = this.config, o = this.cache, q = y.selectOptionTmp, v = y.gameTypes, p = y.teamData;
		for (s = 0; s < v.length; s++) {
			B = w.sp[v[s]];
			x = p[v[s]];
			if (B && x) {
				A = this.getMapKeyList(B);
				e.sortNum(A);
				for (r = 0; r < A.length; r++) {
					t
							.push(h.format(q, [A[r], v[s], u, x[A[r]][0],
											x[A[r]][1]]))
				}
			}
		}
		return t.join("")
	}, l = function(u, p) {
		var r = "", t = this.config, o = this.cache, s = +p.score, q = h
				.format(t.oneGameTmp, {
							VS : t.VSTmp
						});
		r = h.format(q, {
					matchCode : u,
					matchnumcn : p.matchnumcn,
					hostName : (p.hostName || "").substring(0, 4),
					guestName : (p.guestName || "").substring(0, 4),
					score : e.getType(s) == "number" && !isNaN(s) && s != 0
							? '<strong><font color="'
									+ (s > 0 ? "red" : "green") + '">'
									+ (s > 0 ? "+" + s : s)
									+ "</font></strong>"
							: "VS",
					option : h.format(t.optionTmp, {
								optionList : g.call(this, u, p),
								colspan : t.isDan ? 5 : 4
							}),
					dan : t.isDan ? t.danTmp : ""
				});
		return r
	}, k = function(u) {
		var t = "", w = this.config, o = this.cache, z, q, p, y = o.selectGameInfo, v = y[u], x, r = e
				.sortNum(this.getMapKeyList(y)), s = o.wrapBody;
		if (!u || !v) {
			return ""
		}
		z = s.find(w.oneGameTitleSelect);
		q = z.filter('[matchCode="' + u + '"]');
		if (q.length) {
			p = s.find(w.optionWrapSelect).filter('[matchCode="' + u + '"]');
			z = p.find(w.optionListWrapSelect);
			if (!z.length) {
				z = p
			}
			z.html(g.call(this, u, v))
		} else {
			t = l.call(this, u, v);
			x = e.indexOf(r, u);
			x = x > -1 ? x : 0;
			z = z.eq(x);
			if (z.length) {
				z.before(t)
			} else {
				s.append(t)
			}
		}
		return this
	}, a = function() {
		var p = this, o = this.cache, q = this.config;
		o.clearBtn.click(function(r) {
					p.clear();
					r.preventDefault()
				});
		o.wrap.delegate(q.oneOptionSelect, "click", function() {
			var u = h(this), v = u.attr("matchCode"), r = u.attr("gameType"), t = u
					.attr("index"), s = o.selectGameInfo[v];
			t = +t;
			if (!v || t < 0 || !s || !r) {
				return
			}
			p.removeOption(v, r, t, s.matchnumcn, s.hostName, s.guestName,
					s.score)
		}).delegate(q.delBtnSelect, "click", function() {
					var r = h(this), s = r.parents("tr[matchCode]")
							.attr("matchCode");
					p.del(s)
				});
		return this
	}, c = function() {
		var o = this;
		this.cache.wrapBody.delegate(this.config.danBtnSelect, "click",
				function() {
					var q = h(this), s = q.parents("[matchcode]")
							.attr("matchcode"), p = o.cache.selectGameInfo, r = o.config;
					if (q.hasClass(r.danDisabledCls)) {
						return
					}
					if (p[s]) {
						if (!q.hasClass(r.danActiveCls)) {
							q.attr("checked", "checked")
									.addClass(r.danActiveCls);
							p[s].isDan = true
						} else {
							q.attr("checked", "").removeClass(r.danActiveCls);
							p[s].isDan = false
						}
					}
					o.callEvent("onChangeDan")
				});
		return this
	}
})(Core, jQuery, Game, window);
(function(e, c, g, b, d) {
	g.regBaseCom2Lib("COMS.JC.BetMethod", "onMethodChange onTabChange", {
		config : {
			wrapSelector : "#poolStep2",
			wrapTitleSelect : ".guoguanTab li[methodtype]",
			wrapContentSelect : ".guoguanList[methodtype]",
			activeTitle : "active",
			checkSelect : ".icoFx",
			radioSelect : ".icoDx",
			checkAactive : "icoFx_active",
			checkDisabled : "icoFx_disable",
			radioActive : "icoDx_active",
			radioDisabled : "icoDx_disable",
			method : null,
			methodType : null,
			methodTmp : {
				m_1 : '<li inf="{4}" class="jtip"><i class="icoFx {3}" value="{0}"></i>{1}</li>',
				m_n : '<li inf="{4}" class="jtip"><i class="icoDx {3}" value="{0}"></i>{1}</li>'
			},
			serialize : null
		},
		cache : {
			wrap : null,
			wrapTitle : null,
			wrapContent : null,
			selectMethod : [],
			currentMethod : [],
			activeTab : null
		},
		init : function(m) {
			var n = this.config, j = this.cache, l, h = /(\S+)Selector$/;
			c.extend(n, m);
			for (var k in n) {
				if (g.getType(k) == "string" && h.test(k)) {
					j[RegExp.$1] = c(n[k])
				}
			}
			if (!j.wrap || !j.wrap.length) {
				alert("BetMethod组件初始化错误，容器加载有误");
				return this
			}
			j.wrapTitle = j.wrap.find(n.wrapTitleSelect);
			j.wrapContent = j.wrap.find(n.wrapContentSelect);
			if (!j.wrapTitle.length || !j.wrapContent) {
				alert("BetMethod组件初始化错误，容器加载有误");
				return this
			}
			if (!n.method) {
				alert("BetMethod组件初始化错误，method必须配置");
				return this
			}
			if (!n.methodType && !n.methodType.length) {
				alert("BetMethod组件初始化错误，methodType必须配置")
			}
			for (l = 0; l < n.methodType.length; l++) {
				if (!n.methodType[l].length) {
					alert("methodType组件初始化错误，methodType配置错误")
				} else {
					g.sortNum(n.methodType[l])
				}
			}
			f.call(this);
			a.call(this);
			return this
		},
		get : function() {
			return {
				selectMethod : this.cache.selectMethod.slice(0),
				currentMethod : this.cache.currentMethod.slice(0)
			}
		},
		changeMethod : function(l) {
			var j = this.cache, s = this.config, u, o, h = s.method, p = s.methodType
					|| {}, q = s.methodTmp, r = j.selectMethod, n = [], m = [], k = {
				m_1 : [],
				m_n : []
			}, t;
			l = +l;
			if (l >= 0) {
				for (u in h) {
					for (o = 0; o < h[u].length; o++) {
						if (h[u][o].split("_")[0] <= l) {
							t = "至少猜中" + p[h[u][o]][p[h[u][o]].length - 1]
									+ "场可中奖" || "";
							m.push(h[u][o]);
							if (g.indexOf(r, h[u][o]) > -1) {
								n.push(h[u][o]);
								k[u].push(c.format(q[u], [
												h[u][o],
												h[u][o].replace("1_1", "单关")
														.replace("_", "串"),
												'checked="checked"',
												(u == "m_1"
														? s.checkAactive
														: s.radioActive), t]))
							} else {
								k[u].push(c.format(q[u], [
												h[u][o],
												h[u][o].replace("1_1", "单关")
														.replace("_", "串"), "",
												"", t]))
							}
						}
					}
				}
				j.wrapContent.filter('[methodtype="m_1"]').html(k.m_1.join(""));
				j.wrapContent.filter('[methodtype="m_n"]').html(k.m_n.join(""));
				j.selectMethod = n;
				j.currentMethod = m;
				this.callEvent("onMethodChange", j.selectMethod)
			}
			return this
		},
		setDisabledMethod : function(m) {
			var j = this, k, l = this.config, i = this.cache, h = function(n,
					s, o) {
				var p = c(this), r = o == "m_1"
						? l.checkDisabled
						: l.radioDisabled, q = o == "m_1"
						? l.checkAactive
						: l.radioActive;
				if (n != d) {
					if (n === true) {
						p.attr("checked", "").attr("disabled", "disabled")
								.removeClass(q).addClass(r);
						k = g.indexOf(i.selectMethod, s);
						if (k > -1) {
							i.selectMethod.splice(k, 1);
							j.callEvent("onMethodChange", i.selectMethod)
						}
					} else {
						p.attr("disabled", "").removeClass(r)
					}
				}
			};
			if (g.getType(m) == "object") {
				i.wrapContent.find(l.checkSelect).each(function() {
							var n = this.getAttribute("value") || this.value;
							h.call(this, m[n], n, "m_1")
						});
				i.wrapContent.find(l.radioSelect).each(function() {
							var n = this.getAttribute("value") || this.value;
							h.call(this, m[n], n, "m_n")
						})
			}
			if (g.getType(m) == "boolean") {
				i.wrapContent.find(l.checkSelect).each(function() {
							var n = this.getAttribute("value") || this.value;
							h.call(this, m, n, "m_1")
						});
				i.wrapContent.find(l.radioSelect).each(function() {
							var n = this.getAttribute("value") || this.value;
							h.call(this, m, n, "m_n")
						})
			}
			return this
		},
		setActiveTab : function(j) {
			var k = this.config, h = this.cache, i;
			if (j == "m_1" || j == "m_n") {
				i = j
			} else {
				i = j == 1 ? "m_n" : "m_1"
			}
			if (i == this.cache.currentType) {
				return this
			}
			h.wrapContent.css("display", "none").filter('[methodtype="' + i
					+ '"]').css("display", "");
			h.wrapContent.filter('[methodtype="m_1"]').find(k.checkSelect)
					.removeClass(k.checkAactive).removeClass(k.checkDisabled);
			h.wrapContent.filter('[methodtype="m_n"]').find(k.radioSelect)
					.removeClass(k.radioActive).removeClass(k.radioDisabled);
			h.wrapTitle.removeClass(k.activeTitle).filter('[methodtype="' + i
					+ '"]').addClass(k.activeTitle);
			h.selectMethod = [];
			this.cache.currentType = i;
			this.callEvent("onTabChange", j);
			this.callEvent("onMethodChange", h.selectMethod);
			return this
		},
		serialize : function() {
			var j = this.config, h = this.cache, i = j.serialize;
			if (c.isFunction(i)) {
				return i(h.selectMethod)
			} else {
				return h.selectMethod.join(",")
			}
		},
		setMethod : function(l) {
			var i = this, h = this.cache, k = this.config, j = [];
			if (g.getType(l) != "array") {
				return this
			}
			l = l.slice(0);
			h.wrapContent.filter('[methodtype="m_1"]').find(k.checkSelect)
					.each(function() {
						var m = c(this), n = m.attr("value") || this.value;
						if (g.indexOf(l, n) > -1) {
							m.addClass(k.checkAactive)
									.removeClass(k.checkDisabled).attr("check",
											"checked");
							j.push(n)
						} else {
							m.removeClass(k.checkAactive)
									.removeClass(k.checkDisabled).attr("check",
											"")
						}
					});
			h.wrapContent.filter('[methodtype="m_n"]').find(k.radioSelect)
					.each(function() {
						var m = c(this), n = m.attr("value") || this.value;
						if (g.indexOf(l, n) > -1) {
							m.addClass(k.radioActive)
									.removeClass(k.radioDisabled).attr("check",
											"checked");
							j.push(n)
						} else {
							m.removeClass(k.radioActive)
									.removeClass(k.radioDisabled).attr("check",
											"")
						}
					});
			h.selectMethod = j;
			this.callEvent("onMethodChange", h.selectMethod);
			return this
		}
	});
	var f = function() {
		var i = this, j = this.config, h = this.cache;
		h.wrap.delegate(j.wrapTitleSelect, "click", function() {
					i.setActiveTab(this.getAttribute("methodtype"))
				});
		return this
	}, a = function() {
		var j = this, k = this.config, i = this.cache, h = function() {
			var l = [], m;
			i.wrapContent.find(k.checkSelect).each(function() {
						var n = c(this);
						if (n.hasClass(k.checkAactive)
								|| n.hasClass(k.radioActive)) {
							m = this.getAttribute("value") || this.value;
							l.push(m)
						}
					});
			i.selectMethod = l;
			j.callEvent("onMethodChange", i.selectMethod)
		};
		i.wrapContent.delegate("li", "click", function() {
					var m = c(this).find(k.radioSelect), l = c(this)
							.find(k.checkSelect);
					if (l.length && !l.hasClass(k.checkDisabled)) {
						l.toggleClass(k.checkAactive);
						h()
					}
					if (m.length && !m.hasClass(k.radioDisabled)
							&& !m.hasClass(k.radioActive)) {
						i.wrapContent.find(k.radioSelect).each(function() {
									var n = c(this);
									if (n.hasClass(k.radioActive)) {
										n.removeClass(k.radioActive);
										return false
									}
								});
						m.addClass(k.radioActive);
						i.selectMethod = [m.attr("value") || m.val()];
						j.callEvent("onMethodChange", i.selectMethod)
					}
				});
		return this
	}
})(Core, jQuery, Game, window);
(function(e, c, f, b, d) {
	var a = f.regBaseCom2Lib("COMS.JC.iNumber", "onChange", {
		config : {
			wrap : "",
			addSelector : ".add",
			reduceSelector : ".subtract",
			addDisCss : "addDisable",
			addDownCss : "addDown",
			reduceDisCss : "subtractDisable",
			reduceDownCss : "subtractDown",
			min : 1,
			max : 99999,
			step : 1,
			editable : true
		},
		init : function(j) {
			var i = f.getType(j), g = this;
			switch (i) {
				case "string" :
				case "element" :
					this.config = c.extend({}, this.config, {
								wrap : j
							});
					break;
				case "object" :
					if (j.jquery) {
						this.config = c.extend({}, this.config, {
									wrap : j
								});
						break
					}
					this.config = c.extend({}, this.config, j || {});
					break;
				default :
					return
			}
			var h = c(this.config.wrap);
			if (!h[0]) {
				alert("数字容器设置错误，初始化失败！", "num001");
				return
			}
			this.cache = {
				wrap : h,
				input : h.find("input"),
				add : h.find(this.config.addSelector).disableDrag(),
				reduce : h.find(this.config.reduceSelector).disableDrag()
			};
			this.cache.input.val(this.get());
			this.__initCtrl(this.config.addSelector, +g.config.step,
					this.config.addDownCss).__initCtrl(
					this.config.reduceSelector, -g.config.step,
					this.config.reduceDownCss);
			if (this.config.editable) {
				e.loadCdnJS("js2/liveCheck.js", function() {
							return !!c.fn.bindLiveCheck
						}, function() {
							g.cache.input.bindLiveCheck(/\D/g, function() {
										var l = g.get(true), k = this.value;
										if (l + "" != k && k) {
											this.value = l
										}
										k && g.callEvent(200, "onChange", +k)
									}).blur(function() {
										g.set(this.value)
									}).disableIME()
						})
			} else {
				this.cache.input.attr("readonly", "readonly")
			}
			g.onChange(g.__checkCtrl);
			g.__checkCtrl()
		},
		__initCtrl : function(g, j, k) {
			var i = function() {
				this.ctimer && b.clearTimeout(this.ctimer);
				this.stimer && b.clearInterval(this.stimer)
			}, h = this;
			this.cache.wrap.delegate(g, "click", function(l) {
						i.call(this);
						return h.__ctrlClick(this, l, j)
					}).delegate(g, "mousedown", function(m) {
						var l = this;
						this.ctimer = b.setTimeout(function() {
									l.stimer = b.setInterval(function() {
												h.__ctrlClick(l, m, j)
											}, 150)
								}, 400)
					}).delegate(g, "mouseleave", function(l) {
						i.call(this)
					});
			if (c.fn.setControlEffect && k) {
				this.cache.wrap.find(g).setControlEffect(k)
			}
			return this
		},
		__ctrlClick : function(i, h, g) {
			if (c(i).hasClass("disabled")) {
				return
			}
			this.set(this.get() + g)
		},
		__convert : function(j, i) {
			var h = (j + "").replace(/\D/g, ""), k = this.config.min, g = this.config.max, l;
			if (!h.length) {
				h = k
			}
			l = +h;
			if (i) {
				l = l > g ? g : l
			} else {
				l = l < k ? k : l > g ? g : l
			}
			return l
		},
		__checkCtrl : function() {
			var h = this.config, i = h.min, g = h.max, j = this.get();
			this.cache.add[g == j ? "addClass" : "removeClass"](h.addDisCss);
			this.cache.reduce[i == j ? "addClass" : "removeClass"](h.reduceDisCss)
		},
		get : function(g) {
			return this.__convert(this.cache.input[0].value, g)
		},
		set : function(h) {
			var i = this.__convert(h), g = this.cache.input[0];
			if (i + "" != g.value) {
				g.value = i;
				this.callEvent("onChange", i)
			}
			return this
		},
		hide : function() {
			this.config.wrap.hide();
			return this
		},
		show : function() {
			this.config.wrap.show();
			this.onChange();
			return this
		}
	})
})(Core, jQuery, Game, window);
a
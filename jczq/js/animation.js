(function(e, b, f, a, d) {
	e.config = b.extend(e.config || {}, {
		spURL : "/jc/jcquery_spFtl.html",
		detailBoundUrl : "/jc/jczq/bonus_show.jsp#from=bet",
		groupBuyUrl : "/bet/queryBetType_newgroupBuy.html",
		bonusFilterUrl : "/bonusopt/optPreBet.html",
		numFilterUrl : "/betfilter/pre_filter_spf.html",
		teamData : {
			rfspf : [["blockWin", "让球胜", "10003"],
					["blockPing", "让球平", "10001"], ["blockFu", "让球负", "10000"]],
			spf : [["blockWin", "胜", "3"], ["blockPing", "平", "1"],
					["blockFu", "负", "0"]]
		},
		selectOptionTmp : '<a index="{0}" gameType={1} matchcode={2} href="javascript:;" class="{3}">{4}</a>',
		methodType : {
			"1_1" : [1],
			"2_1" : [2],
			"3_1" : [3],
			"4_1" : [4],
			"5_1" : [5],
			"6_1" : [6],
			"7_1" : [7],
			"8_1" : [8],
			"9_1" : [9],
			"10_1" : [10],
			"11_1" : [11],
			"12_1" : [12],
			"13_1" : [13],
			"14_1" : [14],
			"15_1" : [15],
			"2_3" : [2, 1],
			"3_3" : [2],
			"3_4" : [3, 2],
			"3_6" : [2, 1],
			"3_7" : [3, 2, 1],
			"4_4" : [3],
			"4_5" : [4, 3],
			"4_6" : [2],
			"4_10" : [2, 1],
			"4_11" : [4, 3, 2],
			"4_14" : [3, 2, 1],
			"4_15" : [4, 3, 2, 1],
			"5_5" : [4],
			"5_6" : [5, 4],
			"5_10" : [2],
			"5_15" : [2, 1],
			"5_16" : [5, 4, 3],
			"5_20" : [3, 2],
			"5_25" : [3, 2, 1],
			"5_26" : [5, 4, 3, 2],
			"5_30" : [4, 3, 2, 1],
			"5_31" : [5, 4, 3, 2, 1],
			"6_6" : [5],
			"6_7" : [5, 6],
			"6_15" : [2],
			"6_20" : [3],
			"6_21" : [2, 1],
			"6_22" : [6, 5, 4],
			"6_35" : [3, 2],
			"6_41" : [3, 2, 1],
			"6_42" : [6, 5, 4, 3],
			"6_50" : [4, 3, 2],
			"6_56" : [4, 3, 2, 1],
			"6_57" : [6, 5, 4, 3, 2],
			"6_62" : [5, 4, 3, 2, 1],
			"6_63" : [6, 5, 4, 3, 2, 1],
			"7_7" : [6],
			"7_8" : [7, 6],
			"7_21" : [5],
			"7_35" : [4],
			"7_120" : [7, 6, 5, 4, 3, 2],
			"7_127" : [7, 6, 5, 4, 3, 2, 1],
			"8_8" : [7],
			"8_9" : [8, 7],
			"8_28" : [6],
			"8_56" : [5],
			"8_70" : [4],
			"8_247" : [8, 7, 6, 5, 4, 3, 2],
			"8_255" : [8, 7, 6, 5, 4, 3, 2, 1]
		},
		method : {
			m_1 : ["2_1", "3_1", "4_1", "5_1", "6_1", "7_1", "8_1"],
			m_n : ["3_3", "3_4", "4_4", "4_5", "4_6", "4_11", "5_5", "5_6",
					"5_10", "5_16", "5_20", "5_26", "6_6", "6_7", "6_15",
					"6_20", "6_22", "6_35", "6_42", "6_50", "6_57", "7_7",
					"7_8", "7_21", "7_35", "7_120", "8_8", "8_9", "8_28",
					"8_56", "8_70", "8_247"]
		},
		gameTypes : ["rfspf", "spf", "bf", "zjq", "bqc"],
		gameNumberSelector : "#gameNumber",
		gameZhuSelector : "#gameZhu",
		totalMoneySelector : "#totalMoney",
		maxbonusSelector : "#maxbonus",
		floatBoxSelector : ".floatBox",
		buySelector : "#poolStep3 .ljtzBtn",
		groupBuySelector : "#poolStep3 .fqhmBtn",
		openDetailBonusSelector : "#openDetailBonus",
		changeDateSelector : "#changeDate",
		gameIdSelector : "#gameId",
		bonusFilterSelector : "#bonusFilter",
		numFilterSelector : "#numFilter",
		poolErrorTipsSelector : "#poolErrorTips",
		tipMarkSelector : "#tipMark",
		poolStep1Selector : "#poolStep1",
		poolStep2Selector : "#poolStep2",
		poolStep3Selector : "#poolStep3",
		floatTitleSelector : ".dataHead",
		changeTimeSelector : "#changeTime",
		stopGameSelector : "#stopGame",
		hotGameSelector : "#hotGame",
		chooseGameSelector : "#chooseGame",
		betAnSelector : "#betAn",
		tzTipsSelector : ".tzTips",
		scrollPoolPaneSelector : ".scrollMoni",
		dataDanalysisTmp : '<dd style="" class="analyTab"></dd>',
		activityType : 41
	});
	b.extend(e, {
		cache : {},
		quickInit : function() {
			var j = a.Game ? a.Game.config.gameEn : "";
			if (j) {
				f.checkGamePause(j)
			}
			var k = this.config, h = this.cache, g = /(\S+)Selector$/;
			for (var i in k) {
				if (f.getType(i) == "string" && g.test(i)) {
					h[RegExp.$1] = b(k[i])
				}
			}
			this.checkStopGame().initBetArea().initPoolArea().initMethodArea()
					.initBetTimes().setDisPlayGame().initRandom()
					.initAsideAutoHeight().initAsideAutoPosition()
		},
		myInit : function() {
			var i = this.cache;
			this.changeDate().initChooseGameToolBar().moveTitle().changeTime()
					.initDisplayToolBar().changeAnData().betTipsOpertion()
					.payEvent().detailBounds().initbonusFilter().initNews()
					.initRuleClick().initNumFilter();
			this.initIcon();
			if (this.config.bgConfig) {
				e.loadCss(e.cdnUrl + "/css2/lotteryBet/jczqNew/bgPop.css");
				e.loadCdnJS("js2/sportGame2/jczq/hello.js", function() {
							return !!e.loadBgAd
						}, function() {
							e.loadBgAd(e.config.bgConfig)
						})
			}
			var n = b.getPara();
			if (n && n.gameStr) {
				this.defaultGame(n.gameStr, n.gameExtra)
			}
			if (n) {
				var h = this, l;
				try {
					l = n.betTimes;
					if (!isNaN(l)) {
						l = Math.floor(l);
						if (l < 0) {
							l = 0
						}
						if (l > 99999) {
							l = 99999
						}
						h.betTime.set(l)
					}
					if (n.anchor) {
						var g = h.betArea.get(), k = g.gameInfo[n.anchor].ele, j = h.betArea.config;
						if (k) {
							h.scrollWhenNeed(k.offset().top - 60);
							k.addClass(j.hoverGame);
							h.betArea.cache.gameWrap.delegate(j.oneGameSelect,
									"mouseenter", function(p) {
										var o = b(this);
										if (o[0] != k[0]) {
											k.removeClass(j.hoverGame)
										} else {
											k.addClass(j.hoverGame)
										}
									})
						}
					}
					n.selOpt && h.setDisPlayGame(n.selOpt)
				} catch (m) {
				}
			}
		},
		initBetTimes : function() {
			var g = this;
			this.betTime = f.createCom("COMS.JC.iNumber", {
						wrap : "#betTimes",
						max : +g.config.maxBetTimes || 500000
					});
			this.betTime.onChange(function(h) {
						g.updateGameInfo()
					});
			return this
		},
		initBetArea : function() {
			var g = this, h;
			h = f.createCom("COMS.JC.BetArea", {
						oneOptionSelect : "em[index][gametype], td[index][gametype]",
						gameTypes : g.config.gameTypes,
						gameId : g.cache.gameId.val(),
						attentionGameWrapSelect : ".attentionInner",
						unAttentionGameWrapSelect : ".unAttention",
						attentionTitSelector : ".attentionTit",
						attentionMenuSelector : ".attentionMenu"
					});
			h.extend(c).initMoreData().reloadSp().onDel(function(i) {
						g.betPool.del(i)
					}).onSelectOption(function(o, i, l, m, k) {
				var j = this.cache.gameInfo, n = j[o];
				if (!n) {
					return
				}
				g.betPool.selectOption(o, i, l, m, n.matchnumcn, n.hostName,
						n.guestName, n.score)
			}).onRemoveOption(function(n, i, l, k) {
				var j = this.cache.gameInfo, m = j[n];
				if (!m) {
					return
				}
				g.betPool.removeOption(n, i, l, m.matchnumcn, m.hostName,
						m.guestName, m.score)
			}).onClear(function() {
						g.betPool.clear()
					});
			this.betArea = h;
			return this
		},
		initPoolArea : function() {
			var g = this, h = f.createCom("COMS.JC.BetPool", {
						teamData : g.config.teamData,
						gameTypes : g.config.gameTypes
					});
			if (!(b.browser.msie && +b.browser.version < 7)) {
				h.scrollBar = g.initScrollBar(g.cache.scrollPoolPane)
			}
			h.onChange(function(n, i, k, m) {
				var l, j = this.get();
				if (j.length) {
					g.cache.poolStep1.addClass("select")
							.removeClass("unselect")
				} else {
					g.cache.poolStep1.removeClass("select")
							.addClass("unselect")
				}
				if (j.length > 1) {
					g.cache.poolStep2.addClass("select")
							.removeClass("unselect")
				} else {
					g.cache.poolStep2.removeClass("select")
							.addClass("unselect")
				}
				if (j.length < 3) {
					g.betMethod.setActiveTab(0)
				}
				g.betMethod.changeMethod(g.getMaxMethod(j));
				g.updateGameInfo();
				g.meassageTip();
				g.reSetRightSideHeight && g.reSetRightSideHeight();
				g.moveOptionAnimation(n, i, k, m)
			}).onRemoveOption(function(m, i, k, l, j) {
						g.betArea.removeOption(m, i, k)
					}).onClear(function() {
						g.betArea.clear();
						var i = g.cache
					}).onDel(function(i) {
						g.betArea.del(i)
					}).onChangeDan(function() {
						g.dan();
						g.updateGameInfo()
					});
			this.betPool = h;
			return this
		},
		initMethodArea : function() {
			var h = this, g = f.createCom("COMS.JC.BetMethod", {
						method : h.config.method,
						methodType : h.config.methodType
					});
			g.onMethodChange(function(j) {
				var i = this.get();
				h.dan();
				h.updateGameInfo();
				if (i && i.selectMethod.length) {
					h.cache.poolStep3.addClass("select")
							.removeClass("unselect");
					h.meassageTip()
				} else {
					h.cache.poolStep3.removeClass("select")
							.addClass("unselect")
				}
			}).onTabChange(function() {
				this.cache.currentType == "m_n"
						&& h.betPool.setDisableDan(true)
						&& h.betMethod.setDisabledMethod(false);
				this.cache.currentType == "m_n"
						? h.cache.bonusFilter.hide()
						: h.cache.bonusFilter.show();
				h.meassageTip()
			});
			g.initScrollBar = function() {
				this.cache.scrollBarWrap = this.cache.wrapContent
						.filter("[methodtype='m_n']").css("overflow", "hidden")
						.parent(".scrollDiv");
				var j = this, i = function() {
					if (j.scrollBar) {
						var l = g.cache.wrapContent
								.filter("[methodtype='m_n']"), k = l.height();
						k > 78 && (k = 78);
						j.cache.scrollBarWrap.css("height", (k + 16));
						j.scrollBar.reinitialise()
					}
				};
				this.onTabChange(function(k) {
					if (!(b.browser.msie && +b.browser.version < 7)
							&& k == "m_n" && !this.scrollBar) {
						this.scrollBar = h
								.initScrollBar(this.cache.scrollBarWrap)
					}
					k == "m_n" && this.scrollBar && i();
					k == "m_n"
							? this.cache.scrollBarWrap.show()
							: this.cache.scrollBarWrap.hide()
				}).onMethodChange(function() {
							this.cache.currentType == "m_n" && this.scrollBar
									&& i()
						});
				return this
			};
			g.initScrollBar();
			this.betMethod = g;
			return this
		},
		initRandom : function() {
			var m = e.betArea.get().gameInfo, h, g = e.config.teamData, j, l, o = [
					'<div class="randomWrap"><dl><dd class="randomTitle clearfix">',
					'<span class="matchcode">场次</span><span class="league">赛事</span><span class="stopTime">代购截止</span><span class="hostName">主队</span><span class="guessName">客队</span><span class="rq">让球</span><span class="spInfo">投注项/参考指数</span><span class="operation">操作</span></dd>{content}',
					"</dl>",
					'<i class="animateIcon animateBallIcon"></i>',
					"</div>",
					'<p class="randomInfo">每注2元，盈利率<span class="rate">{rate}%</span>&nbsp;我要购买<input value="1" name="randomBetTimes" baseMoney="{rateMoney}"/>倍，预计奖金<i class="rateMoney">{rateMoney}</i>元 <em class="changeAllBtn"></em></p>']
					.join(""), p = '<dd class="randomContent {ddClass} clearfix" matchcode="{matchCode}" index="{index}" option="{option}" sp="{sp}"><span class="matchcode">{matchnumcn}</span><span class="league {colorCss}">{leagueName}</span><span class="stopTime">{endTime}</span><span class="hostName">{hostName}</span><span class="guessName">{guestName}</span><span class="rq">{score}</span><span class="spInfo">{spCN}({sp})</span><span class="operation"><i class="ballIcon"></i><em class="operationBtn">换一场</em></span></dd>', k = function(
					v) {
				var z, y, w, B = {}, t = 0, s = [], C, A, x, r, u;
				for (z in v) {
					w = v[z];
					if (!w.isStop) {
						C = [];
						for (A in w.optionMap) {
							for (x in w.optionMap[A]) {
								r = +w.optionMap[A][x].attr("sp");
								C.push([z, A, x, r])
							}
						}
						if (C.length) {
							t += 1;
							B[w.gameDate]
									? B[w.gameDate].push(C)
									: (B[w.gameDate] = [C], s.push(w.gameDate))
						}
					}
				}
				s.sort(function(E, D) {
							return E - D
						});
				if (t < 2) {
					j.hide();
					return []
				} else {
					j.css("display", "");
					if (B[s[0]].length > 4) {
						return B[s[0]]
					} else {
						u = [];
						for (z in B) {
							u = u.concat(B[z])
						}
						return u
					}
				}
				j.hide();
				return []
			}, n = function(w, s) {
				var v = 0, t = 0, r, x = [[], [], []], u;
				for (r = w.length; v < r; v++) {
					for (t = 0; t < w[v].length; t++) {
						u = w[v][t];
						if (u[0] == s) {
							break
						}
						if (u[3] < 1.5) {
							x[0].push(u)
						} else {
							if (u[3] <= 2) {
								x[1].push(u)
							} else {
								x[2].push(u)
							}
						}
					}
				}
				if ((x[0] && x[0].length) || (x[1] && x[1].length)
						|| (x[1] && x[1].length)) {
					return [[x[0], 3], [x[1], 2], [x[2], 1]]
				}
			}, q = function(s) {
				var u = "", t = (s[0][3] * s[1][3] * 2) || 0, r = function(x, v) {
					var w = "", y;
					y = m[x[0]];
					if (y) {
						w = b.format(p, {
									matchCode : x[0],
									matchnumcn : (y.matchnumcn || "").slice(-3),
									leagueName : y.leagueName,
									endTime : y.endTime,
									hostName : (y.hostName || "").substring(0,
											4),
									guestName : (y.guestName || "").substring(
											0, 4),
									score : x[1] == "spf"
											? "0"
											: (y.score || 0),
									spCN : g[x[1]][x[2]][1],
									option : g[x[1]][x[2]][2],
									sp : x[3],
									index : v,
									ddClass : v % 2 == 1 ? "randomOdds" : "",
									colorCss : v % 2 == 1
											? "bg_006633"
											: "bg_ACA96C"
								})
					}
					return w
				};
				u = b.format(o, {
							content : r(s[0], 0) + r(s[1], 1),
							rate : (((t - 2) / 2) * 100).Round(2).toFixed(2),
							rateMoney : t.Round(2).toFixed(2)
						});
				b.dialog({
					css : "payMentDialog randomDialog",
					title : "机选2串1",
					content : u,
					button : ["立即投注"],
					width : 730,
					init : function() {
						var y = b(this), A = y.find(".rateMoney"), w = y
								.find('input[name="randomBetTimes"]'), x = y
								.find(".rate"), v = +e.config.maxBetTimes
								|| 99999, z = function() {
							var D = 1, C, B = y.find(".randomContent"), E;
							B.each(function() {
										D *= +this.getAttribute("sp")
									});
							D *= 2;
							D = D || 0;
							E = D;
							w.attr("basemoney", E);
							D *= +w.val() || 0, D = D.Round(2).toFixed(2);
							C = (((E - 2) / 2) * 100).Round(2).toFixed(2);
							A.html(D);
							x.html(C + "%")
						};
						y.delegate(".randomContent .operation", "click",
								function() {
									var G = b(this), C = G.parents("dd"), F, D, B = y
											.find(".randomContent"), H = C
											.attr("matchcode"), E, I;
									B.each(function() {
												var J = this
														.getAttribute("matchcode");
												if (J != H) {
													D = J;
													return
												}
											});
									if (!b.isIE678) {
										I = G.position();
										E = y.find(".animateBallIcon");
										E.css({
													left : I.left + 3,
													top : I.top + 3
												});
										E.addClass("animateSelect");
										a.setTimeout(function() {
													E
															.removeClass("animateSelect")
												}, 600)
									}
									F = f.randomWeight(n(l, D), 1)[0];
									C.replaceWith(r(F, C.attr("index")));
									z()
								}).delegate(".operation", "mouseenter",
								function() {
									b(this).find(".ballIcon")
											.addClass("ballIconHover")
								}).delegate(".operation", "mouseleave",
								function() {
									b(this).find(".ballIcon")
											.removeClass("ballIconHover")
								}).delegate(".changeAllBtn", "click",
								function() {
									var D, C, B = y.find(".randomContent");
									B.each(function() {
												var E = b(this);
												D = f.randomWeight(n(l, C), 1)[0];
												C = D[0];
												E
														.replaceWith(r(D,
																E.attr("index")))
											});
									z()
								});
						w.bindNumberLiveCheck(function() {
							var B = +this.value;
							if (B > v) {
								this.value = v
							}
							A.html(((+this.getAttribute("basemoney") || 0) * B)
									.Round(2).toFixed(2))
						}).blur(function() {
									var B = +this.value;
									if (!B) {
										this.value = 1
									}
								})
					},
					check : function(x) {
						var z, w = [], y, v;
						if (x) {
							y = b(this);
							v = y.find(".randomContent");
							v.each(function() {
								var B = this.getAttribute("matchcode"), A = this
										.getAttribute("option");
								w.push([B, A, 0].join(":"))
							});
							z = +y.find('input[name="randomBetTimes"]').val()
									|| 1;
							e.payOrder({
										gameId : e.cache.gameId.val(),
										gameExtra : "2_1",
										betTimes : z,
										isSupportPassWay : 1,
										stakeNumber : w.join(" ")
									}, 1)
						}
					}
				})
			}, i = function() {
				if (!l || !l.length) {
					return
				}
				var t = n(l), s, r;
				if (t && t.length) {
					s = f.randomWeight(t, 1)[0];
					r = f.randomWeight(n(l, s[0]), 1)[0];
					b.dialog();
					q([s, r])
				}
			};
			j = b('<a href="javascript:;" class="randomBtn"></a>')
					.appendTo(e.cache.poolStep1);
			l = k(m);
			j.click(i);
			delete this.initRandom;
			return this
		}
	});
	var c = {
		initMoreData : function() {
			this.cache.dataDanalysis = {};
			var h = this, g = e;
			this.cache.gameWrap.delegate(".moreData", "click", function() {
						var n = g.config, j, i, m, l = b(this), k;
						m = l.parents("[matchCode]").attr("matchCode");
						k = h.cache.dataDanalysis;
						i = h.get().gameInfo[m];
						if (!l.hasClass("active")) {
							l.addClass("active");
							if (!k[m]) {
								j = i.ele.eq(i.ele.length - 1);
								if (i.relationEle) {
									j = i.relationEle
								}
								j.after(n.dataDanalysisTmp);
								j = j.next();
								k[m] = {};
								k[m].ele = j;
								g.loadCdnJS("js2/sportGame2/jczq/jcData.js",
										function() {
											return !!b.fn.jczqData
										}, function() {
											j.jczqData({
														hostName : i.hostName,
														guestName : i.guestName,
														active : 0,
														matchId : i.matchId,
														hostTeamId : i.hostTeamId,
														visitTeamId : i.visitTeamId,
														leagueId : i.leagueId,
														gameId : n.gameId,
														matchCode : m,
														close : function() {
															l.trigger("click")
														}
													})
										})
							}
							k[m].ele.slideDown(function() {
										b(this).css("display", "")
									})
						} else {
							l.removeClass("active");
							k[m].ele.slideUp(function() {
										b(this).css("display", "none")
									})
						}
					});
			this.onPosition(function(l) {
						var k = this.cache, m = k.gameInfo, j, i;
						for (var n in m) {
							j = m[n].relationEle || m[n].ele;
							if (k.dataDanalysis && k.dataDanalysis[n]) {
								i = k.dataDanalysis[n].ele;
								if (j.next()[0] !== i[0]) {
									j.after(i)
								}
							}
						}
					}).onDisplay(function(j) {
						var i = this.cache.dataDanalysis;
						if (!i) {
							return
						}
						for (var k in j) {
							if (i[k]) {
								i[k].ele[j[k] ? "removeClass" : "addClass"]("hide")
							}
						}
					});
			return this
		},
		reloadSp : function() {
			var j = [], m = e.config, h = this, k = this.cache.gameInfo, p = e.cache.gameId
					.val(), l = "jczqspfmixp", g = m.spURL;
			if (!m.spURL) {
				return
			}
			for (var o in k) {
				if (!k[o].isStop) {
					j.push(o)
				}
			}
			j = j.toString();
			var n = function() {
				e.post(g, {
							no : j,
							gameId : p,
							playType : l
						}, function(t, q) {
							if (t) {
								return
							}
							try {
								q = q.split("&");
								var s, w, r, u;
								r = q[0];
								u = q[1];
								r = r.split("|");
								u = u.split("|");
								i("spf", r);
								i("rfspf", u)
							} catch (v) {
							}
						})
			}, i = function(D, u) {
				var v = 0, x, r, C, B, t, w, A, y, z, q, s;
				for (v = 0; v < u.length; v++) {
					x = u[v];
					x = x || "";
					x = x.split(":");
					if (x.length == 2) {
						y = x[0];
						r = x[1].split(",");
						C = r.slice(3);
						r = r.slice(0, 3);
						if (!k[y] || k[y].isStop) {
							continue
						}
						B = k[y].optionMap;
						w = B[D];
						if (w) {
							for (t = 0; t < r.length; t++) {
								if (w[t]) {
									A = w[t];
									z = A.attr("index"), q = A.attr("sp"), s = +r[z];
									if (s == "--") {
										k[y].ele.attr("isStop", "1");
										k[y].isStop = true
									} else {
										if (s && q
												&& typeof C[z] != "undefined") {
											A = A.eq(0);
											if (C[z] == "3") {
												A
														.html(r[z]
																+ '<i class="c_e24949">↑</i>');
												A.attr("sp", r[z])
											} else {
												if (C[z] == "0") {
													A
															.html(r[z]
																	+ '<i class="c_090">↓</i>');
													A.attr("sp", r[z])
												}
											}
										}
									}
								}
							}
						}
					}
				}
			};
			a.setTimeout(function() {
						n()
					}, 1000);
			a.setInterval(function() {
						n()
					}, 210000);
			return this
		}
	}
})(Core, jQuery, Game, window);
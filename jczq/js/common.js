(function(d, b, e, a, c) {
	b.extend(d, {
		moveTitle : function() {
			var i = this.cache, k, m = this.betArea.cache.gameWrap, g = b("<div>"), l, j = b("#docBody"), h = j
					.offset().top, f = i.floatTitle;
			k = f.offset().top;
			g.css({
						height : f.height(),
						width : f.width(),
						display : "none"
					});
			f.after(g);
			b(a).scroll(function() {
				var n = b(a).scrollTop(), o = b.browser.msie
						&& +b.browser.version < 7;
				l = m.offset().top + m.eq(0).height() + m.eq(1).height() - 30;
				if (n > k) {
					if (l < n) {
						f.css({
									position : "absolute"
								})
					} else {
						f.css({
									position : o ? "absolute" : "fixed",
									top : o ? (n - h) : 0,
									zIndex : 888
								})
					}
					g.css("display", "")
				} else {
					f.css({
								position : "relative",
								zIndex : 3,
								top : "auto"
							});
					g.css("display", "none")
				}
			});
			return this
		},
		initAsideAutoPosition : function() {
			if (b.browser.msie && +b.browser.version < 7) {
				return this
			}
			var g = this.cache, f = g.floatBox, k = g.floatTitle, h = b(".hotBlock"), p = b("#docFoot"), j = b("#docBody"), o = j
					.offset().top, i = k.offset().top, m = false, n, l = b(a);
			n = function() {
				var r = l.scrollTop(), q = h.offset() || p.offset(), s = q.top
						- f.height() - 100;
				if (!s || s <= 0) {
					return
				}
				if (l.height() < 616) {
					f.css({
								position : "relative",
								zIndex : 3,
								top : ""
							});
					return
				}
				if (r > i) {
					if (s < r) {
						if (s < i) {
							f.css({
										position : "",
										zIndex : 1
									})
						} else {
							f.css({
										position : "absolute",
										top : s - o,
										zIndex : 665
									})
						}
					} else {
						f.css({
									position : "fixed",
									zIndex : 665,
									top : 0
								})
					}
				} else {
					f.css({
								position : "relative",
								zIndex : 3,
								top : ""
							})
				}
			};
			n();
			this.reSetRightSidePosition = n;
			b(a).scroll(n);
			return this
		},
		initAsideAutoHeight : function() {
			if (b.browser.msie && +b.browser.version < 7) {
				return this
			}
			var n = 138, g = this.cache, f = g.floatBox, l = g.poolStep2, k = g.poolStep3, m = g.scrollPoolPane, h = this.betPool.cache.wrap, i = this, j;
			m.css("overflow", "hidden");
			reSet = function() {
				var p = f.height(), o, r = b(a).height(), q = h.height();
				baseHeight = k.height() + l.height() + 67;
				o = r - baseHeight;
				o < n && (o = n);
				o > q && (o = q);
				m.css("height", o);
				i.betPool && i.betPool.scrollBar
						&& i.betPool.scrollBar.reinitialise();
				i.reSetRightSidePosition && i.reSetRightSidePosition()
			};
			this.reSetRightSideHeight = reSet;
			b(a).resize(function() {
						j && clearTimeout(j);
						j = a.setTimeout(reSet, 100)
					});
			return this
		},
		initScrollBar : function(h) {
			h.jScrollPane().data("jsp");
			var g = {
				addHoverFunc : function() {
					this.getContentPane().bind("mouseenter mouseleave",
							function(j) {
								var i = b(this).siblings(".jspVerticalBar")
										.find(".jspDrag");
								if (j.type == "mouseenter") {
									i.addClass("jspHover")
								} else {
									i.removeClass("jspHover")
								}
							})
				}
			}, f = h.data("jsp");
			b.extend(f, g);
			f.addHoverFunc();
			return f
		},
		initRuleClick : function() {
			b("#orderRule").click(function() {
						b(this).find(".icoFx").toggleClass("icoFx_active")
					});
			return this
		},
		changeTime : function() {
			var f = this, h = this.betArea, g = this.cache.changeTime;
			g.jSelect({
						method : "mouseover",
						hitCss : "showOption"
					}, function(k) {
						var i = h.cache.gameInfo, l = k.option.hash.substr(1);
						for (var j in i) {
							if (i[j].startTime && i[j].endTime) {
								if (l == "1") {
									i[j].ele.find("span.gameTime")
											.html(i[j].startTime)
								} else {
									i[j].ele.find("span.gameTime")
											.html(i[j].endTime)
								}
							}
						}
					});
			return this
		},
		changeDate : function() {
			var f = this.cache.changeDate;
			f.jSelect({
						method : "click"
					}, function(g) {
						if (g.newVal) {
							a.document.location.href = g.newVal
						}
					});
			return this
		},
		changeAnData : function() {
			var g = this, f = b("#docBody").find(".main"), h = this.cache.betAn;
			h.jSelect({
						method : "mouseover",
						hitCss : "showOption"
					}, function(i) {
						var j = i.option.hash.substr(1);
						f[j == 2 ? "addClass" : "removeClass"]("onlyOdds")
					});
			return this
		},
		initDisplayToolBar : function() {
			var h = this.cache, k = h.stopGame, f = h.hotGame, i = h.chooseGame, g = this, j = function() {
				var m = b(this).find(".icoFx"), l;
				m.toggleClass("icoFx_active");
				l = {
					isHot : f.find(".icoFx").hasClass("icoFx_active"),
					isStop : k.find(".icoFx").hasClass("icoFx_active"),
					isSelect : i.find(".icoFx").hasClass("icoFx_active")
				};
				g.betArea.display(1, l)
			};
			k.click(j);
			f.click(j);
			i.click(j);
			return this
		},
		checkStopGame : function() {
			var f = a.Game ? a.Game.config.gameEn : "";
			if (f) {
				e.checkGamePause(f)
			}
			return this
		},
		openGroupBuyDialog : function(i) {
			var h = this, f, g = function(j) {
				j.removeClass("hide3");
				b.dialog({
							title : "发起合买",
							css : "payMentDialog",
							type : "insert",
							button : [],
							content : j,
							width : 558,
							animate : 0,
							button : ["立即付款"],
							check : function() {
								var l = h.groupBuy.getData(), m = {
									gameExtra : h.betMethod.serialize(),
									gameId : h.cache.gameId.val(),
									stakeNumber : h.betPool.serialize(),
									isSupportPassWay : "1",
									betTimes : h.betTime.get(),
									caseDesc : l.desc,
									caseTitle : l.title,
									createrBuyPieces : l.createrBuyPieces,
									guarantee : l.baodi,
									proportion : l.feeType,
									secretLevel : l.secretLevel,
									totalPieces : l.totalPieces
								}, k = h.config.activityType;
								k && (m.activityType = k);
								h.payOrder(m, 3)
							}
						}, function() {
							j.hide()
						})
			};
			if (!this.groupBuy) {
				if (!this.groupBuyStatus) {
					this.groupBuyStatus = true;
					d.get(this.config.groupBuyUrl, {
								gameId : this.cache.gameId.val()
							}, function(k, j) {
								delete h.groupBuyStatus;
								if (k) {
									e.alert("合买加载错误，请稍后再试");
									return
								}
								d.loadCdnJS("js2/sportGame2/COMS/GroupBuy.js",
										function() {
											return !!h.GroupBuy
										}, function() {
											f = b(j);
											f.addClass("hide3");
											b("body").append(f);
											h.groupBuy = e.createCom(
													"COMS.JC.GroupBuy", f);
											h.groupBuy.setBaseMoney(i);
											g(f)
										})
							})
				}
			} else {
				f = b(".groupBox");
				f.show();
				this.groupBuy.setBaseMoney(i);
				g(f)
			}
		},
		setDisPlayGame : function(h) {
			var f = b("#docBody").find(".main"), g = b("#onlySpf .icoFx"), i = b("#onlyRqSpf .icoFx");
			h = +h || 3;
			switch (h) {
				case (1) :
					f.addClass("onlySpf").removeClass("onlyRqSpf");
					g.addClass("icoFx_active").addClass("icoFx_active_disable");
					i.removeClass("icoFx_active")
							.removeClass("icoFx_active_disable");
					break;
				case (2) :
					f.addClass("onlyRqSpf").removeClass("onlySpf");
					i.addClass("icoFx_active").addClass("icoFx_active_disable");
					g.removeClass("icoFx_active")
							.removeClass("icoFx_active_disable");
					break;
				case (3) :
					f.removeClass("onlySpf").removeClass("onlyRqSpf");
					g.addClass("icoFx_active")
							.removeClass("icoFx_active_disable");
					i.addClass("icoFx_active")
							.removeClass("icoFx_active_disable");
				default :
			}
			return this
		},
		initChooseGameToolBar : function() {
			var g = this.cache, f = this, h = b("#onlySpf, #onlyRqSpf");
			h.click(function() {
						var j = b(this), i = j.attr("gameType"), k = j
								.find(".icoFx");
						if (!k.hasClass("icoFx_active_disable")) {
							if (k.hasClass("icoFx_active")) {
								f.setDisPlayGame(i == 1 ? 2 : 1)
							} else {
								f.setDisPlayGame()
							}
						}
					});
			return this
		},
		updateGameInfo : function(i) {
			var u, h = this, f = this.cache, j = this.betMethod, t = this.betPool, q = j
					.get().selectMethod, r = t.get(), l = j.config.methodType, o = t.config.gameTypes, g = t.config.teamData, v = f.gameZhu, k = f.totalMoney, n = f.betTimes, s = this.betTime
					.get(), p = f.maxbonus, m = 0;
			i = i || 2;
			u = this.getTotalNum(q, r, l, o);
			f.gameNumber.html(r.length || 0);
			m = u[0] || 0;
			v.html(m);
			k.html((m * 2 * s).toFixed(2));
			d.loadCdnJS("js2/sportGame/jczq/boundsCore.js", function() {
						return !!e.jczq && e.jczq.getMaxBound
					}, function() {
						var w = h.formatGameInfo(r, g), y;
						if (w.length >= i && q.length > 0) {
							try {
								y = e.jczq.getMaxBound({
											selectMethod : q,
											selectGameInfo : w
										});
								y = +y || 0
							} catch (x) {
								y = 0
							}
						} else {
							y = 0
						}
						p.html((y * s).toFixed(2))
					})
		},
		payEvent : function() {
			var f = this.cache, n, i = f.buy, m = f.groupBuy, g = this, j = this.betMethod, p = this.betPool, q = f.gameId, l = f.totalMoney, o = 1, h = "2_1", k = function(
					s) {
				var t = {
					stakeNumber : p.serialize(),
					gameExtra : j.serialize() || s,
					gameId : q.val(),
					isSupportPassWay : o,
					betTimes : g.betTime.get()
				}, r = g.config.activityType;
				r && (t.activityType = r);
				return t
			};
			i.bind("click", function() {
						if (p.get().length == 2) {
							if (g.baseCheck(h) !== false) {
								g.payOrder(k(h), 1)
							}
						} else {
							if (g.baseCheck() !== false) {
								g.payOrder(k(), 1)
							}
						}
					});
			m.bind("click", function() {
						n = +l.html() || 0;
						if (!g.baseCheck()) {
							return
						}
						if (n < 8) {
							e.alert("发起合买时投注金额不能少于8元，再多选几注吧！");
							return
						}
						g.openGroupBuyDialog(n)
					});
			return this
		},
		baseCheck : function(k) {
			var h = this.cache, j = this.betArea, i = this.betPool, f = this.betMethod, g = h.gameZhu;
			if (!b("#orderRule i.icoFx").hasClass("icoFx_active")) {
				e.alert("请先阅读并同意《委托投注规则》后才能继续");
				return false
			}
			if (!(i.get().length > 1)) {
				this.meassageTip("请在左侧至少选择2场比赛");
				return false
			}
			if (!(f.get().selectMethod.length || k)) {
				this
						.meassageTip('请选择过关方式&nbsp;&nbsp;<i inf="N串1，即将N场比赛串联成一注，猜对N场即可中奖" class="questionMark jtip"></i>');
				return false
			}
			if (!this.betTime.get()) {
				this.meassageTip("方案倍数不正确");
				return false
			}
			return true
		},
		detailBounds : function() {
			var f = this;
			this.cache.openDetailBonus.click(function(j) {
				j.preventDefault();
				var k = f.config, g = f.cache, m = k.detailBoundUrl, i = f.betMethod, o = g.gameId, n = f.betPool, h = k.teamData, l = {};
				if (!f.config.detailBoundUrl) {
					return
				}
				if (f.baseCheck() !== false) {
					if (+f.cache.gameZhu.html() > 10000) {
						e.alert("请选择10000注以下的查看");
						return this
					}
					l.betTimes = f.betTime.get();
					l.totalMoney = +g.totalMoney.html();
					l.selectMethod = i.get().selectMethod;
					l.stakeNumberStr = n.serialize();
					l.gameExtra = i.serialize();
					l.gameId = g.gameId.val(), l.selectGameInfo = f
							.formatGameInfo(n.get(), h);
					d.JCData = l;
					a.open(m, "_blank")
				}
			});
			return this
		},
		initbonusFilter : function() {
			var i = this, g = this.cache, n = this.config, k, o, m, p = 1, h = g.bonusFilter, s = g.gameZhu, r = g.gameId, l = g.totalMoney, q = this.betPool, j = this.betMethod, f = n.bonusFilterUrl;
			if (h && h.length) {
				h.click(function(u) {
							u.preventDefault();
							var v, t;
							if (i.baseCheck() !== false) {
								if (e.indexOf(j.get().selectMethod, "1_1") > -1) {
									e.alert("奖金优化暂不支持单关投注");
									return this
								}
								if (+s.html() > 1000) {
									e.alert("奖金优化支持注数最多1000注");
									return this
								}
								o = q.get();
								for (m in o) {
									if (o[m].isDan) {
										e.alert("奖金优化暂不支持胆码设置");
										return this
									}
								}
								v = {
									gameId : r.val(),
									primaryStakeNumber : q.serialize(),
									primaryBetTimes : i.betTime.get(),
									primaryGameExtra : i.betMethod.serialize(),
									primaryIsSupportPassWay : p,
									optimizeType : 1,
									primarySchemeAmount : +l.html(),
									totalAmount : +l.html()
								};
								if (n.bonusFilterUrl) {
									t = n.bonusFilterUrl;
									i.createForm(t, v)
								}
							}
						})
			}
			return this
		},
		initNumFilter : function() {
			var g = this, f = this.cache, m = this.config, i, n, k, p = 1, t = f.numFilter, s = f.gameZhu, r = f.gameId, j = f.totalMoney, q = this.betPool, h = this.betMethod, o = m.numFilterUrl, l = function() {
				var A = h.get().selectMethod, B = q.cache.selectGameInfo, v = true, y = true, C, u, z, x, D, w;
				if (B.length > 1) {
					for (C in B) {
						if (C != "length") {
							u = B[C]["sp"];
							x = 0;
							for (z in u) {
								if (x > 0) {
									y = false;
									break
								}
								w = z;
								x += 1
							}
							if (!y) {
								break
							} else {
								if (!D) {
									D = {};
									D[w] = 1
								}
								if (!D[w]) {
									y = false;
									break
								}
								if (w != "spf" && w != "rfspf") {
									y = false;
									break
								}
							}
						}
					}
					v = y
				} else {
					v = false
				}
				if (v) {
					if (A.length > 1 || h.cache.currentType == "m_n"
							|| A.toString() == "1_1") {
						v = false
					}
				}
				v ? t.show() : t.hide();
				return v
			};
			q.cache.selectSequence = {};
			q.onChange(function() {
						l();
						return this
					}).onClear(function() {
						this.cache.selectSequence = {}
					}).onDel(function(u) {
						if (this.cache.selectSequence[u]) {
							delete this.cache.selectSequence[u]
						}
					}).onSelectOption(function(z, u, w) {
						var v = this.cache.selectSequence, y = v[z], x;
						w = +w;
						if (u == "spf" || u == "rfspf") {
							if (!y) {
								y = v[z] = {};
								y[u] = [w]
							} else {
								x = y[u];
								if (!x) {
									x = y[u] = [w]
								} else {
									x.push(w)
								}
							}
						}
					}).onRemoveOption(function(z, u, w) {
						var v = this.cache.selectSequence, y, x;
						w = +w;
						if (u == "spf" || u == "rfspf") {
							y = v[z][u];
							x = e.indexOf(y, w);
							if (x > -1) {
								y.splice(x, 1)
							}
						}
					});
			h.onMethodChange(function() {
						l();
						return this
					}).onTabChange(function(u) {
						u == "m_1" ? t.show() : t.hide();
						return this
					});
			q.serialize2 = function() {
				var u = this.cache, C, z, x, A, v = this.config.teamData, D, F = u.selectGameInfo, G = u.selectSequence, w, H, B, E = [], y;
				y = this.getMapKeyList(F);
				e.sortNum(y);
				for (A = 0; A < y.length; A++) {
					C = y[A];
					B = [];
					B.push(C);
					H = [];
					for (z in F[C].sp) {
						D = v[z];
						if (z == "spf" || z == "rfspf") {
							w = G[C];
							for (x = 0; x < w[z].length; x++) {
								H.push(D[w[z][x]][2])
							}
						} else {
							for (x in F[C].sp[z]) {
								if (x == "length") {
									continue
								}
								H.push(D[x][2])
							}
						}
					}
					B.push(H.join("."));
					if (F[C].isDan) {
						B.push(1)
					} else {
						B.push(0)
					}
					E.push(B.join(":"))
				}
				return E.join(" ")
			};
			t.click(function(y) {
						y.preventDefault();
						var v = function() {
							var B = {
								stakeNumber : q.serialize2(),
								gameExtra : h.serialize(),
								gameId : r.val(),
								isSupportPassWay : p,
								betTimes : g.betTime.get()
							}, A = g.config.activityType;
							A && (B.activityType = A);
							return B
						}, z, u, x = q.get(), w;
						if (e.getType(o) == "object") {
							for (z in x) {
								if (z != "length") {
									for (u in x[z].sp) {
										break
									}
									break
								}
							}
							u == "rfspf" && (u = "spf");
							w = o[u]
						} else {
							w = o
						}
						if (!w) {
							return
						}
						if (l() == false) {
							return
						}
						if (!d.easyNav.isLogin()) {
							d.easyNav.login2(function() {
										g.createForm(w, v(), "post", "_self")
									})
						} else {
							g.createForm(w, v())
						}
						y.preventDefault()
					});
			delete this.initNumFilter;
			return this
		},
		meassageTip : function(l) {
			var f = this.cache, m, j, n, g, k = f.poolErrorTips, h = f.tipMark, i = f.poolStep2;
			if (!l) {
				h.hide();
				k.css("display", "").html("请在左侧至少选择2场比赛");
				return
			}
			k.html(l).show();
			m = i.find(".methodContent");
			j = m.position();
			g = m.width() - 4;
			n = m.height() - 4;
			h.css({
						top : j.top,
						left : j.left,
						height : n,
						width : g
					}).show();
			h.flash(function() {
						h.hide()
					})
		},
		betTipsOpertion : function() {
			var f = this;
			this.cache.tzTips.delegate(".cuspText", "click", function() {
						var g = b(this), h = g.parents(".tzTips");
						if (!h.hasClass("closeData")) {
							h.addClass("closeData");
							f.reSetRightSidePosition
									&& f.reSetRightSidePosition();
							g.html('显示<i class="cusp"></i>')
						} else {
							g.html('隐藏<i class="cusp"></i>');
							f.reSetRightSidePosition
									&& f.reSetRightSidePosition();
							h.removeClass("closeData")
						}
						if (b.browser.msie && +b.browser.version < 7) {
							b(a).triggerHandler("scroll")
						}
					});
			return this
		},
		initNews : function() {
			var f;
			b(".eventTips").delegate("li", "mouseenter mouseleave",
					function(g) {
						if (g.type == "mouseover") {
							this.className = "hover"
						} else {
							this.className = ""
						}
					}).mouseenter(function() {
						var g = b(this);
						f && a.clearTimeout(f);
						f = a.setTimeout(function() {
									g.addClass("eventTipsHover")
								}, 200)
					}).mouseleave(function() {
						var g = b(this);
						f && a.clearTimeout(f);
						g.removeClass("eventTipsHover")
					});
			return this
		},
		initIcon : function() {
			b(".betNav")
					.find('li[gameType="dcjs"]')
					.append('<span class="cz_bestChoose">最好中<i class="arrowsIcon"></i></span>');
			return this
		},
		moveOptionAnimation : function(i, o, j, f) {
			var m, g, n = this.betPool, h = this.betArea, k, l;
			if (this.selectAnimation === false) {
				return this
			}
			if (!b.isIE6 && !b.isIE7 && i && o && j >= 0 && f >= 0) {
				l = this.config.teamData[o][j];
				m = h.findGameOption(i, o, j);
				g = n.cache.wrapBody.find('a[matchCode="' + i + '"][gameType="'
						+ o + '"][index="' + j + '"]');
				n.scrollBar && n.scrollBar.scrollToElement(g);
				g.addClass("hide2");	
				k = b('<a class="'
						+ 	l[0]
						+ '"style="position:absolute;left:-9999px;top:-9999px;z-index:999;">'
						+ l[1] + "</a>");
				b("body").append(k);
				this.Tools.moveEle(k, m, g, 100, function() {
							g.removeClass("hide2");
							k.remove()
						})
			}
		}
	})
})(Core, jQuery, Game, window);
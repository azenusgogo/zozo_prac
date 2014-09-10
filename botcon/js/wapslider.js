/*pub-1|2013-01-06 12:02:19*/define(function(B, A, C) {
	var D = B("zepto");
	D.touchSlider = function(F, E) {
		this.op = {
			container : ".slider",
			wrap : ".slider-outer",
			wrapUl : ".slider-wrap",
			wrapStatus : ".slider-status",
			margin : 0,
			cls : "sel",
			prev : null,
			next : null,
			lazy : "dataimg",
			anitime : 500,
			easeing : "ease",
			isLoop : false,
			isPlay : false,
			bounce : true,
			inter : 5000,
			ontouchstart : null,
			ontouchend : null
		};
		if (E) {
			this.op.container = E
		}
		D.extend(this.op, F);
		if (D(this.op.container).length == 0) {
			return null
		}
		this.init()
	};
	D
			.extend(
					D.touchSlider.prototype,
					{
						init : function() {
							var M = this.op;
							this._container = D(M.container);
							this._prev = M.prev
									&& this._container.find(M.prev)[0];
							this._next = M.prev
									&& this._container.find(M.next)[0];
							this._wrap = this._container.find(M.wrap);
							if (this._wrap.length == 0) {
								return null
							}
							var L = this._wul = this._container.find(M.wrapUl);
							if (L.length == 0) {
								return null
							}
							var O = this._childs = L.children();
							if (O.length == 0) {
								return null
							}
							var G = this._step = this._wrap.width(), N = this._len = O.length;
							this._wrapStatus = this._container
									.find(M.wrapStatus);
							this._cls = M.cls;
							var Q = O[0].offsetWidth, I = M.margin, J = this._status = Math
									.floor(this._step / Q), E = Q * this._len;
							if (J < 1) {
								return null
							}
							if (J > 1) {
								M.isLoop = false
							}
							if (M.isLoop) {
								E = Q * (N + 2);
								this.op.bounce = true
							}
							if (I && typeof I == "number") {
								E += (this._len - 1) * I;
								this._step += I
							}
							var F = this._pages = Math.ceil(N / J);
							if (this._wrapStatus.length > 0) {
								var R = "", P = this._wrapStatus.children();
								if (P.length == 0) {
									for ( var K = 0; K < F; K++) {
										R += "<span"
												+ (K == 0 ? " class="
														+ this._cls + "" : "")
												+ "></span>"
									}
									this._wrapStatus.html(R)
								}
							}
							this.getImg();
							if (F <= 1) {
								if (this._prev) {
									this._prev.style.display = "none"
								}
								if (this._next) {
									this._next.style.display = "none"
								}
								this._wrapStatus.hide();
								return null
							}
							L.css("width", E);
							if (M.isLoop) {
								D(O[0].cloneNode(true)).appendTo(L);
								D(O[N - 1].cloneNode(true)).css({
									position : "relative",
									left : -G * (N + 2)
								}).appendTo(L);
								this._childs = L.children()
							}
							var H = this.isTouch = "ontouchstart" in window;
							this._touchstart = "ontouchstart";
							this._touchmove = "ontouchmove";
							this._touchend = "ontouchend";
							if (!H) {
								this._touchstart = "onmousedown";
								this._touchmove = "onmousemove";
								this._touchend = "onmouseup"
							}
							this.eventInit()
						},
						eventInit : function() {
							var E = this;
							E._coord = {};
							E._moveCoord = {};
							E._cmax = 0;
							E._cmin = -(E._pages - 1) * E._step;
							E._left = 0;
							E._current = 0;
							if (E._wrapStatus.length > 0) {
								E._statusChild = E._wrapStatus.children();
								E._selChild = E._statusChild[E._current]
							}
							E._minpage = 0;
							E._maxpage = E._pages - 1;
							E._isScroll = false;
							E._movestart = false;
							E._playTimer = null;
							E._start = E._bindself(E.start, E);
							E._move = E._bindself(E.move, E);
							E._end = E._bindself(E.end, E);
							E.increaseEvent()
						},
						getImg : function(G) {
							var P = this, O = P.op.isLoop, H = P.op.lazy, M = P._status, R = P._childs, Q = R.length, J = G
									&& parseInt(G, 10) || 0, L, K = "img[" + H
									+ "]";
							if (!H) {
								return
							}
							if (J < 0) {
								L = D(R[Q + J]).find(K).add(
										D(R[Q + J - 2]).find(K))
							} else {
								if (M > 1) {
									var F = J * M;
									L = D(R[F]).find(K);
									if (F < Q - 1) {
										var I = Math.min((J + 1) * M, Q);
										for ( var N = F + 1; N < I; N++) {
											L = L.add(D(R[N]).find(K))
										}
									}
								} else {
									L = D(R[J]).find(K)
								}
							}
							if (L.length == 0) {
								return
							}
							var E, S;
							L.each(function(U, T) {
								S = D(T);
								E = S.attr(H);
								if (E) {
									S.attr("src", E);
									S.removeAttr(H)
								}
							})
						},
						getXY : function(F) {
							var E = F.changedTouches ? F.changedTouches[0] : F;
							return {
								x : E.clientX,
								y : E.clientY
							}
						},
						start : function(F) {
							var E = this, G = E.op;
							if (E._isScroll) {
								return
							}
							E.stop();
							E._coord = E.getXY(F);
							E._wrap[0][E._touchmove] = E._move;
							if (E.isTouch) {
								E._wrap[0][E._touchend] = E._end
							} else {
								document[E._touchend] = E._end
							}
							if (G.ontouchstart) {
								G.ontouchstart()
							}
						},
						move : function(J) {
							var H = this;
							H._moveCoord = H.getXY(J);
							var G = H._moveCoord.x - H._coord.x, F = H._moveCoord.y
									- H._coord.y, I = 0, E = H._current;
							if (Math.abs(G) > Math.abs(F)) {
								H._left = -E * H._step + G;
								if (H.op.bounce
										|| (H._left >= H._cmin && H._left <= H._cmax)) {
									I = (G > 0) && (E - 1) || (E + 1);
									H.getImg(I);
									H._wul.css("left", H._left)
								}
								H._movestart = true;
								J.preventDefault()
							}
						},
						end : function(F) {
							var E = this, H = E.op;
							if (E._movestart) {
								F.preventDefault();
								var G = E.getXY(F).x - E._coord.x;
								if (G < -10) {
									E.next()
								} else {
									if (G > 10) {
										E.prev()
									}
								}
								E._movestart = false;
								if (H.ontouchend) {
									H.ontouchend(E._current)
								}
							} else {
								E.begin()
							}
							E._wrap[0][E._touchmove] = null;
							if (E.isTouch) {
								E._wrap[0][E._touchend] = null
							} else {
								document[E._touchend] = null
							}
							E._coord = {};
							E._moveCoord = {};
							G = null
						},
						prev : function(F) {
							if (F && F.preventDefault) {
								F.preventDefault()
							}
							var E = this;
							E._current -= 1;
							if (E._current < E._minpage) {
								if (!E.op.isLoop) {
									E._current = E._minpage
								} else {
									E._current = E._minpage - 1
								}
							}
							this.touchf()
						},
						next : function(F) {
							if (F && F.preventDefault) {
								F.preventDefault()
							}
							var E = this;
							E._current += 1;
							if (E._current > E._maxpage) {
								if (!E.op.isLoop) {
									E._current = E._maxpage
								} else {
									E._current = E._maxpage + 1
								}
							}
							E.touchf()
						},
						touchf : function(G) {
							var E = this, I = E.op, F = parseInt(this._wul
									.css("left"), 10), H = -E._current
									* E._step;
							E._isScroll = true;
							E.stop();
							F = F || 0;
							if (F == H) {
								E._isScroll = false
							} else {
								E.getImg(E._current);
								E._wul
										.animate(
												{
													left : -E._current
															* E._step
												},
												I.anitime,
												I.easeing,
												function() {
													if (I.isLoop) {
														if (E._current >= (E._maxpage + 1)) {
															E._current = 0
														} else {
															if (E._current <= (E._minpage - 1)) {
																E._current = E._maxpage
															}
														}
														D(this)
																.css(
																		"left",
																		-E._current
																				* E._step)
													}
													E.update();
													if (!(!I.isLoop && E._current == E._maxpage)) {
														E.begin()
													} else {
														E.op.isPlay = false
													}
													E._isScroll = false;
													if (E._prev && E._next) {
														E.updateArrow()
													}
												})
							}
						},
						update : function() {
							var E = this;
							if (E._statusChild && E._selChild) {
								D(E._selChild).removeClass(E._cls);
								D(E._statusChild[E._current]).addClass(E._cls);
								E._selChild = E._statusChild[E._current]
							}
						},
						updateArrow : function() {
							var E = this;
							if (!E._prev && !E._next) {
								return
							}
							if (E.op.isLoop) {
								return
							}
							if (E._current <= 0) {
								D(E._prev).addClass("none")
							} else {
								D(E._prev).removeClass("none")
							}
							if (E._current >= E._maxpage) {
								D(E._next).addClass("none")
							} else {
								D(E._next).removeClass("none")
							}
						},
						_bindself : function(F, E) {
							return function(G) {
								F.call(E, G)
							}
						},
						begin : function() {
							var E = this, F = E.op;
							if (F.isPlay) {
								E.stop();
								E._playTimer = setInterval(function() {
									E.next()
								}, F.inter)
							}
						},
						stop : function() {
							var E = this, F = E.op;
							if (F.isPlay && E._playTimer) {
								clearInterval(E._playTimer);
								E._playTimer = null
							}
						},
						increaseEvent : function() {
							var E = this, F = E.op;
							E._wrap[0][E._touchstart] = E._start;
							if (F.isPlay) {
								E.begin()
							}
							if (E._prev) {
								E._prev.onclick = function(G) {
									E.prev.call(E, G)
								}
							}
							if (E._next) {
								E._next.onclick = function(G) {
									E.next.call(E, G)
								}
							}
							if (E._prev && E._next) {
								E.updateArrow()
							}
						},
						destroy : function() {
							var E = this;
							E._container[0].removeAttribute("isLoad");
							if (E._pages <= 1) {
								return
							}
							E._wrap[0][this._touchstart] = null;
							if (E._prev) {
								E._prev.onclick = null
							}
							if (E._next) {
								E._next.onclick = null
							}
						}
					});
	D.touchSlider.cache = [];
	D.fn.slider = function(E) {
		return this.each(function(G, F) {
			if (!F.getAttribute("isLoad")) {
				F.setAttribute("isLoad", true);
				D.touchSlider.cache.push(new D.touchSlider(E, F))
			}
		})
	};
	D.touchSlider.destroy = function() {
		var F = D.touchSlider.cache, E = F.length;
		if (E < 1) {
			return
		}
		for ( var G = 0; G < E; G++) {
			F[G].destroy()
		}
		D.touchSlider.cache = []
	};
	return D.touchSlider
});
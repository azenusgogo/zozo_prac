$.fn.flash = function(e, d, l) {
	if ($.isFunction(e)) {
		l = e;
		e = 0
	}
	if ($.isFunction(d)) {
		l = d;
		d = 0
	}
	var j = 2 * (e || 3), g = 0, f = this.is(":visible"), k = this.flashTimer, h = this;
	k && window.clearInterval(k);
	k = window.setInterval(function() {
				h.css("visibility", g % 2 ? "visible" : "hidden");
				g++;
				if (g >= j) {
					window.clearInterval(k);
					h.flashTimer = 0;
					$.isFunction(l) && l.call(h)
				}
			}, d || 200);
	this.flashTimer = k;
	return this
};
(function(d, b, e, a, c) {
	b.extend(d, {
		getTotalNum : function(q, r, n, p) {
			var s = 0, h = 0, u, t, j, m, g = [], o, l = {
				d : {},
				t : {}
			}, f = {
				d : [],
				t : []
			};
			for (m = 0; m < p.length; m++) {
				l.d[p[m]] = [];
				l.t[p[m]] = []
			}
			if (q.length) {
				for (t in r) {
					if (t == "length") {
						continue
					}
					u = 0;
					for (j in r[t]["sp"]) {
						if (r[t].isDan) {
							l.d[j].push(r[t]["sp"][j].length)
						} else {
							l.t[j].push(r[t]["sp"][j].length)
						}
						u += r[t]["sp"][j].length
					}
					f[r[t].isDan ? "d" : "t"].push(u)
				}
				for (m = 0; m < q.length; m++) {
					o = n[q[m]];
					if (o) {
						g = g.concat(o)
					}
				}
				h = e.c2(f.t, f.d, g);
				if (p.length > 1) {
					for (t in l.t) {
						if (l.t[t].length > 0) {
							s += e.c2(l.t[t], l.d[t], g)
						}
					}
				} else {
					s = h
				}
			}
			return [h, s]
		},
		getMaxMethod : function(h) {
			var g = {}, j, f, i = 0;
			for (j in h) {
				for (f in h[j]["sp"]) {
					if (!g[f]) {
						g[f] = true
					}
				}
			}
			if (g.bqc || g.bf) {
				i = 4
			} else {
				if (g.zjq) {
					i = 6
				} else {
					if (g.spf || g.rfspf) {
						i = 8
					}
				}
			}
			if (h.length < i) {
				i = h.length
			}
			return i
		},
		dan : function(r, l) {
			var r = r || this.betPool, l = l || this.betMethod, o = l.cache.selectMethod, k = l.cache.currentMethod, n = l.config.methodType, s, p = r
					.get(), h = {}, g = {}, j, f = 0;
			if (l.cache.currentType == "m_1") {
				for (var q in p) {
					if (q == "length") {
						continue
					}
					if (p[q].isDan) {
						f = f + 1;
						h[q] = false
					} else {
						h[q] = true
					}
				}
				for (var m = 0; m < o.length; m++) {
					s = n[o[m]];
					s = s[0];
					if (!j || j > s) {
						j = s
					}
				}
				if (j) {
					if (j == p.length) {
						r.setDisableDan(true)
					} else {
						if ((j - 1) == f) {
							r.setDisableDan(h)
						} else {
							r.setDisableDan(false)
						}
					}
				} else {
					if (f === p.length - 1) {
						r.setDisableDan(h)
					} else {
						r.setDisableDan(false)
					}
				}
				if (f == 0) {
					l.setDisabledMethod(false)
				} else {
					for (var m = 0; m < k.length; m++) {
						s = n[k[m]];
						if (f < s) {
							g[k[m]] = false
						} else {
							g[k[m]] = true
						}
					}
					l.setDisabledMethod(g)
				}
			}
		},
		formatGameInfo : function(t, g) {
			var o = [], q, s, u, p, m, f, w, n, j, v, h, l, r = {
				spf : -1,
				rfspf : -1,
				bqc : -2,
				zjq : -1,
				bf : -2
			};
			for (u in t) {
				if (u == "length") {
					continue
				}
				n = +t[u].score;
				n = isNaN(n)
						? "<span class='blue_vs'>VS</span>"
						: '<strong><font color="' + (n > 0 ? "red" : "blue")
								+ '">' + n + "</font></strong>";
				j = [t[u].hostName, n, t[u].guestName].join("&nbsp;&nbsp;");
				f = [];
				w = {};
				for (v in t[u].sp) {
					h = t[u].sp[v];
					l = {};
					if (h) {
						for (var m in h) {
							if (m != "length") {
								s = g[v][m];
								f.push(s[1] + "(" + h[m] + ")");
								l[String(s[2]).slice(r[v])] = h[m]
							}
						}
						w[v] = l
					}
				}
				o.push({
							matchCode : u,
							matchnumcn : t[u].matchnumcn,
							info : j,
							score : t[u].score,
							spInfo : f.join(","),
							isDan : t[u].isDan,
							sp : w
						})
			}
			return o
		},
		defaultGame : function(t, g, C, x, q, l) {
			var I = {}, z, D, B, A, o, m, v, C, E, u, s, p, y, r, n, H, w = {}, f = 0, h = 0, F = {
				1 : "spf",
				2 : "bf",
				3 : "zjq",
				4 : "bqc",
				5 : "rfspf"
			};
			if (!t) {
				return I
			}
			try {
				x = x || d.betArea;
				q = q || d.betPool;
				l = l || d.betMethod;
				d.selectAnimation = false;
				g = g || "";
				g = g.split(",");
				y = q.config.teamData;
				r = {};
				x.clear();
				for (A in y) {
					u = y[A];
					r[A] = r[A] || {};
					for (D = 0; D < u.length; D++) {
						r[A][u[D][2]] = D
					}
				}
				t = b.trim(t).split(" ");
				p = x.get().gameInfo;
				for (D = 0; D < t.length; D++) {
					z = t[D].split(":");
					if (z.length > 1 && z.length <= 3) {
						o = z[0];
						v = z[1];
						m = (z[2] == "1");
						m && ++f;
						w[o] = m;
						v = v.split(".");
						++h;
						if (v && v.length && o && p[o]) {
							for (B = 0; B < v.length; B++) {
								C = C || F[String(v[B]).length];
								if (C) {
									n = r[C][v[B]];
									s = x.findGameOption(o, C, n);
									E = null;
									if (s) {
										H = +s.attr("sp");
										if (H >= 0) {
											x.selectOption(o, C, n, H)
										}
									}
								}
							}
						}
					}
				}
				if (f < h && f > 0) {
					q.setDan(w)
				}
				l.setMethod && l.setMethod(g)
			} catch (G) {
			} finally {
				delete d.selectAnimation
			}
		},
		createForm : function(g, k, i, l) {
			var h = ["<form method='", i || "post", "' action='", g,
					"' target='", l || "_blank", "'>"], f, j;	
			if (k) {
				for (f in k) {
					h.push("<input type='hidden' name='" + f + "' value='"
							+ k[f] + "'/>")
				}
			}
			j = b(h.join("") + "</form>").appendTo(document.body);
			j.submit();
			j.remove()
		},
		payOrder : function(g, f) {
			d.loadJS(d.cdnUrl + "/js2/pay/pay.js", function() {
						return !!d.pay
					}, function() {
						d.pay.toPay({
									data : g,
									orderType : f
								})
					})
		},
		Tools : {
			moveEle : function(u, h, v, l, n) {
				if (u && h && v) {
					n = n || b.noop;
					u = b(u);
					h = b(h);
					v = b(v);
					var w = h.offset(), 
					    j = this, 
					    t = v.offset(), 
					    i = Math.abs(w.left - t.left), 
					    q = Math.abs(w.top - t.top), 
					    r = w.left, 
					    p = w.top, 
					    g = t.left, 
					    f = t.top, 
					    m, o = 6, 
					    k = (i* o / l)|| 10, 
					    s = q * k / i;
					u.css({
								left : r,
								top : p,
								position : "absolute"
							});
					m = a.setInterval(function() {
								if (Math.abs(r - g) <= k) {
									a.clearInterval(m);
									n()
								} else {
									r > g ? r -= k : r += k;
									p > f ? p -= s : p += s
								}
								u.css({
											left : r,
											top : p,
											position : "absolute"
										})
							}, o)
				}
			},
			preload : function(g, h) {
				var f = new Image();
				f.onload = function() {
					h(f.width, f.height);
					f.onload = null
				};
				f.src = g
			}
		}
	})
})(Core, jQuery, Game, window);
import { jsx as y, jsxs as se } from "react/jsx-runtime";
import { memo as k, forwardRef as S, useMemo as p, useState as $, useRef as M, useCallback as b, useEffect as x, useLayoutEffect as z, useImperativeHandle as ce } from "react";
const H = "react-lrc-line", ae = {
  outline: "none",
  boxSizing: "border-box",
  scrollBehavior: "smooth",
  overflow: "auto"
};
function ue({ style: e, ...t }, n) {
  const r = p(
    () => ({
      ...ae,
      ...e
    }),
    [e]
  );
  return /* @__PURE__ */ y("div", { ...t, style: r, ref: n });
}
const le = k(S(ue)), fe = {
  height: "50%"
};
function he() {
  return /* @__PURE__ */ y("div", { style: fe });
}
const de = k(he);
function ve(e, t) {
  let n = 0;
  for (const { length: r } = e; n <= r; n += 1) {
    const i = e[n];
    if (!i || i.startMillisecond > t)
      break;
  }
  return n - 1;
}
const O = {
  currentMillisecond: -1,
  verticalSpace: !1,
  recoverAutoScrollInterval: 5e3,
  recoverAutoScrollSingal: !1
};
function D(e, t = 100) {
  let n = 0;
  return (...r) => {
    const i = Date.now();
    if (i - n >= t)
      return n = i, e(...r);
  };
}
const pe = [" ", "ArrowUp", "ArrowDown"], me = ({
  recoverAutoScrollInterval: e,
  recoverAutoScrollSingal: t,
  onAutoScrollChange: n
}) => {
  const [r, i] = $(!0), o = M(), s = b(() => {
    globalThis.clearTimeout(o.current), i(!1), o.current = globalThis.setTimeout(
      () => i(!0),
      e
    );
  }, [e]), c = M(!1), a = b(() => {
    c.current = !0;
  }, []), u = b(() => {
    c.current = !1;
  }, []), l = p(
    () => D(() => {
      c.current && s();
    }),
    [s]
  ), h = p(
    () => D((d) => {
      pe.includes(d.key) && s();
    }),
    [s]
  ), v = p(() => D(s), [s]);
  return x(() => {
    i(!0);
  }, [t]), x(() => {
    n && n({ autoScroll: r });
  }, [r, n]), x(() => () => globalThis.clearTimeout(o.current), []), {
    autoScroll: r,
    onWheel: v,
    onKeyDown: h,
    onPointerDown: a,
    onPointerUp: u,
    onPointerMove: l
  };
};
function E(e) {
  const t = M();
  return t.current = e, b(
    (...r) => t.current(...r),
    []
  );
}
var B = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, n) {
    var r = -1;
    return t.some(function(i, o) {
      return i[0] === n ? (r = o, !0) : !1;
    }), r;
  }
  return (
    /** @class */
    function() {
      function t() {
        this.__entries__ = [];
      }
      return Object.defineProperty(t.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: !0,
        configurable: !0
      }), t.prototype.get = function(n) {
        var r = e(this.__entries__, n), i = this.__entries__[r];
        return i && i[1];
      }, t.prototype.set = function(n, r) {
        var i = e(this.__entries__, n);
        ~i ? this.__entries__[i][1] = r : this.__entries__.push([n, r]);
      }, t.prototype.delete = function(n) {
        var r = this.__entries__, i = e(r, n);
        ~i && r.splice(i, 1);
      }, t.prototype.has = function(n) {
        return !!~e(this.__entries__, n);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(n, r) {
        r === void 0 && (r = null);
        for (var i = 0, o = this.__entries__; i < o.length; i++) {
          var s = o[i];
          n.call(r, s[1], s[0]);
        }
      }, t;
    }()
  );
}(), I = typeof window < "u" && typeof document < "u" && window.document === document, A = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), be = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(A) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), _e = 2;
function ye(e, t) {
  var n = !1, r = !1, i = 0;
  function o() {
    n && (n = !1, e()), r && c();
  }
  function s() {
    be(o);
  }
  function c() {
    var a = Date.now();
    if (n) {
      if (a - i < _e)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(s, t);
    i = a;
  }
  return c;
}
var ge = 20, we = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], Ee = typeof MutationObserver < "u", Me = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = ye(this.refresh.bind(this), ge);
    }
    return e.prototype.addObserver = function(t) {
      ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();
    }, e.prototype.removeObserver = function(t) {
      var n = this.observers_, r = n.indexOf(t);
      ~r && n.splice(r, 1), !n.length && this.connected_ && this.disconnect_();
    }, e.prototype.refresh = function() {
      var t = this.updateObservers_();
      t && this.refresh();
    }, e.prototype.updateObservers_ = function() {
      var t = this.observers_.filter(function(n) {
        return n.gatherActive(), n.hasActive();
      });
      return t.forEach(function(n) {
        return n.broadcastActive();
      }), t.length > 0;
    }, e.prototype.connect_ = function() {
      !I || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), Ee ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !I || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var n = t.propertyName, r = n === void 0 ? "" : n, i = we.some(function(o) {
        return !!~r.indexOf(o);
      });
      i && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), j = function(e, t) {
  for (var n = 0, r = Object.keys(t); n < r.length; n++) {
    var i = r[n];
    Object.defineProperty(e, i, {
      value: t[i],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, _ = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || A;
}, G = T(0, 0, 0, 0);
function R(e) {
  return parseFloat(e) || 0;
}
function W(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, i) {
    var o = e["border-" + i + "-width"];
    return r + R(o);
  }, 0);
}
function Oe(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var o = i[r], s = e["padding-" + o];
    n[o] = R(s);
  }
  return n;
}
function Ae(e) {
  var t = e.getBBox();
  return T(0, 0, t.width, t.height);
}
function Re(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return G;
  var r = _(e).getComputedStyle(e), i = Oe(r), o = i.left + i.right, s = i.top + i.bottom, c = R(r.width), a = R(r.height);
  if (r.boxSizing === "border-box" && (Math.round(c + o) !== t && (c -= W(r, "left", "right") + o), Math.round(a + s) !== n && (a -= W(r, "top", "bottom") + s)), !Te(e)) {
    var u = Math.round(c + o) - t, l = Math.round(a + s) - n;
    Math.abs(u) !== 1 && (c -= u), Math.abs(l) !== 1 && (a -= l);
  }
  return T(i.left, i.top, c, a);
}
var Se = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof _(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof _(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function Te(e) {
  return e === _(e).document.documentElement;
}
function Le(e) {
  return I ? Se(e) ? Ae(e) : Re(e) : G;
}
function xe(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, o = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, s = Object.create(o.prototype);
  return j(s, {
    x: t,
    y: n,
    width: r,
    height: i,
    top: n,
    right: t + r,
    bottom: i + n,
    left: t
  }), s;
}
function T(e, t, n, r) {
  return { x: e, y: t, width: n, height: r };
}
var De = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = T(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = Le(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), Ie = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, n) {
      var r = xe(n);
      j(this, { target: t, contentRect: r });
    }
    return e;
  }()
), Ce = (
  /** @class */
  function() {
    function e(t, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new B(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof _(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) || (n.set(t, new De(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof _(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) && (n.delete(t), n.size || this.controller_.removeObserver(this));
      }
    }, e.prototype.disconnect = function() {
      this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
    }, e.prototype.gatherActive = function() {
      var t = this;
      this.clearActive(), this.observations_.forEach(function(n) {
        n.isActive() && t.activeObservations_.push(n);
      });
    }, e.prototype.broadcastActive = function() {
      if (this.hasActive()) {
        var t = this.callbackCtx_, n = this.activeObservations_.map(function(r) {
          return new Ie(r.target, r.broadcastRect());
        });
        this.callback_.call(t, n, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), F = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new B(), V = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = Me.getInstance(), r = new Ce(t, n, this);
      F.set(this, r);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  V.prototype[e] = function() {
    var t;
    return (t = F.get(this))[e].apply(t, arguments);
  };
});
var Ne = function() {
  return typeof A.ResizeObserver < "u" ? A.ResizeObserver : V;
}();
function ze(e, t = 300) {
  let n;
  return (...r) => {
    globalThis.clearTimeout(n), n = globalThis.setTimeout(() => e(r), t);
  };
}
const We = ({
  root: e,
  autoScroll: t,
  lineIndex: n,
  lines: r,
  verticalSpace: i
}) => {
  const o = M(
    /* @__PURE__ */ new Map()
  ), s = b(() => {
    if (!e)
      return;
    const c = o.current.get(n);
    c ? e.scrollTop = c.offsetTop - e.clientHeight * 0.5 + c.height / 2 : e.scrollTop = 0;
  }, [n, e]);
  z(() => {
    if (e) {
      const c = () => {
        const u = /* @__PURE__ */ new Map(), l = e.querySelectorAll(
          `.${H}`
        );
        for (let h = 0, { length: v } = l; h < v; h += 1) {
          const d = l[h];
          u.set(h, {
            height: d.clientHeight,
            offsetTop: d.offsetTop
          });
        }
        o.current = u;
      };
      c();
      const a = new Ne(ze(c));
      return a.observe(e), () => a.disconnect();
    }
  }, [e, r, i]), z(() => {
    t && s();
  }, [t, s, r, i]);
}, P = /* @__PURE__ */ y(de, {});
function Pe({
  lines: e,
  lineRenderer: t,
  currentMillisecond: n = O.currentMillisecond,
  verticalSpace: r = O.verticalSpace,
  recoverAutoScrollInterval: i = O.recoverAutoScrollInterval,
  recoverAutoScrollSingal: o = O.recoverAutoScrollSingal,
  onLineClick: s,
  onAutoScrollChange: c,
  onWheel: a,
  onKeyDown: u,
  onPointerDown: l,
  onPointerUp: h,
  onPointerMove: v,
  ...d
}, L) {
  const g = M(null), w = ve(e, n), {
    autoScroll: K,
    onWheel: U,
    onKeyDown: J,
    onPointerDown: Q,
    onPointerUp: X,
    onPointerMove: Z
  } = me({
    recoverAutoScrollInterval: i,
    recoverAutoScrollSingal: o,
    onAutoScrollChange: c
  });
  We({
    root: g.current,
    autoScroll: K,
    lineIndex: w,
    lines: e,
    verticalSpace: r
  }), ce(L, () => g.current);
  const ee = E((f) => (U(), a && a(f))), te = E((f) => (J(f), u && u(f))), ne = E(
    (f) => (Q(), l == null ? void 0 : l(f))
  ), re = E((f) => (X(), h == null ? void 0 : h(f))), ie = E(
    (f) => (Z(), v == null ? void 0 : v(f))
  ), oe = p(
    () => e.map((f, N) => /* @__PURE__ */ y(
      "div",
      {
        className: H,
        onClick: () => {
          s && s({
            line: f
          });
        },
        children: t({ index: N, active: w === N, line: f })
      },
      f.id
    )),
    [w, t, e, s]
  );
  return /* @__PURE__ */ se(
    le,
    {
      tabIndex: -1,
      ...d,
      onWheel: ee,
      onKeyDown: te,
      onPointerDown: ne,
      onPointerUp: re,
      onPointerMove: ie,
      ref: g,
      children: [
        r ? P : null,
        oe,
        r ? P : null
      ]
    }
  );
}
const Y = S(Pe);
var m;
(function(e) {
  e.INVALID = "invalid", e.METADATA = "metadata", e.LYRIC = "lyric", e.ENHANCED_LYRIC = "enhanced_lyric";
})(m || (m = {}));
var ke = /^(\d{2,}):(\d{2})(?:\.(\d{2,3}))?$/;
function $e(e) {
  var t, n = e.match(ke);
  if (n === null)
    return 0;
  var r = n[1], i = n[2], o = (t = n[3]) !== null && t !== void 0 ? t : "00", s = o.length === 3 ? +o : +o * 10;
  return +r * 60 * 1e3 + +i * 1e3 + s;
}
var He = /^((?:\[\d{2,}:\d{2}(?:\.\d{2,3})?\])+)(.*)$/, Be = /^\[(.+?):(.*?)\]$/;
function q(e) {
  for (var t = [], n = e.split(`
`), r = 0, i = n.length; r < i; r += 1) {
    var o = n[r], s = o.match(He);
    if (s !== null) {
      for (var c = s[1], a = c.split("]["), u = 0, l = a; u < l.length; u++) {
        var h = l[u], v = {
          lineNumber: r,
          raw: o,
          type: m.LYRIC,
          startMillisecond: $e(h.replace(/[[\]]/g, "")),
          content: s[2]
        };
        t.push(v);
      }
      continue;
    }
    var d = o.match(Be);
    if (d !== null) {
      var L = d[1], g = d[2], w = {
        lineNumber: r,
        raw: o,
        type: m.METADATA,
        key: L,
        value: g
      };
      t.push(w);
      continue;
    }
    t.push({
      lineNumber: r,
      raw: o,
      type: m.INVALID
    });
  }
  return t;
}
function C() {
  return Math.random().toString(36).substring(2, 8);
}
function je(e) {
  return p(
    () => q(e).filter(
      (n) => n.type === m.LYRIC
    ).map((n) => ({
      id: C(),
      lineNumber: n.lineNumber,
      raw: n.raw,
      startMillisecond: n.startMillisecond,
      content: n.content
    })).sort((n, r) => n.startMillisecond - r.startMillisecond),
    [e]
  );
}
const Ge = ({ lrc: e, onLineClick: t, ...n }, r) => {
  const i = je(e);
  return /* @__PURE__ */ y(
    Y,
    {
      ...n,
      lines: i,
      ref: r,
      onLineClick: t
    }
  );
}, Ke = S(Ge), Fe = (e) => p(() => {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const i = q(r).filter(
      (o) => o.type === m.LYRIC
    );
    for (const o of i) {
      const s = n.get(o.startMillisecond) || {
        id: C(),
        startMillisecond: o.startMillisecond,
        children: []
      };
      s.children.push({
        id: C(),
        lineNumber: o.lineNumber,
        raw: o.raw,
        content: o.content
      }), n.set(o.startMillisecond, s);
    }
  }
  return [...n.values()].sort(
    (r, i) => r.startMillisecond - i.startMillisecond
  );
}, [e.length, ...e]);
function Ve({ lrcs: e, ...t }, n) {
  const r = Fe(e);
  return /* @__PURE__ */ y(Y, { ...t, lines: r, ref: n });
}
const Ue = S(Ve);
function Je() {
  const [e, t] = $(!1), n = b(
    () => t((r) => !r),
    []
  );
  return { signal: e, recoverAutoScrollImmediately: n };
}
export {
  Ke as Lrc,
  Ue as MultipleLrc,
  Je as useRecoverAutoScrollImmediately
};
//# sourceMappingURL=index.esm.js.map

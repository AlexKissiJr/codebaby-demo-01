import p, { useState as g, useLayoutEffect as E, createContext as R, forwardRef as k, useCallback as u, useMemo as x, useImperativeHandle as A, useEffect as h, Fragment as S, useContext as q } from "react";
const z = {
  tansformEventName(e) {
    return this.types[e] ? this.types[e] : e;
  },
  types: {
    ask: "na-ask.vidbaby",
    initialized: "na-initialized.vidbaby",
    playResponseData: "na-playResponseData.vidbaby",
    response: "na-response.vidbaby",
    playResponse: "na-playResponse.vidbaby",
    microphoneStarted: "na-microphoneStarted.vidbaby",
    microphoneAudio: "na-microphoneAudio.vidbaby",
    microphoneData: "na-microphoneData.vidbaby",
    microphoneStop: "na-microphoneStop.vidbaby",
    microphoneStopped: "na-microphoneStopped.vidbaby",
    playerBuilt: "na-playerBuilt.vidbaby",
    unPark: "na-unPark.vidbaby",
    segmentEnded: "na-segmentEnded.vidbaby",
    clientData: "na-clientData.vidbaby",
    extractedEntity: "na-extractedEntity.vidbaby",
    play: "na-play.vidbaby",
    pause: "na-pause.vidbaby",
    mute: "na-mute.vidbaby",
    unmute: "na-unmute.vidbaby",
    "player:state": "na-player:state.vidbaby",
    preRender: "na-preRender.vidbaby",
    interimPlayResponse: "na-interimPlayResponse.vidbaby",
    interimResponse: "na-interimResponse.vidbaby",
    interimSegmentEnded: "na-interimSegmentEnded.vidbaby",
    playerLoadingAssets: "na-playerLoadingAssets.vidbaby",
    "record-start": "na-record-start.vidbaby",
    "record-stop": "na-record-stop.vidbaby",
    "video-progress": "na-video-progress.vidbaby",
    "video-converted": "na-video-converted.vidbaby",
    "video-ready": "na-video-ready.vidbaby",
    "video-cancel": "na-video-cancel.vidbaby",
    camChange: "na-camChange.vidbaby",
    glbLoaded: "na-glbLoaded.vidbaby"
  }
}, v = z;
function f(e) {
  const a = e.replace(/([A-Z])/g, (n) => `-${n[0].toLowerCase()}`);
  return Object.keys(v.types).includes(a) ? a : e;
}
const j = ({ src: e, type: a = "module", async: n = !0 }) => new Promise((c, r) => {
  const i = document.createElement("script");
  i.src = e, i.type = a, i.async = n, i.onload = () => c(i), i.onerror = () => r(new Error("Failed to load script. Check your internet connection.")), document.head.appendChild(i);
});
async function L() {
  if (typeof window.jQuery > "u" || typeof window.$ != "function" || window.jQuery.fn.jquery === void 0 || window.jQuery.fn.jquery < "3.4.1") {
    let e = null, a = null;
    typeof window.jQuery < "u" && (e = window.jQuery, a = window.$), await j({
      src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
      type: "text/javascript",
      async: !1
    }), window.vidbaby$ = window.$, e && (window.$ = a, window.jQuery = e);
  } else
    window.vidbaby$ = window.$;
  typeof window.$ > "u" && (window.$ = window.jQuery);
}
function N({ id: e, env: a }) {
  const [n, c] = g();
  return E(() => {
    const r = async () => {
      const i = {
        local: `http://localhost:8080/loader.js?id=${e}&env=local`,
        dev: `https://bridge3-dev.codebaby.com/loader.js?id=${e}&env=dev`,
        qa: `https://qa-avatar.n-avatars.com/loader.js?id=${e}&env=qa`,
        default: `https://portal.codebaby.com/loader.js?id=${e}`
      }, o = (typeof a == "string" ? a : "").toLowerCase().replace("localhost", "local"), y = i[o] || i.default;
      await L(), await j({ src: y }), c(() => window.vidbaby$);
    };
    window ? r() : setTimeout(r, 3e3);
  }, []), n;
}
const P = R({
  on(e, a) {
  },
  off(e, a) {
  },
  trigger(e, a) {
  }
}), $ = P, Q = k(function({ children: a, id: n, env: c, ...r }, i) {
  const o = N({ id: n, env: c }), y = u((d, s) => {
    o && o(document).on(v.tansformEventName(d), s);
  }, [o]), m = u((d, s) => {
    o && o(document).off(v.tansformEventName(d), s);
  }, [o]), w = u((d, s) => {
    o && o(document).trigger(v.tansformEventName(d), s);
  }, [o]), b = x(() => ({
    on: y,
    off: m,
    trigger: w
  }), [y, m, w]);
  return A(i, function() {
    return b;
  }, [b]), h(() => {
    if (!o || !r || Object.keys(r).length === 0)
      return;
    const d = r, s = Object.keys(r).filter((t) => t.startsWith("on")).map((t) => t.replace("on", "")).map((t) => t.charAt(0).toLowerCase() + t.slice(1));
    if (!(s.length <= 0)) {
      for (const t of s) {
        const l = `on${t.charAt(0).toUpperCase() + t.slice(1)}`;
        t == "initialized" ? b.on(f(t), (...C) => {
          setTimeout(() => d[l].apply(null, ...C), 1700);
        }) : b.on(f(t), d[l]);
      }
      return () => {
        for (const t of s) {
          const l = `on${t.charAt(0).toUpperCase() + t.slice(1)}`;
          b.off(f(t), d[l]);
        }
      };
    }
  }, [r, o]), /* @__PURE__ */ p.createElement($.Provider, { value: b }, /* @__PURE__ */ p.createElement(S, null, a, /* @__PURE__ */ p.createElement("div", { id: "avatarContainer", className: "codebaby-react-avatar-container" })));
});
function D() {
  const { on: e, off: a, trigger: n } = q($);
  return { on: e, off: a, trigger: n };
}
function B() {
  const [e, a] = g(!1);
  return h(() => {
    let n = null;
    const c = () => {
      if (window && window.vidbaby$ && window.vidbaby && window.vidbaby.initialized)
        return a(!0);
      n = setTimeout(c, 1e3);
    };
    return c(), () => {
      n && clearTimeout(n);
    };
  }, []), e;
}
export {
  Q as AvatarProvider,
  D as useCodebabyEvents,
  B as useIsInitialized
};
//# sourceMappingURL=codebaby-react.esm.js.map

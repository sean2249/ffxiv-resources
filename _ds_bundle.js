/* @ds-bundle: {"format":4,"namespace":"FFXIVDesignSystem_f1941e","components":[{"name":"BoardCell","sourcePath":"components/cactpot/BoardCell.jsx"},{"name":"CactpotBoard","sourcePath":"components/cactpot/CactpotBoard.jsx"},{"name":"LineArrow","sourcePath":"components/cactpot/LineArrow.jsx"},{"name":"LineRow","sourcePath":"components/cactpot/LineRow.jsx"},{"name":"PAYOUT","sourcePath":"components/cactpot/PayoutTable.jsx"},{"name":"PayoutTable","sourcePath":"components/cactpot/PayoutTable.jsx"},{"name":"ProbBar","sourcePath":"components/cactpot/ProbBar.jsx"},{"name":"RecoBanner","sourcePath":"components/cactpot/RecoBanner.jsx"},{"name":"RecoEmphasis","sourcePath":"components/cactpot/RecoBanner.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardText","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"DetailOverlay","sourcePath":"components/feedback/DetailOverlay.jsx"},{"name":"NumKey","sourcePath":"components/forms/NumKey.jsx"},{"name":"NumPad","sourcePath":"components/forms/NumKey.jsx"},{"name":"SelectField","sourcePath":"components/forms/SelectField.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"AppHeader","sourcePath":"components/navigation/AppHeader.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"}],"sourceHashes":{"components/cactpot/BoardCell.jsx":"34634fb7f691","components/cactpot/CactpotBoard.jsx":"e1f20246b32f","components/cactpot/LineArrow.jsx":"156227824486","components/cactpot/LineRow.jsx":"9677fd65013b","components/cactpot/PayoutTable.jsx":"814e9a8c1ca8","components/cactpot/ProbBar.jsx":"08b0fc8f9309","components/cactpot/RecoBanner.jsx":"0c170851a35d","components/core/Badge.jsx":"b99d02b08dda","components/core/Button.jsx":"8029bddeca20","components/core/Card.jsx":"b84804e2d1a6","components/core/Icon.jsx":"ace84e737754","components/core/usePressable.js":"96c2a0891256","components/feedback/DetailOverlay.jsx":"3637f70b8399","components/forms/NumKey.jsx":"91aba85af795","components/forms/SelectField.jsx":"1ad7a0c5f90a","components/forms/TextField.jsx":"620690e4048e","components/navigation/AppHeader.jsx":"8e523334ab34","components/navigation/TabBar.jsx":"dc8194c00736","ui_kits/ffxiv-pwa/AboutScreen.jsx":"d05736c89185","ui_kits/ffxiv-pwa/HomeScreen.jsx":"08ce9fdac15b","ui_kits/ffxiv-pwa/PhoneShell.jsx":"ba23e833d4bb","ui_kits/ffxiv-pwa/SolverScreen.jsx":"307e65055f77","ui_kits/ffxiv-pwa/solver-logic.js":"049277e3b3fe","ui_kits/ffxiv-pwa/sw.js":"905166bea0e7"},"inlinedExternals":[],"unexposedExports":[{"name":"canHover","sourcePath":"components/core/usePressable.js"},{"name":"tapReset","sourcePath":"components/core/usePressable.js"},{"name":"usePressable","sourcePath":"components/core/usePressable.js"}]} */

(() => {

const __ds_ns = (window.FFXIVDesignSystem_f1941e = window.FFXIVDesignSystem_f1941e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cactpot/PayoutTable.jsx
try { (() => {
const PAYOUT = [[6, 10000], [7, 36], [8, 720], [9, 360], [10, 80], [11, 252], [12, 108], [13, 72], [14, 54], [15, 180], [16, 72], [17, 180], [18, 119], [19, 36], [20, 306], [21, 1080], [22, 144], [23, 1800], [24, 3600]];
const cell = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--border)',
  padding: '0.38rem 0.7rem',
  textAlign: 'center'
};
function PayoutTable({
  rows = PAYOUT,
  headers = ['三數之和', '獎金（MGP）'],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 'var(--text-sm)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, headers.map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      ...cell,
      background: 'var(--surface-2)',
      color: 'var(--text)',
      fontWeight: 'var(--weight-bold)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(([sum, mgp], i) => /*#__PURE__*/React.createElement("tr", {
    key: sum
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell,
      background: i % 2 ? 'var(--surface-2)' : 'var(--surface)'
    }
  }, sum), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell,
      background: i % 2 ? 'var(--surface-2)' : 'var(--surface)'
    }
  }, mgp.toLocaleString('en-US')))))));
}
Object.assign(__ds_scope, { PAYOUT, PayoutTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cactpot/PayoutTable.jsx", error: String((e && e.message) || e) }); }

// components/cactpot/ProbBar.jsx
try { (() => {
// A 9px pill bar on a faint track — the system's only data-viz element.
// The track matters: without it a short bar reads as missing rather than small.
function ProbBar({
  percent = 0,
  tone = 'info',
  showLabel = true,
  style
}) {
  const w = Math.max(0, Math.min(100, percent));
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      width: '100%',
      minWidth: '60px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      height: '9px',
      background: 'var(--surface-2)',
      borderRadius: 'var(--radius-pill)',
      display: 'block',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: '100%',
      width: w + '%',
      minWidth: w > 0 ? '3px' : 0,
      background: tone === 'gold' ? 'var(--gold)' : tone === 'accent' ? 'var(--accent)' : 'var(--info)',
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--duration-slow) var(--ease-out)'
    }
  })), showLabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--muted)',
      whiteSpace: 'nowrap',
      flex: 'none'
    }
  }, percent.toFixed(1), "%") : null);
}
Object.assign(__ds_scope, { ProbBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cactpot/ProbBar.jsx", error: String((e && e.message) || e) }); }

// components/cactpot/RecoBanner.jsx
try { (() => {
const tones = {
  neutral: {
    background: 'var(--surface)',
    borderColor: 'var(--border)'
  },
  reveal: {
    background: 'var(--accent-soft)',
    borderColor: 'var(--accent)'
  },
  final: {
    background: 'var(--accent-soft)',
    borderColor: 'var(--accent)'
  }
};
function RecoBanner({
  tone = 'neutral',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      width: '100%',
      fontSize: 'var(--text-lead)',
      lineHeight: 'var(--leading-relaxed)',
      textAlign: 'center',
      padding: '0.9rem 1.3rem',
      borderRadius: 'var(--radius)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'var(--border)',
      boxShadow: 'var(--shadow-sm)',
      color: 'var(--text)',
      ...tones[tone],
      ...style
    }
  }, children);
}
function RecoEmphasis({
  tone = 'gold',
  children
}) {
  return /*#__PURE__*/React.createElement("strong", {
    style: {
      color: tone === 'accent' ? 'var(--accent-strong)' : 'var(--gold)',
      fontWeight: 'var(--weight-bold)'
    }
  }, children);
}
Object.assign(__ds_scope, { RecoBanner, RecoEmphasis });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cactpot/RecoBanner.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const tones = {
  accent: {
    background: 'var(--accent)',
    color: 'var(--on-accent)',
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent',
    borderRadius: '4px',
    fontSize: 'var(--text-micro)',
    padding: '0.1rem 0.45rem'
  },
  gold: {
    background: 'var(--gold-soft)',
    color: 'var(--gold)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--gold-border)',
    borderRadius: 'var(--radius-pill)',
    fontSize: 'var(--text-xs)',
    padding: '0.3rem 1rem',
    letterSpacing: 'var(--tracking-wide)'
  },
  neutral: {
    background: 'var(--surface-2)',
    color: 'var(--muted)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    borderRadius: '4px',
    fontSize: 'var(--text-micro)',
    padding: '0.1rem 0.45rem'
  }
};
function Badge({
  tone = 'accent',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 'fit-content',
      fontWeight: 'var(--weight-bold)',
      lineHeight: 1.4,
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Renders a Lucide icon from the global `lucide` UMD build.
// Load it once per page: <script src="https://unpkg.com/lucide@0.544.0/dist/umd/lucide.min.js"></script>
// lucide.icons.House is a flat array of [tag, attrs] pairs.
function toPascal(name) {
  return String(name).split(/[-_ ]/).filter(Boolean).map(s => s[0].toUpperCase() + s.slice(1)).join('');
}
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = 'currentColor',
  style,
  ...rest
}) {
  const lib = typeof window !== 'undefined' ? window.lucide : null;
  const raw = lib && lib.icons ? lib.icons[toPascal(name)] || lib.icons[name] : null;
  const box = {
    width: size,
    height: size,
    display: 'inline-block',
    flexShrink: 0,
    ...style
  };
  const nodes = (Array.isArray(raw) ? raw : raw && raw.children ? raw.children : []).filter(n => Array.isArray(n) && typeof n[0] === 'string');
  if (!nodes.length) return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: box
  });
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: box
  }, rest), nodes.map((n, i) => React.createElement(n[0], {
    key: i,
    ...(n[1] || {})
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/usePressable.js
try { (() => {
// Shared touch/pointer state. Hover only applies on devices that truly hover
// (a phone must never keep a "hover" style stuck after a tap); every pressable
// gets an immediate press state instead, which is what makes taps feel native.
function canHover() {
  return typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(hover: hover)').matches : true;
}
function usePressable() {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const handlers = {
    onPointerEnter: () => {
      if (canHover()) setHovered(true);
    },
    onPointerLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerCancel: () => setPressed(false)
  };
  return {
    hover: hovered && !pressed,
    pressed,
    handlers
  };
}

// Applied to every tappable surface.
const tapReset = {
  WebkitTapHighlightColor: 'transparent',
  touchAction: 'manipulation',
  userSelect: 'none',
  WebkitUserSelect: 'none'
};
Object.assign(__ds_scope, { canHover, usePressable, tapReset });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/usePressable.js", error: String((e && e.message) || e) }); }

// components/cactpot/BoardCell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function BoardCell({
  value,
  state = 'idle',
  onClick,
  style
}) {
  const {
    hover,
    pressed,
    handlers
  } = __ds_scope.usePressable();
  const clickable = state === 'clickable' || state === 'reco' || state === 'dimmed';
  const base = {
    width: 'var(--cell-size)',
    height: 'var(--cell-size)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-numeric)',
    fontSize: 'var(--text-cell)',
    fontWeight: 'var(--weight-bold)',
    borderRadius: 'var(--radius)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    background: 'var(--surface)',
    color: 'var(--muted)',
    cursor: clickable ? 'pointer' : 'default',
    appearance: 'none',
    transition: 'var(--transition-cell)',
    ...__ds_scope.tapReset
  };
  const states = {
    idle: null,
    clickable: {
      borderColor: 'var(--border-strong)',
      boxShadow: 'var(--shadow-sm)'
    },
    filled: {
      background: 'var(--gold-soft)',
      borderColor: 'var(--gold)',
      color: 'var(--gold)'
    },
    selected: {
      background: 'var(--gold-soft)',
      borderColor: 'var(--gold)',
      color: 'var(--gold)',
      boxShadow: 'var(--ring-gold), var(--shadow-sm)'
    },
    // Deliberately feather-light: a hairline ring, no fill. The board is the hero;
    // the recommendation should read as a whisper, not a highlight block.
    reco: {
      borderWidth: '1px',
      borderColor: 'var(--accent)',
      boxShadow: 'var(--ring-accent)'
    },
    dimmed: {
      opacity: hover ? 0.75 : 0.4,
      boxShadow: 'none'
    },
    locked: {
      opacity: value == null ? 0.5 : 1,
      boxShadow: 'none'
    },
    chosen: {
      background: 'var(--accent-soft)',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'var(--accent)',
      color: 'var(--accent-strong)',
      boxShadow: 'var(--ring-chosen)'
    },
    // Line-phase emphasis: which three cells the arrow you are looking at actually pays on.
    // The fill stays bronze (the digit is still "a number you own") — only the edge changes.
    lineReco: {
      borderWidth: '2px',
      borderColor: 'var(--accent)',
      boxShadow: 'var(--ring-accent)',
      opacity: value == null ? 0.55 : 1
    },
    lineActive: {
      borderWidth: '2px',
      borderColor: 'var(--text)',
      opacity: value == null ? 0.55 : 1
    }
  };
  const isFilled = value != null;
  let glyph = null;
  if (isFilled) glyph = value;else if (state === 'reco') glyph = /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 22,
    color: "var(--accent)"
  });else if (state === 'clickable') glyph = /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 22,
    color: "var(--placeholder)"
  });
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick
  }, handlers, {
    style: {
      ...base,
      ...(isFilled && state !== 'chosen' && state !== 'selected' ? states.filled : null),
      ...states[state],
      ...(clickable && state === 'clickable' && hover ? {
        borderColor: 'var(--accent)',
        transform: 'var(--lift-md)',
        boxShadow: 'var(--shadow-md)'
      } : null),
      ...(clickable && pressed ? {
        borderColor: 'var(--accent)',
        background: 'var(--accent-soft)',
        transform: 'scale(var(--press-scale))',
        boxShadow: 'none',
        opacity: 1,
        transition: 'transform var(--duration-press) var(--ease-out)'
      } : null),
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex'
    }
  }, glyph));
}
Object.assign(__ds_scope, { BoardCell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cactpot/BoardCell.jsx", error: String((e && e.message) || e) }); }

// components/cactpot/LineArrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// One of the 8 line selectors that surround the board, mirroring the in-game layout:
// three pointing right (rows), three pointing down (columns), two diagonal corners.
//
// Affordance is the whole job here. While the board is still being filled these are inert
// hairline marks; the moment lines become selectable they grow into real buttons — a filled
// disc with a border and a shadow — because they are then the only thing left to tap.
const ROT = {
  right: 0,
  down: 90,
  downRight: 45,
  downLeft: 135
};
function LineArrow({
  direction = 'right',
  state = 'idle',
  onClick,
  style
}) {
  const {
    hover,
    pressed,
    handlers
  } = __ds_scope.usePressable();
  const active = state === 'best' || state === 'candidate';
  const best = state === 'best';
  const chrome = !active ? {
    background: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    boxShadow: 'none',
    opacity: 0.4
  } : best ? {
    background: 'var(--accent-soft)',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: 'var(--accent)',
    boxShadow: 'var(--shadow-sm)',
    opacity: 1
  } : {
    background: 'var(--surface)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border-strong)',
    boxShadow: 'var(--shadow-sm)',
    opacity: 1
  };
  const stroke = best ? 'var(--accent-strong)' : active ? 'var(--text)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    disabled: !active,
    "aria-label": "\u9078\u64C7\u9019\u689D\u7DDA"
  }, handlers, {
    style: {
      // Full 44px target — these eight arrows are the app's primary action.
      width: 'var(--tap-min)',
      height: 'var(--tap-min)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      borderRadius: '999px',
      cursor: active ? 'pointer' : 'default',
      transition: 'var(--transition-control)',
      position: 'relative',
      ...__ds_scope.tapReset,
      ...chrome,
      ...(active && hover ? {
        borderColor: 'var(--accent)',
        transform: 'var(--lift-sm)'
      } : null),
      ...(active && pressed ? {
        transform: 'scale(var(--press-scale))',
        boxShadow: 'none',
        background: 'var(--accent-soft)',
        transition: 'transform var(--duration-press) var(--ease-out)'
      } : null),
      ...style
    }
  }), best ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: -3,
      borderRadius: '999px',
      borderWidth: '1.5px',
      borderStyle: 'solid',
      borderColor: 'var(--accent)',
      animation: 'arrow-pulse 2.2s var(--ease-out) infinite'
    }
  }) : null, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": "true",
    style: {
      transform: 'rotate(' + ROT[direction] + 'deg)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 10h10M10 5.5 14.5 10 10 14.5",
    stroke: stroke,
    strokeWidth: best ? 2.4 : 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
Object.assign(__ds_scope, { LineArrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cactpot/LineArrow.jsx", error: String((e && e.message) || e) }); }

// components/cactpot/CactpotBoard.jsx
try { (() => {
// Line order matches the solver: 3 rows, 3 columns, then the two diagonals.
// Each arrow is placed in the gutter grid track that the line runs out of, so the
// board reads exactly like the in-game one.
const ARROWS = [{
  dir: 'right',
  row: 2,
  col: 1
},
// 上排
{
  dir: 'right',
  row: 3,
  col: 1
},
// 中排
{
  dir: 'right',
  row: 4,
  col: 1
},
// 下排
{
  dir: 'down',
  row: 1,
  col: 2
},
// 左行
{
  dir: 'down',
  row: 1,
  col: 3
},
// 中行
{
  dir: 'down',
  row: 1,
  col: 4
},
// 右行
{
  dir: 'downRight',
  row: 1,
  col: 1
},
// 左斜
{
  dir: 'downLeft',
  row: 1,
  col: 5
} // 右斜
];
function CactpotBoard({
  values = Array(9).fill(null),
  states = Array(9).fill('idle'),
  lineStates,
  onCellClick,
  onLineClick,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-4)',
      position: 'relative'
    }
  }, children, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'var(--arrow-gutter) repeat(3, var(--cell-size)) var(--arrow-gutter)',
      gridTemplateRows: 'var(--arrow-gutter) repeat(3, var(--cell-size))',
      gap: 'var(--board-gap)',
      alignItems: 'center',
      justifyItems: 'center'
    }
  }, lineStates ? ARROWS.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: 'a' + i,
    style: {
      gridRow: a.row,
      gridColumn: a.col
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LineArrow, {
    direction: a.dir,
    state: lineStates[i],
    onClick: () => onLineClick && onLineClick(i)
  }))) : null, values.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      gridRow: 2 + Math.floor(i / 3),
      gridColumn: 2 + i % 3
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BoardCell, {
    value: v,
    state: states[i],
    onClick: () => onCellClick && onCellClick(i)
  })))));
}
Object.assign(__ds_scope, { CactpotBoard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cactpot/CactpotBoard.jsx", error: String((e && e.message) || e) }); }

// components/cactpot/LineRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function LineRow({
  name,
  ev,
  note,
  best = false,
  disabled = false,
  onClick,
  style
}) {
  const {
    hover,
    pressed,
    handlers
  } = __ds_scope.usePressable();
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick
  }, handlers, {
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap',
      background: best ? 'var(--accent-soft)' : 'var(--surface)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: best ? 'var(--accent)' : 'var(--border)',
      color: 'var(--text)',
      padding: '0.6rem 1rem',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--text-base)',
      fontFamily: 'var(--font-body)',
      textAlign: 'left',
      boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      opacity: disabled ? 0.7 : 1,
      cursor: disabled ? 'default' : 'pointer',
      transition: 'var(--transition-control)',
      minHeight: 'var(--tap-min)',
      ...__ds_scope.tapReset,
      ...(!disabled && hover ? {
        borderColor: 'var(--accent)',
        transform: 'var(--lift-sm)'
      } : null),
      ...(!disabled && pressed ? {
        borderColor: 'var(--accent)',
        background: 'var(--accent-soft)',
        transform: 'scale(var(--press-scale))',
        boxShadow: 'none',
        transition: 'transform var(--duration-press) var(--ease-out)'
      } : null),
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: '6.5em',
      fontWeight: 'var(--weight-bold)',
      color: best ? 'var(--accent-strong)' : 'var(--text)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--muted)'
    }
  }, ev), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)'
    }
  }, note) : null);
}
Object.assign(__ds_scope, { LineRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cactpot/LineRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-body)',
  fontWeight: 'var(--weight-bold)',
  cursor: 'pointer',
  transition: 'var(--transition-control)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  lineHeight: 1.2,
  ...__ds_scope.tapReset
};
const sizes = {
  sm: {
    fontSize: 'var(--text-xs)',
    padding: '0.32rem 0.9rem',
    borderRadius: 'var(--radius-sm)',
    minHeight: '32px'
  },
  md: {
    fontSize: 'var(--text-base)',
    padding: '0.52rem 1.3rem',
    borderRadius: 'var(--radius-sm)',
    minHeight: 'var(--tap-min)'
  },
  lg: {
    fontSize: 'var(--text-base)',
    padding: '0.58rem 1.6rem',
    borderRadius: 'var(--radius-md)',
    minHeight: '48px'
  }
};
const variants = {
  primary: {
    background: 'var(--accent)',
    color: 'var(--on-accent)',
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent'
  },
  secondary: {
    background: 'var(--surface)',
    color: 'var(--text)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border-strong)',
    boxShadow: 'var(--shadow-sm)'
  },
  ghost: {
    background: 'none',
    color: 'var(--muted)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border-strong)'
  },
  danger: {
    background: 'var(--surface)',
    color: 'var(--danger)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--danger)',
    boxShadow: 'var(--shadow-sm)'
  }
};
const hovers = {
  primary: {
    background: 'var(--accent-strong)',
    color: '#fff'
  },
  secondary: {
    borderColor: 'var(--accent)',
    transform: 'var(--lift-sm)'
  },
  ghost: {
    color: 'var(--text)',
    borderColor: 'var(--text)'
  },
  danger: {
    background: 'var(--danger-soft)',
    transform: 'var(--lift-sm)'
  }
};
const presses = {
  primary: {
    background: 'var(--accent-strong)',
    color: '#fff'
  },
  secondary: {
    background: 'var(--surface-2)'
  },
  ghost: {
    background: 'var(--surface-2)'
  },
  danger: {
    background: 'var(--danger-soft)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const {
    hover,
    pressed,
    handlers
  } = __ds_scope.usePressable();
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick
  }, handlers, {
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...(!disabled && hover ? hovers[variant] : null),
      ...(!disabled && pressed ? {
        ...presses[variant],
        transform: 'scale(var(--press-scale))',
        boxShadow: 'none',
        transition: 'transform var(--duration-press) var(--ease-out)'
      } : null),
      opacity: disabled ? 0.35 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  as = 'div',
  href,
  interactive = false,
  padding = '1.25rem',
  children,
  style,
  ...rest
}) {
  const {
    hover,
    pressed,
    handlers
  } = __ds_scope.usePressable();
  const Tag = href ? 'a' : as;
  const isInteractive = interactive || !!href;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href
  }, isInteractive ? handlers : null, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      background: 'var(--surface-card)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'var(--border-card)',
      borderRadius: 'var(--radius)',
      padding,
      color: 'var(--text)',
      textDecoration: 'none',
      boxShadow: 'var(--shadow-sm)',
      transition: 'border-color var(--duration-slow) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
      ...(isInteractive ? __ds_scope.tapReset : null),
      ...(isInteractive && hover ? {
        borderColor: 'var(--accent)',
        transform: 'var(--lift-md)'
      } : null),
      ...(isInteractive && pressed ? {
        borderColor: 'var(--accent)',
        background: 'var(--surface-2)',
        transform: 'scale(var(--press-scale))',
        transition: 'transform var(--duration-press) var(--ease-out)'
      } : null),
      ...style
    }
  }, rest), children);
}
function CardTitle({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--gold)',
      margin: 0,
      ...style
    }
  }, children);
}
function CardText({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--muted)',
      lineHeight: 'var(--leading-normal)',
      margin: 0,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card, CardTitle, CardText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/feedback/DetailOverlay.jsx
try { (() => {
// Centred popup — the system's only interaction surface beyond the board itself.
// It is `absolute`, not `fixed`, so it centres inside the app frame rather than the page.
function DetailOverlay({
  open = true,
  title,
  subtitle,
  onClose,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: 'var(--space-5)',
      animation: 'fade-in var(--duration-fast) var(--ease-out) both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '1.15rem 1.25rem 1.25rem',
      width: '100%',
      maxWidth: '330px',
      boxShadow: 'var(--shadow-md)',
      animation: 'pop-in var(--duration-base) var(--ease-emphasis) both'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "\u95DC\u9589",
    style: {
      position: 'absolute',
      top: '0.45rem',
      right: '0.45rem',
      background: 'none',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      color: 'var(--placeholder)',
      cursor: 'pointer',
      lineHeight: 1,
      padding: 10,
      display: 'flex',
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 17
  })), title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--text)',
      fontSize: '1.02rem',
      fontWeight: 'var(--weight-bold)',
      margin: 0
    }
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--muted)',
      margin: '0.2rem 0 0.95rem',
      fontSize: '0.8rem'
    }
  }, subtitle) : null, children));
}
Object.assign(__ds_scope, { DetailOverlay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/DetailOverlay.jsx", error: String((e && e.message) || e) }); }

// components/forms/NumKey.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NumKey({
  value,
  current = false,
  disabled = false,
  onClick,
  compact = false,
  fill = false,
  style
}) {
  const {
    hover,
    pressed,
    handlers
  } = __ds_scope.usePressable();
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: () => onClick && onClick(value)
  }, handlers, {
    style: {
      boxSizing: 'border-box',
      width: fill ? '100%' : compact ? 'var(--numkey-size-compact)' : 'var(--numkey-size)',
      minWidth: 0,
      height: compact ? '44px' : 'var(--numkey-size)',
      fontFamily: 'var(--font-numeric)',
      fontSize: 'var(--text-numkey)',
      fontWeight: 'var(--weight-bold)',
      borderRadius: 'var(--radius-md)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'var(--border-strong)',
      background: 'var(--surface)',
      color: 'var(--text)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      opacity: disabled ? 0.35 : 1,
      transition: 'var(--transition-control)',
      ...__ds_scope.tapReset,
      ...(current ? {
        borderColor: 'var(--gold)',
        background: 'var(--gold-soft)',
        color: 'var(--gold)'
      } : null),
      ...(!disabled && hover ? {
        borderColor: 'var(--accent)',
        transform: 'var(--lift-sm)'
      } : null),
      ...(!disabled && pressed ? {
        borderColor: 'var(--accent)',
        background: 'var(--accent-soft)',
        color: 'var(--accent-strong)',
        transform: 'scale(var(--press-scale))',
        boxShadow: 'none',
        transition: 'transform var(--duration-press) var(--ease-out)'
      } : null),
      ...style // caller wins — must stay last
    }
  }), value);
}
function NumPad({
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  current,
  disabledValues = [],
  onSelect,
  hint,
  onClear,
  compact = true,
  columns = 5
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)',
      minHeight: '3rem',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + columns + ', minmax(0, 1fr))',
      gap: '8px',
      width: '100%',
      maxWidth: '100%'
    }
  }, values.map(v => /*#__PURE__*/React.createElement(NumKey, {
    key: v,
    value: v,
    fill: true,
    current: current === v,
    disabled: disabledValues.includes(v),
    onClick: onSelect,
    style: {
      height: compact ? '48px' : 'var(--numkey-size)'
    }
  }))), hint ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--muted)',
      fontSize: 'var(--text-sm)'
    }
  }, hint) : null, onClear ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClear,
    style: {
      background: 'none',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'var(--border-strong)',
      color: 'var(--muted)',
      fontSize: 'var(--text-xs)',
      padding: '0.32rem 0.9rem',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      transition: 'border-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)'
    }
  }, "\u6E05\u9664\u6B64\u683C") : null);
}
Object.assign(__ds_scope, { NumKey, NumPad });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/NumKey.jsx", error: String((e && e.message) || e) }); }

// components/forms/SelectField.jsx
try { (() => {
function SelectField({
  label,
  value,
  onChange,
  options = [],
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)',
      fontSize: 'var(--text-xs)',
      color: 'var(--muted)',
      ...style
    }
  }, label, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      background: 'var(--bg)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'var(--border-strong)',
      color: 'var(--text)',
      padding: '0.48rem 0.6rem',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--text-base)',
      fontFamily: 'var(--font-body)',
      outline: 'none',
      ...(focus ? {
        borderColor: 'var(--accent)'
      } : null)
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))));
}
Object.assign(__ds_scope, { SelectField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SelectField.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
const control = {
  background: 'var(--bg)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--border-strong)',
  color: 'var(--text)',
  padding: '0.48rem 0.6rem',
  borderRadius: 'var(--radius-sm)',
  fontSize: 'var(--text-base)',
  fontFamily: 'var(--font-body)',
  outline: 'none'
};
function TextField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
  step,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)',
      fontSize: 'var(--text-xs)',
      color: 'var(--muted)',
      ...style
    }
  }, label, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    min: min,
    step: step,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...control,
      ...(focus ? {
        borderColor: 'var(--accent)'
      } : null)
    }
  }));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppHeader.jsx
try { (() => {
function AppHeader({
  title,
  subtitle,
  links = [],
  size = 'page'
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      width: '100%',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: size === 'home' ? 'var(--space-8)' : '1.4rem 2rem 1.1rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: size === 'home' ? 'var(--text-hero)' : 'var(--text-title)',
      fontWeight: 'var(--weight-black)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text)',
      margin: 0
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      marginTop: 'var(--space-1)',
      fontSize: 'var(--text-xs)'
    }
  }, subtitle) : null, links.length ? /*#__PURE__*/React.createElement("nav", {
    style: {
      marginTop: '0.7rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '1.2rem'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    onClick: l.onClick,
    style: {
      color: 'var(--text-link)',
      textDecoration: 'none',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-medium)'
    }
  }, l.label))) : null);
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
function TabBar({
  items = [],
  active,
  onSelect
}) {
  const [pressed, setPressed] = React.useState(null);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: '1fr',
      height: 'var(--tabbar-height)',
      width: '100%',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      paddingBottom: 'env(safe-area-inset-bottom)'
    }
  }, items.map(it => {
    const on = it.id === active;
    const press = pressed === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onSelect && onSelect(it.id),
      onPointerDown: () => setPressed(it.id),
      onPointerUp: () => setPressed(null),
      onPointerCancel: () => setPressed(null),
      onPointerLeave: () => setPressed(null),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        minHeight: '44px',
        fontFamily: 'var(--font-body)',
        color: on ? 'var(--accent-strong)' : 'var(--muted)',
        transition: 'color var(--duration-fast) var(--ease-out), transform var(--duration-press) var(--ease-out), opacity var(--duration-press) var(--ease-out)',
        ...__ds_scope.tapReset,
        ...(press ? {
          transform: 'scale(0.92)',
          opacity: 0.6
        } : null)
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 22,
      strokeWidth: on ? 2.25 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: on ? 'var(--weight-bold)' : 'var(--weight-medium)'
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ffxiv-pwa/AboutScreen.jsx
try { (() => {
const {
  Icon
} = window.FFXIVDesignSystem_f1941e;
function Line({
  icon,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17,
    color: "var(--placeholder)",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: '0.85rem',
      lineHeight: 1.7,
      color: 'var(--muted)'
    }
  }, children));
}
function AboutScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '1.15rem',
      padding: '0 1.4rem 2rem'
    }
  }, /*#__PURE__*/React.createElement(Line, {
    icon: "lock"
  }, "\u7D14\u672C\u6A5F\u904B\u7B97\uFF0C\u4E0D\u4E0A\u50B3\u4EFB\u4F55\u8CC7\u6599\u3002\u5B89\u88DD\u5230\u4E3B\u756B\u9762\u5F8C\u53EF\u96E2\u7DDA\u4F7F\u7528\u3002"), /*#__PURE__*/React.createElement(Line, {
    icon: "github"
  }, "\u539F\u59CB\u78BC\u516C\u958B\u5728 ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/sean2249/ffxiv-resources",
    style: {
      color: 'var(--accent-strong)'
    }
  }, "github.com/sean2249/ffxiv-resources")), /*#__PURE__*/React.createElement(Line, {
    icon: "info"
  }, "\u672C\u7AD9\u70BA\u975E\u5B98\u65B9\u7C89\u7D72\u8CC7\u6E90\u7AD9\uFF0C\u8207 Square Enix \u7121\u95DC\u3002", /*#__PURE__*/React.createElement("br", null), "Final Fantasy XIV \xA9 Square Enix Co., Ltd."));
}
window.AboutScreen = AboutScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ffxiv-pwa/AboutScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ffxiv-pwa/HomeScreen.jsx
try { (() => {
const {
  Card,
  Icon
} = window.FFXIVDesignSystem_f1941e;
function HomeScreen({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 1.3rem 1.3rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.1rem'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/app-icon-192.png",
    alt: "",
    width: "76",
    height: "76",
    style: {
      borderRadius: 18,
      boxShadow: 'var(--shadow-sm)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.5rem',
      fontWeight: 900,
      letterSpacing: '-0.02em',
      color: 'var(--text)'
    }
  }, "FFXIV \u8CC7\u6E90\u7AD9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.85rem',
      color: 'var(--muted)',
      marginTop: '0.4rem'
    }
  }, "kiwi \u7684 FFXIV \u6536\u96C6\u7528\u9014"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    onClick: () => onOpen('cactpot'),
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.9rem',
      padding: '0.95rem 1.1rem'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "dices",
    size: 26,
    color: "var(--gold)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.98rem',
      fontWeight: 700,
      color: 'var(--text)'
    }
  }, "\u4ED9\u4EBA\u5FAE\u5F69"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.76rem',
      color: 'var(--muted)',
      marginTop: '0.15rem'
    }
  }, "Mini Cactpot \u6C42\u89E3\u5668")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--placeholder)"
  }))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ffxiv-pwa/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ffxiv-pwa/PhoneShell.jsx
try { (() => {
const {
  TabBar,
  Icon
} = window.FFXIVDesignSystem_f1941e;
const TABS = [{
  id: 'home',
  icon: 'house',
  label: '首頁'
}, {
  id: 'cactpot',
  icon: 'dices',
  label: '仙人微彩'
}, {
  id: 'about',
  icon: 'info',
  label: '關於'
}];

// Every screen fits one viewport. The content region does not scroll — if something
// does not fit, the screen is wrong, not the scroller.
function AppShell({
  tab,
  onTab,
  standalone = false,
  children
}) {
  const frame = standalone ? {
    width: '100%',
    height: '100dvh',
    borderRadius: 0,
    border: 'none',
    boxShadow: 'none'
  }
  // Real iPhone 14/15/16 logical size — 390×844. Do not round this to a tidier number:
  // "does it fit one screen" is only a meaningful question against a real device.
  : {
    width: 390,
    height: 844,
    borderRadius: 44,
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-md)',
    margin: '0 auto'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)',
      overflow: 'hidden',
      ...frame
    }
  }, standalone ? null : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 26,
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px',
      fontSize: 11,
      color: 'var(--placeholder)',
      fontWeight: 600,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", null, "100%")), /*#__PURE__*/React.createElement("div", {
    key: tab,
    style: {
      flex: 1,
      minHeight: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      animation: 'var(--screen-in)'
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(TabBar, {
    active: tab,
    onSelect: onTab,
    items: TABS
  })));
}

// Quiet screen title. No card, no border — the content below is the subject.
function ScreenHeader({
  title,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'calc(0.85rem + env(safe-area-inset-top)) 1.1rem 0.75rem'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: '1.02rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: 'var(--text)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.15rem'
    }
  }, action));
}
function IconAction({
  name,
  label,
  onClick,
  tone = 'var(--muted)'
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": label,
    style: {
      background: 'none',
      border: 'none',
      color: tone,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      margin: '-8px -10px -8px 0',
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: 19
  }));
}
Object.assign(window, {
  AppShell,
  PhoneShell: AppShell,
  ScreenHeader,
  IconAction,
  TABS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ffxiv-pwa/PhoneShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ffxiv-pwa/SolverScreen.jsx
try { (() => {
const {
  CactpotBoard,
  NumPad,
  DetailOverlay,
  ProbBar,
  Icon
} = window.FFXIVDesignSystem_f1941e;
const S = window.CactpotSolver;
const TOTAL_REVEALS = 4; // the game reveals one, you choose three more

function SolverScreen() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [picking, setPicking] = React.useState(null); // cell index awaiting a digit
  const [lineOpen, setLineOpen] = React.useState(null); // line index in the detail popup

  const filled = board.filter(v => v !== null).length;
  const phase = filled < TOTAL_REVEALS ? 'reveal' : 'line';
  const reco = phase === 'reveal' && filled > 0 ? S.recommendReveal(board).index : null;
  const best = phase === 'line' ? S.bestLine(board) : null;

  // In the line phase the board itself shows which three cells the highlighted line pays
  // on — inspecting an arrow moves that emphasis to the line you are looking at.
  const shownLine = phase === 'line' ? lineOpen !== null ? lineOpen : best.idx : null;
  const lineCells = shownLine !== null ? S.LINES[shownLine] : [];
  const cellStates = board.map((v, i) => {
    if (phase === 'line') {
      if (!lineCells.includes(i)) return v !== null ? 'filled' : 'locked';
      return shownLine === best.idx ? 'lineReco' : 'lineActive';
    }
    if (v !== null) return 'filled';
    return i === reco ? 'reco' : 'clickable';
  });
  const lineStates = phase === 'line' ? S.LINES.map((_, i) => i === best.idx ? 'best' : 'candidate') : S.LINES.map(() => 'idle');
  const setCell = (i, v) => {
    const b = board.slice();
    b[i] = v;
    setBoard(b);
    setPicking(null);
  };
  const hint = phase === 'reveal' ? filled === 0 ? '先填入遊戲已翻開的那一格' : '還要翻 ' + (TOTAL_REVEALS - filled) + ' 格' : '選一條線 — 綠色箭頭是建議';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(ScreenHeader, {
    title: "\u4ED9\u4EBA\u5FAE\u5F69",
    action: filled > 0 ? /*#__PURE__*/React.createElement(IconAction, {
      name: "rotate-ccw",
      label: "\u6E05\u9664\u91CD\u586B",
      onClick: () => {
        setBoard(Array(9).fill(null));
        setPicking(null);
      }
    }) : null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.85rem',
      padding: '0 1rem 1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      minHeight: '2.6rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.92rem',
      color: phase === 'line' ? 'var(--accent-strong)' : 'var(--muted)',
      fontWeight: phase === 'line' ? 700 : 400
    }
  }, hint), phase === 'line' ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--muted)',
      marginTop: '0.3rem'
    }
  }, best.name, " \xB7 \u671F\u671B ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold)',
      fontWeight: 700
    }
  }, Math.round(best.ev).toLocaleString()), " MGP") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      '--cell-size': 'min(80px, calc((100vw - 152px) / 3))'
    }
  }, /*#__PURE__*/React.createElement(CactpotBoard, {
    values: board,
    states: cellStates,
    lineStates: lineStates,
    onCellClick: i => phase === 'reveal' && board[i] === null && setPicking(i),
    onLineClick: i => phase === 'line' && setLineOpen(i)
  }))), picking !== null ? /*#__PURE__*/React.createElement(DetailOverlay, {
    title: S.CELL_NAMES[picking],
    subtitle: "\u8F38\u5165\u9019\u683C\u7FFB\u51FA\u7684\u6578\u5B57",
    onClose: () => setPicking(null)
  }, /*#__PURE__*/React.createElement(NumPad, {
    columns: 3,
    disabledValues: board.filter(v => v !== null),
    onSelect: v => setCell(picking, v)
  })) : null, lineOpen !== null ? /*#__PURE__*/React.createElement(LineDetail, {
    board: board,
    idx: lineOpen,
    isBest: lineOpen === best.idx,
    onClose: () => setLineOpen(null)
  }) : null);
}
function LineDetail({
  board,
  idx,
  isBest,
  onClose
}) {
  const ev = S.allLineEVs(board)[idx];
  // Sorted by payout, because that is the question being asked — "how big can this line pay".
  // The probabilities are near-uniform, so a bar drawn from them says nothing; the bar is
  // payout relative to this line's best case, and the percentage stays as a number.
  const dist = S.lineDistribution(board, idx).slice().sort((a, b) => b.mgp - a.mgp);
  const max = dist.length ? dist[0].mgp : 1;
  const shown = dist.slice(0, 6);
  return /*#__PURE__*/React.createElement(DetailOverlay, {
    title: S.LINE_NAMES[idx],
    onClose: onClose,
    subtitle: /*#__PURE__*/React.createElement("span", null, "\u671F\u671B ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--gold)'
      }
    }, Math.round(ev.ev).toLocaleString()), " MGP", isBest ? ' · 建議選這條' : '')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.6rem',
      fontSize: '0.68rem',
      color: 'var(--placeholder)',
      marginBottom: '0.35rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22
    }
  }, "\u548C"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "\u734E\u91D1 MGP"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      textAlign: 'right'
    }
  }, "\u6A5F\u7387")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }
  }, shown.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.sum,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      fontSize: '0.78rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      color: 'var(--muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, d.sum), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      color: 'var(--gold)',
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums',
      textAlign: 'right'
    }
  }, d.mgp.toLocaleString()), /*#__PURE__*/React.createElement(ProbBar, {
    percent: d.mgp / max * 100,
    showLabel: false,
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      color: 'var(--muted)',
      fontVariantNumeric: 'tabular-nums',
      textAlign: 'right'
    }
  }, d.pct.toFixed(1), "%")))), dist.length > shown.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--placeholder)',
      marginTop: '0.6rem'
    }
  }, "\u986F\u793A\u734E\u91D1\u6700\u9AD8\u7684 ", shown.length, " \u7A2E\u7D50\u679C\uFF0C\u5171 ", dist.length, " \u7A2E") : null);
}
window.SolverScreen = SolverScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ffxiv-pwa/SolverScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ffxiv-pwa/solver-logic.js
try { (() => {
// Mini Cactpot maths — ported from cactpot/cactpot.js (sean2249/ffxiv-resources).
const PAYOUT = {
  6: 10000,
  7: 36,
  8: 720,
  9: 360,
  10: 80,
  11: 252,
  12: 108,
  13: 72,
  14: 54,
  15: 180,
  16: 72,
  17: 180,
  18: 119,
  19: 36,
  20: 306,
  21: 1080,
  22: 144,
  23: 1800,
  24: 3600
};
const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const LINE_NAMES = ['上排', '中排', '下排', '左行', '中行', '右行', '左斜', '右斜'];
function remaining(board) {
  const used = new Set(board.filter(v => v != null));
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(d => !used.has(d));
}
function perms(pool, k) {
  if (k === 0) return [[]];
  const out = [];
  for (let i = 0; i < pool.length; i++) {
    const rest = pool.slice(0, i).concat(pool.slice(i + 1));
    for (const p of perms(rest, k - 1)) out.push([pool[i], ...p]);
  }
  return out;
}
function lineEV(board, line) {
  const pool = remaining(board);
  const unknown = line.filter(i => board[i] == null);
  const known = line.filter(i => board[i] != null).reduce((a, i) => a + board[i], 0);
  if (!unknown.length) return {
    ev: PAYOUT[known],
    certain: true
  };
  const ps = perms(pool, unknown.length);
  let total = 0;
  for (const p of ps) total += PAYOUT[known + p.reduce((a, b) => a + b, 0)];
  return {
    ev: total / ps.length,
    certain: false
  };
}
function lineDistribution(board, idx) {
  const line = LINES[idx];
  const pool = remaining(board);
  const unknown = line.filter(i => board[i] == null);
  const known = line.filter(i => board[i] != null).reduce((a, i) => a + board[i], 0);
  const counts = {};
  const ps = perms(pool, unknown.length);
  for (const p of ps) {
    const s = known + p.reduce((a, b) => a + b, 0);
    counts[s] = (counts[s] || 0) + 1;
  }
  return Object.keys(counts).map(Number).sort((a, b) => a - b).map(s => ({
    sum: s,
    mgp: PAYOUT[s],
    pct: counts[s] / ps.length * 100
  }));
}
function allLineEVs(board) {
  return LINES.map((l, i) => ({
    idx: i,
    name: LINE_NAMES[i],
    ...lineEV(board, l)
  }));
}
function bestLine(board) {
  return allLineEVs(board).reduce((a, b) => b.ev > a.ev ? b : a);
}

// "Which cell should I reveal next" — average best-line EV after revealing each empty cell.
function recommendReveal(board) {
  const pool = remaining(board);
  const empties = board.map((v, i) => v == null ? i : -1).filter(i => i >= 0);
  let best = null;
  for (const i of empties) {
    let total = 0;
    for (const d of pool) {
      const b = board.slice();
      b[i] = d;
      total += bestLine(b).ev;
    }
    const score = total / pool.length;
    if (!best || score > best.score) best = {
      index: i,
      score
    };
  }
  return best;
}
const CELL_NAMES = ['左上', '中上', '右上', '左中', '正中', '右中', '左下', '中下', '右下'];
window.CactpotSolver = {
  PAYOUT,
  LINES,
  LINE_NAMES,
  CELL_NAMES,
  allLineEVs,
  bestLine,
  lineDistribution,
  recommendReveal,
  remaining
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ffxiv-pwa/solver-logic.js", error: String((e && e.message) || e) }); }

// ui_kits/ffxiv-pwa/sw.js
try { (() => {
// App-shell service worker. Cache-first: the site is fully static.
// All paths are RELATIVE — the site is served from a GitHub Pages subpath.
const CACHE = 'ffxiv-resources-v2';
const SHELL = ['./app.html', './manifest.webmanifest', './solver-logic.js', './PhoneShell.jsx', './HomeScreen.jsx', './SolverScreen.jsx', './AboutScreen.jsx', '../../styles.css', '../../_ds_bundle.js', '../../assets/app-icon-192.png', '../../assets/app-icon-512.png', '../../assets/apple-touch-icon-180.png', '../../assets/favicon-32.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    const copy = res.clone();
    if (res.ok && new URL(e.request.url).origin === location.origin) {
      caches.open(CACHE).then(c => c.put(e.request, copy));
    }
    return res;
  }).catch(() => caches.match('./app.html'))));
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ffxiv-pwa/sw.js", error: String((e && e.message) || e) }); }

__ds_ns.BoardCell = __ds_scope.BoardCell;

__ds_ns.CactpotBoard = __ds_scope.CactpotBoard;

__ds_ns.LineArrow = __ds_scope.LineArrow;

__ds_ns.LineRow = __ds_scope.LineRow;

__ds_ns.PAYOUT = __ds_scope.PAYOUT;

__ds_ns.PayoutTable = __ds_scope.PayoutTable;

__ds_ns.ProbBar = __ds_scope.ProbBar;

__ds_ns.RecoBanner = __ds_scope.RecoBanner;

__ds_ns.RecoEmphasis = __ds_scope.RecoEmphasis;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardText = __ds_scope.CardText;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.DetailOverlay = __ds_scope.DetailOverlay;

__ds_ns.NumKey = __ds_scope.NumKey;

__ds_ns.NumPad = __ds_scope.NumPad;

__ds_ns.SelectField = __ds_scope.SelectField;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.TabBar = __ds_scope.TabBar;

})();

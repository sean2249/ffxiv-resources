/**
 * 仙人微彩求解器 (Mini Cactpot Solver)
 *
 * 使用者把「遊戲內看到的數字」填進 3×3 盤面，工具即時算出：
 * - 揭牌階段（已知 < 4 格）：建議下一格該翻哪裡（最大化最終期望）。
 * - 選線階段（已知 = 4 格）：8 條線中推薦期望 MGP 最高的那條，並可探究每條線的機率分布。
 *
 * 遊戲規則：3×3 填 1~9 不重複；開局翻 1 格、玩家再翻 3 格（共 4 格）；
 * 選一條連線（3 橫、3 縱、2 斜），依三數之和對照獎金表發 MGP。
 */

// 獎金對照表（和 -> 獎金 MGP）
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
  24: 3600,
};

// 8 條連線的格子索引 (0~8, 由左上至右下)
// 橫: 上、中、下；縱: 左、中、右；斜: 左上右下、右上左下
const LINES = [
  [0, 1, 2], // 上橫
  [3, 4, 5], // 中橫
  [6, 7, 8], // 下橫
  [0, 3, 6], // 左縱
  [1, 4, 7], // 中縱
  [2, 5, 8], // 右縱
  [0, 4, 8], // 左上右下斜
  [2, 4, 6], // 右上左下斜
];

const LINE_NAMES = [
  "上橫列",
  "中橫列",
  "下橫列",
  "左縱列",
  "中縱列",
  "右縱列",
  "左上↘右下斜",
  "右上↙左下斜",
];

const TARGET_KNOWN = 4; // 遊戲最多看到 4 格（開局 1 + 翻 3）後選線

/* ============================================================
 * 核心運算
 * ========================================================== */

/**
 * 計算每條連線在所有可能排列下的期望獎金。
 * board: 長度 9 的陣列，已知格為 1~9、未知格為 null。
 * 回傳長度 8 的陣列，每個元素為該連線的期望獎金。
 */
function computeExpectedPayouts(board) {
  const unknownIdx = [];
  const knownNums = new Set();
  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) knownNums.add(board[i]);
    else unknownIdx.push(i);
  }
  const unknownNums = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !knownNums.has(n));

  const totalPayout = new Array(8).fill(0);
  let permCount = 0;

  function permute(arr, start) {
    if (start === arr.length) {
      permCount++;
      const fullBoard = [...board];
      for (let i = 0; i < unknownIdx.length; i++) {
        fullBoard[unknownIdx[i]] = arr[i];
      }
      for (let l = 0; l < LINES.length; l++) {
        const sum =
          fullBoard[LINES[l][0]] + fullBoard[LINES[l][1]] + fullBoard[LINES[l][2]];
        totalPayout[l] += PAYOUT[sum] || 0;
      }
      return;
    }
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  permute(unknownNums, 0);
  return totalPayout.map((t) => (permCount > 0 ? t / permCount : 0));
}

/**
 * 某條連線在所有可能排列下的結果分布。
 * 回傳 { dist: {sum, payout, prob}[]（依和排序）, ev: number }。
 */
function computeLineDistribution(board, lineIdx) {
  const cells = LINES[lineIdx];
  const unknownIdx = [];
  const knownNums = new Set();
  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) knownNums.add(board[i]);
    else unknownIdx.push(i);
  }
  const unknownNums = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !knownNums.has(n));

  const counts = new Map(); // sum -> count
  let total = 0;

  function tally(fullBoard) {
    const sum = fullBoard[cells[0]] + fullBoard[cells[1]] + fullBoard[cells[2]];
    counts.set(sum, (counts.get(sum) || 0) + 1);
    total++;
  }

  function permute(arr, start) {
    if (start === arr.length) {
      const fullBoard = [...board];
      for (let i = 0; i < unknownIdx.length; i++) fullBoard[unknownIdx[i]] = arr[i];
      tally(fullBoard);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }
  permute(unknownNums, 0);

  const dist = [...counts.keys()]
    .sort((a, b) => a - b)
    .map((sum) => ({
      sum,
      payout: PAYOUT[sum] || 0,
      prob: counts.get(sum) / total,
    }));
  const ev = dist.reduce((acc, d) => acc + d.payout * d.prob, 0);
  return { dist, ev };
}

/* ---- 揭牌推薦（期望值最大化的最佳續玩遞迴，含記憶化）---- */

const _memoLine = new Map(); // key=board -> 最佳線期望
const _memoPos = new Map(); // key=board -> 最佳續玩期望

function countKnown(board) {
  let n = 0;
  for (let i = 0; i < 9; i++) if (board[i] !== null) n++;
  return n;
}

function maxLineEV(board) {
  const key = board.join(",");
  if (_memoLine.has(key)) return _memoLine.get(key);
  const v = Math.max(...computeExpectedPayouts(board));
  _memoLine.set(key, v);
  return v;
}

function positionValue(board) {
  if (countKnown(board) >= TARGET_KNOWN) return maxLineEV(board);
  const key = board.join(",");
  if (_memoPos.has(key)) return _memoPos.get(key);

  const used = new Set(board.filter((x) => x !== null));
  const remaining = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !used.has(n));
  const unknownIdx = [];
  for (let i = 0; i < 9; i++) if (board[i] === null) unknownIdx.push(i);

  let best = -1;
  for (const c of unknownIdx) {
    let sum = 0;
    for (const v of remaining) {
      const b = [...board];
      b[c] = v;
      sum += positionValue(b);
    }
    best = Math.max(best, sum / remaining.length);
  }
  _memoPos.set(key, best);
  return best;
}

/**
 * 對盤面上每個未知格算「翻它之後的最佳續玩期望」，回傳最佳格索引。
 * 回傳 { bestIdx, values: Map<idx, ev> }。
 */
function recommendReveal(board) {
  const used = new Set(board.filter((x) => x !== null));
  const remaining = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !used.has(n));
  const unknownIdx = [];
  for (let i = 0; i < 9; i++) if (board[i] === null) unknownIdx.push(i);

  const values = new Map();
  let bestIdx = -1;
  let bestVal = -1;
  for (const c of unknownIdx) {
    let sum = 0;
    for (const v of remaining) {
      const b = [...board];
      b[c] = v;
      sum += positionValue(b);
    }
    const ev = remaining.length > 0 ? sum / remaining.length : 0;
    values.set(c, ev);
    if (ev > bestVal) {
      bestVal = ev;
      bestIdx = c;
    }
  }
  return { bestIdx, values };
}

/* ============================================================
 * UI 狀態
 * ========================================================== */

let userBoard = new Array(9).fill(null); // 使用者填入的 1~9，未填為 null
let selectedCell = null; // 目前選取要填數字的格子索引

const RECORDS_KEY = "cactpot.records";

/* ---- 輸入處理 ---- */

function selectCell(i) {
  if (countKnown(userBoard) >= TARGET_KNOWN) return; // 鎖盤後不可選
  selectedCell = i;
  render();
}

function setCellValue(i, n) {
  // 不可與其他格重複
  for (let k = 0; k < 9; k++) {
    if (k !== i && userBoard[k] === n) return;
  }
  // 4 格上限（僅限「原為空格」才受限；覆寫已填格不算新增）
  if (userBoard[i] === null && countKnown(userBoard) >= TARGET_KNOWN) {
    flashHint("遊戲最多看到 4 格，如要修改請先清除其他格。");
    return;
  }
  userBoard[i] = n;

  // 自動把選取移到下一個空格
  if (countKnown(userBoard) < TARGET_KNOWN) {
    const next = userBoard.findIndex((v) => v === null);
    selectedCell = next === -1 ? null : next;
  } else {
    selectedCell = null; // 鎖盤
  }
  render();
}

function clearCell(i) {
  userBoard[i] = null;
  selectedCell = i;
  render();
}

function clearAll() {
  userBoard = new Array(9).fill(null);
  selectedCell = null;
  closeLineDetail();
  render();
}

let _hintTimer = null;
function flashHint(msg) {
  const el = document.getElementById("reco");
  if (!el) return;
  const prev = el.innerHTML;
  el.innerHTML = `<span class="reco-warn">⚠️ ${msg}</span>`;
  clearTimeout(_hintTimer);
  _hintTimer = setTimeout(() => render(), 2200);
}

/* ---- 鍵盤 ---- */

document.addEventListener("keydown", (e) => {
  if (selectedCell === null) return;
  if (countKnown(userBoard) >= TARGET_KNOWN && userBoard[selectedCell] === null) return;
  if (e.key >= "1" && e.key <= "9") {
    setCellValue(selectedCell, parseInt(e.key, 10));
  } else if (e.key === "Backspace" || e.key === "Delete") {
    clearCell(selectedCell);
  }
});

/* ============================================================
 * 渲染
 * ========================================================== */

function render() {
  const known = countKnown(userBoard);
  const locked = known >= TARGET_KNOWN;

  // 揭牌建議（僅 1~3 格時需要）
  let reveal = null;
  if (known >= 1 && known < TARGET_KNOWN) {
    reveal = recommendReveal(userBoard);
  }

  // 期望值（1 格以上才算；0 格時不需要）
  let expected = null;
  if (known >= 1) expected = computeExpectedPayouts(userBoard);

  renderBoard(known, locked, reveal);
  renderNumpad(locked);
  renderReco(known, locked, reveal, expected);
  renderLines(locked, expected);
  renderLockUI(locked, expected);
}

function renderBoard(known, locked, reveal) {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.className = "cell";
    cell.onclick = null;
    cell.style.cursor = "default";

    if (userBoard[i] !== null) {
      cell.textContent = userBoard[i];
      cell.classList.add("filled");
    } else {
      cell.textContent = "";
    }

    if (locked) {
      cell.classList.add("locked");
      continue;
    }

    // 未鎖：所有格可點取
    cell.classList.add("clickable");
    cell.onclick = () => selectCell(i);
    cell.style.cursor = "pointer";

    if (i === selectedCell) cell.classList.add("selected");

    if (userBoard[i] === null) {
      if (reveal && i === reveal.bestIdx) {
        cell.classList.add("reco-reveal"); // 唯一建議格
      } else if (known >= 1) {
        cell.classList.add("dimmed"); // 其餘空格淡化（仍可點）
      }
    }
  }
}

function renderNumpad(locked) {
  const pad = document.getElementById("numpad");
  pad.innerHTML = "";
  if (locked) {
    pad.style.display = "none";
    return;
  }
  pad.style.display = "";

  if (selectedCell === null) {
    const hint = document.createElement("div");
    hint.className = "numpad-hint";
    hint.textContent = "先點一格，再選數字填入";
    pad.appendChild(hint);
    return;
  }

  const usedElsewhere = new Set();
  for (let k = 0; k < 9; k++) {
    if (k !== selectedCell && userBoard[k] !== null) usedElsewhere.add(userBoard[k]);
  }

  const row = document.createElement("div");
  row.className = "numpad-row";
  for (let n = 1; n <= 9; n++) {
    const btn = document.createElement("button");
    btn.className = "num-btn";
    btn.textContent = n;
    if (usedElsewhere.has(n)) {
      btn.disabled = true;
    } else {
      btn.onclick = () => setCellValue(selectedCell, n);
    }
    if (userBoard[selectedCell] === n) btn.classList.add("current");
    row.appendChild(btn);
  }
  pad.appendChild(row);

  if (userBoard[selectedCell] !== null) {
    const clr = document.createElement("button");
    clr.className = "num-clear";
    clr.textContent = "清除此格";
    clr.onclick = () => clearCell(selectedCell);
    pad.appendChild(clr);
  }
}

function renderReco(known, locked, reveal, expected) {
  const el = document.getElementById("reco");

  if (known === 0) {
    el.className = "reco reco-input";
    el.innerHTML =
      "點選遊戲<strong>開局已翻開的那一格</strong>，並填入它的數字，開始求解。";
    return;
  }

  if (!locked) {
    const left = TARGET_KNOWN - known;
    const pos = reveal ? cellName(reveal.bestIdx) : "";
    el.className = "reco reco-reveal-hint";
    el.innerHTML =
      `已知 ${known} 格。建議翻開<strong>高亮的「${pos}」</strong>，` +
      `把遊戲裡對應位置的數字填進去（還需 ${left} 格）。`;
    return;
  }

  // 鎖盤：選線敘述
  const best = bestLineInfo(expected);
  el.className = "reco reco-final";
  const dist = computeLineDistribution(userBoard, best.idx);
  const certain = dist.dist.length === 1;

  if (certain) {
    el.innerHTML =
      `建議選擇 <strong>${LINE_NAMES[best.idx]}</strong>：此線三格已翻開，` +
      `<strong>確定可得 ${dist.dist[0].payout.toLocaleString()} MGP</strong>。`;
  } else {
    let s =
      `建議選擇 <strong>${LINE_NAMES[best.idx]}</strong>：平均每把約可獲得 ` +
      `<strong>${Math.round(best.ev).toLocaleString()} MGP</strong>，是 8 條線中期望最高的`;
    if (best.secondIdx !== -1) {
      s += `（次高為 ${LINE_NAMES[best.secondIdx]} ${Math.round(
        best.secondEv
      ).toLocaleString()} MGP）`;
    }
    s += "。點任一條線可看完整機率分布。";
    el.innerHTML = s;
  }
}

function renderLines(locked, expected) {
  const container = document.getElementById("lines");
  container.innerHTML = "";
  if (!expected) {
    container.innerHTML =
      '<div class="lines-empty">填入第一格後，這裡會列出 8 條連線的期望獎金。</div>';
    return;
  }

  const maxEv = Math.max(...expected);

  LINES.forEach((line, l) => {
    const btn = document.createElement("button");
    btn.className = "line-btn";

    const vals = line.map((idx) => userBoard[idx]);
    const allKnown = vals.every((v) => v !== null);
    const sum = allKnown ? vals.reduce((a, b) => a + b, 0) : null;
    const payout = sum !== null ? PAYOUT[sum] : null;

    let label = `<span class="line-name">${LINE_NAMES[l]}</span>`;
    label += `<span class="line-ev">期望 ${Math.round(
      expected[l]
    ).toLocaleString()} MGP</span>`;
    if (payout !== null) {
      label += `<span class="line-certain">確定 ${payout.toLocaleString()} MGP</span>`;
    }
    btn.innerHTML = label;

    if (Math.round(expected[l]) === Math.round(maxEv)) btn.classList.add("best");

    if (locked) {
      btn.onclick = () => openLineDetail(l);
      btn.style.cursor = "pointer";
      btn.title = "點看機率分布";
    } else {
      btn.disabled = true;
    }

    container.appendChild(btn);
  });
}

function renderLockUI(locked, expected) {
  const badge = document.getElementById("lock-badge");
  const report = document.getElementById("report");
  const clearBtn = document.getElementById("clear-all");

  badge.style.display = locked ? "" : "none";
  report.style.display = locked ? "" : "none";
  clearBtn.style.display = countKnown(userBoard) > 0 ? "" : "none";

  if (locked) {
    // 推薦線的三格綠色高亮
    const best = bestLineInfo(expected);
    LINES[best.idx].forEach((i) =>
      document.getElementById(`cell-${i}`).classList.add("chosen")
    );
    // 回報表單：線別 select 預設帶入推薦線
    const sel = document.getElementById("report-line");
    if (sel && sel.dataset.filled !== "1") {
      sel.innerHTML = LINE_NAMES.map(
        (nm, l) => `<option value="${l}">${nm}</option>`
      ).join("");
      sel.value = String(best.idx);
      sel.dataset.filled = "1";
    }
    updateRecordCount();
  } else {
    const sel = document.getElementById("report-line");
    if (sel) sel.dataset.filled = "0";
    const mgp = document.getElementById("report-mgp");
    if (mgp) mgp.value = "";
    const done = document.getElementById("report-done");
    if (done) done.textContent = "";
  }
}

/* ---- 輔助 ---- */

function cellName(i) {
  const rows = ["上", "中", "下"];
  const cols = ["左", "中", "右"];
  if (i === 4) return "中心格";
  return `${rows[Math.floor(i / 3)]}${cols[i % 3]}格`;
}

function bestLineInfo(expected) {
  let idx = 0;
  for (let l = 1; l < 8; l++) if (expected[l] > expected[idx]) idx = l;
  let secondIdx = -1;
  for (let l = 0; l < 8; l++) {
    if (l === idx) continue;
    if (secondIdx === -1 || expected[l] > expected[secondIdx]) secondIdx = l;
  }
  return {
    idx,
    ev: expected[idx],
    secondIdx,
    secondEv: secondIdx === -1 ? 0 : expected[secondIdx],
  };
}

/* ============================================================
 * 階段四：連線機率明細（中央 overlay）
 * ========================================================== */

function openLineDetail(lineIdx) {
  const overlay = document.getElementById("line-detail");
  const title = document.getElementById("detail-title");
  const body = document.getElementById("detail-body");

  const { dist, ev } = computeLineDistribution(userBoard, lineIdx);
  title.textContent = LINE_NAMES[lineIdx];

  const maxProb = Math.max(...dist.map((d) => d.prob));
  let html = `<p class="detail-ev">期望值：<strong>${Math.round(
    ev
  ).toLocaleString()} MGP</strong></p>`;
  html += '<table class="detail-table"><thead><tr>';
  html += "<th>三數和</th><th>獎金 MGP</th><th>機率</th></tr></thead><tbody>";
  dist.forEach((d) => {
    const pct = (d.prob * 100).toFixed(1);
    const w = maxProb > 0 ? (d.prob / maxProb) * 100 : 0;
    const big = d.payout >= 1000 ? " detail-big" : "";
    html += `<tr class="${big.trim()}">`;
    html += `<td>${d.sum}</td>`;
    html += `<td>${d.payout.toLocaleString()}</td>`;
    html += `<td><span class="prob-wrap"><span class="prob-bar" style="width:${w}%"></span><span class="prob-pct">${pct}%</span></span></td>`;
    html += "</tr>";
  });
  html += "</tbody></table>";
  body.innerHTML = html;

  overlay.style.display = "flex";
}

function closeLineDetail() {
  const overlay = document.getElementById("line-detail");
  if (overlay) overlay.style.display = "none";
}

/* ============================================================
 * 階段五：回報實得（localStorage，預留統計空間）
 * ========================================================== */

function getRecords() {
  try {
    return JSON.parse(localStorage.getItem(RECORDS_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function recordResult(entry) {
  const records = getRecords();
  records.push(entry);
  try {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch (e) {
    /* localStorage 不可用時靜默略過 */
  }
  return records.length;
}

function submitReport() {
  const sel = document.getElementById("report-line");
  const mgp = document.getElementById("report-mgp");
  const done = document.getElementById("report-done");

  const chosenLine = sel ? parseInt(sel.value, 10) : -1;
  const actualMGP = mgp && mgp.value !== "" ? parseInt(mgp.value, 10) : null;
  if (actualMGP === null || isNaN(actualMGP)) {
    if (done) done.textContent = "請先填入實得 MGP。";
    return;
  }

  const expected = computeExpectedPayouts(userBoard);
  const best = bestLineInfo(expected);
  const entry = {
    ts: new Date().toISOString(),
    board: [...userBoard],
    recommendedLine: best.idx,
    recommendedEV: Math.round(best.ev),
    chosenLine,
    actualMGP,
  };
  const n = recordResult(entry);
  if (done) done.textContent = `已記錄 ✔（本機共 ${n} 筆）`;
  if (mgp) mgp.value = "";
}

function updateRecordCount() {
  const el = document.getElementById("record-count");
  if (el) {
    const n = getRecords().length;
    el.textContent = n > 0 ? `本機已記錄 ${n} 筆` : "";
  }
}

// 初始化
render();

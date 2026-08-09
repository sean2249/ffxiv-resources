/**
 * 仙人微彩模擬器 (Mini Cactpot Simulator)
 *
 * 遊戲規則：
 * - 3x3 方格，填入數字 1~9（每個數字不重複）
 * - 初始隨機顯示 1 格，玩家再翻開 3 格，共看到 4 格
 * - 選擇一條連線（共 8 條：3 橫、3 縱、2 斜）
 * - 依照連線上三個數字之和對照獎金表
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

/** 產生隨機排列的 1~9 */
function generateBoard() {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums;
}

/**
 * 計算每條連線在所有可能排列下的期望獎金
 * board: 已知的格子（null 表示未知）
 * 回傳長度 8 的陣列，每個元素為該連線的期望獎金
 */
function computeExpectedPayouts(board) {
  // 找出未知格子的索引
  const unknownIdx = [];
  const knownNums = new Set();
  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) {
      knownNums.add(board[i]);
    } else {
      unknownIdx.push(i);
    }
  }
  const unknownNums = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
    (n) => !knownNums.has(n)
  );

  // 枚舉未知格子的所有排列，累計獎金
  const totalPayout = new Array(8).fill(0);
  let permCount = 0;

  function permute(arr, start) {
    if (start === arr.length) {
      permCount++;
      // 建構完整 board
      const fullBoard = [...board];
      for (let i = 0; i < unknownIdx.length; i++) {
        fullBoard[unknownIdx[i]] = arr[i];
      }
      for (let l = 0; l < LINES.length; l++) {
        const sum =
          fullBoard[LINES[l][0]] +
          fullBoard[LINES[l][1]] +
          fullBoard[LINES[l][2]];
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

// ---- UI State ----
let board = null; // 實際的 1~9 陣列
let revealed = null; // boolean[9]
let phase = "scratch"; // 'scratch' | 'choose'
let scratchCount = 0; // 已翻開格數（初始1不算）
let chosenLine = null;

function initGame() {
  board = generateBoard();
  revealed = new Array(9).fill(false);
  phase = "scratch";
  scratchCount = 0;
  chosenLine = null;

  // 隨機顯示第一格
  const first = Math.floor(Math.random() * 9);
  revealed[first] = true;

  renderBoard();
  renderHint();
  renderLines(computeExpectedPayouts(buildUserBoard()));
  document.getElementById("result").textContent = "";
}

function renderBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    if (revealed[i]) {
      cell.textContent = board[i];
      cell.classList.add("revealed");
      cell.classList.remove("hidden-cell");
    } else {
      cell.textContent = "？";
      cell.classList.remove("revealed");
      cell.classList.add("hidden-cell");
    }

    // 事件綁定由 renderBoard 控制
    cell.onclick = null;
    if (phase === "scratch" && !revealed[i]) {
      cell.onclick = () => scratchCell(i);
      cell.style.cursor = "pointer";
    } else {
      cell.style.cursor = "default";
    }
  }
}

function scratchCell(i) {
  if (phase !== "scratch" || revealed[i]) return;
  revealed[i] = true;
  scratchCount++;
  if (scratchCount >= 3) {
    phase = "choose";
  }
  renderBoard();
  renderHint();
  renderLines(computeExpectedPayouts(buildUserBoard()));
}

/** 建構已知 board（未翻開為 null） */
function buildUserBoard() {
  return board.map((v, i) => (revealed[i] ? v : null));
}

function renderHint() {
  const hint = document.getElementById("hint");
  if (phase === "scratch") {
    const left = 3 - scratchCount;
    hint.textContent = `請翻開 ${left} 個格子`;
  } else {
    hint.textContent = "請選擇一條連線";
  }
}

function renderLines(expectedPayouts) {
  const container = document.getElementById("lines");
  container.innerHTML = "";

  LINES.forEach((line, l) => {
    const btn = document.createElement("button");
    btn.className = "line-btn";

    // 計算已知數字之和（若三格皆已翻開）
    const vals = line.map((idx) => (revealed[idx] ? board[idx] : null));
    const allKnown = vals.every((v) => v !== null);
    const sum = allKnown ? vals.reduce((a, b) => a + b, 0) : null;
    const payout = sum !== null ? PAYOUT[sum] : null;

    let label = LINE_NAMES[l];
    if (expectedPayouts) {
      label += `　期望：${Math.round(expectedPayouts[l]).toLocaleString()} MGP`;
    }
    if (payout !== null) {
      label += `　（確定獎金：${payout.toLocaleString()} MGP）`;
    }
    btn.textContent = label;

    if (phase === "choose") {
      btn.onclick = () => chooseLine(l);
      btn.style.cursor = "pointer";
    } else {
      btn.disabled = true;
    }

    // 標示推薦連線
    if (
      expectedPayouts &&
      Math.round(expectedPayouts[l]) ===
        Math.round(Math.max(...expectedPayouts))
    ) {
      btn.classList.add("best");
    }

    container.appendChild(btn);
  });
}

function chooseLine(l) {
  if (phase !== "choose") return;
  chosenLine = l;
  phase = "result";

  // 顯示所有格子
  revealed = new Array(9).fill(true);
  renderBoard();

  const line = LINES[l];
  const sum = line.map((i) => board[i]).reduce((a, b) => a + b, 0);
  const payout = PAYOUT[sum] || 0;

  const result = document.getElementById("result");
  result.textContent = `連線：${LINE_NAMES[l]}，數字和：${sum}，獎金：${payout.toLocaleString()} MGP 🎉`;
  result.className = payout >= 1000 ? "result big-win" : "result";

  // 高亮選中連線的格子
  LINES[l].forEach((i) => {
    document.getElementById(`cell-${i}`).classList.add("chosen");
  });

  renderLines(null);
  document.getElementById("hint").textContent = "遊戲結束，點擊「新遊戲」再玩一次！";
}

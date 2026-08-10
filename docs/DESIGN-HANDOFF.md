# 設計交接文件 — 仙人微彩求解器

> 給後續的設計 / PWA session。這份文件讓你不必重新探索程式碼。
> 分支：`claude/cactpot-selector-b5544d`

## 這個 PR 已完成什麼

1. **把「模擬器」改寫成「求解器」**：使用者輸入遊戲內看到的數字，工具算出下一格該翻哪、最後該選哪條連線。
2. **五階段引導 UX**（見下）。
3. **亮色主題重塑**：原本近黑深色 + 呼吸燈脈動 → 暖紙白亮色、克制的綠色重點色、移除所有 breathing/pulse 動畫。

## 尚未完成（交給後續 session）

### A. PWA（漸進式網頁應用）— 未做
需新增：
- `manifest.webmanifest`（name、short_name、icons、theme_color、background_color、display: standalone、start_url、scope）
- Service Worker（`sw.js`）：快取 app shell 做離線可用（純靜態站，cache-first 即可）
- 在 `index.html`（及 `cactpot/index.html`）`<head>` 加 `<link rel="manifest">`、`theme-color` meta、SW 註冊 script
- **⚠️ 重要 GH Pages 注意**：本站部署在 GitHub Pages 子路徑（`username.github.io/ffxiv-resources/`），**所有 manifest / icon / SW 路徑務必用相對路徑**（`./`），否則會 404。SW 的 scope 受限於它被服務的目錄。
- **待決策**：PWA 範圍是「全站」（root 為 app 首頁）還是「只有 cactpot 工具」。建議全站：root manifest、`start_url: "./"`、`scope: "./"`，cactpot 為主要工具。

### B. PWA Icon — 未做
- 需要尺寸：192×192、512×512、512×512 maskable（含 ~10% 安全邊距）、apple-touch-icon 180×180、favicon 32×32。
- **設計意圖（建議）**：3×3 格盤面 + 一條綠色「致勝連線」對角（呼應求解器核心）。在 32px 仍需可辨識，別畫太細。
- **可用工具**（本機已確認）：`python3` + `PIL 12.2.0`（`ImageDraw.rounded_rectangle` 畫圓角格子最穩）、ImageMagick `convert`/`magick`。無 rsvg/cairosvg，若要 SVG→PNG 走 ImageMagick 但簡單圖形才可靠，建議直接 PIL 產生 PNG。
- 產出後放 `cactpot/icons/` 或 root `icons/`，並在 manifest 與 `<head>` 引用。

### C. 可能的後續設計 polish
- 目前已是乾淨亮色；若要更有 FFXIV / 仙人微彩「賭場」個性，可在不回到廉價感的前提下加入細節（材質、字體層級）。避免 category reflex（賭場→霓虹綠黑）。

## 架構地圖（不必重讀就能改）

純靜態站，無 build、無框架、無依賴、無後端。繁體中文台灣用語。

| 檔案 | 內容 |
|---|---|
| `index.html` | 站首頁（inline `<style>`，卡片連向工具）。已套亮色 tokens。 |
| `cactpot/index.html` | 求解器頁面標記 + 底部 SW/PWA 註冊點（目前只有 payout toggle script）。 |
| `cactpot/cactpot.js` | 全部邏輯（見下）。 |
| `cactpot/cactpot.css` | 全部樣式，亮色 OKLCH tokens 在 `:root`。 |
| `README.md` | 已更新為求解器說明。 |

### cactpot.js 關鍵函式
- `PAYOUT` / `LINES` / `LINE_NAMES`：獎金表與 8 條線常數。
- `computeExpectedPayouts(board)`：核心，枚舉未知格排列 → 8 條線期望值。
- `computeLineDistribution(board, lineIdx)`：某線的機率分布（階段四明細用）。
- `positionValue` / `recommendReveal`（含 `_memoLine`/`_memoPos` 記憶化）：揭牌階段「下一格翻哪」的最佳續玩遞迴。
- `render()`：依已知格數 `known` 切換五階段畫面；子函式 `renderBoard/renderNumpad/renderReco/renderLines/renderLockUI`。
- 輸入：`selectCell` / `setCellValue`（4 格上限）/ `clearCell` / `clearAll`；鍵盤 1~9 / Backspace。
- 階段四：`openLineDetail` / `closeLineDetail`（中央 overlay）。
- 階段五：`recordResult` / `getRecords` / `submitReport`（localStorage key `cactpot.records`，schema：`{ts, board, recommendedLine, recommendedEV, chosenLine, actualMGP}`，預留未來統計）。

### 五階段 UX（由 `known` 驅動）
1. `known=0`：9 格全可點取，提示點開局那格。
2. `known=1~3`：**只**高亮一格最佳翻牌格，其餘空格淡化（仍可點），已填格保持。
3. `known=4`：盤面鎖定、數字面板隱藏、「🔒 已鎖定」徽章、推薦線三格綠色高亮 + 白話期望值敘述。
4. 鎖盤後點任一線 → 中央 overlay 顯示該線完整機率分布。
5. 回報實選線 + 實得 MGP → 存 localStorage。

## 設計 tokens（維持一致請沿用）
定義於 `cactpot/cactpot.css` `:root`，首頁 `index.html` 同步同一套：
- 畫布：`--bg oklch(0.965 0.008 85)`（暖紙白）、`--surface oklch(0.995 0.004 85)`
- 邊框：`--border oklch(0.885 0.012 82)` / `--border-strong oklch(0.8 0.016 82)`
- 文字：`--text oklch(0.32 0.022 68)` / `--muted oklch(0.55 0.02 70)`
- 重點（推薦）：`--accent oklch(0.55 0.11 158)` 綠、`--accent-soft oklch(0.95 0.035 158)`
- 已填數字：`--gold oklch(0.58 0.088 72)` 低彩度古銅
- 清除鍵：`--danger oklch(0.56 0.14 30)`
原則：OKLCH、不用純黑純白、中性色帶暖色調、Restrained 色彩策略（單一意義重點色）、動畫只用 ease-out、無 bounce/呼吸燈。

## 驗證方式（無測試框架，用瀏覽器）
```bash
python3 -m http.server 8877   # 於 repo 根目錄
```
開 `http://localhost:8877/cactpot/index.html`。函式皆為 global，可在 console 直接呼叫驗證（例：`clearAll(); selectCell(4); setCellValue(4,5);`）。加 PWA 後另需驗證：manifest 無錯（DevTools > Application）、SW 註冊成功、離線可載入、icon 各尺寸正常、可安裝。

## 參考
- 目標對照站：https://ben1013liao-hue.github.io/FF14-Cactpot-Solver/

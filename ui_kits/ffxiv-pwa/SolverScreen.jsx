const { CactpotBoard, NumPad, DetailOverlay, ProbBar, Icon } = window.FFXIVDesignSystem_f1941e;
const S = window.CactpotSolver;

const TOTAL_REVEALS = 4; // the game reveals one, you choose three more

function SolverScreen() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [picking, setPicking] = React.useState(null);  // cell index awaiting a digit
  const [lineOpen, setLineOpen] = React.useState(null); // line index in the detail popup

  const filled = board.filter(v => v !== null).length;
  const phase = filled < TOTAL_REVEALS ? 'reveal' : 'line';

  const reco = phase === 'reveal' && filled > 0 ? S.recommendReveal(board).index : null;
  const best = phase === 'line' ? S.bestLine(board) : null;

  // In the line phase the board itself shows which three cells the highlighted line pays
  // on — inspecting an arrow moves that emphasis to the line you are looking at.
  const shownLine = phase === 'line' ? (lineOpen !== null ? lineOpen : best.idx) : null;
  const lineCells = shownLine !== null ? S.LINES[shownLine] : [];

  const cellStates = board.map((v, i) => {
    if (phase === 'line') {
      if (!lineCells.includes(i)) return v !== null ? 'filled' : 'locked';
      return shownLine === best.idx ? 'lineReco' : 'lineActive';
    }
    if (v !== null) return 'filled';
    return i === reco ? 'reco' : 'clickable';
  });

  const lineStates = phase === 'line'
    ? S.LINES.map((_, i) => (i === best.idx ? 'best' : 'candidate'))
    : S.LINES.map(() => 'idle');

  const setCell = (i, v) => { const b = board.slice(); b[i] = v; setBoard(b); setPicking(null); };

  const hint = phase === 'reveal'
    ? (filled === 0 ? '先填入遊戲已翻開的那一格' : '還要翻 ' + (TOTAL_REVEALS - filled) + ' 格')
    : '選一條線 — 綠色箭頭是建議';

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <ScreenHeader title="仙人微彩" action={
        filled > 0 ? <IconAction name="rotate-ccw" label="清除重填" onClick={() => { setBoard(Array(9).fill(null)); setPicking(null); }} /> : null
      } />

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', padding: '0 1rem 1rem' }}>
        <div style={{ textAlign: 'center', minHeight: '2.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '0.92rem', color: phase === 'line' ? 'var(--accent-strong)' : 'var(--muted)', fontWeight: phase === 'line' ? 700 : 400 }}>{hint}</div>
          {phase === 'line' ? (
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
              {best.name} · 期望 <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{Math.round(best.ev).toLocaleString()}</span> MGP
            </div>
          ) : null}
        </div>

        <div style={{ '--cell-size': 'min(80px, calc((100vw - 152px) / 3))' }}>
          <CactpotBoard values={board} states={cellStates} lineStates={lineStates}
            onCellClick={i => phase === 'reveal' && board[i] === null && setPicking(i)}
            onLineClick={i => phase === 'line' && setLineOpen(i)} />
        </div>
      </div>

      {picking !== null ? (
        <DetailOverlay title={S.CELL_NAMES[picking]} subtitle="輸入這格翻出的數字" onClose={() => setPicking(null)}>
          <NumPad columns={3} disabledValues={board.filter(v => v !== null)} onSelect={v => setCell(picking, v)} />
        </DetailOverlay>
      ) : null}

      {lineOpen !== null ? (
        <LineDetail board={board} idx={lineOpen} isBest={lineOpen === best.idx} onClose={() => setLineOpen(null)} />
      ) : null}
    </div>
  );
}

function LineDetail({ board, idx, isBest, onClose }) {
  const ev = S.allLineEVs(board)[idx];
  // Sorted by payout, because that is the question being asked — "how big can this line pay".
  // The probabilities are near-uniform, so a bar drawn from them says nothing; the bar is
  // payout relative to this line's best case, and the percentage stays as a number.
  const dist = S.lineDistribution(board, idx).slice().sort((a, b) => b.mgp - a.mgp);
  const max = dist.length ? dist[0].mgp : 1;
  const shown = dist.slice(0, 6);

  return (
    <DetailOverlay title={S.LINE_NAMES[idx]} onClose={onClose}
      subtitle={<span>期望 <b style={{ color: 'var(--gold)' }}>{Math.round(ev.ev).toLocaleString()}</b> MGP{isBest ? ' · 建議選這條' : ''}</span>}>
      <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.68rem', color: 'var(--placeholder)', marginBottom: '0.35rem' }}>
        <span style={{ width: 22 }}>和</span>
        <span style={{ flex: 1 }}>獎金 MGP</span>
        <span style={{ width: 42, textAlign: 'right' }}>機率</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {shown.map(d => (
          <div key={d.sum} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.78rem' }}>
            <span style={{ width: 22, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{d.sum}</span>
            <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
              <span style={{ width: 46, color: 'var(--gold)', fontWeight: 700, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{d.mgp.toLocaleString()}</span>
              <ProbBar percent={d.mgp / max * 100} showLabel={false} style={{ flex: 1 }} />
            </span>
            <span style={{ width: 42, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{d.pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
      {dist.length > shown.length ? (
        <div style={{ fontSize: '0.68rem', color: 'var(--placeholder)', marginTop: '0.6rem' }}>
          顯示獎金最高的 {shown.length} 種結果，共 {dist.length} 種
        </div>
      ) : null}
    </DetailOverlay>
  );
}

window.SolverScreen = SolverScreen;

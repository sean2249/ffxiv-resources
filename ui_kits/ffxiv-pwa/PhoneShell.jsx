const { TabBar, Icon } = window.FFXIVDesignSystem_f1941e;

const TABS = [
  { id: 'home', icon: 'house', label: '首頁' },
  { id: 'cactpot', icon: 'dices', label: '仙人微彩' },
  { id: 'about', icon: 'info', label: '關於' },
];

// Every screen fits one viewport. The content region does not scroll — if something
// does not fit, the screen is wrong, not the scroller.
function AppShell({ tab, onTab, standalone = false, children }) {
  const frame = standalone
    ? { width: '100%', height: '100dvh', borderRadius: 0, border: 'none', boxShadow: 'none' }
    // Real iPhone 14/15/16 logical size — 390×844. Do not round this to a tidier number:
    // "does it fit one screen" is only a meaningful question against a real device.
    : { width: 390, height: 844, borderRadius: 44, border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', margin: '0 auto' };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden', ...frame }}>
      {standalone ? null : (
        <div style={{ height: 26, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', fontSize: 11, color: 'var(--placeholder)', fontWeight: 600, flex: 'none' }}>
          <span>9:41</span><span>100%</span>
        </div>
      )}
      <div key={tab} style={{
        flex: 1, minHeight: 0, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        animation: 'var(--screen-in)',
      }}>{children}</div>
      <div style={{ flex: 'none' }}>
        <TabBar active={tab} onSelect={onTab} items={TABS} />
      </div>
    </div>
  );
}

// Quiet screen title. No card, no border — the content below is the subject.
function ScreenHeader({ title, action }) {
  return (
    <div style={{
      flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: 'calc(0.85rem + env(safe-area-inset-top)) 1.1rem 0.75rem',
    }}>
      <h1 style={{ fontSize: '1.02rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>{title}</h1>
      <div style={{ display: 'flex', gap: '0.15rem' }}>{action}</div>
    </div>
  );
}

function IconAction({ name, label, onClick, tone = 'var(--muted)' }) {
  return (
    <button type="button" onClick={onClick} aria-label={label}
      style={{ background: 'none', border: 'none', color: tone, cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center', width: 40, height: 40, margin: '-8px -10px -8px 0',
        WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
      <Icon name={name} size={19} />
    </button>
  );
}

Object.assign(window, { AppShell, PhoneShell: AppShell, ScreenHeader, IconAction, TABS });

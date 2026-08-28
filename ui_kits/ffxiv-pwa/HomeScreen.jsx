const { Card, Icon } = window.FFXIVDesignSystem_f1941e;

function HomeScreen({ onOpen }) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '0 1.3rem 1.3rem' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.1rem' }}>
        <img src="../../assets/app-icon-192.png" alt="" width="76" height="76"
          style={{ borderRadius: 18, boxShadow: 'var(--shadow-sm)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text)' }}>FFXIV 資源站</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.4rem' }}>kiwi 的 FFXIV 收集用途</div>
        </div>
      </div>

      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <Card interactive onClick={() => onOpen('cactpot')}
          style={{ flexDirection: 'row', alignItems: 'center', gap: '0.9rem', padding: '0.95rem 1.1rem' }}>
          <Icon name="dices" size={26} color="var(--gold)" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text)' }}>仙人微彩</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: '0.15rem' }}>Mini Cactpot 求解器</div>
          </div>
          <Icon name="chevron-right" size={18} color="var(--placeholder)" />
        </Card>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;

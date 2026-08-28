const { Icon } = window.FFXIVDesignSystem_f1941e;

function Line({ icon, children }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
      <Icon name={icon} size={17} color="var(--placeholder)" style={{ marginTop: 2 }} />
      <div style={{ flex: 1, fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--muted)' }}>{children}</div>
    </div>
  );
}

function AboutScreen() {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.15rem', padding: '0 1.4rem 2rem' }}>
      <Line icon="lock">
        純本機運算，不上傳任何資料。安裝到主畫面後可離線使用。
      </Line>
      <Line icon="github">
        原始碼公開在 <a href="https://github.com/sean2249/ffxiv-resources" style={{ color: 'var(--accent-strong)' }}>github.com/sean2249/ffxiv-resources</a>
      </Line>
      <Line icon="info">
        本站為非官方粉絲資源站，與 Square Enix 無關。<br />
        Final Fantasy XIV © Square Enix Co., Ltd.
      </Line>
    </div>
  );
}

window.AboutScreen = AboutScreen;

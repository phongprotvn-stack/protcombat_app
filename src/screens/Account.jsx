import { useApp } from '../contexts/AppContext';
import { t } from '../i18n';

export default function Account() {
  const { settings, toggleLang, toggleTheme, stats } = useApp();
  const lang = settings.lang;

  return (
    <div className="screen screen-enter">
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Header */}
        <div style={{ fontSize: 18, fontWeight: 900, color: '#101010', paddingTop: 8 }}>
          {t('accountTitle', lang)}
        </div>

        {/* Profile Card */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #D60032 0%, #FF4B3A 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '24px 16px',
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            margin: '0 auto 10px',
          }}>
            🏸
          </div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{t('appName', lang)}</div>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.8, marginTop: 4 }}>
            {t('slogan', lang)}
          </div>
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 8 }}>
            {stats.totalMatches} {t('totalMatches', lang).toLowerCase()} · {stats.winRate}% {t('winRate', lang).toLowerCase()}
          </div>
        </div>

        {/* Login Card */}
        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>
            {t('login', lang)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="email"
              placeholder={t('email', lang)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #F3F4F6',
                background: '#F9FAFB',
                borderRadius: 12,
                fontSize: 14,
                outline: 'none',
                fontFamily: 'inherit',
                color: '#101010',
              }}
            />
            <input
              type="password"
              placeholder={t('password', lang)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #F3F4F6',
                background: '#F9FAFB',
                borderRadius: 12,
                fontSize: 14,
                outline: 'none',
                fontFamily: 'inherit',
                color: '#101010',
              }}
            />
            <button
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 14,
                border: 'none',
                background: '#E6002D',
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
            >
              {t('loginBtn', lang)}
            </button>
          </div>
        </div>

        {/* Settings Card */}
        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>
            {t('settings', lang)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Language */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#101010' }}>{t('language', lang)}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                  {lang === 'vi' ? 'Tiếng Việt' : 'English'}
                </div>
              </div>
              <button
                onClick={toggleLang}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: '1px solid #E5E7EB',
                  background: 'white',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#101010',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.target.style.borderColor = '#E6002D'; e.target.style.color = '#E6002D'; }}
                onMouseOut={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.color = '#101010'; }}
              >
                {lang === 'vi' ? 'EN' : 'VI'}
              </button>
            </div>
            <div style={{ height: 1, background: '#F3F4F6' }} />

            {/* Theme */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#101010' }}>{t('theme', lang)}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                  {settings.theme === 'light' ? t('light', lang) : t('dark', lang)}
                </div>
              </div>
              <button
                onClick={toggleTheme}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  border: 'none',
                  background: settings.theme === 'light' ? '#E5E7EB' : '#E6002D',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  top: 3,
                  left: settings.theme === 'light' ? 3 : 23,
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>
            {t('support', lang)}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 0',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 18 }}>📖</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#101010' }}>
              {t('helpGuide', lang)}
            </span>
          </div>
          <div style={{ height: 1, background: '#F3F4F6' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 0',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 18 }}>📧</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#101010' }}>
              {t('contact', lang)}
            </span>
          </div>
        </div>

        {/* App Info Card */}
        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>
            {t('appInfo', lang)}
          </div>
          <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
            {t('appName', lang)} · {t('version', lang)} 1.0.0
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
            © 2026 PROT COMBAT
          </div>
        </div>

        {/* Bottom spacer */}
        <div style={{ height: 10 }} />
      </div>
    </div>
  );
}

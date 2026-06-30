import { useRef, useEffect } from 'react';
import { useApp } from './contexts/AppContext';
import { t } from './i18n';
import Home from './screens/Home';
import RecordMatch from './screens/RecordMatch';
import Statistics from './screens/Statistics';
import Insights from './screens/Insights';
import Account from './screens/Account';

const navItems = [
  { id: 'home', icon: '🏠', labelKey: 'home' },
  { id: 'record', icon: '➕', labelKey: 'record' },
  { id: 'stats', icon: '📊', labelKey: 'stats' },
  { id: 'insights', icon: '💡', labelKey: 'insights' },
  { id: 'account', icon: '👤', labelKey: 'account' },
];

export default function App() {
  const { activeTab, setActiveTab, settings } = useApp();
  const lang = settings.lang;
  const appRef = useRef(null);

  // Prevent pull-to-refresh
  useEffect(() => {
    const el = appRef.current;
    if (!el) return;
    const prevent = (e) => {
      if (e.cancelable) e.preventDefault();
    };
    el.addEventListener('touchmove', prevent, { passive: false });
    return () => el.removeEventListener('touchmove', prevent);
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'record': return <RecordMatch />;
      case 'stats': return <Statistics />;
      case 'insights': return <Insights />;
      case 'account': return <Account />;
      default: return <Home />;
    }
  };

  return (
    <div
      ref={appRef}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#F8F8FA',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glass Header */}
      <header
        className="glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 16px',
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          lineHeight: 1.2,
        }}>
          <h1 style={{
            fontSize: 16,
            fontWeight: 900,
            color: '#101010',
            letterSpacing: -0.3,
          }}>
            {t('appName', lang)}
          </h1>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            color: '#E6002D',
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontFamily: 'monospace',
          }}>
            {t('slogan', lang)}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {renderScreen()}
      </main>

      {/* Floating Bottom Navigation */}
      <nav
        className="glass-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '6px 8px',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{t(item.labelKey, lang)}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

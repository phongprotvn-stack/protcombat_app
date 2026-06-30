import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

const STORAGE_KEY = 'protcombat_matches';
const SETTINGS_KEY = 'protcombat_settings';

const defaultSettings = {
  lang: 'vi',
  theme: 'light',
  loggedIn: false,
};

export function AppProvider({ children }) {
  const [matches, setMatches] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [activeTab, setActiveTab] = useState('home');

  // Save matches to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    } catch (e) {
      console.error('Failed to save matches:', e);
    }
  }, [matches]);

  // Save settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  const addMatch = useCallback((match) => {
    const newMatch = {
      ...match,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString(),
    };
    setMatches(prev => [newMatch, ...prev]);
  }, []);

  const updateMatch = useCallback((id, updates) => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  }, []);

  const deleteMatch = useCallback((id) => {
    setMatches(prev => prev.filter(m => m.id !== id));
  }, []);

  const toggleLang = useCallback(() => {
    setSettings(prev => ({ ...prev, lang: prev.lang === 'vi' ? 'en' : 'vi' }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  }, []);

  // Computed stats
  const stats = {
    totalMatches: matches.length,
    totalWins: matches.filter(m => m.result === 'win').length,
    totalLosses: matches.filter(m => m.result === 'loss').length,
    winRate: matches.length > 0
      ? Math.round((matches.filter(m => m.result === 'win').length / matches.length) * 100)
      : 0,
    bestStreak: (() => {
      let current = 0, best = 0;
      for (const m of matches) {
        if (m.result === 'win') {
          current++;
          best = Math.max(best, current);
        } else {
          current = 0;
        }
      }
      // Current streak
      let curStr = 0;
      for (const m of matches) {
        if (m.result === 'win') curStr++;
        else curStr = 0;
      }
      return { best, current: curStr };
    })(),
    avgScore: matches.length > 0
      ? Math.round((matches.reduce((s, m) => s + (m.myScore || 0), 0) / matches.length) * 10) / 10
      : 0,
  };

  const value = {
    matches,
    settings,
    activeTab,
    stats,
    addMatch,
    updateMatch,
    deleteMatch,
    setActiveTab,
    toggleLang,
    toggleTheme,
    setSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

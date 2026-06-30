import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t, formatDate } from '../i18n';

export default function Statistics() {
  const { matches, stats, settings } = useApp();
  const lang = settings.lang;
  const [timeFilter, setTimeFilter] = useState('all');

  // Simple opponent analysis
  const opponentStats = {};
  matches.forEach(m => {
    const name = m.opponent || t('anonymous', lang);
    if (!opponentStats[name]) {
      opponentStats[name] = { total: 0, wins: 0, losses: 0, totalScore: 0, opScore: 0 };
    }
    opponentStats[name].total++;
    opponentStats[name].totalScore += m.myScore || 0;
    opponentStats[name].opScore += m.opScore || 0;
    if (m.result === 'win') opponentStats[name].wins++;
    else opponentStats[name].losses++;
  });

  const opponentList = Object.entries(opponentStats)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);

  return (
    <div className="screen screen-enter">
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Header */}
        <div style={{ fontSize: 18, fontWeight: 900, color: '#101010', paddingTop: 8 }}>
          {t('statsTitle', lang)}
        </div>

        {/* Time Filter */}
        <div className="segmented" style={{ maxWidth: 320 }}>
          <button className={timeFilter === 'all' ? 'active' : ''} onClick={() => setTimeFilter('all')}>
            {t('all', lang)}
          </button>
          <button className={timeFilter === 'month' ? 'active' : ''} onClick={() => setTimeFilter('month')}>
            {t('month', lang)}
          </button>
          <button className={timeFilter === 'week' ? 'active' : ''} onClick={() => setTimeFilter('week')}>
            {t('week', lang)}
          </button>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="card">
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('totalMatches', lang)}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#101010', marginTop: 4 }}>{stats.totalMatches}</div>
            <div style={{ fontSize: 11, color: '#E6002D', marginTop: 2 }}>{t('totalWins', lang).replace('📊 ', '')}: {stats.totalWins}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('winRate', lang)}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#E6002D', marginTop: 4 }}>{stats.winRate}%</div>
            <div style={{ fontSize: 11, color: '#707070', marginTop: 2 }}>{t('totalLosses', lang).replace('📊 ', '')}: {stats.totalLosses}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('bestStreak', lang)}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#101010', marginTop: 4 }}>{stats.bestStreak.best}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{t('winStreak', lang)}: {stats.bestStreak.current}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('avgScore', lang)}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#101010', marginTop: 4 }}>{stats.avgScore}</div>
          </div>
        </div>

        {/* Opponent Analysis */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 10, color: '#101010' }}>
            {t('opponentAnalysis', lang)}
          </div>
          {opponentList.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', color: '#9CA3AF', padding: '20px' }}>
              {lang === 'vi' ? 'Chưa có dữ liệu' : 'No data yet'}
            </div>
          ) : (
            opponentList.map(([name, data]) => {
              const wr = data.total > 0 ? Math.round((data.wins / data.total) * 100) : 0;
              return (
                <div key={name} className="card" style={{
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#101010' }}>{name}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                      {data.total} {t('totalMatches', lang).toLowerCase()} · {data.wins}W - {data.losses}L
                    </div>
                  </div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: wr >= 50 ? '#E6002D' : '#707070',
                  }}>
                    {wr}%
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Recent Match List */}
        {matches.length > 0 && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 10, color: '#101010' }}>
              {lang === 'vi' ? 'Lịch sử trận đấu' : 'Match History'}
            </div>
            {matches.map((m) => (
              <div key={m.id} className="card" style={{
                marginBottom: 8,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: m.result === 'win' ? '#E6002D' : '#707070',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>
                  {m.myScore || 0} – {m.opScore || 0}
                  <span style={{ fontWeight: 500, color: '#9CA3AF', marginLeft: 6 }}>
                    vs {m.opponent || t('anonymous', lang)}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>
                  {formatDate(m.date)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

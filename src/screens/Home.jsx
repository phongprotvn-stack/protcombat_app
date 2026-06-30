import { useApp } from '../contexts/AppContext';
import { t, getRankInfo, formatDate } from '../i18n';

export default function Home() {
  const { matches, stats, settings } = useApp();
  const lang = settings.lang;
  const rank = getRankInfo(matches.length, lang);

  return (
    <div className="screen screen-enter" style={{ paddingTop: 64 }}>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Fighter Rank Card */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #D60032 0%, #FF4B3A 100%)',
          color: 'white',
          padding: '20px 16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.8 }}>{t('fighterRank', lang)}</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginTop: 4, lineHeight: 1.1 }}>
                {rank.emoji} {rank.title}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{matches.length}</div>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.8 }}>{t('totalMatches', lang)}</div>
            </div>
          </div>
          {rank.level < 4 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 600, marginBottom: 4 }}>
                <span>⬆ {rank.nextTitle}</span>
                <span>{t('matchesToNextRank', lang).replace('{n}', rank.remaining).replace('{rank}', '')} {rank.remaining} {t('totalMatches', lang).toLowerCase()}</span>
              </div>
              <div style={{
                height: 6,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${Math.min(rank.progress, 100)}%`,
                  height: '100%',
                  background: 'white',
                  borderRadius: 3,
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          )}
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="card">
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('winRate', lang)}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#E6002D', marginTop: 4 }}>{stats.winRate}%</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{t('totalWins', lang).replace('📊 ', '')}: {stats.totalWins} / {stats.totalMatches}</div>
          </div>
          <div className="card">
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('winStreak', lang)}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#E6002D', marginTop: 4 }}>{stats.bestStreak.current}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{t('bestStreak', lang).replace('📊 ', '')}: {stats.bestStreak.best}</div>
          </div>
        </div>

        {/* Recent Matches */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 10, color: '#101010' }}>
            {t('recentMatches', lang)}
          </div>
          {matches.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', color: '#9CA3AF', padding: '24px 16px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎾</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{lang === 'vi' ? 'Chưa có trận đấu nào' : 'No matches yet'}</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>{lang === 'vi' ? 'Hãy ghi trận đấu đầu tiên!' : 'Record your first match!'}</div>
            </div>
          ) : (
            matches.slice(0, 5).map((match) => (
              <div key={match.id} className="card" style={{
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: match.result === 'win' ? 'rgba(230,0,45,0.1)' : '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 900,
                    color: match.result === 'win' ? '#E6002D' : '#707070',
                  }}>
                    {match.result === 'win' ? 'W' : 'L'}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: match.result === 'win' ? '#E6002D' : '#707070' }}>
                      {match.myScore || 0} – {match.opScore || 0}
                    </div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                      {match.opponent || t('anonymous', lang)} · {match.doubles ? t('doubles', lang) : t('singles', lang)}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>
                    {formatDate(match.date)}
                  </div>
                  <button style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 14,
                    color: '#D1D5DB',
                    marginTop: 4,
                    padding: 4,
                  }}>
                    {t('edit', lang)}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

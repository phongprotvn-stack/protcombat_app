import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../i18n';

export default function RecordMatch() {
  const { addMatch, settings } = useApp();
  const lang = settings.lang;

  const [doubles, setDoubles] = useState(false);
  const [opponentType, setOpponentType] = useState('maleMale');
  const [date, setDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  const [serve, setServe] = useState('before');
  const [myScore, setMyScore] = useState(0);
  const [opScore, setOpScore] = useState(0);
  const [opponent, setOpponent] = useState('');
  const [note, setNote] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleSave = () => {
    if (myScore === opScore) {
      showToast(lang === 'vi' ? '⚠️ Tỷ số không được hòa' : '⚠️ Score cannot be tied');
      return;
    }
    const result = myScore > opScore ? 'win' : 'loss';
    addMatch({
      date,
      doubles,
      opponentType,
      serve,
      myScore,
      opScore,
      opponent: opponent.trim() || t('anonymous', lang),
      note,
      result,
    });
    showToast(t('saveSuccess', lang));
    // Reset
    setMyScore(0);
    setOpScore(0);
    setOpponent('');
    setNote('');
    setServe('before');
    const d = new Date();
    setDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  };

  const toggleServe = (value) => setServe(value);

  return (
    <div className="screen screen-enter">
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Header */}
        <div style={{ fontSize: 18, fontWeight: 900, color: '#101010', paddingTop: 8 }}>
          {t('recordMatch', lang)}
        </div>

        {/* Mode Selector */}
        <div className="card">
          <div className="segmented">
            <button className={!doubles ? 'active' : ''} onClick={() => setDoubles(false)}>
              {t('singles', lang)}
            </button>
            <button className={doubles ? 'active' : ''} onClick={() => setDoubles(true)}>
              {t('doubles', lang)}
            </button>
          </div>
          {doubles && (
            <div className="segmented" style={{ marginTop: 8 }}>
              <button className={opponentType === 'maleMale' ? 'active' : ''} onClick={() => setOpponentType('maleMale')}>
                {t('maleMale', lang)}
              </button>
              <button className={opponentType === 'femaleFemale' ? 'active' : ''} onClick={() => setOpponentType('femaleFemale')}>
                {t('femaleFemale', lang)}
              </button>
              <button className={opponentType === 'maleFemale' ? 'active' : ''} onClick={() => setOpponentType('maleFemale')}>
                {t('maleFemale', lang)}
              </button>
            </div>
          )}
        </div>

        {/* Opponent Name */}
        <div className="card">
          <div className="action-field" style={{ borderBottom: 'none' }}>
            <span className="af-label">👤 {t('opponent', lang)}</span>
            <input
              type="text"
              value={opponent}
              onChange={(e) => setOpponent(e.target.value)}
              placeholder={t('anonymous', lang)}
              style={{
                border: 'none',
                background: '#F9FAFB',
                borderRadius: 10,
                padding: '8px 12px',
                fontSize: 14,
                fontWeight: 600,
                color: '#101010',
                textAlign: 'right',
                maxWidth: '60%',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Card: Ngày */}
        <div className="card">
          <div className="action-field" style={{ borderBottom: 'none', paddingTop: 2, paddingBottom: 2 }}>
            <span className="af-label">{t('date', lang)}</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                border: 'none',
                background: '#F9FAFB',
                borderRadius: 10,
                padding: '8px 12px',
                fontSize: 14,
                fontWeight: 600,
                color: '#101010',
                outline: 'none',
                colorScheme: settings.theme === 'dark' ? 'dark' : 'light',
              }}
            />
          </div>
        </div>

        {/* Card: Giao bóng */}
        <div className="card">
          <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 10 }}>
            {t('serve', lang)}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              onClick={() => toggleServe('before')}
              style={{
                padding: '6px 20px',
                borderRadius: 20,
                background: serve === 'before' ? 'rgba(230,0,45,0.1)' : '#F3F4F6',
                border: serve === 'before' ? '1px solid rgba(230,0,45,0.2)' : '1px solid transparent',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: serve === 'before' ? 700 : 500,
                color: serve === 'before' ? '#E6002D' : '#6B7280',
                transition: 'all 0.2s',
                userSelect: 'none',
                minWidth: 80,
                textAlign: 'center',
              }}
            >
              {t('before', lang)}
            </div>
            <button
              onClick={() => {
                setServe(prev => prev === 'before' ? 'after' : 'before');
                showToast('🔄 ' + (lang === 'vi' ? 'Đã đảo giao bóng!' : 'Serve swapped!'));
              }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#F3F4F6',
                border: 'none',
                fontSize: 13,
                cursor: 'pointer',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9CA3AF',
                transition: 'all 0.2s',
              }}
            >
              ⇄
            </button>
            <div
              onClick={() => toggleServe('after')}
              style={{
                padding: '6px 20px',
                borderRadius: 20,
                background: serve === 'after' ? 'rgba(230,0,45,0.1)' : '#F3F4F6',
                border: serve === 'after' ? '1px solid rgba(230,0,45,0.2)' : '1px solid transparent',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: serve === 'after' ? 700 : 500,
                color: serve === 'after' ? '#E6002D' : '#6B7280',
                transition: 'all 0.2s',
                userSelect: 'none',
                minWidth: 80,
                textAlign: 'center',
              }}
            >
              {t('after', lang)}
            </div>
          </div>
        </div>

        {/* Card: Tỷ số */}
        <div className="card">
          <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 8 }}>{t('score', lang)}</p>
          <div className="merged-input">
            <div className="field">
              <label>{t('me', lang)}</label>
              <div
                className="value"
                onClick={() => {
                  const v = prompt(lang === 'vi' ? 'Điểm của tôi:' : 'My score:', myScore);
                  if (v !== null) setMyScore(Math.max(0, parseInt(v) || 0));
                }}
              >
                {myScore}
              </div>
            </div>
            <div className="divider"></div>
            <button className="swap-btn" onClick={() => {
              setMyScore(opScore);
              setOpScore(myScore);
            }}>
              ⇄
            </button>
            <div className="divider"></div>
            <div className="field">
              <label>{t('opponent', lang)}</label>
              <div
                className="value"
                onClick={() => {
                  const v = prompt(lang === 'vi' ? 'Điểm đối thủ:' : 'Opponent score:', opScore);
                  if (v !== null) setOpScore(Math.max(0, parseInt(v) || 0));
                }}
              >
                {opScore}
              </div>
            </div>
          </div>

          {/* Win/Loss buttons */}
          <div className="result-dropdown">
            <div
              className={`result-btn win ${myScore > opScore ? 'active' : ''}`}
              onClick={() => {
                if (myScore <= opScore) {
                  if (myScore === opScore) setOpScore(myScore - 2);
                  else { const t = myScore; setMyScore(myScore + 2); setOpScore(t); }
                }
              }}
            >
              {t('win', lang)}
            </div>
            <div
              className={`result-btn loss ${opScore > myScore ? 'active' : ''}`}
              onClick={() => {
                if (opScore <= myScore) {
                  if (myScore === opScore) setMyScore(opScore - 2);
                  else { const t = opScore; setOpScore(opScore + 2); setMyScore(t); }
                }
              }}
            >
              {t('loss', lang)}
            </div>
          </div>
        </div>

        {/* Card: Ghi chú */}
        <div className="card">
          <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 6 }}>{t('note', lang)}</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={lang === 'vi' ? 'Thêm ghi chú (không bắt buộc)...' : 'Add a note (optional)...'}
            style={{
              width: '100%',
              border: '1px solid #F3F4F6',
              background: '#F9FAFB',
              borderRadius: 12,
              padding: '10px 12px',
              fontSize: 13,
              color: '#101010',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              minHeight: 60,
            }}
          />
        </div>

        {/* Save Button */}
        <div style={{ padding: '4px 0 16px' }}>
          <button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 16,
              border: 'none',
              background: 'linear-gradient(135deg, #E6002D 0%, #FF4B3A 100%)',
              color: 'white',
              fontSize: 16,
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 16px rgba(230,0,45,0.25)',
            }}
            onMouseDown={(e) => { e.target.style.transform = 'scale(0.97)'; }}
            onMouseUp={(e) => { e.target.style.transform = 'scale(1)'; }}
          >
            {t('saveRecord', lang)}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
}

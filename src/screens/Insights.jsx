import { useApp } from '../contexts/AppContext';
import { t } from '../i18n';

export default function Insights() {
  const { matches, stats, settings } = useApp();
  const lang = settings.lang;

  // Determine strengths and weaknesses
  const getAdvice = () => {
    if (matches.length < 5) {
      return {
        title: lang === 'vi' ? '📊 Cần thêm dữ liệu' : '📊 Need More Data',
        desc: lang === 'vi'
          ? 'Hãy ghi ít nhất 5 trận để nhận phân tích chi tiết từ AI.'
          : 'Record at least 5 matches to get detailed AI analysis.',
      };
    }

    const wr = stats.winRate;
    if (wr >= 70) {
      return {
        title: lang === 'vi' ? '🏆 Phong độ xuất sắc!' : '🏆 Excellent Form!',
        desc: lang === 'vi'
          ? `Bạn đang có phong độ rất tốt với ${wr}% tỷ lệ thắng. Hãy duy trì chiến thuật hiện tại và tập trung vào các pha bóng quyết định.`
          : `You're in great form with ${wr}% win rate. Maintain your current strategy and focus on clutch plays.`,
      };
    }
    if (wr >= 50) {
      return {
        title: lang === 'vi' ? '📈 Đang đi đúng hướng' : '📈 On the Right Track',
        desc: lang === 'vi'
          ? `Tỷ lệ thắng ${wr}% cho thấy bạn đang có nền tảng tốt. Hãy tập trung cải thiện các pha giao bóng và trả bóng.`
          : `A ${wr}% win rate shows you have a solid foundation. Focus on improving serve and return shots.`,
      };
    }
    return {
      title: lang === 'vi' ? '💪 Cần cải thiện' : '💪 Room for Improvement',
      desc: lang === 'vi'
        ? `Tỷ lệ thắng ${wr}% - đừng nản lòng! Hãy tập trung vào kỹ thuật cơ bản: giao bóng, trả bóng và di chuyển.`
        : `${wr}% win rate - don't be discouraged! Focus on fundamentals: serve, return, and footwork.`,
    };
  };

  const advice = getAdvice();

  // Common improvement tips
  const tips = lang === 'vi' ? [
    { icon: '🎯', title: 'Giao bóng', desc: 'Tập trung vào giao bóng chính xác thay vì mạnh. Mục tiêu: 80% bóng qua lưới.' },
    { icon: '🦶', title: 'Di chuyển', desc: 'Cải thiện footwork: bước ngắn, nhanh, luôn ở tư thế sẵn sàng.' },
    { icon: '🛡️', title: 'Phòng thủ', desc: 'Tập trung vào kỹ năng blocking và reset khi bị tấn công.' },
    { icon: '🧠', title: 'Chiến thuật', desc: 'Quan sát điểm yếu đối thủ. Nhắm vào backhand và khoảng trống trên sân.' },
  ] : [
    { icon: '🎯', title: 'Serve', desc: 'Focus on accurate serving over power. Target: 80% balls over the net.' },
    { icon: '🦶', title: 'Footwork', desc: 'Improve footwork: short, quick steps, always in ready position.' },
    { icon: '🛡️', title: 'Defense', desc: 'Work on blocking and reset skills when under attack.' },
    { icon: '🧠', title: 'Strategy', desc: 'Read opponent weaknesses. Target backhand and open court space.' },
  ];

  return (
    <div className="screen screen-enter">
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Header */}
        <div style={{ fontSize: 18, fontWeight: 900, color: '#101010', paddingTop: 8 }}>
          {t('insightsTitle', lang)}
        </div>

        {/* AI Analysis Card */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #D60032 0%, #FF4B3A 100%)',
          color: 'white',
        }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{t('aiAnalysis', lang)}</div>
          <p style={{ fontSize: 13, lineHeight: 1.5, marginTop: 8, opacity: 0.95 }}>
            {advice.title}
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.5, marginTop: 6, opacity: 0.85 }}>
            {advice.desc}
          </p>
        </div>

        {/* Quick Stats Summary */}
        <div className="card" style={{ display: 'flex', gap: 16, justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('totalMatches', lang)}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#101010' }}>{stats.totalMatches}</div>
          </div>
          <div style={{ width: 1, background: '#F3F4F6' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('winRate', lang)}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#E6002D' }}>{stats.winRate}%</div>
          </div>
          <div style={{ width: 1, background: '#F3F4F6' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{t('winStreak', lang)}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#101010' }}>{stats.bestStreak.current}</div>
          </div>
        </div>

        {/* Improvement Tips */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 10, color: '#101010' }}>
            {t('improvementTips', lang)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {tips.map((tip, i) => (
              <div key={i} className="card" style={{ padding: '12px' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{tip.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#101010' }}>{tip.title}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, lineHeight: 1.4 }}>{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips based on match count */}
        {matches.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '28px 16px' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎾</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#101010' }}>
              {lang === 'vi' ? 'Bắt đầu hành trình!' : 'Start Your Journey!'}
            </div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4, lineHeight: 1.5 }}>
              {lang === 'vi'
                ? 'Ghi trận đấu đầu tiên để nhận phân tích và gợi ý cải thiện kỹ năng pickleball của bạn.'
                : 'Record your first match to get analysis and improvement tips for your pickleball skills.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

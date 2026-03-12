import { useNavigate } from 'react-router-dom';
import './layout.css';

export default function SupportFooter() {
    const navigate = useNavigate();

    return (
        <div className="support-footer">
            <div className="support-bar">
                <span className="support-label">Support</span>
                <div className="support-divider"></div>
                <div className="support-links">
                    <button className="sup-btn crisis" onClick={() => navigate('/resources')}>
                        <span className="s-icon">🆘</span>
                        <span className="s-label" style={{ color: 'var(--danger)' }}>Crisis<br />Line</span>
                    </button>
                    <button className="sup-btn" onClick={() => navigate('/resources')}>
                        <span className="s-icon">🪴</span>
                        <span className="s-label">Book<br />Counsellor</span>
                    </button>
                    <button className="sup-btn" onClick={() => navigate('/chat')}>
                        <span className="s-icon">💬</span>
                        <span className="s-label">Wellness<br />Chat</span>
                    </button>
                    <button className="sup-btn" onClick={() => navigate('/resources')}>
                        <span className="s-icon">🫂</span>
                        <span className="s-label">Peer<br />Support</span>
                    </button>
                    <button className="sup-btn" onClick={() => navigate('/resources')}>
                        <span className="s-icon">🍎</span>
                        <span className="s-label">Food<br />Security</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

import { NavLink } from 'react-router-dom';
import './layout.css';

export default function TopBar() {
    return (
        <>
            <div className="topbar">
                <div className="logo-mark">N</div>
                <div className="logo-text">
                    <h1>NSCC Wellness Hub</h1>
                    <p>Nova Scotia Community College</p>
                </div>
                <div className="avatar">🌿</div>
            </div>

            <div className="nav-tabs" style={{ marginTop: '12px' }}>
                <NavLink to="/" className={({ isActive }) => `nav-tab ${isActive ? "active" : ""}`}>
                    <span className="tab-icon">🏡</span>Today
                </NavLink>
                <NavLink to="/checkin" className={({ isActive }) => `nav-tab ${isActive ? "active" : ""}`}>
                    <span className="tab-icon">✦</span>Check In
                </NavLink>
                <NavLink to="/chat" className={({ isActive }) => `nav-tab ${isActive ? "active" : ""}`}>
                    <span className="tab-icon">💬</span>Chat
                </NavLink>
                <NavLink to="/resources" className={({ isActive }) => `nav-tab ${isActive ? "active" : ""}`}>
                    <span className="tab-icon">🌱</span>Support
                </NavLink>
            </div>
        </>
    );
}

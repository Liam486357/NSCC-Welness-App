import './resources.css';

export default function Resources() {
    return (
        <>
            <div style={{ marginBottom: '5px' }}>
                <h2 className="section-head">Support & Resources</h2>
                <p className="section-sub" style={{ marginTop: '4px' }}>You are not alone. There are people and places ready to help you navigate whatever you're facing.</p>
            </div>

            <div className="resources-grid">

                {/* Urgent Crisis */}
                <div className="res-card urgent">
                    <div className="r-header">
                        <span className="r-icon">🆘</span>
                        <h3>Urgent Crisis Support</h3>
                        <span className="r-badge">24/7</span>
                    </div>
                    <p>If you or someone else is in immediate danger of experiencing a mental health emergency, please reach out immediately.</p>
                    <div className="r-links">
                        <a href="tel:988" className="r-btn primary">Call 988 (Suicide Crisis Helpline)</a>
                        <a href="tel:18884298167" className="r-btn primary">Call NS Mental Health Crisis Line</a>
                        <a href="https://good2talk.ca/novascotia/" target="_blank" rel="noreferrer" className="r-btn outline">Good2Talk Nova Scotia</a>
                    </div>
                </div>

                {/* NSCC Counselling */}
                <div className="res-card">
                    <div className="r-header">
                        <span className="r-icon">🪴</span>
                        <h3>NSCC Advising & Counselling</h3>
                    </div>
                    <p>Book a free, confidential session with an NSCC counsellor to discuss personal, academic, or career challenges.</p>
                    <div className="r-links">
                        <button className="r-btn primary">Book an Appointment</button>
                        <button className="r-btn outline">Learn about Student Services</button>
                    </div>
                </div>

                {/* Food Security */}
                <div className="res-card">
                    <div className="r-header">
                        <span className="r-icon">🍎</span>
                        <h3>Food Security</h3>
                    </div>
                    <p>Access emergency food support, campus food banks, and community nutrition resources.</p>
                    <div className="r-links">
                        <button className="r-btn primary">Find Campus Food Bank</button>
                        <button className="r-btn outline">Feed Nova Scotia Locator</button>
                    </div>
                </div>

                {/* Peer Support */}
                <div className="res-card">
                    <div className="r-header">
                        <span className="r-icon">🫂</span>
                        <h3>Peer & Community Support</h3>
                    </div>
                    <p>Connect with other students, student union programs, and affinity groups for shared experiences.</p>
                    <div className="r-links">
                        <button className="r-btn outline">NSCC Student Association (SA)</button>
                        <button className="r-btn outline">2SLGBTQIA+ Resources</button>
                        <button className="r-btn outline">Indigenous Student Supports</button>
                    </div>
                </div>

            </div>

            <div style={{ height: '20px' }}></div>
        </>
    );
}

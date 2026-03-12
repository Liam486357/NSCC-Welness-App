import { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { msalRequest } from '../authConfig';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Authenticate with Microsoft Entra ID (Azure AD)
            const response = await instance.loginPopup({
                ...msalRequest,
                prompt: "select_account"
            });

            // 2. Pass the Entra ID token to Supabase to establish the backend session
            const { error } = await supabase.auth.signInWithIdToken({
                provider: 'azure',
                token: response.idToken
            });

            if (error) throw error;

            // 3. Redirect on success
            navigate("/");

        } catch (error) {
            console.error("Login Error:", error);
            alert("Failed to sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '60vh', alignItems: 'center' }}>
            <div className="card" style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ fontFamily: "'Lora', serif", margin: '0 0 4px', fontSize: '24px' }}>Welcome Back</h1>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>Please sign in using your NSCC student account.</p>

                <form onSubmit={handleLogin}>
                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign in via NSCC Single Sign-On'}
                    </button>
                </form>
            </div>
        </div>
    );
}
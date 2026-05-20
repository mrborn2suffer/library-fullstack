import React, { useState } from 'react';

const LoginPage = ({ onLogin, onRegisterUser }) => {
  const [role, setRole] = useState('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [registerMode, setRegisterMode] = useState(false);
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    about: ''
  });

  const handleLoginSubmit = e => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  const handleRegisterSubmit = e => {
    e.preventDefault();
    onRegisterUser(regForm);
  };

  return (
    <div className="bh-auth-page">
      <div className="bh-auth-left">
        {/* Logo and Brand */}
        <div className="bh-brand">
          <div className="bh-brand-logo">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#F4C45C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <h1>Book Haven</h1>
          <p className="bh-tagline">Discover. Learn. Grow.</p>
        </div>

        {/* Auth Card */}
        <div className="bh-auth-card">
          {!registerMode ? (
            <>
              <h2>Welcome Back!</h2>
              <p className="bh-auth-subtitle">Login to continue your reading journey</p>

              {/* Role Toggle */}
              <div className="bh-toggle">
                <button
                  className={role === 'USER' ? 'active' : ''}
                  onClick={() => setRole('USER')}
                >
                  User
                </button>
                <button
                  className={role === 'ADMIN' ? 'active' : ''}
                  onClick={() => setRole('ADMIN')}
                >
                  Admin
                </button>
              </div>

              <form className="bh-auth-form" onSubmit={handleLoginSubmit}>
                <div className="bh-input-wrapper">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="bh-input-wrapper">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="bh-auth-actions">
                  <label className="bh-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="bh-link" onClick={e => e.preventDefault()}>Forgot Password?</a>
                </div>

                <button type="submit" className="bh-btn-primary">
                  Login as {role.toLowerCase()}
                </button>

                <div className="bh-divider">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  className="bh-btn-google"
                  onClick={() => {
                    // Pre-fill demo credentials for Google button to make testing easy
                    if (role === 'ADMIN') {
                      setEmail('admin1@library.com');
                      setPassword('Admin1Password!');
                    } else {
                      setEmail('user1@library.com');
                      setPassword('User1Password!');
                    }
                    alert(`Demo credentials for ${role} loaded. Click Login to proceed!`);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '10px' }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Login with Google
                </button>
              </form>

              {role === 'USER' ? (
                <div className="bh-auth-switch">
                  Don't have an account?{' '}
                  <button className="link-btn" onClick={() => setRegisterMode(true)}>
                    Sign Up
                  </button>
                </div>
              ) : (
                <p className="bh-note">
                  Admin registration is restricted. New admin accounts can only be created by the primary admin.
                </p>
              )}
            </>
          ) : (
            <>
              <h2>Create Account</h2>
              <p className="bh-auth-subtitle">Join Book Haven today</p>

              <form className="bh-auth-form" onSubmit={handleRegisterSubmit}>
                <div className="bh-input-wrapper">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={regForm.name}
                    onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="bh-input-wrapper">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={regForm.email}
                    onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="bh-input-wrapper">
                  <input
                    type="password"
                    placeholder="Password"
                    value={regForm.password}
                    onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                    required
                  />
                </div>
                <div className="bh-input-wrapper">
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={regForm.mobile}
                    onChange={e => setRegForm({ ...regForm, mobile: e.target.value })}
                    required
                  />
                </div>
                <div className="bh-input-wrapper">
                  <textarea
                    placeholder="About Yourself"
                    value={regForm.about}
                    onChange={e => setRegForm({ ...regForm, about: e.target.value })}
                    rows="2"
                  />
                </div>

                <button type="submit" className="bh-btn-primary" style={{ marginTop: '0.5rem' }}>
                  Register
                </button>
              </form>

              <div className="bh-auth-switch">
                Already registered?{' '}
                <button className="link-btn" onClick={() => setRegisterMode(false)}>
                  Login
                </button>
              </div>
            </>
          )}
        </div>

        {/* Quote Section at the bottom */}
        <div className="bh-quote-card">
          <p className="bh-quote-text">
            “A library is a hospital for the mind.”
          </p>
          <p className="bh-quote-author">— Anonymous</p>
          <div className="bh-quote-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

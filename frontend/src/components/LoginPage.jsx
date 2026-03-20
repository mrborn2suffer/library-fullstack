import React, { useState } from 'react';

const LoginPage = ({ onLogin, onRegisterUser }) => {
  const [role, setRole] = useState('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className="mono-auth-container">
      <div className="mono-card mono-auth-card">
        <h1 className="mono-title">Monochrome Library</h1>
        <p className="mono-subtitle">Sign in to read and manage books</p>

        <div className="mono-toggle">
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

        {!registerMode && (
          <form className="mono-form" onSubmit={handleLoginSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="mono-button primary">
              Log in as {role.toLowerCase()}
            </button>
          </form>
        )}

        {role === 'USER' && (
          <div className="mono-auth-switch">
            <span>
              {registerMode ? 'Already registered?' : 'New here?'}
            </span>
            <button
              type="button"
              className="link"
              onClick={() => setRegisterMode(!registerMode)}
            >
              {registerMode ? 'Log in' : 'Register as user'}
            </button>
          </div>
        )}

        {registerMode && role === 'USER' && (
          <form className="mono-form" onSubmit={handleRegisterSubmit}>
            <label>
              Name
              <input
                type="text"
                value={regForm.name}
                onChange={e =>
                  setRegForm({ ...regForm, name: e.target.value })
                }
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={regForm.email}
                onChange={e =>
                  setRegForm({ ...regForm, email: e.target.value })
                }
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={regForm.password}
                onChange={e =>
                  setRegForm({ ...regForm, password: e.target.value })
                }
                required
              />
            </label>
            <label>
              Mobile
              <input
                type="text"
                value={regForm.mobile}
                onChange={e =>
                  setRegForm({ ...regForm, mobile: e.target.value })
                }
                required
              />
            </label>
            <label>
              About
              <textarea
                value={regForm.about}
                onChange={e =>
                  setRegForm({ ...regForm, about: e.target.value })
                }
              />
            </label>
            <button type="submit" className="mono-button secondary">
              Register
            </button>
          </form>
        )}

        {role === 'ADMIN' && (
          <p className="mono-note">
            Admin registration is restricted. Only the primary admin (`admin1`)
            can create new admins from the admin panel.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;


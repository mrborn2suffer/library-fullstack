import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ user, onSearch, onLogout }) => {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      onSearchRef.current(search);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const navItems = [
    { label: 'Books', path: '/' },
    { label: 'Members', path: '/members' },
    { label: 'Transactions', path: '/transactions' },
    { label: 'Reports', path: '/reports' }
  ];

  if (user && user.role === 'ADMIN') {
    navItems.push({ label: 'Admin Panel', path: '/admin' });
  }


  return (
    <header className="bh-header">
      {/* Brand Logo & Name */}
      <div className="bh-header-logo" onClick={() => navigate('/')}>
        <div className="bh-header-logo-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <span>Library Management System</span>
      </div>

      {/* Center Navigation Links */}
      <nav className="bh-header-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.label}
              className={`bh-header-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          );
        })}
      </nav>

      {/* Right Search and Action Buttons */}
      <div className="bh-header-right">
        <form className="bh-header-search-form" onSubmit={handleSearchSubmit}>
          <span className="bh-header-search-icon">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search books by title, author or ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        
        {user ? (
          <button className="bh-header-login-btn" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <button className="bh-header-login-btn">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

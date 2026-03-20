import React, { useState } from 'react';

const Navbar = ({ user, genres, onGenreSelect, onSearch, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [showGenres, setShowGenres] = useState(false);

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search.trim());
    }
  };

  return (
    <header className="mono-nav">
      <div className="mono-nav-left">
        <button className="mono-logo" onClick={() => onNavigate('/')}>
          Library
        </button>
        <button className="mono-nav-link" onClick={() => onNavigate('/')}>
          Home
        </button>

        <div className="mono-nav-genre">
          <button
            className="mono-nav-link"
            onClick={() => setShowGenres(!showGenres)}
          >
            Genre
          </button>
          {showGenres && (
            <div className="mono-dropdown">
              {genres.map(g => (
                <button
                  key={g}
                  onClick={() => {
                    onGenreSelect(g);
                    setShowGenres(false);
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="mono-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="mono-nav-right">
        <button className="mono-nav-link" onClick={() => onNavigate('/cart')}>
          My cart
        </button>
        <button
          className="mono-avatar"
          onClick={() =>
            onNavigate(user.role === 'ADMIN' ? '/admin' : '/profile')
          }
        >
          {user.name?.charAt(0)?.toUpperCase() || '?'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;


import React, { useState } from 'react';

const HomePage = ({
  books = [],
  genres = [],
  user,
  cart = [],
  onAddToCart,
  onBookClick,
  onGenreSelect,
  selectedGenre = 'all',
  sortBy = 'newest',
  onSortSelect
}) => {
  const [isGridView, setIsGridView] = useState(true);

  // Help calculate stable rating
  const getBookRating = (id) => {
    const chars = id.split('');
    const sum = chars.reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (4.0 + (sum % 10) / 10).toFixed(1);
  };

  const getBookRatingCount = (id) => {
    const chars = id.split('');
    const sum = chars.reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (1000 + (sum % 5) * 450 + (sum % 9) * 110);
  };

  // Sort logic
  const sortedBooks = [...books].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'author') {
      return a.author.localeCompare(b.author);
    }
    if (sortBy === 'price-low') {
      return a.marketPrice - b.marketPrice;
    }
    if (sortBy === 'price-high') {
      return b.marketPrice - a.marketPrice;
    }
    // 'newest' (by ID or default)
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="books-view">
      {/* Books Header with Statistics and Controls */}
      <div className="books-view-header">
        <div className="books-view-title">
          <h1>Books</h1>
          <p>Showing 1–{books.length} of {books.length} books</p>
        </div>

        <div className="books-view-controls">
          {/* Genre Filter Dropdown */}
          <div className="sort-select-wrapper">
            <select
              className="sort-select"
              value={selectedGenre}
              onChange={(e) => onGenreSelect(e.target.value)}
            >
              <option value="all">All Genres</option>
              <option value="recommended">★ Recommended for You</option>
              <option value="recent">⏱ Recently Added</option>
              {genres.map(g => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="sort-select-wrapper">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => onSortSelect(e.target.value)}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="title">Sort by: Title</option>
              <option value="author">Sort by: Author</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Grid/List View Toggles */}
          <button
            className={`view-toggle-btn ${isGridView ? 'active' : ''}`}
            onClick={() => setIsGridView(true)}
            title="Grid View"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            className={`view-toggle-btn ${!isGridView ? 'active' : ''}`}
            onClick={() => setIsGridView(false)}
            title="List View"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div 
        className={isGridView ? "books-grid" : "books-list"}
        style={!isGridView ? { display: 'flex', flexDirection: 'column', gap: '1rem' } : {}}
      >
        {sortedBooks.map(book => {
          const rating = getBookRating(book.id);
          const starsCount = Math.round(parseFloat(rating));
          const starsStr = '★'.repeat(starsCount) + '☆'.repeat(5 - starsCount);
          const inCart = cart.some(item => item.id === book.id);
          
          return (
            <article
              key={book.id}
              className="book-card"
              onClick={() => onBookClick(book.id)}
              style={!isGridView ? { flexDirection: 'row', gap: '1.5rem', alignItems: 'center' } : {}}
            >
              {/* Cover Frame */}
              <div 
                className="book-cover-frame"
                style={!isGridView ? { width: '80px', height: '110px', marginBottom: 0, padding: '0.5rem' } : {}}
              >
                {book.coverImageUrl ? (
                  <img src={book.coverImageUrl} alt={book.title} />
                ) : (
                  <div className="book-cover-placeholder">{book.title[0]}</div>
                )}
              </div>

              {/* Book Info */}
              <div className="book-info" style={!isGridView ? { flex: 1 } : {}}>
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">{book.author}</p>
                <p className="book-desc">{book.description || 'No description available. Expand details to see more info.'}</p>
                
                {/* Rating */}
                <div className="book-rating">
                  <span className="stars-gold">{starsStr}</span>
                  <span>{rating}</span>
                  <span className="rating-count">({getBookRatingCount(book.id)})</span>
                </div>

                {/* Footer */}
                <div className="book-footer">
                  <span className="book-price">₹{book.marketPrice.toFixed(2)}</span>
                  <span className="book-status in-stock">In Stock</span>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="book-hover-actions">
                <button
                  className="hover-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(book.id);
                  }}
                  title={inCart ? "In Queue" : "Add to Borrowings"}
                  style={inCart ? { background: 'var(--accent-green)', color: 'white', borderColor: 'var(--accent-green)' } : {}}
                >
                  {inCart ? (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  )}
                </button>
              </div>
            </article>
          );
        })}

        {books.length === 0 && (
          <div className="empty-view">
            <h3>No Books Available</h3>
            <p>We couldn't find any books. Try searching with a different term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

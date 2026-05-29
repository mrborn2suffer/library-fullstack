import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetailPage = ({ books = [], onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="empty-view">
        <h3>Book Not Found</h3>
        <button className="bh-header-login-btn" onClick={() => navigate('/')}>
          Back to Library
        </button>
      </div>
    );
  }

  // Helper to get stable mock rating
  const getBookRating = (id) => {
    const chars = id.split('');
    const sum = chars.reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (4.0 + (sum % 10) / 10).toFixed(1);
  };

  const rating = getBookRating(book.id);
  const starsCount = Math.round(parseFloat(rating));
  const starsStr = '★'.repeat(starsCount) + '☆'.repeat(5 - starsCount);

  return (
    <div className="modal-overlay" onClick={() => navigate('/')}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="detail-layout">
          <div className="detail-cover-sec">
            {book.coverImageUrl ? (
              <img src={book.coverImageUrl} alt={book.title} />
            ) : (
              <div className="book-cover-placeholder" style={{ fontSize: '2.5rem' }}>{book.title[0]}</div>
            )}
          </div>

          <div className="detail-info-sec">
            <h2>{book.title}</h2>
            <p className="detail-author">By <span>{book.author}</span></p>

            <div className="detail-meta-row">
              <div className="detail-meta-item">
                <span className="detail-meta-label">Genre</span>
                <span className="detail-meta-val">{book.genre}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Daily Price</span>
                <span className="detail-meta-val">₹{book.marketPrice}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Rating</span>
                <span className="detail-meta-val" style={{ color: 'var(--accent-gold)' }}>
                  {starsStr} ({rating})
                </span>
              </div>
            </div>

            <div className="detail-desc-box">
              <h4>About the Book</h4>
              <p className="detail-desc">{book.description || 'No description is available for this book. A timeless resource for academic and leisure reading.'}</p>
            </div>

            <div className="detail-actions">
              <button
                className="bh-btn-primary"
                onClick={() => {
                  onAddToCart(book.id);
                  navigate('/');
                }}
                style={{ flex: 1 }}
              >
                Add to Borrow Queue
              </button>
              <button
                className="bh-header-login-btn"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;

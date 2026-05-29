import React from 'react';

const BorrowingsPage = ({ cart = [], onRemoveFromCart, onCheckout }) => {
  return (
    <div className="borrowings-view">
      <div className="books-view-header">
        <div className="books-view-title">
          <h1>Active Borrowings</h1>
          <p>Books you have currently selected or borrowed</p>
        </div>
        {cart.length > 0 && (
          <button 
            className="bh-header-login-btn"
            onClick={onCheckout}
            style={{ padding: '0.6rem 1.5rem', background: 'var(--primary-color)', color: 'white' }}
          >
            Confirm Borrowing
          </button>
        )}
      </div>

      <div className="table-container">
        {cart.length > 0 ? (
          <table className="bh-table">
            <thead>
              <tr>
                <th>Book Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Daily Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((book) => (
                <tr key={book.id}>
                  <td>
                    {book.coverImageUrl ? (
                      <img src={book.coverImageUrl} alt={book.title} style={{ width: '30px', height: '42px', objectFit: 'contain', borderRadius: '2px' }} />
                    ) : (
                      <div className="widget-book-placeholder" style={{ width: '30px', height: '42px', fontSize: '0.65rem' }}>{book.title[0]}</div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{book.title}</td>
                  <td>{book.author}</td>
                  <td><span className="book-status in-stock" style={{ background: '#f3f4f6', color: '#4b5563' }}>{book.genre}</span></td>
                  <td style={{ fontWeight: 700 }}>₹{book.marketPrice}</td>
                  <td>
                    <button 
                      className="action-btn-sm delete"
                      onClick={() => onRemoveFromCart(book.id)}
                    >
                      Return / Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-view">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <h3>No Active Borrowings</h3>
            <p>Go to the Books tab to browse and add books to your borrowing queue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowingsPage;

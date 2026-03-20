import React from 'react';

const CartPage = ({ cart, onRemoveFromCart }) => {
  return (
    <section className="mono-grid">
      <h1 className="mono-section-title">My cart</h1>
      {cart.map(book => (
        <article key={book.id} className="mono-card mono-book-card">
          <div className="mono-book-cover">
            {book.coverImageUrl ? (
              <img src={book.coverImageUrl} alt={book.title} />
            ) : (
              <div className="mono-cover-placeholder">{book.title[0]}</div>
            )}
          </div>
          <div className="mono-book-body">
            <h2>{book.title}</h2>
            <p className="mono-book-meta">
              {book.author} · {book.genre}
            </p>
            <p className="mono-book-price">₹{book.marketPrice}</p>
            <button
              className="mono-button secondary small"
              onClick={() => onRemoveFromCart(book.id)}
            >
              Remove
            </button>
          </div>
        </article>
      ))}
      {cart.length === 0 && (
        <div className="mono-empty">Your cart is empty.</div>
      )}
    </section>
  );
};

export default CartPage;


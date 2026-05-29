import React, { useState } from 'react';

const emptyBook = {
  title: '',
  author: '',
  genre: '',
  description: '',
  marketPrice: 0,
  coverImageUrl: ''
};

const AdminPanel = ({ books, onCreateBook, onUpdateBook, onDeleteBook, onCreateAdmin }) => {
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);

  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    about: ''
  });

  const handleBookSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await onUpdateBook(editingId, form);
      } else {
        await onCreateBook(form);
      }
      setForm(emptyBook);
      setEditingId(null);
    } catch (err) {
      alert('Failed to save book: ' + err.message);
    }
  };

  const handleBookEdit = book => {
    setEditingId(book.id);
    setForm({
      title: book.title || '',
      author: book.author || '',
      genre: book.genre || '',
      description: book.description || '',
      marketPrice: book.marketPrice || 0,
      coverImageUrl: book.coverImageUrl || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyBook);
  };

  const handleBookDelete = async id => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await onDeleteBook(id);
      } catch (err) {
        alert('Failed to delete book: ' + err.message);
      }
    }
  };

  const handleAdminSubmit = async e => {
    e.preventDefault();
    try {
      await onCreateAdmin(adminForm);
      setAdminForm({
        name: '',
        email: '',
        password: '',
        mobile: '',
        about: ''
      });
    } catch (err) {
      alert('Failed to create admin: ' + err.message);
    }
  };

  return (
    <div className="admin-view">
      {/* View Header */}
      <div className="books-view-header">
        <div className="books-view-title">
          <h1>Admin Control Panel</h1>
          <p>Catalog administration and librarian user controls</p>
        </div>
      </div>

      {/* Grid Layout splits forms and catalog management */}
      <div className="dashboard-sections">
        {/* Left Side: Adding & Promoting Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Add/Edit Book Card */}
          <div className="dashboard-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              {editingId ? 'Edit Library Book' : 'Add New Book'}
            </h3>
            <form className="bh-auth-form" onSubmit={handleBookSubmit}>
              <div className="bh-input-wrapper">
                <input
                  type="text"
                  placeholder="Book Title"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="bh-input-wrapper">
                <input
                  type="text"
                  placeholder="Author Name"
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  required
                />
              </div>
              <div className="bh-input-wrapper">
                <input
                  type="text"
                  placeholder="Genre / Category"
                  value={form.genre}
                  onChange={e => setForm({ ...form, genre: e.target.value })}
                  required
                />
              </div>
              <div className="bh-input-wrapper">
                <input
                  type="number"
                  placeholder="Daily Price (₹)"
                  value={form.marketPrice || ''}
                  onChange={e => setForm({ ...form, marketPrice: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="bh-input-wrapper">
                <input
                  type="text"
                  placeholder="Cover Image URL"
                  value={form.coverImageUrl}
                  onChange={e => setForm({ ...form, coverImageUrl: e.target.value })}
                />
              </div>
              <div className="bh-input-wrapper">
                <textarea
                  placeholder="Short Description"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="bh-btn-primary" style={{ flex: 1 }}>
                  {editingId ? 'Update Catalog Book' : 'Create Book'}
                </button>
                {editingId && (
                  <button type="button" className="bh-header-login-btn" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Add Admin Card */}
          <div className="dashboard-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              Create Librarian Account
            </h3>
            <form className="bh-auth-form" onSubmit={handleAdminSubmit}>
              <div className="bh-input-wrapper">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={adminForm.name}
                  onChange={e => setAdminForm({ ...adminForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="bh-input-wrapper">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={adminForm.email}
                  onChange={e => setAdminForm({ ...adminForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="bh-input-wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  value={adminForm.password}
                  onChange={e => setAdminForm({ ...adminForm, password: e.target.value })}
                  required
                />
              </div>
              <div className="bh-input-wrapper">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={adminForm.mobile}
                  onChange={e => setAdminForm({ ...adminForm, mobile: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="bh-header-login-btn" style={{ width: '100%', borderStyle: 'solid' }}>
                Create Administrator
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Catalog Manager List Table */}
        <div className="dashboard-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            Manage Catalog ({books.length})
          </h3>
          <div className="table-container" style={{ width: '100%' }}>
            <table className="bh-table">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title & Author</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td>
                      {book.coverImageUrl ? (
                        <img src={book.coverImageUrl} alt={book.title} style={{ width: '32px', height: '44px', objectFit: 'contain', borderRadius: '4px', boxShadow: 'var(--shadow-sm)' }} />
                      ) : (
                        <div className="widget-book-placeholder" style={{ width: '32px', height: '44px', fontSize: '0.65rem' }}>{book.title ? book.title[0] : '?'}</div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{book.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>By {book.author}</div>
                    </td>
                    <td>
                      <span className="book-status in-stock" style={{ background: '#f3f4f6', color: '#4b5563', fontSize: '0.7rem' }}>
                        {book.genre}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>₹{book.marketPrice.toFixed(2)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button className="action-btn-sm" onClick={() => handleBookEdit(book)}>
                          Edit
                        </button>
                        <button className="action-btn-sm delete" onClick={() => handleBookDelete(book.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                      No books available. Add a book to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useState } from 'react';

const emptyBook = {
  title: '',
  author: '',
  genre: '',
  description: '',
  marketPrice: 0,
  coverImageUrl: ''
};

const AdminPanel = ({ books, onBooksChange, onCreateAdmin }) => {
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);

  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    about: ''
  });

  const handleBookSubmit = e => {
    e.preventDefault();
    if (editingId) {
      const updated = books.map(b =>
        b.id === editingId ? { ...b, ...form } : b
      );
      onBooksChange(updated);
    } else {
      const tmpId = Math.random().toString(36).slice(2);
      onBooksChange([...books, { ...form, id: tmpId }]);
    }
    setForm(emptyBook);
    setEditingId(null);
  };

  const handleAdminSubmit = e => {
    e.preventDefault();
    onCreateAdmin(adminForm);
    setAdminForm({
      name: '',
      email: '',
      password: '',
      mobile: '',
      about: ''
    });
  };

  return (
    <section className="mono-admin">
      <div className="mono-card">
        <h1 className="mono-section-title">Admin panel</h1>
        <h2>+ Add / edit book</h2>
        <form className="mono-form grid" onSubmit={handleBookSubmit}>
          <label>
            Title
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </label>
          <label>
            Author
            <input
              value={form.author}
              onChange={e => setForm({ ...form, author: e.target.value })}
              required
            />
          </label>
          <label>
            Genre
            <input
              value={form.genre}
              onChange={e => setForm({ ...form, genre: e.target.value })}
              required
            />
          </label>
          <label>
            Price (₹)
            <input
              type="number"
              value={form.marketPrice}
              onChange={e =>
                setForm({ ...form, marketPrice: Number(e.target.value) })
              }
            />
          </label>
          <label className="full">
            Cover image URL
            <input
              value={form.coverImageUrl}
              onChange={e =>
                setForm({ ...form, coverImageUrl: e.target.value })
              }
            />
          </label>
          <label className="full">
            Short description
            <textarea
              value={form.description}
              onChange={e =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>
          <button type="submit" className="mono-button primary full">
            {editingId ? 'Update book' : 'Add book'}
          </button>
        </form>
      </div>

      <div className="mono-card">
        <h2>+ Add new admin</h2>
        <form className="mono-form" onSubmit={handleAdminSubmit}>
          <label>
            Name
            <input
              value={adminForm.name}
              onChange={e =>
                setAdminForm({ ...adminForm, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={adminForm.email}
              onChange={e =>
                setAdminForm({ ...adminForm, email: e.target.value })
              }
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={adminForm.password}
              onChange={e =>
                setAdminForm({ ...adminForm, password: e.target.value })
              }
              required
            />
          </label>
          <label>
            Mobile
            <input
              value={adminForm.mobile}
              onChange={e =>
                setAdminForm({ ...adminForm, mobile: e.target.value })
              }
              required
            />
          </label>
          <label>
            About
            <textarea
              value={adminForm.about}
              onChange={e =>
                setAdminForm({ ...adminForm, about: e.target.value })
              }
            />
          </label>
          <button type="submit" className="mono-button secondary">
            + Add new admin
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminPanel;


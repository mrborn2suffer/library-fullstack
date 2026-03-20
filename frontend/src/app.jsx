import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  fetchBooks,
  fetchBooksByGenre,
  fetchCart,
  fetchCurrentUser,
  fetchGenres,
  searchBooks,
  addToCart,
  removeFromCart,
  login,
  registerUser,
  createAdmin
} from './api';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const me = await fetchCurrentUser().catch(() => null);
        if (me) {
          setUser(me);
          const [allBooks, allGenres, userCart] = await Promise.all([
            fetchBooks(),
            fetchGenres(),
            fetchCart()
          ]);
          setBooks(allBooks);
          setGenres(Array.from(allGenres));
          setCart(userCart);
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleLogin = async (email, password, role) => {
    const auth = await login(email, password, role);
    setUser(auth);
    const [allBooks, allGenres, userCart] = await Promise.all([
      fetchBooks(),
      fetchGenres(),
      fetchCart()
    ]);
    setBooks(allBooks);
    setGenres(Array.from(allGenres));
    setCart(userCart);
    navigate('/');
  };

  const handleRegisterUser = async payload => {
    const created = await registerUser(payload);
    setUser(created);
    const [allBooks, allGenres] = await Promise.all([
      fetchBooks(),
      fetchGenres()
    ]);
    setBooks(allBooks);
    setGenres(Array.from(allGenres));
    navigate('/');
  };

  const handleCreateAdmin = async payload => {
    await createAdmin(payload);
    alert('Admin created');
  };

  const handleGenreSelect = async genre => {
    const res = await fetchBooksByGenre(genre);
    setBooks(res);
  };

  const handleSearch = async query => {
    const res = await searchBooks(query);
    setBooks(res);
  };

  const handleAddToCart = async bookId => {
    await addToCart(bookId);
    const updated = await fetchCart();
    setCart(updated);
  };

  const handleRemoveFromCart = async bookId => {
    await removeFromCart(bookId);
    const updated = await fetchCart();
    setCart(updated);
  };

  if (loading) {
    return (
      <div className="app app-center">
        <div className="mono-card">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app app-center">
        <LoginPage
          onLogin={handleLogin}
          onRegisterUser={handleRegisterUser}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar
        user={user}
        genres={genres}
        onGenreSelect={handleGenreSelect}
        onSearch={handleSearch}
        onNavigate={path => navigate(path)}
      />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                books={books}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProfilePage user={user} />}
          />
          <Route
            path="/admin"
            element={
              user.role === 'ADMIN' ? (
                <AdminPanel
                  books={books}
                  onBooksChange={setBooks}
                  onCreateAdmin={handleCreateAdmin}
                />
              ) : (
                <HomePage books={books} onAddToCart={handleAddToCart} />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;


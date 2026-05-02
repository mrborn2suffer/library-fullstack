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
  createAdmin,
  logout,
  createBook,
  updateBook,
  deleteBook,
  fetchUsers
} from './api';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BookDetailPage from './components/BookDetailPage';
import DashboardPage from './components/DashboardPage';
import MembersPage from './components/MembersPage';
import TransactionsPage from './components/TransactionsPage';
import BorrowingsPage from './components/BorrowingsPage';
import ReservationsPage from './components/ReservationsPage';
import ReportsPage from './components/ReportsPage';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [cart, setCart] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const recommendedBooksData = [
    {
      id: 'rec1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      genre: 'non-fiction',
      description: 'Timeless lessons on wealth, greed, and happiness doing research on how people make decisions.',
      marketPrice: 399,
      coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg'
    },
    {
      id: 'rec2',
      title: 'Deep Work',
      author: 'Cal Newport',
      genre: 'non-fiction',
      description: 'Rules for focused success in a distracted world.',
      marketPrice: 349,
      coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/I/4175F348FhL.jpg'
    },
    {
      id: 'rec3',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      genre: 'non-fiction',
      description: 'Two systems drive the way we think—System 1, which is fast and emotional, and System 2, which is slow and logical.',
      marketPrice: 499,
      coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51j1-QG-+DL.jpg'
    },
    {
      id: 'rec4',
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'non-fiction',
      description: 'An easy and proven way to build good habits and break bad ones.',
      marketPrice: 350,
      coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91bYSX41h2L.jpg'
    },
    {
      id: 'rec5',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'fantasy',
      description: 'A gorgeous fable about following your dreams and listening to your heart.',
      marketPrice: 299,
      coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg'
    }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const me = await fetchCurrentUser().catch(() => null);
        if (me) {
          setUser(me);
          const [allBooksData, allGenres, userCart] = await Promise.all([
            fetchBooks(),
            fetchGenres(),
            fetchCart()
          ]);
          setBooks(allBooksData);
          setAllBooks(allBooksData);
          setGenres(Array.from(allGenres));
          setCart(userCart);

          if (me.role === 'ADMIN') {
            const allUsers = await fetchUsers().catch(() => []);
            setMembers(allUsers);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message) => {
    setToast({ message });
  };

  const handleLogin = async (email, password, role) => {
    const auth = await login(email, password, role);
    setUser(auth);
    const [allBooksData, allGenres, userCart] = await Promise.all([
      fetchBooks(),
      fetchGenres(),
      fetchCart()
    ]);
    setBooks(allBooksData);
    setAllBooks(allBooksData);
    setGenres(Array.from(allGenres));
    setCart(userCart);

    if (auth.role === 'ADMIN') {
      const allUsers = await fetchUsers().catch(() => []);
      setMembers(allUsers);
    }
    navigate('/');
  };

  const handleRegisterUser = async payload => {
    const created = await registerUser(payload);
    setUser(created);
    const [allBooksData, allGenres] = await Promise.all([
      fetchBooks(),
      fetchGenres()
    ]);
    setBooks(allBooksData);
    setAllBooks(allBooksData);
    setGenres(Array.from(allGenres));
    navigate('/');
  };

  const handleCreateAdmin = async payload => {
    await createAdmin(payload);
    alert('Admin created');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed', err);
    }
    setUser(null);
    setBooks([]);
    setAllBooks([]);
    setGenres([]);
    setCart([]);
    setMembers([]);
    navigate('/');
  };

  const handleCreateBook = async book => {
    await createBook(book);
    const [allBooksData, allGenres] = await Promise.all([
      fetchBooks(),
      fetchGenres()
    ]);
    setBooks(allBooksData);
    setAllBooks(allBooksData);
    setGenres(Array.from(allGenres));
  };

  const handleUpdateBook = async (id, book) => {
    await updateBook(id, book);
    const [allBooksData, allGenres] = await Promise.all([
      fetchBooks(),
      fetchGenres()
    ]);
    setBooks(allBooksData);
    setAllBooks(allBooksData);
    setGenres(Array.from(allGenres));
  };

  const handleDeleteBook = async id => {
    await deleteBook(id);
    const [allBooksData, allGenres] = await Promise.all([
      fetchBooks(),
      fetchGenres()
    ]);
    setBooks(allBooksData);
    setAllBooks(allBooksData);
    setGenres(Array.from(allGenres));
  };

  const handleGenreSelect = async genre => {
    setSelectedGenre(genre);
    if (!genre || genre.toLowerCase() === 'all') {
      const res = await fetchBooks();
      setBooks(res);
    } else if (genre.toLowerCase() === 'recommended') {
      const res = await fetchBooks();
      const recIds = ['rec1', 'rec2', 'rec3', 'rec4', 'rec5'];
      const filtered = res.filter(b => recIds.includes(b.id));
      setBooks(filtered);
    } else if (genre.toLowerCase() === 'recent') {
      const res = await fetchBooks();
      const sorted = [...res].sort((a, b) => b.id.localeCompare(a.id));
      const recent = sorted.slice(0, 6);
      setBooks(recent);
    } else {
      const res = await fetchBooksByGenre(genre);
      setBooks(res);
    }
  };

  const handleSearch = async query => {
    setSelectedGenre('all');
    if (!query.trim()) {
      try {
        const allBooksData = await fetchBooks();
        setBooks(allBooksData);
        setAllBooks(allBooksData);
      } catch (err) {
        console.error('Failed to load books', err);
      }
      return;
    }
    const res = await searchBooks(query.trim());
    setBooks(res);
  };

  const handleAddToCart = async bookId => {
    const book = books.find(b => b.id === bookId) || recommendedBooksData.find(b => b.id === bookId);
    await addToCart(bookId);
    const updated = await fetchCart();
    setCart(updated);
    if (book) {
      showToast(`"${book.title}" added to borrow queue!`);
    } else {
      showToast("Book added to borrow queue!");
    }
  };

  const handleRemoveFromCart = async bookId => {
    await removeFromCart(bookId);
    const updated = await fetchCart();
    setCart(updated);
  };

  const handleCheckoutConfirm = () => {
    setCart([]);
    showToast("Books borrowed successfully! Issue record created.");
  };

  const handleNavigate = async path => {
    if (path === '/') {
      try {
        const allBooksData = await fetchBooks();
        setBooks(allBooksData);
        setAllBooks(allBooksData);
      } catch (err) {
        console.error('Failed to load books', err);
      }
    }
    navigate(path);
  };

  const handleViewAllRecommended = async () => {
    setSelectedGenre('recommended');
    const res = await fetchBooks();
    const recIds = ['rec1', 'rec2', 'rec3', 'rec4', 'rec5'];
    const filtered = res.filter(b => recIds.includes(b.id));
    setBooks(filtered);
    navigate('/');
  };

  const handleViewAllRecent = async () => {
    setSortBy('newest');
    setSelectedGenre('recent');
    const res = await fetchBooks();
    const sorted = [...res].sort((a, b) => b.id.localeCompare(a.id));
    const recent = sorted.slice(0, 6);
    setBooks(recent);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="empty-view" style={{ minHeight: '100vh', justifyContent: 'center' }}>
        <h3>Loading Library Application...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bh-app-wrapper" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <LoginPage
          onLogin={handleLogin}
          onRegisterUser={handleRegisterUser}
        />
      </div>
    );
  }

  return (
    <div className="bh-app-wrapper">
      {/* Header spanning 100% width */}
      <Header user={user} onSearch={handleSearch} onLogout={handleLogout} />

      {/* Main Content Area containing Sidebar and Views side-by-side */}
      <div className="bh-app-container">
        {/* Sidebar */}
        <Sidebar
          user={user}
          books={allBooks}
          onBookClick={id => navigate(`/book/${id}`)}
          onViewAllRecommended={handleViewAllRecommended}
          onViewAllRecent={handleViewAllRecent}
        />

        {/* Main Content Views */}
        <main className="bh-main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  books={books}
                  genres={genres}
                  user={user}
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onBookClick={id => navigate(`/book/${id}`)}
                  onGenreSelect={handleGenreSelect}
                  selectedGenre={selectedGenre}
                  sortBy={sortBy}
                  onSortSelect={setSortBy}
                />
              }
            />
            <Route
              path="/book/:id"
              element={
                <BookDetailPage
                  books={[...books, ...recommendedBooksData]}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  booksCount={books.length}
                  membersCount={members.length}
                  activeLoans={cart.length}
                  reservationsCount={1}
                />
              }
            />
            <Route
              path="/members"
              element={<MembersPage members={members} />}
            />
            <Route
              path="/transactions"
              element={<TransactionsPage />}
            />
            <Route
              path="/borrowings"
              element={
                <BorrowingsPage
                  cart={cart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onCheckout={handleCheckoutConfirm}
                />
              }
            />
            <Route
              path="/reservations"
              element={<ReservationsPage />}
            />
            <Route
              path="/reports"
              element={<ReportsPage />}
            />
            <Route
              path="/profile"
              element={<ProfilePage user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/admin"
              element={
                user.role === 'ADMIN' ? (
                  <AdminPanel
                    books={books}
                    onCreateBook={handleCreateBook}
                    onUpdateBook={handleUpdateBook}
                    onDeleteBook={handleDeleteBook}
                    onCreateAdmin={handleCreateAdmin}
                  />
                ) : (
                  <HomePage
                    books={books}
                    genres={genres}
                    user={user}
                    cart={cart}
                    onAddToCart={handleAddToCart}
                    onBookClick={id => navigate(`/book/${id}`)}
                    onGenreSelect={handleGenreSelect}
                    selectedGenre={selectedGenre}
                    sortBy={sortBy}
                    onSortSelect={setSortBy}
                  />
                )
              }
            />
          </Routes>
        </main>
      </div>

      {toast && (
        <div className="toast">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', flexShrink: 0 }}>
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default App;

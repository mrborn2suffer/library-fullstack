import React, { useState, useEffect } from 'react';

const SidebarCarousel = () => {
  const images = [
    '/image_carousel/images.jpeg',
    '/image_carousel/images1.jpeg',
    '/image_carousel/images2.jpeg',
    '/image_carousel/images3.jpeg',
    '/image_carousel/images4.jpeg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="sidebar-carousel-widget"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-view-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="carousel-slide">
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button className="carousel-nav-btn prev" onClick={handlePrev} aria-label="Previous image">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button className="carousel-nav-btn next" onClick={handleNext} aria-label="Next image">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};


const Sidebar = ({ user, books = [], onBookClick, onViewAllRecommended, onViewAllRecent }) => {
  const isAdmin = user && user.role === 'ADMIN';

  // Static recommended books matching the reference image
  const recommendedBooks = [
    {
      id: 'rec1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      rating: '4.5',
      count: '2,045',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg'
    },
    {
      id: 'rec2',
      title: 'Deep Work',
      author: 'Cal Newport',
      rating: '4.6',
      count: '1,830',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/4175F348FhL.jpg'
    },
    {
      id: 'rec3',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      rating: '4.4',
      count: '1,730',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51j1-QG-+DL.jpg'
    }
  ];

  // Recently added books from database or default list
  const recentBooks = books.slice(0, 3).map((b, index) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    coverUrl: b.coverImageUrl,
    time: index === 0 ? 'Added today' : `${index + 1} days ago`
  }));

  // Handlers for book clicks
  const handleRecClick = (recId, recTitle) => {
    // If the book matches title or ID in our main book list, navigate to it
    const match = books.find(b => b.id === recId || b.title.toLowerCase().includes(recTitle.toLowerCase()) || recTitle.toLowerCase().includes(b.title.toLowerCase()));
    if (match) {
      onBookClick(match.id);
    } else {
      // Create a dummy click or navigate to a default
      if (books.length > 0) onBookClick(books[0].id);
    }
  };

  return (
    <aside className="bh-sidebar">
      {/* Profile Card */}
      <div className="bh-sidebar-widget sidebar-profile-card">
        <div className="sidebar-avatar">
          {user && user.name ? user.name.charAt(0).toUpperCase() : 'A'}
        </div>
        <div className="sidebar-profile-info">
          <h4>Welcome, {user ? user.name : 'Admin'}</h4>
          <p>{isAdmin ? 'Librarian' : 'Library Member'}</p>
        </div>
      </div>

      {/* Recommended For You */}
      <div className="bh-sidebar-widget">
        <div className="widget-header">
          <h4>Recommended For You</h4>
          <span className="widget-view-all" style={{ cursor: 'pointer' }} onClick={onViewAllRecommended}>View all</span>
        </div>
        <div className="widget-list">
          {recommendedBooks.map(book => (
            <div key={book.id} className="widget-item" onClick={() => handleRecClick(book.id, book.title)}>
              <img src={book.coverUrl} alt={book.title} className="widget-book-cover" onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/40x56?text=B";
              }} />
              <div className="widget-book-info">
                <span className="widget-book-title">{book.title}</span>
                <span className="widget-book-author">{book.author}</span>
                <span className="widget-book-meta">
                  <span style={{ color: 'var(--accent-gold)' }}>★</span>
                  <span className="widget-book-rating">{book.rating}</span>
                  <span className="widget-book-count">({book.count})</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Added */}
      <div className="bh-sidebar-widget">
        <div className="widget-header">
          <h4>Recently Added</h4>
          <span className="widget-view-all" style={{ cursor: 'pointer' }} onClick={onViewAllRecent}>View all</span>
        </div>
        <div className="widget-list">
          {recentBooks.length > 0 ? (
            recentBooks.map(book => (
              <div key={book.id} className="widget-item" onClick={() => onBookClick(book.id)}>
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} className="widget-book-cover" onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }} />
                ) : (
                  <div className="widget-book-placeholder">{book.title[0]}</div>
                )}
                <div className="widget-book-info">
                  <span className="widget-book-title">{book.title}</span>
                  <span className="widget-book-author">{book.author}</span>
                  <span className="widget-book-meta">
                    <span className="widget-book-time">{book.time}</span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No recent books</div>
          )}
        </div>
      </div>

      {/* Infinite Image Carousel */}
      <SidebarCarousel />
    </aside>
  );
};

export default Sidebar;

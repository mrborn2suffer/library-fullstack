import React from 'react';

const DashboardPage = ({ booksCount = 20, membersCount = 2, activeLoans = 3, reservationsCount = 1 }) => {
  return (
    <div className="dashboard-view">
      <div className="books-view-header">
        <div className="books-view-title">
          <h1>Dashboard</h1>
          <p>Real-time analytics and library stats overview</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-title">Total Books</span>
          <span className="dashboard-stat-value">{booksCount}</span>
          <span className="dashboard-stat-desc">✓ Catalog up-to-date</span>
        </div>
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-title">Total Members</span>
          <span className="dashboard-stat-value">{membersCount}</span>
          <span className="dashboard-stat-desc">✓ 2 new this week</span>
        </div>
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-title">Active Borrowings</span>
          <span className="dashboard-stat-value">{activeLoans}</span>
          <span className="dashboard-stat-desc" style={{ color: 'var(--accent-gold)' }}>⚠ 1 item is overdue</span>
        </div>
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-title">Reservations</span>
          <span className="dashboard-stat-value">{reservationsCount}</span>
          <span className="dashboard-stat-desc">✓ Hold queue active</span>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-card">
          <h3>Popular Genres</h3>
          <div className="dashboard-chart-container">
            <div className="chart-bar-row">
              <span className="chart-label">Fiction</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: '85%' }}></div>
              </div>
              <span className="chart-value">85</span>
            </div>
            <div className="chart-bar-row">
              <span className="chart-label">Non-Fiction</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: '60%', background: '#10b981' }}></div>
              </div>
              <span className="chart-value">60</span>
            </div>
            <div className="chart-bar-row">
              <span className="chart-label">Sci-Fi</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: '45%', background: '#3b82f6' }}></div>
              </div>
              <span className="chart-value">45</span>
            </div>
            <div className="chart-bar-row">
              <span className="chart-label">Biography</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: '30%', background: '#f59e0b' }}></div>
              </div>
              <span className="chart-value">30</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Borrowing Ratio</h3>
          <div className="circular-chart-sec">
            <div className="circle-svg-container">
              <svg className="circle-svg" viewBox="0 0 100 100">
                <circle className="circle-bg" cx="50" cy="50" r="40" />
                <circle className="circle-fill" cx="50" cy="50" r="40" style={{ strokeDashoffset: '75.36' }} />
              </svg>
              <div className="circle-text">
                <span className="circle-percent">70%</span>
                <span className="circle-lbl">Borrowed</span>
              </div>
            </div>
            <div className="circular-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: 'var(--primary-color)' }}></span>
                <span>On Loan</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#f3f4f6' }}></span>
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

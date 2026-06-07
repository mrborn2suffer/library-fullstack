import React from 'react';

const ReportsPage = () => {
  return (
    <div className="reports-view">
      <div className="books-view-header">
        <div className="books-view-title">
          <h1>Reports & Analytics</h1>
          <p>Downloadable summaries and system usage analysis</p>
        </div>
        <button className="bh-header-login-btn">
          Export PDF Report
        </button>
      </div>

      <div className="dashboard-sections" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="dashboard-card">
          <h3>Top Borrowed Books (This Month)</h3>
          <div className="dashboard-chart-container" style={{ marginTop: '1.5rem' }}>
            <div className="chart-bar-row">
              <span className="chart-label" style={{ width: '150px' }}>Atomic Habits</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: '90%' }}></div>
              </div>
              <span className="chart-value">124</span>
            </div>
            <div className="chart-bar-row">
              <span className="chart-label" style={{ width: '150px' }}>The Alchemist</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: '75%', background: '#10b981' }}></div>
              </div>
              <span className="chart-value">98</span>
            </div>
            <div className="chart-bar-row">
              <span className="chart-label" style={{ width: '150px' }}>Deep Work</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: '65%', background: '#3b82f6' }}></div>
              </div>
              <span className="chart-value">86</span>
            </div>
            <div className="chart-bar-row">
              <span className="chart-label" style={{ width: '150px' }}>Sapiens</span>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ width: '50%', background: '#f59e0b' }}></div>
              </div>
              <span className="chart-value">62</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Active Members Activity Ratio</h3>
          <div className="circular-chart-sec">
            <div className="circle-svg-container">
              <svg className="circle-svg" viewBox="0 0 100 100">
                <circle className="circle-bg" cx="50" cy="50" r="40" />
                <circle className="circle-fill" cx="50" cy="50" r="40" style={{ strokeDashoffset: '120.6', stroke: '#10b981' }} />
              </svg>
              <div className="circle-text">
                <span className="circle-percent">52%</span>
                <span className="circle-lbl">Active Readers</span>
              </div>
            </div>
            <div className="circular-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#10b981' }}></span>
                <span>Active (1+ Book)</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#f3f4f6' }}></span>
                <span>Inactive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;

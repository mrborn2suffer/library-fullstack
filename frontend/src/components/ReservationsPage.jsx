import React from 'react';

const ReservationsPage = ({ reservations = [] }) => {
  const displayReservations = reservations.length > 0 ? reservations : [
    { id: '1', bookTitle: 'Sapiens', author: 'Yuval Noah Harari', date: '2026-06-06', queuePosition: 1, status: 'Active Hold' }
  ];

  return (
    <div className="reservations-view">
      <div className="books-view-header">
        <div className="books-view-title">
          <h1>Reservations</h1>
          <p>Manage holds and reservations on popular books</p>
        </div>
      </div>

      <div className="table-container">
        {displayReservations.length > 0 ? (
          <table className="bh-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>Reservation Date</th>
                <th>Queue Position</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayReservations.map((res) => (
                <tr key={res.id}>
                  <td style={{ fontWeight: 600 }}>{res.bookTitle}</td>
                  <td>{res.author}</td>
                  <td>{res.date}</td>
                  <td style={{ fontWeight: 600 }}>#{res.queuePosition}</td>
                  <td>
                    <span className="status-indicator">
                      <span className="status-dot green"></span>
                      {res.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn-sm delete">Cancel Hold</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-view">
            <h3>No Holds Placed</h3>
            <p>You can reserve books when they are currently checked out by other members.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;

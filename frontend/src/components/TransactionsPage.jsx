import React from 'react';

const TransactionsPage = () => {
  const transactions = [
    { id: 'TX001', bookTitle: 'Atomic Habits', memberName: 'Arjun Sharma', date: '2026-06-06', type: 'CHECKOUT', status: 'Active' },
    { id: 'TX002', bookTitle: 'The Alchemist', memberName: 'Priya Patel', date: '2026-06-05', type: 'CHECKOUT', status: 'Active' },
    { id: 'TX003', bookTitle: 'Deep Work', memberName: 'Arjun Sharma', date: '2026-06-02', type: 'RETURN', status: 'Completed' },
    { id: 'TX004', bookTitle: 'Sapiens', memberName: 'Priya Patel', date: '2026-05-28', type: 'CHECKOUT', status: 'Overdue' }
  ];

  return (
    <div className="transactions-view">
      <div className="books-view-header">
        <div className="books-view-title">
          <h1>Transactions</h1>
          <p>History of checkouts, returns, and library operations</p>
        </div>
      </div>

      <div className="table-container">
        <table className="bh-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Title</th>
              <th>Member Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const isCheckout = tx.type === 'CHECKOUT';
              const isOverdue = tx.status === 'Overdue';
              const isCompleted = tx.status === 'Completed';
              return (
                <tr key={tx.id}>
                  <td style={{ fontWeight: 600 }}>{tx.id}</td>
                  <td style={{ fontWeight: 500 }}>{tx.bookTitle}</td>
                  <td>{tx.memberName}</td>
                  <td>{tx.date}</td>
                  <td>
                    <span style={{ 
                      fontWeight: 600, 
                      color: isCheckout ? 'var(--primary-color)' : 'var(--text-muted)' 
                    }}>
                      {tx.type}
                    </span>
                  </td>
                  <td>
                    <span className="status-indicator">
                      <span className={`status-dot ${isCompleted ? 'green' : (isOverdue ? 'red' : 'orange')}`}></span>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;

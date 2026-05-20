import React from 'react';

const MembersPage = ({ members = [] }) => {
  // If no members are loaded, provide a nice fallback list
  const displayMembers = members.length > 0 ? members : [
    { id: '1', name: 'Arjun Sharma', email: 'user1@library.com', mobile: '9876543210', roles: ['USER'] },
    { id: '2', name: 'Admin Librarian', email: 'admin1@library.com', mobile: '9988776655', roles: ['ADMIN'] },
    { id: '3', name: 'Priya Patel', email: 'priya@library.com', mobile: '9123456789', roles: ['USER'] }
  ];

  return (
    <div className="members-view">
      <div className="books-view-header">
        <div className="books-view-title">
          <h1>Members</h1>
          <p>Manage and view library member directories</p>
        </div>
      </div>

      <div className="table-container">
        <table className="bh-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayMembers.map((member) => {
              const isAdmin = member.roles && (member.roles.includes('ADMIN') || member.roles.includes('Role.ADMIN') || member.role === 'ADMIN');
              return (
                <tr key={member.id}>
                  <td style={{ fontWeight: 600 }}>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.mobile || 'N/A'}</td>
                  <td>
                    <span className={`member-badge ${isAdmin ? 'admin' : 'user'}`}>
                      {isAdmin ? 'Librarian' : 'Member'}
                    </span>
                  </td>
                  <td>
                    <span className="status-indicator">
                      <span className={`status-dot ${isAdmin ? 'green' : 'orange'}`}></span>
                      {isAdmin ? 'Active' : 'Offline'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn-sm">View details</button>
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

export default MembersPage;

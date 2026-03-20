import React from 'react';

const ProfilePage = ({ user }) => {
  return (
    <section className="mono-profile">
      <div className="mono-card">
        <h1 className="mono-section-title">Profile</h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.mobile && (
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>
        )}
        {user.about && (
          <p>
            <strong>About:</strong> {user.about}
          </p>
        )}
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </section>
  );
};

export default ProfilePage;


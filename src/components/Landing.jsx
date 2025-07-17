// Home.jsx
import React, { useState } from 'react';
import AuthModal from './Auth/AuthModal';
import { Container, Button } from 'react-bootstrap';

export default function Home({ showAuthModal = false, defaultMode = 'login' }) {
  const [showModal, setShowModal] = useState(showAuthModal);
  const [authMode, setAuthMode] = useState(defaultMode);

  return (
    <div className="home-page">
      <Container className="text-center mt-5">
        <h1>Welcome to Travel Companion 🌍</h1>
        <p className="lead">Plan, document, and revisit your adventures with ease.</p>
        <Button variant="primary" className="me-2" onClick={() => { setAuthMode('login'); setShowModal(true); }}>
          Sign In
        </Button>
        <Button variant="secondary" onClick={() => { setAuthMode('register'); setShowModal(true); }}>
          Sign Up
        </Button>
      </Container>
      <AuthModal show={showModal} onHide={() => setShowModal(false)} mode={authMode} />
    </div>
  );
}

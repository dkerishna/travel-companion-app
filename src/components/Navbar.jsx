import React, { useState } from 'react';
import {
  Navbar as BootstrapNavbar,
  Nav,
  Button,
  Container,
} from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FaPlane,
  FaSignOutAlt,
  FaPlus,
  FaTachometerAlt,
} from 'react-icons/fa';
import AuthModal from './Auth/AuthModal';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleShowAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <BootstrapNavbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="shadow-sm"
      >
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
            <FaPlane className="me-2" />
            Travel Companion
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {currentUser ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">
                    <FaTachometerAlt className="me-1" />
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/trips/new">
                    <FaPlus className="me-1" />
                    New Trip
                  </Nav.Link>
                  <Nav.Item className="d-flex align-items-center mx-2">
                    <span className="text-light me-3">
                      Welcome, {currentUser.displayName || currentUser.email}!
                    </span>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-1" />
                      Logout
                    </Button>
                  </Nav.Item>
                </>
              ) : (
                <>
                  {/* Open AuthModal instead of redirecting */}
                  <Nav.Link onClick={() => handleShowAuth('login')}>
                    Sign In
                  </Nav.Link>
                  <Nav.Link onClick={() => handleShowAuth('register')}>
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      {/* Auth Modal */}
      <AuthModal
        show={showAuthModal}
        handleClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default Navbar;

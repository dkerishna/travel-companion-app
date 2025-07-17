import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, onHide, mode, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        // Validation for signup
        if (!name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        
        await signup(email, password, name);
      } else {
        // Login
        await login(email, password);
      }
      
      // Success - close modal and redirect
      handleClose();
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email is already registered. Try logging in instead.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    resetForm();
    onSwitchMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={mode === 'signup'}
                disabled={loading}
              />
            </Form.Group>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
            {mode === 'signup' && (
              <Form.Text className="text-muted">
                Password must be at least 6 characters long.
              </Form.Text>
            )}
          </Form.Group>
          
          {mode === 'signup' && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
          )}
          
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                  />
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      
      <Modal.Footer className="justify-content-center">
        <div className="text-center">
          {mode === 'login' ? (
            <p className="mb-0">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 text-decoration-none"
                onClick={switchMode}
                disabled={loading}
              >
                Sign up here
              </Button>
            </p>
          ) : (
            <p className="mb-0">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 text-decoration-none"
                onClick={switchMode}
                disabled={loading}
              >
                Sign in here
              </Button>
            </p>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
// components/Auth/LoginPage.jsx
import React from 'react';
import Home from '../Home';

export default function LoginPage() {
  return <Home showAuthModal={true} defaultMode="login" />;
}

// components/Auth/RegisterPage.jsx
import React from 'react';
import Home from '../Home';

export default function RegisterPage() {
  return <Home showAuthModal={true} defaultMode="register" />;
}

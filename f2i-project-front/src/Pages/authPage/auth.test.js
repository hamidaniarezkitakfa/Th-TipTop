
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignupLogin from './auth';

test('updates email and password on change', () => {
  render(<SignupLogin />);
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Mot de passe');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('Password123!');
});
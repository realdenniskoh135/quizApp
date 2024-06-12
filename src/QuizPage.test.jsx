import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from './pages/Quiz';

test('renders the quiz title', () => {
  render(<Quiz />);
  expect(screen.getByText(/Quiz/i)).toBeInTheDocument();
});

test('allows selecting and deselecting an option', () => {
  render(<Quiz />);
  const firstOption = screen.getByText('No experience');
  fireEvent.click(firstOption);
  expect(firstOption).toHaveClass('bg-blue-200');
  fireEvent.click(firstOption);
  expect(firstOption).not.toHaveClass('bg-blue-200');
});

test('submits the quiz and shows submission message', () => {
  render(<Quiz />);
  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);
  expect(screen.getByText(/Quiz submitted successfully!/i)).toBeInTheDocument();
});

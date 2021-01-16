import { render, screen } from '@testing-library/react';
import App from './App';

test('renders last operation', () => {
  render(<App />);
  const text = screen.getByText(/Last operation was/i);
  expect(text).toBeInTheDocument();
});

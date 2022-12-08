import { render, screen } from '@testing-library/react';
import App from './App';

test('header renders with books ecommerce in the document ', () => {
  render(<App />);
  const linkElement = screen.getByText(/sale products/i);
  expect(linkElement).toBeInTheDocument();
});

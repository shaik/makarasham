/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  test('renders Makarasham Weather History heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Makarasham Weather History/i);
    expect(headingElement).toBeInTheDocument();
  });
});

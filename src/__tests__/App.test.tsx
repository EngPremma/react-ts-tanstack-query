import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from 'src/App';

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('A truthy statement', () => {
  it('should be equal to 2', () => {
    expect(1 + 1).toEqual(2);
  });

  it('Should render App', () => {
    render(<MockApp />);
    const bodyElement = screen.getByRole('navigation');
    expect(bodyElement).toBeVisible();
  });
});

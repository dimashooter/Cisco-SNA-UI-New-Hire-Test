import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from 'react-query';

import { describe, it } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { HomePage } from '..';
import { handlers } from '../../mocks/handlers';

const queryClient = new QueryClient();

// Mock API
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<Home/>', () => {
  it('data fetched', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    await waitFor(() => expect(queryClient.getQueryData(['users'])).toBeDefined());

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('Button click should navigate to the correct route', async () => {
    const element = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => expect(queryClient.getQueryData(['users'])).toBeDefined());

    expect(window.location.pathname).toBe('/');
    const button = screen.getByTestId('button');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(element.container.innerHTML).toMatch('/add_employee');
  });
});

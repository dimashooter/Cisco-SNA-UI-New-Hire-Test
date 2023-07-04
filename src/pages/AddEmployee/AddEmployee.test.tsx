import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AddEmployee } from '..';

const queryClient = new QueryClient();

describe('<Add employee />', () => {
  test('App mounts properly', () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AddEmployee />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(window.location.pathname).toBe('/');
  });
});

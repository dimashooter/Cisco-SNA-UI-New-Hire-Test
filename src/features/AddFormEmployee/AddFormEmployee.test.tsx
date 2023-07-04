import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AddFormEmployee } from '..';

const queryClient = new QueryClient();

describe('<AddFormEmployee/>', () => {
  it('testing input elements', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AddFormEmployee />
        </QueryClientProvider>
      </MemoryRouter>,
    );
    const inputName = screen.getByTestId('name') as HTMLInputElement;
    const inputTenure = screen.getByTestId('tenure') as HTMLInputElement;
    const inputMale = screen.getByTestId('Male') as HTMLInputElement;
    const submit = screen.getByTestId('submit');

    expect(submit).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputTenure).toBeInTheDocument();
    expect(inputMale).toBeInTheDocument();

    act(() => {
      fireEvent.change(inputName, { target: { value: 'Hello, World!' } });
      fireEvent.change(inputTenure, { target: { value: '2' } });
      fireEvent.click(inputMale);
      fireEvent.click(submit);
    });
    expect(inputName.value).toBe('Hello, World!');
    expect(inputTenure.value).toBe('2');
    expect(inputMale.checked).toBe(true);
  });
});

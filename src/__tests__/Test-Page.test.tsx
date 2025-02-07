import { describe, expect, test, vi, afterEach } from 'vitest';
import axios from 'axios';
import { screen, render, fireEvent } from '@testing-library/react';

// import { userApi } from 'src/api';
import TestPage from 'src/pages/test-page';

describe('Test Page', () => {
  afterEach(() => {
    // Restore all mocks after each test
    vi.restoreAllMocks();
  });

  test('Should display users list', async () => {
    // create mock api before rendering component
    const usersMock = [
      { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
    ];
    vi.spyOn(axios, 'get').mockResolvedValue({ data: usersMock });

    render(<TestPage />);

    // const users = await userApi.users();
    // console.log('users :>> ', users);
    // expect(users).toHaveLength(1);

    const userCards = await screen.findAllByTestId('user-card');

    expect(userCards[0]?.textContent).toBe('Leanne Graham');
  });
});

describe('Test Page Input', () => {
  test('Input text', () => {
    render(<TestPage />);

    const inputElement = screen.getByPlaceholderText('type something');

    fireEvent.change(inputElement, { target: { value: 'Premma' } });

    expect(inputElement).toHaveValue('Premma');
  });

  test('Should clear input after click add', () => {
    render(<TestPage />);

    const inputElement = screen.getByPlaceholderText('type something');

    fireEvent.change(inputElement, { target: { value: 'Premma' } });

    const addButton = screen.getByText('set text');

    fireEvent.click(addButton);

    expect(inputElement).toHaveValue('');
  });
});

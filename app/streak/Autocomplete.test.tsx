import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Autocomplete } from './Autocomplete';

describe('Autocomplete Component', () => {
  const mockOptions = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
  ];

  const mockOnFilterOptionSelect = vi.fn();

  const defaultProps = {
    input: '',
    onFilterOptionSelect: mockOnFilterOptionSelect,
    options: mockOptions,
    searchKey: 'name',
  };

  it('should display "Loading..." when options are being fetched', async () => {
    const asyncOptions = new Promise((resolve) => {
      setTimeout(() => resolve(mockOptions), 1000);
    });

    render(<Autocomplete {...defaultProps} options={asyncOptions} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render filtered options based on input', async () => {
    act(() => {
      render(<Autocomplete {...defaultProps} input="App" />);
    });

    expect(await screen.findByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  it.todo('should render fuzzy matches as a user types', async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete
        {...defaultProps}
        options={[...mockOptions, { id: 4, name: 'Savana' }]}
      />,
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Savana')).toBeInTheDocument();
    expect(screen.queryByText('Cherry')).toBeInTheDocument();

    await user.type(screen.getByRole('input'), 'ana');
    expect(screen.getByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Savana')).toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });
  it.todo(
    'should call onFilterOptionSelect when an option is clicked',
    async () => {
      render(<Autocomplete {...defaultProps} input="Ban" />);

      const option = screen.getByText('Banana');
      fireEvent.click(option);

      expect(mockOnFilterOptionSelect).toHaveBeenCalledTimes(1);
    },
  );

  it.todo('should handle keyboard events on options', async () => {
    render(<Autocomplete {...defaultProps} input="Cher" />);

    const option = screen.getByText('Cherry');
    expect(screen.queryByText('Cherry')).toBeInTheDocument();
    fireEvent.keyDown(option, { key: 'Enter', code: 'Enter' });
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  it.todo(
    'should NOT select an option for key events other than ENTER',
    async () => {
      render(<Autocomplete {...defaultProps} input="Cher" />);

      const option = screen.getByText('Cherry');
      expect(option).toBeInTheDocument();
      fireEvent.keyDown(option, { key: 'Space', code: 'Space' });
      expect(option).toBeInTheDocument();
      fireEvent.keyDown(option, { key: 'Shift', code: 'Shift' });
      expect(option).toBeInTheDocument();
      fireEvent.keyDown(option, { key: 'Tab', code: 'Tab' });
      expect(screen.queryByText('Cherry')).toBeInTheDocument();
    },
  );

  it.todo('should allow focus on options via keyboard', async () => {
    render(<Autocomplete {...defaultProps} input={undefined} />);

    const option = screen.getByLabelText('Autocomplete option');
    expect(option).not.toHaveFocus();
    fireEvent.keyDown(option, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(option).toHaveFocus();
    fireEvent.keyDown(option, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(option).not.toHaveFocus();
  });

  it.todo('should not render options that do not match the input', async () => {
    render(<Autocomplete {...defaultProps} input="Berry" />);

    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });
});

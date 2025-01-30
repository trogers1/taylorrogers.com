import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ObjOptionSelector } from './ObjOptionSelector';
import type { KeyboardEvent, MouseEvent } from 'react';

describe('ObjOptionSelector Component', () => {
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
    const asyncOptions: Promise<typeof mockOptions> = new Promise((resolve) => {
      setTimeout(() => resolve(mockOptions), 1000);
    });

    render(<ObjOptionSelector {...defaultProps} options={asyncOptions} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render filtered options based on input', async () => {
    act(() => {
      render(<ObjOptionSelector {...defaultProps} input="App" />);
    });

    expect(await screen.findByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  it('should render fuzzy matches to input', async () => {
    act(() => {
      render(
        <ObjOptionSelector
          {...defaultProps}
          options={[...mockOptions, { id: 4, name: 'Savana' }]}
          input="ana"
        />,
      );
    });

    await waitFor(() =>
      expect(screen.queryByText('Apple')).not.toBeInTheDocument(),
    );
    expect(screen.queryByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Savana')).toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });
  it('should call onFilterOptionSelect when an option is clicked', async () => {
    const user = userEvent.setup();
    let selection: any = null;
    render(
      <ObjOptionSelector
        {...defaultProps}
        input="Ban"
        onFilterOptionSelect={(args) => {
          selection = args.currentTarget.textContent;
        }}
      />,
    );

    const option = await screen.findByText('Banana');
    await user.click(option);

    expect(selection).toStrictEqual('Banana');
  });

  it('should handle keyboard events on options', async () => {
    const user = userEvent.setup();
    let selection: any = null;
    render(
      <ObjOptionSelector
        {...defaultProps}
        input="Ban"
        onFilterOptionSelect={(args) => {
          selection = args.currentTarget.textContent;
        }}
      />,
    );

    const option = await screen.findByText('Banana');
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
    await user.keyboard('{ArrowDown}{Enter}');

    expect(selection).toStrictEqual('Banana');
    expect(screen.queryByText('Cherry')).toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  it.todo(
    'should NOT select an option for key events other than ENTER',
    async () => {
      render(<ObjOptionSelector {...defaultProps} input="Cher" />);

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
    render(<ObjOptionSelector {...defaultProps} input={undefined} />);

    const option = screen.getByLabelText('Autocomplete option');
    expect(option).not.toHaveFocus();
    fireEvent.keyDown(option, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(option).toHaveFocus();
    fireEvent.keyDown(option, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(option).not.toHaveFocus();
  });

  it.todo('should not render options that do not match the input', async () => {
    render(<ObjOptionSelector {...defaultProps} input="Berry" />);

    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });
});

import {
  render,
  screen,
  act,
  waitFor,
  findByLabelText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  FilterBuilderInput,
  type FilterBuilderArgs,
  type FilterState,
  type FilterUpdateFunction,
} from './FilterBuilderInput';
import { filterDefinitions, getClientEmails } from './utils';
import { useState, type FC } from 'react';

describe('FilterBuilderInput Component', () => {
  const defaultProps: FilterBuilderArgs = {
    filterState: [] as FilterState,
    onFilterUpdate: () => Promise.resolve(),
    filterDefinitions,
  };

  it.todo(
    'should display "Loading..." when options are being fetched',
    async () => {
      // TODO: this
    },
  );
  it(
    'should allow for creation and deletion of a full filter with a plain text value with just the keyboard',
    async () => {
      const StatefulFilterBuilder: FC = () => {
        const [filterState, setFilterState] = useState<FilterState>([]);
        const onFilterUpdate: FilterUpdateFunction = async ({
          newFilterState,
        }) => {
          setFilterState(newFilterState);
        };
        return (
          <FilterBuilderInput
            {...defaultProps}
            filterState={filterState}
            onFilterUpdate={onFilterUpdate}
          />
        );
      };
      const user = userEvent.setup();
      act(() => {
        render(<StatefulFilterBuilder />);
      });

      // Select email option
      await user.type(screen.getByRole('textbox'), 'emai');
      await waitFor(() =>
        expect(screen.queryByLabelText('Option: email')).toBeInTheDocument(),
      );
      await user.type(screen.getByRole('textbox'), '{ArrowDown}{Enter}');
      expect(
        await screen.findByLabelText('In progress Filter: email'),
      ).toBeInTheDocument();

      // select 'includes' operator
      await user.type(screen.getByRole('textbox'), 'inc');
      await waitFor(() =>
        expect(screen.queryByLabelText('Option: includes')).toBeInTheDocument(),
      );
      await user.type(screen.getByRole('textbox'), '{ArrowDown}{Enter}');
      expect(
        await screen.findByLabelText('In progress Filter: email includes'),
      ).toBeInTheDocument();

      // Select using plan text despite the options
      await user.type(screen.getByRole('textbox'), 'example.com');
      expect(screen.queryAllByRole('listitem')).toHaveLength(
        (await getClientEmails()).length,
      );
      await user.type(screen.getByRole('textbox'), '{Enter}');
      expect(
        await screen.findByRole('button', {
          name: 'Applied Filter: email includes example.com',
        }),
      ).toBeInTheDocument();

      // Backspace should highlight last pill and not delete
      await user.type(screen.getByRole('textbox'), '{Backspace}');
      expect(
        await screen.findByRole('button', {
          name: 'Applied Filter: email includes example.com',
        }),
      ).toHaveFocus();

      // When pill is focused, Backspace will delete it
      await user.type(
        screen.getByRole('button', {
          name: 'Applied Filter: email includes example.com',
        }),
        '{Backspace}',
      );
      expect(
        screen.queryByRole('button', {
          name: 'Applied Filter: email includes example.com',
        }),
      ).not.toBeInTheDocument();
    },
    { timeout: 2000 },
  );
  it.todo(
    'should allow for creation and deletion of a full filter with a date value with just the keyboard',
    async () => {
      const StatefulFilterBuilder: FC = () => {
        const [filterState, setFilterState] = useState<FilterState>([]);
        const onFilterUpdate: FilterUpdateFunction = async ({
          newFilterState,
        }) => {
          setFilterState(newFilterState);
        };
        return (
          <FilterBuilderInput
            {...defaultProps}
            filterState={filterState}
            onFilterUpdate={onFilterUpdate}
          />
        );
      };
      const user = userEvent.setup();
      act(() => {
        render(<StatefulFilterBuilder />);
      });

      // Select email option
      await user.type(screen.getByRole('textbox'), 'emai');
      await waitFor(() =>
        expect(screen.queryByLabelText('Option: email')).toBeInTheDocument(),
      );
      await user.type(screen.getByRole('textbox'), '{ArrowDown}{Enter}');
      expect(
        await screen.findByLabelText('In progress Filter: email'),
      ).toBeInTheDocument();

      // select 'includes' operator
      await user.type(screen.getByRole('textbox'), 'inc');
      await waitFor(() =>
        expect(screen.queryByLabelText('Option: includes')).toBeInTheDocument(),
      );
      await user.type(screen.getByRole('textbox'), '{ArrowDown}{Enter}');
      expect(
        await screen.findByLabelText('In progress Filter: email includes'),
      ).toBeInTheDocument();

      // Select use date picker
      // TODO:
      await user.type(
        screen.getByRole('textbox'),
        '{ArrowRight}{ArrowRight}{Space}',
      );
      expect(screen.queryAllByRole('listitem')).toHaveLength(
        (await getClientEmails()).length,
      );
      await user.type(screen.getByRole('textbox'), '{Enter}');
      expect(
        await screen.findByRole('button', {
          name: 'Applied Filter: email includes example.com',
        }),
      ).toBeInTheDocument();

      // Backspace should highlight last pill and not delete
      await user.type(screen.getByRole('textbox'), '{Backspace}');
      expect(
        await screen.findByRole('button', {
          name: 'Applied Filter: email includes example.com',
        }),
      ).toHaveFocus();

      // When pill is focused, Backspace will delete it
      await user.type(
        screen.getByRole('button', {
          name: 'Applied Filter: email includes example.com',
        }),
        '{Backspace}',
      );
      expect(
        screen.queryByRole('button', {
          name: 'Applied Filter: email includes example.com',
        }),
      ).not.toBeInTheDocument();
    },
    { timeout: 2000 },
  );
  it.todo(
    'should allow for creation of a full filter with a number value type with just the keyboard',
    async () => {
      const user = userEvent.setup();
      act(() => {
        render(<FilterBuilderInput {...defaultProps} />);
      });

      await user.type(screen.getByRole('textbox'), 'st');
      await waitFor(() =>
        expect(screen.queryByText('status')).toBeInTheDocument(),
      );
      expect(screen.queryByText('lastLogin')).toBeInTheDocument();
      expect(screen.queryByText('sentAt')).toBeInTheDocument();
      expect(screen.queryByText('totalSpent')).toBeInTheDocument();
      expect(await screen.findAllByRole('listitem')).toHaveLength(4);

      // select a sentAt
    },
  );
  it.todo(
    'should allow for creation of a full filter via clicking options',
    async () => {
      const user = userEvent.setup();
      act(() => {
        render(<FilterBuilderInput {...defaultProps} />);
      });

      await user.type(screen.getByRole('textbox'), 'st');
      await waitFor(() =>
        expect(screen.queryByText('status')).toBeInTheDocument(),
      );
      expect(screen.queryByText('lastLogin')).toBeInTheDocument();
      expect(screen.queryByText('sentAt')).toBeInTheDocument();
      expect(screen.queryByText('totalSpent')).toBeInTheDocument();
      expect(await screen.findAllByRole('listitem')).toHaveLength(4);

      // If you clear the input, all options should show
      await user.type(screen.getByRole('textbox'), '{Backspace}{Backspace}');
      await waitFor(() =>
        expect(screen.queryAllByRole('listitem')).toHaveLength(
          filterDefinitions.length,
        ),
      );
    },
  );
  it('should render fuzzy matches of filterKeys as a user types', async () => {
    const user = userEvent.setup();
    act(() => {
      render(<FilterBuilderInput {...defaultProps} />);
    });

    await user.type(screen.getByRole('textbox'), 'st');
    await waitFor(() =>
      expect(screen.queryByText('status')).toBeInTheDocument(),
    );
    expect(screen.queryByText('lastLogin')).toBeInTheDocument();
    expect(screen.queryByText('sentAt')).toBeInTheDocument();
    expect(screen.queryByText('totalSpent')).toBeInTheDocument();
    expect(await screen.findAllByRole('listitem')).toHaveLength(4);

    // If you clear the input, all options should show
    await user.type(screen.getByRole('textbox'), '{Backspace}{Backspace}');
    await waitFor(() =>
      expect(screen.queryAllByRole('listitem')).toHaveLength(
        filterDefinitions.length,
      ),
    );
  });
});

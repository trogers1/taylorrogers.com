import type { KeyboardEvent, UIEvent } from 'react';
import {
  booleanRelationalOperators,
  inverseBooleanRelationalOperators,
  inverseNumberRelationalOperators,
  inverseStringRelationalOperators,
  numberRelationalOperators,
  stringRelationalOperators,
} from './operators';

export const isKeyboardEvent = (
  event: UIEvent,
): event is KeyboardEvent<HTMLElement> => event.type === 'keydown';

// TODO: Convert to an action with loader
export const getClientEmails: () => Promise<Record<string, any>[]> = () =>
  new Promise((resolve) =>
    resolve([
      { email: 'timmy@example.com' },
      { email: 'joe@example.com' },
      { email: 'vira@example.com' },
      { email: 'jane@example.com' },
    ]),
  );

export const filterDefinitions = [
  {
    filterKey: 'email',
    shouldAllowCustomText: true,
    validRelationalOperators: [
      ...stringRelationalOperators,
      ...inverseStringRelationalOperators,
    ],
    getOptions: getClientEmails,
    optionKey: 'email',
  },
  {
    filterKey: 'Number of emails',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...numberRelationalOperators,
      ...inverseNumberRelationalOperators,
    ],
    optionKey: 'number',
  },
  {
    filterKey: 'sentAt',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...numberRelationalOperators,
      ...inverseNumberRelationalOperators,
    ],
    optionKey: 'date',
  },
  {
    filterKey: 'status',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...stringRelationalOperators,
      ...inverseStringRelationalOperators,
    ],
    options: [
      { status: 'Active' },
      { status: 'Inactive' },
      { status: 'Pending' },
    ],
    optionKey: 'status',
  },
  {
    filterKey: 'age',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...numberRelationalOperators,
      ...inverseNumberRelationalOperators,
    ],
    optionKey: 'number',
  },
  {
    filterKey: 'isSubscribed',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...booleanRelationalOperators,
      ...inverseBooleanRelationalOperators,
    ],
    optionKey: 'checkbox',
  },
  {
    filterKey: 'totalSpent',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...numberRelationalOperators,
      ...inverseNumberRelationalOperators,
    ],
    optionKey: 'currency',
  },
  {
    filterKey: 'lastLogin',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...numberRelationalOperators,
      ...inverseNumberRelationalOperators,
    ],
    optionKey: 'date',
  },
  {
    filterKey: 'productCategory',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...stringRelationalOperators,
      ...inverseStringRelationalOperators,
    ],
    getOptions: () =>
      Promise.resolve([
        { category: 'Electronics' },
        { category: 'Clothing' },
        { category: 'Books' },
        { category: 'Home & Kitchen' },
      ]),
    optionKey: 'category',
  },
  {
    filterKey: 'rating',
    shouldAllowCustomText: false,
    validRelationalOperators: [
      ...numberRelationalOperators,
      ...inverseNumberRelationalOperators,
    ],
    optionKey: 'number',
  },
] as const;

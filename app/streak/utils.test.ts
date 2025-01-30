import { describe, it, expect } from 'vitest';
import { isKeyboardEvent } from './utils';
import type { KeyboardEvent, MouseEvent } from 'react';

describe('isKeyboardEvent', () => {
  it('should return true for a KeyboardEvent', () => {
    const keyboardEvent = new KeyboardEvent(
      'keydown',
    ) as unknown as KeyboardEvent;
    expect(isKeyboardEvent(keyboardEvent)).toBe(true);
  });

  it('should return false for a non-KeyboardEvent', () => {
    const mouseEvent = new MouseEvent('click') as unknown as MouseEvent;
    expect(isKeyboardEvent(mouseEvent)).toBe(false);
  });
});

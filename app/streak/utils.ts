import type { KeyboardEvent, UIEvent } from 'react';

export const isKeyboardEvent = (
  event: UIEvent,
): event is KeyboardEvent<HTMLElement> => event.type === 'keydown';

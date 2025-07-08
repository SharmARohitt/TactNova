import { useEffect } from 'react';

interface UseKeyboardShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
  enabled?: boolean;
}

export const useKeyboardShortcut = (
  callback: () => void,
  options: UseKeyboardShortcutOptions
) => {
  const {
    key,
    ctrlKey = false,
    shiftKey = false,
    altKey = false,
    metaKey = false,
    preventDefault = true,
    enabled = true,
  } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey &&
        event.metaKey === metaKey
      ) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [key, ctrlKey, shiftKey, altKey, metaKey, preventDefault, enabled, callback]);
};

export const useEscapeKey = (callback: () => void, enabled = true) => {
  useKeyboardShortcut(callback, { key: 'Escape', enabled });
};

export const useEnterKey = (callback: () => void, enabled = true) => {
  useKeyboardShortcut(callback, { key: 'Enter', enabled });
};

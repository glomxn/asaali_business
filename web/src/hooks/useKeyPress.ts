import { useEffect } from 'react';

export function useKeyPress(keys: string[], onPress: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) onPress();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [keys, onPress, enabled]);
}

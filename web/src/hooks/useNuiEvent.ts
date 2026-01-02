import { useEffect } from 'react';
import type { NuiMessage } from '../types';

/**
 * Écoute un event NUI (window.postMessage / SendNUIMessage).
 * Robuste: ignore les messages malformés (sans action ou sans data quand nécessaire).
 */
export function useNuiEvent<TAction extends NuiMessage['action']>(
  action: TAction,
  handler: (data: Extract<NuiMessage, { action: TAction }> extends { data: infer D } ? D : undefined) => void
) {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const msg = event.data as NuiMessage | undefined;
      if (!msg || (msg as any).action !== action) return;

      // ui:close n'a pas de data — on autorise undefined
      if ((msg as any).data === undefined) {
        // @ts-expect-error allow undefined for events without data
        handler(undefined);
        return;
      }

      // @ts-expect-error generic extraction
      handler((msg as any).data);
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [action, handler]);
}

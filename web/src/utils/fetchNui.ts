export async function fetchNui<T = any>(
  eventName: string,
  data?: any,
  mockData?: T
): Promise<T> {
  const resourceName =
    (window as any).GetParentResourceName?.() ?? 'nui-resource';

  // Dev browser mode
  if (!resourceName || resourceName === 'nui-resource') {
    return new Promise((resolve) =>
      setTimeout(() => resolve((mockData ?? ({} as T)) as T), 200)
    );
  }

  const resp = await fetch(`https://${resourceName}/${eventName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data ?? {}),
  });

  try {
    return (await resp.json()) as T;
  } catch {
    return {} as T;
  }
}

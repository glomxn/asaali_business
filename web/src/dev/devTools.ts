import type { UiOpenPayload, Business, BusinessRequest } from '../types';
import { mockBusinesses, mockMyRequests, mockMyBusinesses, mockStaffRequests } from './mockData';

export function isDevMode() {
  return import.meta.env.DEV || import.meta.env.VITE_DEV_MODE === 'true';
}

export function devOpen(payload?: Partial<UiOpenPayload>) {
  const data: UiOpenPayload = {
    isStaff: false,
    playerName: 'Miriam',
    businesses: mockBusinesses,
    myRequests: mockMyRequests,
    myBusinesses: mockMyBusinesses,
    staffRequests: mockStaffRequests,
    ...payload,
  };

  window.postMessage({ action: 'ui:open', data }, '*');
}

export function devClose() {
  window.postMessage({ action: 'ui:close' }, '*');
}

export function devUpdateBusinesses(businesses: Business[]) {
  window.postMessage({ action: 'ui:updateBusinesses', data: { businesses } }, '*');
}

export function devUpdateMyRequests(myRequests: BusinessRequest[]) {
  window.postMessage({ action: 'ui:updateMyRequests', data: { myRequests } }, '*');
}

export function devUpdateMyBusinesses(myBusinesses: Business[]) {
  window.postMessage({ action: 'ui:updateMyBusinesses', data: { myBusinesses } }, '*');
}

export function devUpdateStaffRequests(staffRequests: BusinessRequest[]) {
  window.postMessage({ action: 'ui:updateStaffRequests', data: { staffRequests } }, '*');
}

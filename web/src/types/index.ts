export type BusinessType =
  | 'bar'
  | 'restaurant'
  | 'station'
  | 'concession'
  | 'club'
  | 'garage'
  | 'autre';

export interface Business {
  id: string;
  label: string;
  type: BusinessType;
  address: string;
  price: number;
  revenue: number;
  upkeep: number;
  owner?: string | null;
  isAvailable: boolean;
}

export type RequestStatus = 'pending' | 'accepted' | 'refused' | 'cancelled';

export interface BusinessRequest {
  id: number;
  identifier: string;
  name: string;
  type: BusinessType;
  location: string;
  description: string;
  budget: number;
  revenueEstimate?: number;
  attachments?: string;
  status: RequestStatus;
  staffComment?: string;
  createdAt: string;
}

export type PaymentType = 'personal' | 'society' | 'credit';

export interface UiOpenPayload {
  isStaff: boolean;
  playerName: string;
  businesses: Business[];
  myRequests: BusinessRequest[];
  myBusinesses: Business[];
  staffRequests?: BusinessRequest[];
}

export type NuiMessage =
  | { action: 'ui:open'; data: UiOpenPayload }
  | { action: 'ui:updateBusinesses'; data: { businesses: Business[] } }
  | { action: 'ui:updateMyRequests'; data: { myRequests: BusinessRequest[] } }
  | { action: 'ui:updateMyBusinesses'; data: { myBusinesses: Business[] } }
  | { action: 'ui:updateStaffRequests'; data: { staffRequests: BusinessRequest[] } }
  | { action: 'ui:close' };

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  variant: ToastVariant;
}

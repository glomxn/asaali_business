import type { Business, BusinessRequest } from '../types';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    label: 'Le Gold Bar',
    type: 'bar',
    address: 'Vinewood Blvd',
    price: 250000,
    revenue: 42000,
    upkeep: 9000,
    owner: null,
    isAvailable: true,
  },
  {
    id: '2',
    label: 'Sunset Garage',
    type: 'garage',
    address: 'La Mesa',
    price: 180000,
    revenue: 28000,
    upkeep: 6000,
    owner: 'steam:110000112345678',
    isAvailable: false,
  },
  {
    id: '3',
    label: 'Club Eclipse',
    type: 'club',
    address: 'West Vinewood',
    price: 520000,
    revenue: 78000,
    upkeep: 16000,
    owner: null,
    isAvailable: true,
  },
];

export const mockMyRequests: BusinessRequest[] = [
  {
    id: 101,
    identifier: 'steam:110000112345678',
    name: 'Burger Heaven',
    type: 'restaurant',
    location: 'Del Perro',
    description: 'Un fast-food premium RP avec menu complet, animations et événements.',
    budget: 200000,
    revenueEstimate: 35000,
    attachments: 'https://example.com/mock',
    status: 'pending',
    staffComment: undefined,
    createdAt: new Date().toISOString(),
  },
  {
    id: 102,
    identifier: 'steam:110000112345678',
    name: 'Station Harmony',
    type: 'station',
    location: 'Harmony',
    description: 'Station-service avec shop + location véhicules.',
    budget: 320000,
    revenueEstimate: 45000,
    attachments: '',
    status: 'refused',
    staffComment: 'Localisation déjà occupée, proposez un autre endroit.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const mockMyBusinesses: Business[] = [
  {
    id: '99',
    label: 'Auto Luxury',
    type: 'concession',
    address: 'Rockford Hills',
    price: 0,
    revenue: 56000,
    upkeep: 12000,
    owner: 'steam:110000112345678',
    isAvailable: false,
  },
];

export const mockStaffRequests: BusinessRequest[] = [
  {
    id: 201,
    identifier: 'steam:110000998877665',
    name: 'Night Ramen',
    type: 'restaurant',
    location: 'Downtown',
    description: 'Restaurant japonais nocturne, ambiance néons, événements RP.',
    budget: 150000,
    revenueEstimate: 25000,
    attachments: 'https://example.com/ramen',
    status: 'pending',
    staffComment: undefined,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

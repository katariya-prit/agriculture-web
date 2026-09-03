const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw { status: res.status, ...data };
  }

  return data;
}

export const api = {
  signup: (payload: { username: string; fullName: string; email: string; password: string }) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),

  verifyEmail: (payload: { email: string; token: string }) =>
    request('/auth/verify-email', { method: 'POST', body: JSON.stringify(payload) }),

  login: (payload: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),

  logout: () => request('/auth/logout', { method: 'DELETE' }),

  me: () => request('/auth/me', { method: 'GET' }),

  // ---- Selling account ----
  createSellingAccount: (payload: {
    sellingAccountName: string;
    mobileNumber: string;
    shortAddress: string;
    aadhaarNumber: string;
  }) => request('/api/selling-account', { method: 'POST', body: JSON.stringify(payload) }),

  getSellingAccount: () => request('/api/selling-account', { method: 'GET' }),

  updateBasicIdentity: (payload: {
    photoUrl?: string;
    dateOfBirth?: string;
    gender?: 'Male' | 'Female' | 'Other';
  }) =>
    request('/api/selling-account/basic-identity', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  updateFarmAndLandDetails: (payload: {
    village?: string;
    taluka?: string;
    district?: string;
    state?: string;
    pincode?: string;
    surveyNumber?: string;
  }) =>
    request('/api/selling-account/farm-details', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  updateCropAndProductionInfo: (payload: {
    primaryCrops?: string[];
    cropSeason?: 'Kharif' | 'Rabi' | 'Zaid';
    expectedYieldValue?: number;
    expectedYieldUnit?: string;
    farmingType?: 'Organic' | 'Conventional';
    soilType?: string;
  }) =>
    request('/api/selling-account/crop-info', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};
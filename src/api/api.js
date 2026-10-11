import axios from 'axios';
import { fallbackImages, mockRestaurants } from './mockData';

const BASE_URL = 'https://staging.fastor.ai/v1';
const CITY_ID = 118;
export const DEFAULT_OTP = '123456';

const http = axios.create({ baseURL: BASE_URL, timeout: 8000 });

// The API expects application/x-www-form-urlencoded bodies.
const form = (data) => new URLSearchParams(data);

// True when the server itself is unreachable (network/CORS error, 404 page, 5xx),
// as opposed to a real validation error such as a wrong OTP.
function isServerDown(err) {
  const res = err.response;
  if (!res) return true;
  if (res.status === 404 || res.status >= 500) return true;
  return typeof res.data !== 'object';
}

function errorMessage(err, fallback) {
  return err.response?.data?.error_message || err.response?.data?.message || fallback;
}

const DEMO_KEY = 'fastor_demo_mode';
const setDemoMode = (on) => localStorage.setItem(DEMO_KEY, on ? '1' : '0');
export const isDemoMode = () => localStorage.getItem(DEMO_KEY) === '1';

// 1. Register and get OTP
export async function registerUser(phone, dialCode = '+91') {
  try {
    const res = await http.post('/pwa/user/register', form({ phone, dial_code: dialCode }));
    setDemoMode(false);
    return res.data;
  } catch (err) {
    if (!isServerDown(err)) throw new Error(errorMessage(err, 'Could not send OTP'));
    setDemoMode(true);
    return { status: 'Success', demo: true };
  }
}

// 2. Login with OTP -> returns { token, name }
export async function loginUser(phone, otp, dialCode = '+91') {
  try {
    const res = await http.post('/pwa/user/login', form({ phone, otp, dial_code: dialCode }));
    const token = res.data?.data?.token;
    const name = res.data?.data?.user_name || '';
    if (!token) throw new Error(errorMessage({ response: res }, 'Invalid OTP'));
    setDemoMode(false);
    return { token, name };
  } catch (err) {
    if (err.response && !isServerDown(err)) throw new Error(errorMessage(err, 'Invalid OTP'));
    if (!err.response && !err.request) throw err;
    if (otp !== DEFAULT_OTP) throw new Error('Invalid OTP. Use the default OTP 123456');
    setDemoMode(true);
    return { token: `demo-token-${phone}`, name: 'Karan' };
  }
}

// The API sends missing values as the string "null".
const clean = (v) => (v && v !== 'null' ? v : '');

// Real API items only have { restaurant_id, restaurant_name, logo, address_complete };
// the other fields are optional and come from the demo data.
function normalizeRestaurant(r, index) {
  const cuisines = (r.cuisines || []).map((c) => c.cuisine_name || c).filter(Boolean);
  const address = clean(r.address_complete);
  return {
    id: String(r.restaurant_id ?? r.id ?? index),
    name: r.restaurant_name || r.name || 'Restaurant',
    image: r.images?.[0]?.url || clean(r.logo) || r.image || '',
    fallbackImage: fallbackImages[index % fallbackImages.length],
    locality: r.location?.location_locality || address.split(',')[0] || '',
    city: r.location?.city_name || address.split(',').slice(1, 3).join(',').trim() || '',
    cuisines,
    costForTwo: Number(r.avg_cost_for_two) || 0,
    rating: r.rating?.restaurant_avg_rating ?? null,
    currency: r.currency?.symbol || '₹',
  };
}

let cache = null;

// 3. Fetch restaurants (requires Bearer token)
export async function getRestaurants(token) {
  if (cache) return cache;
  let raw;
  if (token.startsWith('demo-token')) {
    raw = mockRestaurants;
  } else {
    try {
      const res = await http.get('/m/restaurant', {
        params: { city_id: CITY_ID },
        headers: { Authorization: `Bearer ${token}` },
      });
      // Real response: { status, status_code, data: { results: [...] } }
      const body = res.data?.data;
      raw = Array.isArray(body?.results) ? body.results : Array.isArray(body) ? body : [];
    } catch (err) {
      if (err.response?.status === 401) throw new Error('SESSION_EXPIRED');
      if (!isServerDown(err)) throw new Error(errorMessage(err, 'Could not load restaurants'));
      setDemoMode(true);
      raw = mockRestaurants;
    }
  }
  cache = raw.map(normalizeRestaurant);
  return cache;
}

export function clearCache() {
  cache = null;
}

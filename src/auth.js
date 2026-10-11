const TOKEN_KEY = 'fastor_token';
const PHONE_KEY = 'fastor_phone';
const NAME_KEY = 'fastor_name';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getPhone = () => localStorage.getItem(PHONE_KEY) || '';
export const getName = () => localStorage.getItem(NAME_KEY) || '';

export function saveSession(token, phone, name = '') {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(PHONE_KEY, phone);
  localStorage.setItem(NAME_KEY, name);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PHONE_KEY);
  localStorage.removeItem(NAME_KEY);
}

export const formatPhone = (phone) => `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;

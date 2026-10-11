# Fastor – React Developer Task

A mobile-first React app built from the Fastor Figma design: sign up with a mobile number, verify the OTP, browse restaurants and view a restaurant's details.

## Screens

| Route | Screen |
|---|---|
| `/` | Sign Up: enter a 10-digit mobile number to get an OTP |
| `/otp` | 6-digit code: auto-advancing OTP boxes, paste support, 30-second resend timer |
| `/home` | Home: location, Best Seller row, offer carousel, Popular Items list (protected) |
| `/restaurant/:id` | Detail: image, quantity counter, portion sizes, add to cart, share (protected) |

## APIs used

| Step | Endpoint |
|---|---|
| 1. Register / get OTP | `POST https://staging.fastor.ai/v1/pwa/user/register` (form body: `phone`, `dial_code`) |
| 2. Login with OTP | `POST https://staging.fastor.ai/v1/pwa/user/login` (form body: `phone`, `otp`, `dial_code`) → `response.data.token` |
| 3. Fetch restaurants | `GET https://staging.fastor.ai/v1/m/restaurant?city_id=118` with `Authorization: Bearer <token>` |

The JWT token is stored in `localStorage`. The `/home` and `/restaurant/:id` routes redirect to sign up when the user has no token.

### Demo mode (API fallback)

At the time of submission, `staging.fastor.ai` returns **404 Not Found** for all three endpoints, and its SSL certificate doesn't match the domain. So the app can still be reviewed, `src/api/api.js` always calls the real API first. It falls back to demo mode only if the server is unreachable:

- the default OTP **123456** logs in (any other OTP is rejected)
- restaurants come from `src/api/mockData.js`, which has the same shape as the real API response

The app shows a small notice when demo data is in use. Real validation errors from the API (such as a wrong OTP) are still shown to the user.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build in dist/
```

Test login: any valid mobile number (e.g. `9818979450`), OTP `123456`.

## Tech

React 19 · Vite · React Router · Axios · plain CSS (no UI library)

## Project structure

```
src/
  api/api.js          API calls, response normalizing, demo fallback
  api/mockData.js     fallback restaurant data
  auth.js             token/session helpers
  components/         icons, image with placeholder
  pages/              Signup, Otp, Home, Detail
  App.jsx             routes + protected routes
```

## Deploy

The repo includes `vercel.json` (Vercel) and `public/_redirects` (Netlify) so client-side routes work on refresh.

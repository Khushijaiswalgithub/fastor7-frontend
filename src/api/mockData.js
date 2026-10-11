// Fallback data used only when the Fastor staging API is unreachable.
// Shaped like the real /v1/m/restaurant response so the same normalizer handles both.

export const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;

export const mockRestaurants = [
  {
    restaurant_id: 'r1',
    restaurant_name: 'Pizza Hub',
    images: [{ url: img('photo-1565299624946-b28f40a0ae38') }],
    location: { location_locality: 'Model Town', city_name: 'New Delhi' },
    cuisines: [{ cuisine_name: 'Pizza' }, { cuisine_name: 'Italian' }],
    avg_cost_for_two: 450,
    rating: { restaurant_avg_rating: 4.5 },
    currency: { symbol: '₹' },
  },
  {
    restaurant_id: 'r2',
    restaurant_name: 'Burger Barn',
    images: [{ url: img('photo-1568901346375-23c9450c58cd') }],
    location: { location_locality: 'Connaught Place', city_name: 'New Delhi' },
    cuisines: [{ cuisine_name: 'Burgers' }, { cuisine_name: 'Fast Food' }],
    avg_cost_for_two: 350,
    rating: { restaurant_avg_rating: 4.2 },
    currency: { symbol: '₹' },
  },
  {
    restaurant_id: 'r3',
    restaurant_name: 'Green Bowl',
    images: [{ url: img('photo-1512621776951-a57141f2eefd') }],
    location: { location_locality: 'Hauz Khas', city_name: 'New Delhi' },
    cuisines: [{ cuisine_name: 'Salads' }, { cuisine_name: 'Healthy Food' }],
    avg_cost_for_two: 400,
    rating: { restaurant_avg_rating: 4.6 },
    currency: { symbol: '₹' },
  },
  {
    restaurant_id: 'r4',
    restaurant_name: 'Sweet Tooth',
    images: [{ url: img('photo-1563805042-7684c019e1cb') }],
    location: { location_locality: 'Rajouri Garden', city_name: 'New Delhi' },
    cuisines: [{ cuisine_name: 'Desserts' }, { cuisine_name: 'Ice Cream' }],
    avg_cost_for_two: 300,
    rating: { restaurant_avg_rating: 4.4 },
    currency: { symbol: '₹' },
  },
  {
    restaurant_id: 'r5',
    restaurant_name: 'Shake Shack Point',
    images: [{ url: img('photo-1572490122747-3968b75cc699') }],
    location: { location_locality: 'Karol Bagh', city_name: 'New Delhi' },
    cuisines: [{ cuisine_name: 'Beverages' }, { cuisine_name: 'Shakes' }],
    avg_cost_for_two: 250,
    rating: { restaurant_avg_rating: 4.1 },
    currency: { symbol: '₹' },
  },
  {
    restaurant_id: 'r6',
    restaurant_name: 'Tokyo Rolls',
    images: [{ url: img('photo-1579871494447-9811cf80d66c') }],
    location: { location_locality: 'Saket', city_name: 'New Delhi' },
    cuisines: [{ cuisine_name: 'Sushi' }, { cuisine_name: 'Japanese' }],
    avg_cost_for_two: 900,
    rating: { restaurant_avg_rating: 4.7 },
    currency: { symbol: '₹' },
  },
  {
    restaurant_id: 'r7',
    restaurant_name: 'Grill House',
    images: [{ url: img('photo-1555939594-58d7cb561ad1') }],
    location: { location_locality: 'Model Town', city_name: 'New Delhi' },
    cuisines: [{ cuisine_name: 'BBQ' }, { cuisine_name: 'North Indian' }],
    avg_cost_for_two: 700,
    rating: { restaurant_avg_rating: 4.3 },
    currency: { symbol: '₹' },
  },
];

// Food photos used when a restaurant's own image is missing or broken.
export const fallbackImages = [
  'photo-1565299624946-b28f40a0ae38',
  'photo-1568901346375-23c9450c58cd',
  'photo-1512621776951-a57141f2eefd',
  'photo-1563805042-7684c019e1cb',
  'photo-1572490122747-3968b75cc699',
  'photo-1579871494447-9811cf80d66c',
  'photo-1555939594-58d7cb561ad1',
].map(img);

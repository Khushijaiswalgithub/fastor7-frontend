// Images exported from the Figma design (compressed copies in ./optimized).
// Order matters: each list is shown left-to-right / top-to-bottom as in Figma.
import banner1 from './optimized/banner1.webp';
import best1 from './optimized/best1.webp';
import best2 from './optimized/best2.webp';
import best3 from './optimized/best3.webp';
import best4 from './optimized/best4.webp';
import item1 from './optimized/item1.webp';
import item2 from './optimized/item2.webp';

export const bestSellerImages = [best1, best2, best3, best4];
export const bannerImages = [banner1];
export const itemImages = [item1, item2];

// Icons from the Home user row (white on transparent).
export { default as phoneIcon } from './phone-icon.png';
export { default as walletIcon } from './wallet-icon.png';

// Prices shown on the Best Seller tags in the Figma design (the API has no prices).
export const bestSellerPrices = ['$103.0', '$50.0', '$12.99', '$8.20'];

// Order details shown on Popular Items rows, from the Figma design (the API has no prices or orders).
// Used in order, repeating, alongside itemImages.
export const popularItemDetails = [
  { price: '₹20.00', date: '29 Nov, 01:20 pm', count: '2 items' },
  { price: '₹20.00', date: '17 Oct, 01:20 pm', count: '1 item' },
];

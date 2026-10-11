import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getRestaurants } from '../api/api';
import { getToken } from '../auth';
import FoodImage from '../components/FoodImage';
import { MinusIcon, PlusIcon } from '../components/Icons';
import Button from '../components/ui/Button';

// Prices from the Figma design (the API has no prices): base price and the extra charge per portion.
const BASE_PRICE = 14;
const PORTIONS = [
  { label: 'Personal', slices: 4, extra: 0 },
  { label: 'Medium', slices: 8, extra: 3 },
  { label: 'Familiar', slices: 10, extra: 6 },
  { label: 'Jumbo', slices: 12, extra: 10 },
];

export default function Detail() {
  const { id } = useParams();
  // Image of the card that was tapped on Home (Figma image), if any.
  const tappedImage = useLocation().state?.image;
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [portion, setPortion] = useState(0);
  const [toast, setToast] = useState('');

  useEffect(() => {
    getRestaurants(getToken())
      .then((list) => setRestaurant(list.find((r) => r.id === id) || null))
      .catch(() => setRestaurant(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  if (loading) {
    return (
      <div className="screen detail-screen">
        <div className="skeleton detail-img" />
        <div className="skeleton" style={{ height: 20, width: '60%', marginTop: 20 }} />
        <div className="skeleton" style={{ height: 60, marginTop: 12 }} />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="screen state-box">
        <p>Restaurant not found.</p>
        <Button size="sm" onClick={() => navigate('/home')}>
          Back to Home
        </Button>
      </div>
    );
  }

  const unitPrice = BASE_PRICE + PORTIONS[portion].extra;
  const total = unitPrice * qty;
  const { currency } = restaurant;

  return (
    <div className="screen detail-screen">
      <div className="detail-hero">
        <FoodImage
          src={tappedImage || restaurant.image}
          fallbackSrc={restaurant.fallbackImage}
          alt={restaurant.name}
          className="detail-img"
        />
      </div>

      <hr className="detail-divider detail-divider--top" />
      <div className="row-between price-row">
        <span className="accent detail-price">
          {currency}
          {unitPrice.toFixed(2)}
        </span>
        <div className="qty">
          <button aria-label="Decrease quantity" disabled={qty === 1} onClick={() => setQty((q) => q - 1)}>
            <MinusIcon width={12} height={12} />
          </button>
          <span className="qty-count" aria-live="polite">{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(q + 1, 20))}>
            <PlusIcon width={12} height={12} />
          </button>
        </div>
      </div>
      <hr className="detail-divider detail-divider--bottom" />

      <h1 className="detail-title">{restaurant.name}</h1>
      <p className="detail-desc">
        {[restaurant.locality, restaurant.city].filter(Boolean).join(', ') || 'New Delhi'}. Freshly prepared with quality
        ingredients and delivered hot to your door.
      </p>

      <h2 className="detail-title detail-portion-title">Personal portion</h2>
      <ul className="portion-list" role="radiogroup" aria-label="Portion size">
        {PORTIONS.map((p, i) => (
          <li key={p.label}>
            <label className="portion">
              <span className="portion-label">
                {p.label} ({p.slices} Slices)
              </span>
              <span className="dotted" />
              <span className="portion-price">
                {currency}
                {p.extra.toFixed(2)}
              </span>
              <input type="radio" name="portion" checked={portion === i} onChange={() => setPortion(i)} />
              <span className="radio" />
            </label>
          </li>
        ))}
      </ul>

      <div className="detail-footer">
        {toast && (
          <div className="toast" role="status">
            {toast}
          </div>
        )}
        <Button
          onClick={() =>
            setToast(`Added ${qty} × ${restaurant.name} (${PORTIONS[portion].label}) · ${currency}${total.toFixed(2)}`)
          }
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

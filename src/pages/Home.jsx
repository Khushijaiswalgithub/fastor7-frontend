import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearCache, getRestaurants, isDemoMode } from '../api/api';
import { clearSession, getToken } from '../auth';
import FoodImage from '../components/FoodImage';
import Button from '../components/ui/Button';
import { SectionTitle } from '../components/ui/Typography';
import { bannerImages, bestSellerImages, bestSellerPrices, itemImages, popularItemDetails, phoneIcon, walletIcon } from '../assets/images';

// Figma shows 5 dots, so the carousel has 5 slides. Titles must fit two lines in the 123px text box.
const BANNERS = [
  { title: 'Experience our delicious new dish', offer: '30% OFF' },
  { title: 'Try our cheesy new pizza', offer: '20% OFF' },
  { title: 'Weekend special on pizzas', offer: '25% OFF' },
  { title: 'Order now and save big', offer: '15% OFF' },
  { title: 'Fresh food at your door', offer: '10% OFF' },
];

export default function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [slide, setSlide] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  function logout() {
    clearSession();
    clearCache();
    navigate('/', { replace: true });
  }

  useEffect(() => {
    let active = true;
    getRestaurants(getToken())
      .then((data) => active && setRestaurants(data))
      .catch((err) => {
        if (!active) return;
        if (err.message === 'SESSION_EXPIRED') {
          clearSession();
          navigate('/', { replace: true });
        } else {
          setError(err.message);
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [navigate, reloadKey]);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % BANNERS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const bestSellers = restaurants.slice(0, 4);

  return (
    <div className="screen home-screen">
      <header className="home-header">
        <p className="location-label">Current Locations</p>
        <p className="location">Model Town, New Delhi</p>
      </header>

      <section className="user-row">
        <div className="user-card">
          <p className="user-name ellipsis">Karan</p>
        </div>
        <div className="user-actions">
          <a className="icon-btn orange" href="tel:+910000000000" aria-label="Call support">
            <img src={phoneIcon} alt="" width={21} height={21} />
          </a>
          <button className="icon-btn blue" onClick={logout} aria-label="Log out" title="Log out">
            <img src={walletIcon} alt="" width={23} height={22} />
          </button>
        </div>
      </section>

      {isDemoMode() && !loading && (
        <p className="demo-banner">Demo data shown: the Fastor staging API is currently unreachable.</p>
      )}

      {loading && <HomeSkeleton />}

      {error && (
        <div className="state-box">
          <p>{error}</p>
          <Button
            size="sm"
            onClick={() => {
              setLoading(true);
              setError('');
              setReloadKey((k) => k + 1);
            }}
          >
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && restaurants.length === 0 && (
        <div className="state-box">
          <p>No restaurants found near you.</p>
        </div>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <>
          <SectionTitle className="home-section">Best Seller</SectionTitle>
          <div className="best-row">
            {bestSellers.map((r, i) => (
              <Link key={r.id} to={`/restaurant/${r.id}`} state={{ image: bestSellerImages[i] }} className="best-item">
                <FoodImage src={bestSellerImages[i]} fallbackSrc={r.fallbackImage} alt={r.name} className="best-img" />
                <span className="price-tag">{bestSellerPrices[i]}</span>
              </Link>
            ))}
          </div>

          <div className="banner">
            <span className="banner-ring banner-ring--top" aria-hidden="true" />
            <span className="banner-ring banner-ring--bottom" aria-hidden="true" />
            <div className="banner-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {BANNERS.map((b, i) => (
                <div key={b.offer} className="banner-slide">
                  <div className="banner-text">
                    <p>{b.title}</p>
                    <strong>{b.offer}</strong>
                  </div>
                  <FoodImage
                    src={bannerImages[i % bannerImages.length]}
                    alt={b.title}
                    className="banner-img"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="dots">
            {BANNERS.map((b, i) => (
              <button
                key={b.offer}
                className={`dot ${i === slide ? 'active' : ''}`}
                aria-label={`Show offer ${i + 1}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>

          <SectionTitle className="home-section home-section--popular">Popular Items</SectionTitle>
          <ul className="popular-list">
            {restaurants.map((r, i) => {
              const image = itemImages[i % itemImages.length];
              const details = popularItemDetails[i % popularItemDetails.length];
              return (
                <li key={r.id} className="popular-item">
                  <Link to={`/restaurant/${r.id}`} state={{ image }} className="popular-row">
                    <FoodImage src={image} fallbackSrc={r.fallbackImage} alt={r.name} className="popular-img" />
                    <div className="popular-body">
                      <div className="popular-line popular-line--top">
                        <h3 className="popular-name ellipsis">{r.name}</h3>
                        <span className="popular-price">{details.price}</span>
                      </div>
                      <div className="popular-line popular-meta">
                        <span className="ellipsis">{details.date}</span>
                        <span className="popular-count">{details.count}</span>
                      </div>
                      <div className="popular-line popular-line--actions">
                        <span className="pill pill--filled">Cancel Order</span>
                        <span className="pill pill--soft">Track Driver</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading restaurants">
      <div className="skeleton" style={{ width: 90, height: 16, margin: '20px 0 12px' }} />
      <div className="best-row">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="skeleton best-img" />
        ))}
      </div>
      <div className="skeleton" style={{ height: 120, borderRadius: 16, marginTop: 16 }} />
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="skeleton" style={{ height: 84, borderRadius: 14, marginTop: 14 }} />
      ))}
    </div>
  );
}

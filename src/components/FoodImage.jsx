import { useState } from 'react';

// Image that tries `src`, then `fallbackSrc`, then shows a letter placeholder.
export default function FoodImage({ src, fallbackSrc, alt, className }) {
  const sources = [src, fallbackSrc].filter(Boolean);
  const [attempt, setAttempt] = useState(0);

  if (attempt >= sources.length) {
    return (
      <div className={`${className} img-placeholder`} aria-label={alt}>
        {alt?.[0] || '🍽'}
      </div>
    );
  }
  return (
    <img
      key={sources[attempt]}
      src={sources[attempt]}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setAttempt((a) => a + 1)}
    />
  );
}

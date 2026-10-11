import './ui.css';

// Page heading, e.g. "Sign Up to Fastor", "6-digit code".
export function Title({ as: Tag = 'h1', className = '', children, ...props }) {
  return (
    <Tag className={`ui-title ${className}`} {...props}>
      {children}
    </Tag>
  );
}

// Grey helper text under a title, e.g. "Let us know your mobile number...".
export function Subtitle({ as: Tag = 'p', className = '', children, ...props }) {
  return (
    <Tag className={`ui-subtitle ${className}`} {...props}>
      {children}
    </Tag>
  );
}

// Section heading on Home, e.g. "Best Seller", "Popular Items".
export function SectionTitle({ as: Tag = 'h2', className = '', children, ...props }) {
  return (
    <Tag className={`ui-section-title ${className}`} {...props}>
      {children}
    </Tag>
  );
}

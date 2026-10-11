import './ui.css';

// Reusable button used for every action in the app (Get OTP, Continue, Add to cart, ...).
// variant: 'primary' (filled orange) | 'outline'
// size:    'lg' (full width, default) | 'sm' (fits content)
export default function Button({ variant = 'primary', size = 'lg', type = 'button', className = '', children, ...props }) {
  return (
    <button type={type} className={`ui-btn ui-btn--${variant} ui-btn--${size} ${className}`} {...props}>
      {children}
    </button>
  );
}

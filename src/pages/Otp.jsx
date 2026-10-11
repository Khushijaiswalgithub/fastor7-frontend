import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_OTP, isDemoMode, loginUser, registerUser } from '../api/api';
import { formatPhone, saveSession } from '../auth';
import { BackIcon } from '../components/Icons';
import Button from '../components/ui/Button';
import { Subtitle, Title } from '../components/ui/Typography';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function Otp() {
  const navigate = useNavigate();
  const phone = useLocation().state?.phone;

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (seconds === 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  if (!phone) return <Navigate to="/" replace />;

  const otp = digits.join('');

  function updateDigits(next, focusIndex) {
    setDigits(next);
    setError('');
    inputs.current[Math.min(focusIndex, OTP_LENGTH - 1)]?.focus();
  }

  function handleChange(index, value) {
    const chars = value.replace(/\D/g, '');
    if (!chars) return;
    const next = [...digits];
    // Supports typing one digit or pasting the whole code into any box.
    chars.slice(0, OTP_LENGTH - index).split('').forEach((c, i) => (next[index + i] = c));
    updateDigits(next, index + chars.length);
  }

  function handleKeyDown(index, e) {
    if (e.key !== 'Backspace') return;
    e.preventDefault();
    const next = [...digits];
    if (next[index]) {
      next[index] = '';
      updateDigits(next, index);
    } else if (index > 0) {
      next[index - 1] = '';
      updateDigits(next, index - 1);
    }
  }

  async function handleResend() {
    setSeconds(RESEND_SECONDS);
    setDigits(Array(OTP_LENGTH).fill(''));
    inputs.current[0]?.focus();
    try {
      await registerUser(phone);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (otp.length !== OTP_LENGTH) {
      setError('Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    try {
      const { token, name } = await loginUser(phone, otp);
      saveSession(token, phone, name);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="screen auth-screen" onSubmit={handleSubmit}>
      <button type="button" className="back-btn" aria-label="Back" onClick={() => navigate(-1)}>
        <BackIcon />
      </button>

      <Title className="auth-title">6-digit code</Title>
      <Subtitle className="auth-subtitle">
        Please enter the code we&apos;ve sent to
        <br />
        <b className="text-dark">{formatPhone(phone)}</b>
      </Subtitle>

      <div className="otp-row">
        {digits.map((d, i) => [
          // Figma groups the code as 3 boxes, a dash, then 3 boxes.
          i === OTP_LENGTH / 2 && (
            <span key="dash" className="otp-dash" aria-hidden="true">
              -
            </span>
          ),
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            className={`otp-box ${d ? 'filled' : ''} ${error ? 'has-error' : ''}`}
            type="tel"
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            autoFocus={i === 0}
            value={d}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
          />,
        ])}
      </div>
      {error && <p className="error-text">{error}</p>}

      <p className="resend">
        I didn&apos;t receive a code{' '}
        {seconds > 0 ? (
          <span className="accent">(00:{String(seconds).padStart(2, '0')})</span>
        ) : (
          <button type="button" className="link-btn" onClick={handleResend}>
            Resend
          </button>
        )}
      </p>
      {isDemoMode() && <p className="hint">Default OTP: {DEFAULT_OTP}</p>}

      <div className="auth-footer">
        <Button type="submit" disabled={loading}>
          {loading ? 'Verifying…' : 'Continue'}
        </Button>
      </div>
    </form>
  );
}

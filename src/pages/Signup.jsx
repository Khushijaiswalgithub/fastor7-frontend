import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import { BackIcon } from '../components/Icons';
import Button from '../components/ui/Button';
import { Subtitle, Title } from '../components/ui/Typography';

export default function Signup() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = /^[6-9]\d{9}$/.test(phone);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registerUser(phone);
      navigate('/otp', { state: { phone } });
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

      <Title className="auth-title">Sign Up to Fastor</Title>
      <Subtitle className="auth-subtitle">
        Let us know your mobile number and we will send you an OTP for verification.
      </Subtitle>

      <label className={`phone-field ${error ? 'has-error' : ''}`}>
        <span className="dial-code">+91</span>
        <input
          type="tel"
          inputMode="numeric"
          autoFocus
          placeholder="- 00000"
          value={phone}
          maxLength={10}
          onChange={(e) => {
            setPhone(e.target.value.replace(/\D/g, ''));
            setError('');
          }}
        />
      </label>
      {error && <p className="error-text">{error}</p>}

      <div className="auth-footer">
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending OTP…' : 'Get OTP'}
        </Button>
        <p className="terms">
          By clicking, I accept the <b>Terms &amp; Conditions</b> and <b>Privacy Policy</b>
        </p>
      </div>
    </form>
  );
}

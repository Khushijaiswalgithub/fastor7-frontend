import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getToken } from './auth';
import Signup from './pages/Signup';
import Otp from './pages/Otp';
import Home from './pages/Home';
import Detail from './pages/Detail';
import './App.css';

function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/" replace />;
}

function PublicRoute({ children }) {
  return getToken() ? <Navigate to="/home" replace /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/otp" element={<PublicRoute><Otp /></PublicRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/restaurant/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

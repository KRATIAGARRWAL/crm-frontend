import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      const decoded = jwt_decode(token);
      login(token, decoded);
      navigate('/segment');
    } else {
      navigate('/login');
    }
  }, []);

  return <p>Logging you in...</p>;
}

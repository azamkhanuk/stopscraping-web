import { useNavigate } from 'react-router-dom';

export function useCustomSignIn() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Mock function for showcase - navigate to api-keys
    navigate('/api-keys');
  };

  return handleSignIn;
}

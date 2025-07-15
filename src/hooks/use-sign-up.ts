import { useNavigate } from 'react-router-dom';

export function useSignUp() {
  const navigate = useNavigate();

  const handleSignUpOrSignIn = () => {
    // Mock function for showcase - navigate to select-plan
    navigate('/select-plan');
  };

  return handleSignUpOrSignIn;
}

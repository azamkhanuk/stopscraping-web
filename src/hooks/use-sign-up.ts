import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

// Add this type declaration at the top of the file
declare global {
    interface Window {
        Clerk?: {
            openSignUp: () => void;
            openSignIn: () => void;
        };
    }
}

export function useSignUp() {
    const { isSignedIn, user } = useUser();
    const clerk = useClerk();
    const navigate = useNavigate();

    const handleSignUpOrSignIn = async () => {
        if (isSignedIn && user) {
            const pricingPlan = user.unsafeMetadata?.pricingPlan;
            if (!pricingPlan) {
                navigate('/select-plan');
            } else {
                navigate('/api-keys');
            }
        } else {
            try {
                await clerk.openSignUp();
            } catch (error) {
                console.error('Error during sign-up attempt:', error);
            }
        }
    };

    return handleSignUpOrSignIn;
}
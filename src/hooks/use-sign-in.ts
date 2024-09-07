import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export function useCustomSignIn() {
    const { isSignedIn, user } = useUser();
    const clerk = useClerk();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (isSignedIn && user) {
            const pricingPlan = user.unsafeMetadata?.pricingPlan;
            if (!pricingPlan) {
                navigate('/select-plan');
            } else {
                navigate('/api-keys');
            }
        } else {
            try {
                await clerk.openSignIn();
            } catch (error) {
                console.error('Error during sign-in attempt:', error);
            }
        }
    };

    return handleSignIn;
}
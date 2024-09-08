import { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabase';

export function SuccessPage() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const processPayment = async () => {
            if (!user?.id) return;

            try {
                const urlParams = new URLSearchParams(window.location.search);
                const sessionId = urlParams.get('session_id');

                if (!sessionId) {
                    throw new Error('No session ID found');
                }

                // Verify the payment with your backend
                const response = await fetch('/api/verify-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sessionId }),
                });

                const { success, plan } = await response.json();

                if (success) {
                    // Update user metadata
                    await user.update({
                        unsafeMetadata: { pricingPlan: plan },
                    });

                    // Generate new API key
                    const newApiKey = crypto.randomUUID();

                    // Update Supabase
                    const { error } = await supabase
                        .from('api_keys')
                        .upsert({
                            user_id: user.id,
                            tier: plan,
                            api_key: newApiKey
                        }, {
                            onConflict: 'user_id,tier'
                        });

                    if (error) {
                        throw error;
                    }

                    navigate("/api-keys");
                } else {
                    throw new Error('Payment verification failed');
                }
            } catch (error) {
                console.error('Error processing payment:', error);
                alert('An error occurred while processing your payment. Please contact support.');
                navigate("/");
            } finally {
                setIsProcessing(false);
            }
        };

        processPayment();
    }, [user, navigate]);

    if (isProcessing) {
        return <div>Processing your payment...</div>;
    }

    return null;
}
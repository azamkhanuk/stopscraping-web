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

                const { success, plan, customerId } = await response.json();

                if (success && plan === 'Basic' && customerId) {
                    // Update user metadata with the Stripe Customer ID
                    await user.update({
                        unsafeMetadata: {
                            pricingPlan: 'Basic',
                            stripeCustomerId: customerId
                        },
                    });

                    // Generate new API key
                    const newApiKey = crypto.randomUUID();

                    // Check if user already has an API key
                    const { data: existingKeys } = await supabase
                        .from('api_keys')
                        .select('*')
                        .eq('user_id', user.id);

                    if (existingKeys && existingKeys.length > 0) {
                        // Update existing key
                        const { error } = await supabase
                            .from('api_keys')
                            .update({ tier: 'Basic', api_key: newApiKey })
                            .eq('user_id', user.id);

                        if (error) throw error;
                    } else {
                        // Insert new key
                        const { error } = await supabase
                            .from('api_keys')
                            .insert({
                                user_id: user.id,
                                tier: 'Basic',
                                api_key: newApiKey
                            });

                        if (error) throw error;
                    }

                    navigate("/api-keys");
                } else {
                    throw new Error('Payment verification failed or invalid plan');
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
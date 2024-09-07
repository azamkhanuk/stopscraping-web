import { useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { PricingPlans } from './PricingPlans';
import { supabase } from '../lib/supabase';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function PlanSelection() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlanSelection = async (plan: string) => {
        if (!user?.id || isProcessing) return;

        setIsProcessing(true);

        try {
            // Update user metadata in Clerk
            await user.update({
                unsafeMetadata: { pricingPlan: plan },
            });

            // Generate a new API key
            const newApiKey = crypto.randomUUID();

            // Create or update entry in Supabase
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
                console.error('Error creating/updating API key:', error);
                // Handle error (e.g., show error message to user)
            } else {
                // Redirect to API Key Management page
                navigate("/api-keys");
            }
        } catch (error) {
            console.error('Error during plan selection:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="flex items-center bg-white text-black hover:bg-white/90 transition-colors duration-300"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </div>
            <PricingPlans onPlanSelect={handlePlanSelection} />
        </div>
    );
}
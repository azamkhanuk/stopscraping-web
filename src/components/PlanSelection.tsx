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
        console.log('handlePlanSelection called with plan:', plan);
        if (!user?.id || isProcessing) {
            console.log('User ID or isProcessing check failed:', { userId: user?.id, isProcessing });
            return;
        }

        setIsProcessing(true);

        try {
            console.log('Updating user metadata in Clerk');
            await user.update({
                unsafeMetadata: { pricingPlan: plan },
            });

            console.log('Generating new API key');
            const newApiKey = crypto.randomUUID();

            console.log('Making Supabase upsert request');
            const { data, error } = await supabase
                .from('api_keys')
                .upsert({
                    user_id: user.id,
                    tier: plan,
                    api_key: newApiKey
                }, {
                    onConflict: 'user_id,tier'
                })
                .select();

            if (error) {
                console.error('Error creating/updating API key:', error);
                alert('An error occurred while updating your plan. Please try again.');
            } else {
                console.log('API key created/updated:', data);
                navigate("/api-keys");
            }
        } catch (error) {
            console.error('Error during plan selection:', error);
            alert('An unexpected error occurred. Please try again.');
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
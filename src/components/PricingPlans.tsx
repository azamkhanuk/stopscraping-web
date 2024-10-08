import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Check, Wrench } from "lucide-react"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { useStripe } from '@stripe/react-stripe-js';
import { supabase } from '../lib/supabase';

const pricingTiers = [
    {
        title: "Free Tier",
        price: "0",
        features: [
            "Static list of OpenAI IPs, updated weekly",
            "Limited API calls (10/day)",
        ],
        cta: "Get Started",
        disabled: false,
        plan: "Free"
    },
    {
        title: "Basic Tier",
        price: "£5/month",
        features: [
            "Daily IP updates",
            "Increased API call limit (100/day)",
            "Additional AI company IPs as they get added in",
            { text: "Email notifications for significant list changes", inProgress: true },
        ],
        cta: "Subscribe Now",
        disabled: false,
        plan: "Basic"
    },
    {
        title: "Pro Tier",
        price: "£15/month",
        features: [
            "Everything in Basic",
            "Real-time IP updates",
            "Unlimited API calls",
            "Analytics on blocked requests",
            "Priority support",
        ],
        cta: "Coming Soon",
        disabled: true,
        plan: "Pro"
    },
]

export function PricingPlans() {
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();

    const userPlan = user?.unsafeMetadata?.pricingPlan as string | undefined;

    // If the user is on the Basic plan, don't show any pricing plans
    if (userPlan === 'Basic') {
        return null;
    }


    const handlePlanSelection = async (plan: string) => {
        setIsLoading(true);
        if (!isSignedIn) {
            navigate('/sign-up');
            return;
        }

        try {
            if (plan === 'Basic') {
                if (!stripe) {
                    console.error('Stripe.js has not loaded yet.');
                    alert('An error occurred. Please try again.');
                    return;
                }

                const response = await fetch('/api/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ plan }),
                });

                const session = await response.json();

                if (session.sessionId) {
                    const result = await stripe.redirectToCheckout({
                        sessionId: session.sessionId,
                    });

                    if (result.error) {
                        console.error('Error redirecting to Checkout:', result.error);
                        alert('An error occurred. Please try again.');
                    }
                } else {
                    throw new Error('No sessionId in the session response');
                }
            } else if (plan === 'Free') {
                // Update user metadata for Free plan
                await user?.update({
                    unsafeMetadata: { ...user.unsafeMetadata, pricingPlan: 'Free' },
                });

                // Generate new API key
                const newApiKey = crypto.randomUUID();

                // Insert new API key into Supabase
                const { error } = await supabase
                    .from('api_keys')
                    .upsert({
                        user_id: user?.id,
                        tier: 'Free',
                        api_key: newApiKey
                    }, {
                        onConflict: 'user_id,tier'
                    });

                if (error) {
                    console.error('Error creating API key:', error);
                    alert('An error occurred while creating your API key. Please try again.');
                } else {
                    navigate('/api-keys');
                }
            } else {
                // Pro plan (not available yet)
                alert('Pro plan is not available yet. Please check back later.');
            }
        } catch (error) {
            console.error('Error selecting plan:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="mt-20 mb-12">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingTiers.map((tier, index) => {
                    const isCurrentPlan = tier.plan === userPlan;
                    const isDisabled = tier.disabled || isCurrentPlan;

                    return (
                        <Card
                            key={index}
                            className={`bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between cursor-pointer ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <CardHeader className="text-center">
                                <CardTitle className="text-gray-100 text-2xl font-bold mb-2">{tier.title}</CardTitle>
                                <CardDescription className="text-3xl font-semibold text-purple-300">{tier.price}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col h-full">
                                <ul className="space-y-3 flex-grow">
                                    {tier.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start">
                                            {typeof feature === 'string' ? (
                                                <>
                                                    <Check className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-300 text-sm">{feature}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Wrench className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-400 text-sm">{feature.text}</span>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="flex justify-center pt-6">
                                <Button
                                    className={`w-full ${isDisabled ? 'bg-gray-700 text-gray-400' : 'bg-purple-600 hover:bg-purple-700 text-white'} transition-all duration-300 py-6`}
                                    disabled={isDisabled || isLoading}
                                    onClick={() => handlePlanSelection(tier.plan)}
                                >
                                    {isLoading ? 'Processing...' : isCurrentPlan ? 'Current Plan' : tier.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </section>
    )
}
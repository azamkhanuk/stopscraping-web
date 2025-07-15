import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Check, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pricingTiers = [
  {
    title: 'Free Tier',
    price: '0',
    features: ['Static list of OpenAI IPs, updated weekly', 'Limited API calls (10/day)'],
    cta: 'Get Started',
    disabled: false,
    plan: 'Free',
  },
  {
    title: 'Basic Tier',
    price: '£5/month',
    features: [
      'Daily IP updates',
      'Increased API call limit (100/day)',
      'Additional AI company IPs as they get added in',
      { text: 'Email notifications for significant list changes', inProgress: true },
    ],
    cta: 'Subscribe Now',
    disabled: false,
    plan: 'Basic',
  },
  {
    title: 'Pro Tier',
    price: '£15/month',
    features: [
      'Everything in Basic',
      'Real-time IP updates',
      'Unlimited API calls',
      'Analytics on blocked requests',
      'Priority support',
    ],
    cta: 'Coming Soon',
    disabled: true,
    plan: 'Pro',
  },
];

export function PricingPlans() {
  // Mock user state for showcase
  const isSignedIn = true;
  const userPlan = null; // Mock that user has no plan selected yet

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // If the user is on the Basic plan, don't show any pricing plans
  if (userPlan === 'Basic') {
    return null;
  }

  const handlePlanSelection = async (plan: string) => {
    setIsLoading(true);

    if (!isSignedIn) {
      navigate('/select-plan');
      return;
    }

    try {
      if (plan === 'Basic') {
        // Mock Stripe integration - for showcase, just navigate to success page
        alert('This is a demo - Stripe integration would handle payment here');
        navigate('/success');
      } else if (plan === 'Free') {
        // Mock free plan selection - navigate to API keys
        alert('Free plan selected! This is a demo.');
        navigate('/api-keys');
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
    <section className='mt-20 mb-12'>
      <h2 className='mb-12 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300'>
        Choose Your Plan
      </h2>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        {pricingTiers.map((tier, index) => {
          const isCurrentPlan = tier.plan === userPlan;
          const isDisabled = tier.disabled || isCurrentPlan;

          return (
            <Card
              key={index}
              className={`bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between cursor-pointer ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <CardHeader className='text-center'>
                <CardTitle className='mb-2 text-2xl font-bold text-gray-100'>
                  {tier.title}
                </CardTitle>
                <CardDescription className='text-3xl font-semibold text-purple-300'>
                  {tier.price}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col h-full'>
                <ul className='flex-grow space-y-3'>
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className='flex items-start'>
                      {typeof feature === 'string' ? (
                        <>
                          <Check className='flex-shrink-0 mt-1 mr-3 w-5 h-5 text-green-400' />
                          <span className='text-sm text-gray-300'>{feature}</span>
                        </>
                      ) : (
                        <>
                          <Wrench className='flex-shrink-0 mt-1 mr-3 w-5 h-5 text-gray-400' />
                          <span className='text-sm text-gray-400'>{feature.text}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='flex justify-center pt-6'>
                <Button
                  className={`w-full ${isDisabled ? 'text-gray-400 bg-gray-700' : 'text-white bg-purple-600 hover:bg-purple-700'} transition-all duration-300 py-6`}
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
  );
}

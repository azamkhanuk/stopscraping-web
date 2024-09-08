import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        try {
            const { userId, stripeCustomerId } = req.body;

            if (!userId || !stripeCustomerId) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            const subscriptions = await stripe.subscriptions.list({
                customer: stripeCustomerId,
                status: 'all',
            });

            let activeSubscription = subscriptions.data.find(sub => sub.status === 'active');

            if (!activeSubscription) {
                // Update user metadata to Free plan
                // This assumes you're using Clerk for user management
                const clerk = require('@clerk/clerk-sdk-node');
                await clerk.users.updateUser(userId, {
                    unsafeMetadata: { pricingPlan: 'Free' },
                });

                return res.status(200).json({ message: 'User downgraded to Free plan' });
            }

            res.status(200).json({ message: 'Subscription status checked' });
        } catch (error) {
            console.error('Error checking subscription status:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        try {
            const { subscriptionId } = req.body;
            const userId = req.headers.authorization?.split(' ')[1];

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            if (!subscriptionId) {
                return res.status(400).json({ error: 'Subscription ID is required' });
            }

            // Fetch the Stripe Customer ID from user metadata
            const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
                },
            }).then(res => res.json());

            const customerId = user.unsafe_metadata.stripeCustomerId;

            if (!customerId) {
                return res.status(404).json({ error: 'No Stripe customer found for this user' });
            }

            // Verify that the subscription belongs to the user
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);

            if (subscription.customer !== customerId) {
                return res.status(403).json({ error: 'Forbidden' });
            }

            const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
                cancel_at_period_end: true,
            });

            res.status(200).json({ success: true, subscription: updatedSubscription });
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
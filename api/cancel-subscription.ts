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

            const subscriptions = await stripe.subscriptions.search({
                query: `metadata['clerkUserId']:'${userId}' AND id:'${subscriptionId}'`,
            });

            if (subscriptions.data.length === 0) {
                return res.status(404).json({ error: 'Subscription not found or does not belong to this user' });
            }

            const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
                cancel_at_period_end: true,
            });

            res.status(200).json({ success: true, subscription: updatedSubscription });
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            if (error instanceof Stripe.errors.StripeError) {
                res.status(error.statusCode || 500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        try {
            const userId = req.headers.authorization?.split(' ')[1];

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Fetch the Stripe customer ID using the Clerk user ID
            const customers = await stripe.customers.search({
                query: `metadata['clerkUserId']:'${userId}'`,
                limit: 1
            });

            if (customers.data.length === 0) {
                return res.status(404).json({ error: 'No Stripe customer found for this user' });
            }

            const customerId = customers.data[0].id;

            const subscriptions = await stripe.subscriptions.list({
                customer: customerId,
                status: 'active',
                expand: ['data.default_payment_method'],
            });

            if (subscriptions.data.length > 0) {
                const subscription = subscriptions.data[0];
                res.status(200).json({
                    subscription: {
                        id: subscription.id,
                        current_period_end: subscription.current_period_end,
                        cancel_at_period_end: subscription.cancel_at_period_end,
                        price: {
                            unit_amount: subscription.items.data[0].price.unit_amount,
                            currency: subscription.items.data[0].price.currency,
                        },
                    },
                });
            } else {
                res.status(404).json({ error: 'No active subscription found' });
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end('Method Not Allowed');
    }
}
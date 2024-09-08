import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log('Received request:', req.method, req.url);
    console.log('Request body:', req.body);

    if (req.method === 'POST') {
        try {
            const { plan } = req.body;

            if (!plan) {
                throw new Error('No plan specified');
            }

            let priceId: string;
            if (plan === 'Basic') {
                priceId = process.env.STRIPE_BASIC_PRICE_ID!;
            } else if (plan === 'Pro') {
                priceId = process.env.STRIPE_PRO_PRICE_ID!;
            } else {
                throw new Error('Invalid plan selected');
            }

            console.log('Creating Stripe session with priceId:', priceId);
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/`,
            });

            console.log('Created Stripe session:', session);
            res.status(200).json({ sessionId: session.id });
        } catch (err: any) {
            console.error('Error in create-checkout-session:', err);
            res.status(500).json({ error: err.message });
        }
    } else {
        console.log('Method not allowed:', req.method);
        res.setHeader('Allow', 'POST');
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
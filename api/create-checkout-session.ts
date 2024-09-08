import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20', // This is the latest version as of early 2024
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        try {
            console.log('Received request body:', req.body);
            const { plan } = req.body;

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
            res.status(200).json({ url: session.url });
        } catch (err: any) {
            console.error('Error in create-checkout-session:', err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
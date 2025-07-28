import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        try {
            const { sessionId } = req.body;

            const session = await stripe.checkout.sessions.retrieve(sessionId, {
                expand: ['customer']
            });

            if (session.payment_status === 'paid') {
                const basicPlanAmount = 500; // $5.00
                if (session.amount_total === basicPlanAmount) {
                    // Check if customer exists and is of type Stripe.Customer
                    if (session.customer && typeof session.customer !== 'string' && 'id' in session.customer) {
                        res.status(200).json({
                            success: true,
                            plan: 'Basic',
                            customerId: session.customer.id
                        });
                    } else {
                        throw new Error('Invalid customer data');
                    }
                } else {
                    throw new Error('Unknown price amount');
                }
            } else {
                res.status(400).json({ success: false, message: 'Payment not completed' });
            }
        } catch (err: any) {
            res.status(500).json({ success: false, error: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
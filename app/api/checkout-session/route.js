import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { price, planName } = await req.json();
        const unitAmount = Math.round(parseFloat(price) * 100);

        if (isNaN(unitAmount) || unitAmount <= 0) {
            throw new Error('Invalid price value provided');
        }

        const params = {
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: planName,
                        },
                        unit_amount: unitAmount,
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/result?session_id={CHECKOUT_SESSION_ID}`,
        };

        const checkoutSession = await stripe.checkout.sessions.create(params);
        return NextResponse.json(checkoutSession);
    } catch (error) {
        console.error('Error creating checkout session:', error.message, error.stack);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

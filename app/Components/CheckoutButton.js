import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutButton = ({ price, planName }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        // Ensure price is a valid number
        const parsedPrice = parseFloat(price);

        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            console.error('Invalid price provided');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: parsedPrice, planName }),
            });

            if (!res.ok) {
                console.error('Failed to create checkout session');
                setLoading(false);
                return;
            }

            const session = await res.json();
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
            await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (error) {
            console.error('Error during checkout process:', error);
            setLoading(false);
        }
    };

    return (
        <button onClick={handleClick} disabled={loading} className="mt-4 bg-darkgreen text-white px-4 py-2 rounded">
            {loading ? 'Loading...' : `Subscribe to ${planName}`}
        </button>
    );
};

export default CheckoutButton;

import React from 'react';
import CheckoutButton from './CheckoutButton';

const PricingPlan = ({ planName, price, description, features }) => {
    if (typeof price !== 'number' || isNaN(price)) {
        console.error('Invalid price passed to PricingPlan');
        return null; // Avoid rendering if the price is invalid
    }

    return (
        <div className="md:p-8 lg:p-14 flex flex-col justify-center items-center border border-gray-200 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900">{planName}</h3>
            <p className="mt-4 text-2xl font-extrabold text-gray-900">${price}/month</p> {/* Adding the $ sign here */}
            <p className="mt-2 text-base text-gray-600">{description}</p>
            <ul className="mt-4 text-sm text-gray-600">
                {features.map((feature, index) => (
                    <li key={index} className="mt-2">
                        {feature}
                    </li>
                ))}
            </ul>
            <CheckoutButton price={price} planName={planName} />
        </div>
    );
};

export default PricingPlan;

import React from 'react';

const PricingPlan = ({ planName, price, description, features }) => {
  return (
    <div className="md:p-8 lg:p-14 flex flex-col justify-center items-center border border-gray-200 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-900">{planName}</h3>
      <p className="mt-4 text-2xl font-extrabold text-gray-900">{price}</p>
      <p className="mt-2 text-base text-gray-600">{description}</p>
      <ul className="mt-4 text-sm text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="mt-2">
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-8 px-6 py-2 bg-darkgreen text-white rounded-lg hover:bg-green-700">
        Get Started
      </button>
    </div>
  );
};

export default PricingPlan;

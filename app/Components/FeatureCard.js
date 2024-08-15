import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeatureCard = ({ icon, bgColor, title, description }) => {
  return (
    <div className="md:p-8 lg:p-14 flex flex-col justify-center items-center">
      <div className={`w-14 h-14 rounded-full ${bgColor} flex justify-center items-center`}>
        <FontAwesomeIcon icon={icon} className="text-3xl text-gray-900" />
      </div>
      <h3 className="mt-12 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-5 text-base text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;

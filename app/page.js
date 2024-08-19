'use client';

import Header from '@/app/Components/Header';
import Link from 'next/link';
import FeatureCard from '@/app/Components/FeatureCard';
import { faKeyboard, faGlobe, faBrain } from '@fortawesome/free-solid-svg-icons';
import PricingPlan from '@/app/Components/PricingPlan';
import Image from 'next/image';
import Footer from './Components/Footer';
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';







export default function Home() {

  const { isSignedIn } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (isSignedIn) {
      router.push('/generate'); // Redirect to /generate if the user is logged in
    } else {
      router.push('/signin'); // Redirect to the login page if the user is not logged in
    }
  };

  if (!mounted) return null;


  return (
    <div className='w-full'>
      <Header />
      <section className='w-full flex flex-col md:flex-row pt-20 items-center justify-center bg-lightgreen'>
        <article className='px-28'>
          <h1 className='text-6xl mb-5'>Create Flashcard from your text</h1>
          <p className='mb-10 text-2xl'>
            The easiest way to create flashcard from scratch!
          </p>
          <a
            onClick={handleGetStarted}
            className='border-2 border-solid border-darkgreen px-20 py-4 rounded bg-darkgreen text-white ml-5 cursor-pointer'
          >
            Get Started!
          </a>
        </article>
        <article>
          <Image width={500} height={500} className="w-full" src='/hero.svg' alt='a woman holding a pc and smiling' />
        </article>
      </section>
      <section id="new-features" className="py-8 bg-white sm:py-10 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
              Boost Your Productivity
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
              Enhance your workflow with advanced features
            </p>
          </div>
          <div
            className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24"
          >
            <FeatureCard
              icon={faKeyboard}
              bgColor="bg-purple-200"
              title="Easy Text Input"
              description="Just paste your text and we will generate flashcards for you. Creating flashcards has never been easier!"
            />
            <FeatureCard
              icon={faGlobe}
              bgColor="bg-teal-200"
              title="Accessible Anywhere"
              description="Access your flashcards from anywhere, anytime. Our service is available on all devices."
            />
            <FeatureCard
              icon={faBrain}
              bgColor="bg-yellow-200"
              title="Smart Flashcard Generation"
              description="Our AI will generate flashcards for you based on your text. You can also customize the flashcards to your liking."
            />
          </div>
        </div>
      </section>
      <section id="pricing" className="py-8 bg-lightgreen sm:py-10 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
              Choose Your Plan
            </h2>
            <p className="mt-4 text-base leading-7 text-black sm:mt-8">
              Find the plan that&apos;s right for you and start creating flashcards today.
            </p>
          </div>
          <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
            <PricingPlan
              planName="Free"
              price={0}  // Numeric value
              description="Create up to 10 flashcards per month."
              features={["Access to basic features"]}
            />
            <PricingPlan
              planName="Basic"
              price={5}  // Numeric value
              description="Create up to 100 flashcards per month."
              features={["Access to all features"]}
            />
            <PricingPlan
              planName="Pro"
              price={10}  // Numeric value
              description="Unlimited flashcards per month."
              features={["Access to all features"]}
            />

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
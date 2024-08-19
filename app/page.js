'use client'

import Header from '@/app/Components/Header';
import Link from 'next/link';
import FeatureCard from '@/app/Components/FeatureCard';
import { faKeyboard, faGlobe, faBrain } from '@fortawesome/free-solid-svg-icons';
import PricingPlan from '@/app/Components/PricingPlan';
import Image from 'next/image';
import Footer from './Components/Footer';






{/*}
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Box, Button, Grid } from "@mui/material";
import App from "next/app";
import Head from "next/head";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";


export default function Home() {
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit">
              <Link href="/signin" passHref>
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/signup" passHref>
                Sign Up
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" gutterBottom>
          Create Flashcard from your text
        </Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to create flashcard from your scratch!
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} color="primary">
          Get Started
        </Button>
      </Box>
      
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ textAlign: 'center', mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy text input
            </Typography>
            <Typography>
              Just paste your text and we will generate flashcards for you.
            </Typography>
            <Typography>Creating flashcards has never been easier!</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Accessible anywhere
            </Typography>
            <Typography>
              Access your flashcards from anywhere, anytime.
            </Typography>
            <Typography>
              Our service is available on all devices.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Smart flashcard generation
            </Typography>
            <Typography>
              Our AI will generate flashcards for you based on your text.
            </Typography>
            <Typography>
              You can also customize the flashcards to your liking.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} sx={{ textAlign: 'center', mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Free
            </Typography>
            <Typography>
              Create up to 10 flashcards per month.
            </Typography>
            <Typography>
              Access to basic features.
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} color="primary">
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Basic - $5/month
            </Typography>
            <Typography>
              Create up to 100 flashcards per month.
            </Typography>
            <Typography>
              Access to all features
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} color="primary">
              Subscribe
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Pro - 10$/month
            </Typography>
            <Typography>
              Unlimited flashcards per month.
            </Typography>
            <Typography>
              Access to all features
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} color="primary">
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
*/}


export default function Home() {

  return (
    <div className='w-full'>
      <Header />
      <section className='w-full flex flex-col md:flex-row pt-20 items-center justify-center bg-lightgreen'>
        <article className='px-28'>
          <h1 className='text-6xl mb-5'>Create Flashcard from your text</h1>
          <p className='mb-10 text-2xl'>
            The easiest way to create flashcard from scratch!
          </p>
          <Link className='border-2 border-solid border-darkgreen px-20 py-4 rounded bg-darkgreen text-white ml-5' href='/signup'>Get Started!</Link>
        </article>
        <article>
          <Image  width={500} height={500} className="w-full" src='/hero.svg' alt='a woman holding a pc and smiling' />
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
            price="$0/month"
            description="Create up to 10 flashcards per month."
            features={["Access to basic features"]}
          />
          <PricingPlan
            planName="Basic"
            price="$5/month"
            description="Create up to 100 flashcards per month."
            features={["Access to all features"]}
          />
          <PricingPlan
            planName="Pro"
            price="$10/month"
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
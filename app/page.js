'use client'

import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Box, Button, Grid } from "@mui/material";
import App from "next/app";
import Head from "next/head";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

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
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
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
      {/* features section */}
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
      {/* Pricing Section */}
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

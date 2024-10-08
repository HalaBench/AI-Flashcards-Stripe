"use client";

import { Box } from "@mui/material";
import { SignIn } from "@clerk/clerk-react";
import Header from '@/app/Components/Header';
import Footer from "@/app/Components/Footer";

export default function signInPage() {

    return(
        <div>
            <Header />

            <Box className='w-full flex pt-20 items-center justify-center gap-10 pb-32'>
                <p className="w-1/3 text-5xl mb-10">Sign In And Start Generating Your Flashcards!</p>
                <SignIn fallbackRedirectUrl="/generate" />
            </Box>
            <Footer />
        </div>
        
    )

}
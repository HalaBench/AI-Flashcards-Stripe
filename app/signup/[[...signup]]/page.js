"use client";

import { Box, Button } from "@mui/material";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { SignedIn, SignedOut, SignUp, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

export default function signUnPage() {

    return (
        <div>
            <Header />

            <Box className='w-full flex pt-20 items-center justify-center gap-10 pb-20'>
                <p className="w-1/3 text-5xl mb-10">Sign Un And Start Generating Your Flashcards!</p>
                <SignUp />
            </Box>
            <Footer />
        </div>
    )

}
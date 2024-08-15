"use client";

import { Box, Button } from "@mui/material";
import { AppBar, Container, Toolbar, Typography} from "@mui/material";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import Header from '@/app/Components/Header';

export default function signInPage() {

    return(
        <div className="w-full">
            {/* <AppBar position="static" sx={{backgroundColor: "#3f51b5"}}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    <SignedOut>
                        <Button color="inherit">
                          <Link  href="/signin" passHref> Login </Link>
                        </Button>
                        <Button color="inherit">
                            <Link  href="/signup" passHref> Sign Up </Link>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar> */}
            <Header className='w-full'/>

            <Box className='w-full flex flex-col pt-20 items-center justify-center bg-lightgreen mx-2 pb-20'>
                <Typography className="text-5xl mb-10">Sign In to Get Back to Your Flashcards</Typography>
                <SignIn />
            </Box>
        </div>
        
    )

}
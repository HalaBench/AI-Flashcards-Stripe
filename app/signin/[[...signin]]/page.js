"use client";

import { Box } from "@mui/material";
import { Typography} from "@mui/material";
import { SignIn } from "@clerk/clerk-react";
import Header from '@/app/Components/Header';
import Footer from "@/app/Components/Footer";

export default function signInPage() {

    return(
        <div>
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
            <Header />

            <Box className='w-full flex pt-20 items-center justify-center gap-10 pb-20'>
                <Typography className="w-1/3 text-5xl mb-10">Sign In And Start Generating Your Flashcards!</Typography>
                <SignIn />
            </Box>
            <Footer />
        </div>
        
    )

}
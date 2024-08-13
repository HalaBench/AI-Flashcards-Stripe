"use client";

import { Box, Button } from "@mui/material";
import { AppBar, Container, Toolbar, Typography} from "@mui/material";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

export default function signInPage() {

    return(
        <Container maxWidth="100vw">
            <AppBar position="static" sx={{backgroundColor: "#3f51b5"}}>
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
            </AppBar>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Typography>Sign In</Typography>
                <SignIn />
            </Box>
        </Container>
    )

}
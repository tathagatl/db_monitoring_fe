import React from 'react'
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { auth } from '../config/firebase'

const Header = props => {

    const signout = () => {
        auth.signOut()
    }

    return (
        <AppBar color='secondary' position="static">
            <Toolbar>
                <Typography variant="h6" sx={{
                    flexGrow: 1,
                    letterSpacing: "2px",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'center'
                }}>
                    {"Monitoring Application"}
                </Typography>
                <Button
                    color="inherit"
                    onClick={signout}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header
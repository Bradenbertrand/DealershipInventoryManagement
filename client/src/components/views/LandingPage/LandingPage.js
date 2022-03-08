import React from 'react'
import { FaCode } from "react-icons/fa";
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import styles from './LandingPage.css'
function LandingPage() {
    return (
        <Grow in>
        <Container style={{ marginTop: "5vh", maxWidth: "70vw"}} >
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={4}>
                    <div className="valuePropContainer">
                    <h1>Bring your dealership to the next level.</h1>
                    <h3>Manage, track, and post your inventory to the web with ease.</h3>
                    <div className="valuePropLinks">
                    <a className="signin" href="/login">Sign in</a><p className="spacer">&nbsp;&nbsp;&nbsp;&nbsp;{'>'}{'>'}&nbsp;&nbsp;&nbsp;&nbsp;</p><a className="createAccount" href="/register">Create an account</a>
                    </div>
                    </div> 
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img className="mockup" src='./PixelBookGo.png'></img>
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default LandingPage

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { auth } from '../config/firebase'
import LoadingPage from './LoadingPage'

export default function Login() {

    const theme = useTheme()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [triedLoggingIn, setTriedLoggingIn] = useState(false)

    const isEmailVerified = useSelector(state => state.auth.isEmailVerified)
    const loginError = useSelector(state => state.auth.loginError)

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget

        if (name === 'userEmail') {
            setEmail(value)
        }
        else if (name === 'userPassword') {
            setPassword(value)
        }
    }

    const signInWithEmailAndPasswordHandler = (event) => {
        auth.signOut()
        event.preventDefault();
        setError('')
        setIsLoggingIn(true);
        setTriedLoggingIn(true);
        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                setIsLoggingIn(false)
            })
            .catch(error => {
                setIsLoggingIn(false)
                setError('Error signing in with password and email!')
                console.error('Error signing in with password and email', error)
            })
    }

    useEffect(() => {
        setError(loginError)
    }, [loginError])

    if (isLoggingIn) {
        return <LoadingPage />
    }

    return (
        <Container sx={{
            marginTop: '4rem'
        }} component='main' maxWidth='xs'>
            <Paper sx={{padding: '1rem'}}>
                <CssBaseline />
                <div sx ={{
                    marginTop: theme.spacing(8),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: theme.spacing(3)
                }} >
                    <Typography sx={{margin: 'auto'}} component='h1' variant='h6'>
                        {'Database Monitoring'}
                    </Typography>
                    <form sx ={{
                        width: '100%',
                        marginTop: theme.spacing(1),
                    }} noValidate>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='userEmail'
                            label='Email Address'
                            name='userEmail'
                            autoComplete='email'
                            autoFocus
                            value={email}
                            onChange={(event) => onChangeHandler(event)}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='userPassword'
                            label='Password'
                            type='password'
                            id='userPassword'
                            autoComplete='current-password'
                            value={password}
                            onChange={(event) => onChangeHandler(event)}
                        />
                        {!!error && <Typography variant='body1' color='error'>{error}</Typography>}
                        {
                            triedLoggingIn &&
                            !isEmailVerified &&
                            !error &&
                            loginError.length === 0 &&
                            <Typography variant='body1' color='error'>{'Please verify email to login.'}</Typography>}
                        {/* <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    /> */}
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='secondary'
                            sx ={{
                                margin: theme.spacing(3, 0, 2),
                            }}
                            onClick={(event) => signInWithEmailAndPasswordHandler(event)}
                        >
                            {'Sign In'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <RouterLink style={{marginRight: '1rem'}} to='/reset'>
                                    {'Forgot password?'}
                                </RouterLink>
                            </Grid>
                                <Grid item>
                                    <RouterLink to='/signup'>
                                        {"Don't have an account? Sign Up"}
                                    </RouterLink>
                                </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Container>
    )
}
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { auth } from '../config/firebase'
import LoadingPage from './LoadingPage'

export default function LoginPage() {

    const theme  = useTheme()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [emailVerificationSent, setEmailVerificationSent] = useState(false)

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget

        if (name === 'userEmail') {
            setEmail(value)
        }
        else if (name === 'userPassword') {
            setPassword(value)
        }
        else if (name === 'userConfirmPassword') {
            setConfirmPassword(value)
        }
    }

    const createUserWithEmailAndPasswordHandler = async (event) => {
        setError('')
        setEmailVerificationSent(false)
        event.preventDefault()
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setIsSigningUp(true)
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            auth.signOut()
            setEmailVerificationSent(true)
            setIsSigningUp(false)
        }
        catch (error) {
            setIsSigningUp(false)
            setError('Error Signing up with email and password')
            return
        }

        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setError('')
    }

    if (isSigningUp) {
        return <LoadingPage />
    }

    return (
        <Container  sx={{
            marginTop: '4rem'
        }} component='main' maxWidth='xs'>
            <Paper  sx={{padding: '1rem'}}>
                <CssBaseline />
                <div sx={{
                    marginTop: theme.spacing(8),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: theme.spacing(3)
                }}>
                    <Typography sx={{margin: 'auto'}} component='h1' variant='h6'>
                        {'Database Monitoring'}
                    </Typography>
                    <form sx={{
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
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='userConfirmPassword'
                            label='Confirm Password'
                            type='password'
                            id='userConfirmPassword'
                            autoComplete='current-password'
                            value={confirmPassword}
                            onChange={(event) => onChangeHandler(event)}
                        />
                        {!!error && <Typography variant='body1' color='error'>{error}</Typography>}
                        {!!emailVerificationSent && <Typography variant='body1' sx={{
                            color: 'green'
                        }} color='primary'>{'Signup Successful. Go to login page and login.'}</Typography>}
                        <Button
                            type='submit'
                            fullWidth
                            variant='outlined'
                            color='secondary'
                            sx={{
                                margin: theme.spacing(3, 0, 2),
                            }}
                            onClick={(event) => createUserWithEmailAndPasswordHandler(event)}
                        >
                            {'Sign Up'}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <RouterLink to='/'>
                                    {'Already have an account? Sign In'}
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Container>
    )
}
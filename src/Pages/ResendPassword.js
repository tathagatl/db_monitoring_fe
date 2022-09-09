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
import Link from '@mui/material/Link'

import { auth } from '../config/firebase'

export default function LoginPage() {

    const theme = useTheme()

    const [email, setEmail] = useState('')
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false)
    const [error, setError] = useState(null)

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget

        if (name === 'userEmail') {
            setEmail(value)
        }
    }

    const sendResetEmail = event => {
        event.preventDefault()
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true)
                setTimeout(() => { setEmailHasBeenSent(false) }, 3000)
            })
            .catch((e) => {
                setError('Error resetting password')
                setTimeout(() => { setError(null) }, 3000)
            })
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
                }} >
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
                        {!!error && <Typography variant='body1' color='error'>{error}</Typography>}
                        {!!emailHasBeenSent && <Typography variant='body1' color='textSecondary'>{'An email has been sent'}</Typography>}
                        <Button
                            type='submit'
                            fullWidth
                            variant='outlined'
                            color='secondary'
                            sx={{
                                margin: theme.spacing(3, 0, 2),
                            }}
                            onClick={(event) => sendResetEmail(event)}
                        >
                            {'Send Reset Link'}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href='#' variant='body2'>
                                    <RouterLink to='/'>
                                        {'Go back to Sign In page'}
                                    </RouterLink>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Container>
    )
}
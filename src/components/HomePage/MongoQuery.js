import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import axios from 'axios'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'

function MongoQuery() {
    const [query, setQuery] = useState('')
    const [output, setOutput] = useState([])
    const runQuery = async () => {
        const response = await axios.post('http://localhost:5000/mongo', {
            query
        })
        setOutput(response.data['response'])
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Container sx={{ mt: '1rem' }}>
                <Grid container columns={12}>
                    <Grid item sm={12} md={4} sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <TextField id="outlined-basic" value={query} onChange={e => setQuery(e.target.value)} label="Query" variant="outlined" sx={{ mb: '0.5rem' }} />
                        <Button variant="outlined" color='secondary' onClick={runQuery}>Run</Button>
                    </Grid>
                    <Grid item sm={12} md={8} sx={{
                        display: 'flex',
                        pl: '0.5rem'
                    }}>
                        {output.length === 0 && <Paper sx={{ flexGrow: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="subtitle2" gutterBottom component="div" >
                                {'Execute'}
                            </Typography>

                        </Paper>}
                        {output.length > 0 &&           <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    {output.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {row.map(cell => (
                                                <TableCell align="right">{cell}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default MongoQuery;

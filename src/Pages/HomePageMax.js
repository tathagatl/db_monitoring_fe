import React, { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Chart } from "react-google-charts";

import Query from '../components/HomePage/Query';
import Header from '../components/Header';
import OracleDbStatus from '../components/HomePage/OracleDbStatus';
import QueryNLP from '../components/HomePage/QueryNLP';
import Visualisation from '../components/HomePage/Visualisation';
import MongoQuery from '../components/HomePage/MongoQuery';

const HomePageMax = () => {

    const [query, setQuery] = useState('')
    const [output, setOutput] = useState([])
    const runQuery = async () => {
        const response = await axios.post('http://localhost:5000/query', {
            query
        })
        setOutput(response.data['response'])
    }

    const [query1, setQuery1] = useState('')
    const [value, setValue] = React.useState('Line');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const runQuery1 = async () => {
        const response = await axios.post('http://localhost:5000/visualisation', {
            query
        })
        setOutput(response.data['response'])
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Header />
            <Grid sx={{ padding: '1rem' }} container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <TextField id="outlined-basic" value={query} onChange={e => setQuery(e.target.value)} label="Query" variant="outlined" sx={{ mb: '0.5rem' }} />
                        <Button variant="outlined" color='secondary' sx={{ mb: '0.5rem' }} onClick={runQuery}>Run</Button>
                        <Divider />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <TextField id="outlined-basic" value={query} onChange={e => setQuery(e.target.value)} label="Query" variant="outlined" sx={{ mb: '0.5rem' }} />
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Chart Type</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Line" control={<Radio />} label="Line Graph" />
                                <FormControlLabel value="Bar" control={<Radio />} label="Bar Graph" />
                                <FormControlLabel value="PieChart" control={<Radio />} label="Pie Chart" />
                            </RadioGroup>
                        </FormControl>
                        <Button variant="outlined" color='secondary' onClick={runQuery}>Run</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Paper sx={{ p: '1rem', height: '100%' }}>Run Query</Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomePageMax
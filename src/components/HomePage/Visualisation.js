import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import axios from 'axios'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Chart } from "react-google-charts";

function Visualisation() {
    const [query, setQuery] = useState('')
    const [output, setOutput] = useState([])
    const [value, setValue] = React.useState('ColumnChart');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const runQuery = async () => {
        const response = await axios.post('http://localhost:5000/visualisation', {
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
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Graph Type</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="ColumnChart" control={<Radio />} label="Column" />
                                <FormControlLabel value="Line" control={<Radio />} label="Line" />
                                <FormControlLabel value="PieChart" control={<Radio />} label="Pie" />
                            </RadioGroup>
                        </FormControl>
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
                        {output.length > 0 &&
                            <Chart
                                chartType={value}
                                width="100%"
                                height="400px"
                                data={output}
                            />}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Visualisation;

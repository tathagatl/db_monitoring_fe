import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import LoadingPage from '../../Pages/LoadingPage'
import { useInterval } from '../../utils/useInterval'

const OracleDbStatus = () => {

    const [dbStatus, setDbStatus] = useState([])

    const runQuery = async () => {
        const response = await axios.get('http://localhost:5000/oracledbstatus')
        setDbStatus(response.data['response'])
    }

    useInterval(runQuery, 10000)

    useEffect(() => {
        runQuery()
    }, [])

    if (dbStatus.length === 0) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
            <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Database Name</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dbStatus.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                {row.status ? <ArrowUpwardIcon color='success' /> : <ArrowDownwardIcon color='error' />}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OracleDbStatus
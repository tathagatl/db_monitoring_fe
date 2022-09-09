import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Query from '../components/HomePage/Query';
import Header from '../components/Header';
import OracleDbStatus from '../components/HomePage/OracleDbStatus';
import QueryNLP from '../components/HomePage/QueryNLP';
import Visualisation from '../components/HomePage/Visualisation';
import MongoQuery from '../components/HomePage/MongoQuery';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{width: '100%'}}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const HomePage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Header />
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: '100%' }}
            >
                <Tabs value={value} onChange={handleChange}
                    orientation="vertical"
                    variant="scrollable"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                    textColor="secondary"
                    indicatorColor="secondary" >
                    <Tab label="Oracle" />
                    <Tab label="Database Status" />
                    <Tab label="Charts" />
                    <Tab label="MongoDB" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Query />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <OracleDbStatus />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Visualisation />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <MongoQuery />
                </TabPanel>
            </Box>

        </Box>
    );
}

export default HomePage
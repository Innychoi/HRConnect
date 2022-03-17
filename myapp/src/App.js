import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AppContext from './AppContext.js';
import MyProfile from './myprofile/MyProfile.js';
import Categories from './category/Category.js';
import AddPerson from './add/AddPerson.js';
import People from './people/People.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Roboto'
    },});

  const [linkedinList, setLinkedinList] = useState([]);
  const [connectedCount, setConnectedCount] = useState(0);

  useEffect(() => {
    axios.get('/linkedin')
      .then((res) => {
        console.log(res.data);
        setLinkedinList(res.data);
        res.data.forEach((item) => {
          if (item.connected) {
            setConnectedCount( (initial) => initial+1 );
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
      return setConnectedCount(0);
  },[])

  // eslint-disable-next-line no-unused-expressions
  // const value = useMemo(() => ( { linkedinList } ), [linkedinList]);
  const value = { linkedinList, setLinkedinList, connectedCount, setConnectedCount };
  console.log(value);

  return (

    <ThemeProvider theme={theme}>
      <AppContext.Provider value={value}>
        <Box
        sx={{
          margin: 'auto',
          width: 1200,
          height: '100vh',
        }}
        >
      <Grid container spacing={2}>
      <Grid item xs={12}>
      <Box mt={7} sx={{
          width: '100%',
          height: 80
        }}><Typography style={{ fontSize: 50, fontWeight: 900, color: '#1769aa' }}>
        HRconnect
      </Typography></Box>
      <Divider />
      </Grid>

      <Grid item xs={3}>
      <Box sx={{
          width: '100%',
          height: 500,
        }}>
          {linkedinList.length &&
          <MyProfile />}

      </Box>
      </Grid>
      <Grid item xs={9}>
      <Box sx={{
          width: '100%',
          height: 80,
        }}><Categories /></Box>
      <Box mt={5}sx={{
          width: '100%',
          height: '100vh'
        }}><People /></Box>
      </Grid>
    </Grid>
    </Box>
  </AppContext.Provider>
  </ThemeProvider>
  );
}

// export default App;

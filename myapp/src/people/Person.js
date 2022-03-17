import React, { useState, useContext } from 'react';
import axios from 'axios';
import AppContext from '../AppContext.js';
import EditInfo from './EditInfo.js';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Edit from '@mui/icons-material/Edit';
import LocationOn from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';

function Person(props) {
  const { linkedinList, setLinkedinList, setConnectedCount } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 80,
    borderRadius: 3,
    bgcolor: 'background.paper',
    boxShadow: 24,
    alignItems: 'center',
    p: 4
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  function handleConnect() {
    axios.put('/linkedin', {connected: !props.data.connected, '_id': props.data._id})
      .then((res) => {
        axios.get('/linkedin')
        .then((result) => {
          setLinkedinList(result.data);
          setConnectedCount( (initial) => initial+1 );
        })
      })
  }

  return(
    <>
  <Grid item xs={6}>
    <Card>
  <Box sx={{ p: 2 }}>
    <Grid container spacing={2} >
      <Grid item xs={2} >
    <Avatar {...stringAvatar(props.data.general.fullName)}  />
    </Grid>
    <Grid item xs={8} >
    <Stack spacing={0.5}>
      <Typography fontWeight={700}>{props.data.general.fullName}</Typography>
      <Typography variant="body2" color="text.secondary">
      <LocationOn sx={{color: 'grey', height: 15 , width: 'auto'}} /> {props.data.general.location}
      </Typography>
    </Stack>
    </Grid>
    <Grid item xs={1}>
    {props.data.connected && <CheckIcon size={0.5}/>}
    </Grid>
    <Grid item xs={1}  >
    <IconButton>
      <Edit sx={{ fontSize: 14 }} onClick={handleOpen}/>
    </IconButton>
    </Grid>
    </Grid>
  </Box>
  <Divider />
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
    <Box>
    {props.data.jobs.length && <Chip label={props.data.jobs[0].companyName} variant="outlined" sx={{ marginRight: 1}}/>}
    {props.data.background && <Chip label="Background" variant="outlined" />}
    </Box>

    <Button sx={{ borderRadius: 10, width: 100}} href={props.data.general.profileUrl} target="_blank" onClick={handleConnect}>Connect   </Button>
  </Stack>
 </Card>
  </Grid>
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <EditInfo data={props.data}/>
    </Box>
  </Modal>
  </>
  );
}

export default Person;
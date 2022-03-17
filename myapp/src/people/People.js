import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Person from './Person.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppContext from '../AppContext.js';
import AddPerson from '../add/AddPerson.js';
import Modal from '@mui/material/Modal';

function People() {
  const { linkedinList, setConnectedCount } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const style = {
    position: 'absolute',
    display: 'flex',
    'justify-content': 'space-evenly',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 100,
    borderRadius: 3,
    bgcolor: 'background.paper',
    boxShadow: 24,
    alignItems: 'center',
    p: 4
  };

  console.log(linkedinList);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
      // if (item.connected) {
      //   setConnectedCount( (initial) => initial+1 );
      // }

  return(
    <>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button sx={{ width: '100%', height: '100%', fontSize: 20}}  variant="contained" onClick={handleOpen}>+<br />Add</Button>
      </Grid>
      {linkedinList && linkedinList.map(item => <Person data={item} key={item._id}/>)}
    </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <Box sx={style}>
      <AddPerson open={setOpen} />
    </Box>
  </Modal>
  </>
  )
}

export default People;
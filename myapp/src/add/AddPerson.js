import React, { useState, useContext } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import AppContext from '../AppContext.js';

function AddPerson({ open }) {
  const { linkedinList, setLinkedinList } = useContext(AppContext);
  const [input, setInput] = useState('');
  const [background, setBackground] = useState(true);
  const [dreamJob, setDreamJob] = useState(true);

  function handleSubmit(e, a) {
    e.preventDefault();

    axios.post('/fetch', { url: input })
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        data['background'] = background;
        data['dreamJob'] = dreamJob;
        data['location'] = false;
        let list = linkedinList;
        list.push(data);
        setLinkedinList(list);
        open(false);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  function handleInput(e) {
    e.preventDefault();
    console.log(e.target.value);
    setInput(e.target.value);
    // axios.post('/fetch', )
  }

  function handleBG() {
    setBackground((initial) => !initial);
  }

  function handleDream() {
    setDreamJob((initial) => !initial);
  }


  return (

    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
    <Grid item xs={9}>
    <TextField id="outlined-basic" label="Add profile url" value={input} variant="outlined" sx={{width: 350, height: 50}} onChange={handleInput}/>
    </Grid>
    <Grid item xs={3}>
    <Button type="submit" sx={{ width: 90, height: 56, marginLeft: 2}} variant="contained">Add</Button>
    </Grid>
    </Grid>
    <Grid container spacing={2} mt={1}>
      <Grid item xs={4}>
      Background
      <Switch defaultChecked color="warning" onChange={handleBG}/>
      </Grid>
      <Grid item xs={4}>
      Dream Job
      <Switch defaultChecked color="warning" onChange={handleDream}/>
      </Grid>
      </Grid>
    </form>

  );
}

export default AddPerson;
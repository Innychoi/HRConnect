import React, { useState, useContext } from 'react';
import axios from 'axios';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import AppContext from '../AppContext.js';

function EditInfo(props) {
  const { setLinkedinList } = useContext(AppContext);

  function handleToggle() {
    console.log(props.key);
    axios.put('/linkedin', {background: !props.data.background, '_id': props.data._id})
      .then((res) => {
        axios.get('/linkedin')
        .then((result) => {
          setLinkedinList(result.data);
        })
      })
  }

  function handleDreamToggle() {
    console.log(props.key);
    axios.put('/linkedin', {dreamJob: !props.data.dreamJob, '_id': props.data._id})
      .then((res) => {
        axios.get('/linkedin')
        .then((result) => {
          setLinkedinList(result.data);
        })
      })
  }

  function handleDelete() {
    axios.delete('/linkedin', { params: { '_id': props.data._id}})
      .then((res) => {
        axios.get('/linkedin')
        .then((result) => {
          setLinkedinList(result.data);
        })
      })
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
      Background
      <Switch checked={props.data.background} color="warning" onChange={handleToggle}/>
      </Grid>
      <Grid item xs={4}>
      Dream Job
      <Switch checked={props.data.dreamJob} color="warning" onChange={handleDreamToggle}/>
      </Grid>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={3}>
      <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
      </Grid>
    </Grid>
  );
}

export default EditInfo;
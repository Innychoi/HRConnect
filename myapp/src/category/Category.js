import React, { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../AppContext.js';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function Categories() {
  const { setLinkedinList } = useContext(AppContext);
  // const [ selection, setSelection ] = useState({ 'background': false, 'location': false, 'dreamJob': false});


  const selectList = [
    { name: 'Background', value: 'background', id: 1},
    { name: 'Location', value: 'location', id: 2},
    { name: 'Dream job', value: 'dreamJob', id: 3}
  ];
  function handleChange(e, select) {
    console.log(select);
    let selected = {}
    select.forEach((item) => {
      selected[item.value] = true;
    });
    axios.get('/linkedin', { params: selected })
      .then((res) => {
        setLinkedinList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={selectList}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      onChange={handleChange}
      style={{ width: 700 }}
      renderInput={(params) => (
        <TextField {...params} label="Select..." placeholder="Search..." />
      )}
    />
  );
}

export default Categories;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top


import React, { useContext } from 'react';
import AppContext from '../AppContext.js';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function MyProfile() {
  const { linkedinList, connectedCount } = useContext(AppContext);

  return(
    <>
    <Avatar sx={{ width: 200, height: 200, marginBottom: 3}} src="https://media-exp1.licdn.com/dms/image/C4D03AQFLzOaYSzGD7w/profile-displayphoto-shrink_800_800/0/1638169557664?e=1652918400&v=beta&t=SJ6VFJCctaTRHHD2opLzw_K0Gpy_XG3zmPDrFFL4UaI" />
    <Typography fontWeight={700} fontSize={20} sx={{marginBottom: 1}}>Inny Choi</Typography>
    <Button variant="contained" href="https://www.linkedin.com/in/innychoi/" target="_blank" sx={{marginBottom: 2, marginTop: 2, width: 250}}>My Linkedin</Button>
          <Button variant="contained" href="https://www.linkedin.com/school/hack-reactor/people/" target="_blank" sx={{marginBottom: 3, width: 250}}>Browse HR Alumni</Button>
    <Typography fontWeight={500} fontSize={18}>status</Typography>
    <Stack spacing={1.5} mt={2}>
    <Chip size="big" avatar={<Avatar>{connectedCount}</Avatar>} label="Connected Alumni 🙂 " sx={{ width: 170}}/>
    <Chip size="big" avatar={<Avatar>129</Avatar>} label="Total connections 🙂 " sx={{ width: 170}}/>
    </Stack>
    </>
  );
}

export default MyProfile;

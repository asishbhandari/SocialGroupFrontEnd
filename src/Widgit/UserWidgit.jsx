import { Box, Typography, Divider, useTheme } from "@mui/material";
import WidgetWrapper from "../component/WidgetWrapper";
import UserImage from "../component/UserImage";
import '../pages/cssforpages.css'
import {ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined} from '@mui/icons-material';
import {  useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserWidgit = ({ userId, picturePath })=>{
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token= useSelector((state)=> state.token);
    const { palette }= useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`https://social-group-backend.onrender.com/verifiedUser/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };
    
      useEffect(() => {getUser()}, []); 
    
      if (!user) {
        return null;
      }
    
    return(
        <WidgetWrapper >
            <Box className="flexbetween" gap='0.5rem' pb='1.1rem' onClick={()=> navigate(`/profile/${userId}`)}>
                <Box className="flexbetween" gap='1rem'>
                    <UserImage image={picturePath} />
                    <Box>{/* <Box> style={{display: 'flex', flexDirection: 'column', paddingLeft: '0.5rem'}}> */}
                        <Typography variant="h4"  fontWeight='500' sx={{color: dark}}>
                            {`${user.firstName} ${user.lastName}`}
                            {/* User Name */}
                        </Typography>
                        <Typography color={medium}>
                            {`${user.friends.length} friends` }
                            {/* Friends */}
                        </Typography>
                    </Box>
                </Box>
                <ManageAccountsOutlined />
            </Box>

            <Divider />

            <Box p='1rem 0'>
                <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                    <LocationOnOutlined fontSize="large" sx={{color: main}}/>
                    <Typography color={medium}>
                        {`${user.location}`}
                        {/* test location */}
                    </Typography>
                </Box>
                <Box display='flex' alignItems='center' gap='1rem'>
                    <WorkOutlineOutlined fontSize="large" sx={{color: main}} />
                    <Typography color={medium}>
                        {`${user.occupation}`}
                        {/* test occupation */}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            <Box p='1rem 0'>
                <Box className="flexbetween" mb='0.5rem'>
                    <Typography color={medium}>Number of Profile Visits</Typography>
                    <Typography color={main} fontWeight='500'>{user.viewedProfile}</Typography>
                </Box>
                <Box className="flexbetween" >
                    <Typography color={medium}>Impressions of your profile</Typography>
                    <Typography color={main} fontWeight='500'>{user.impressions}</Typography>
                </Box>
            </Box>

            <Divider />
            <Box p='1rem 0 0 0'>
                <Typography fontSize='1rem' color={main} fontWeight='500' mb='0.5rem'>
                    Social Profile
                </Typography>
                <Box  className="flexbetween">
                    <Box className="flexbetween" gap='0.75rem'>
                        <img height='25px' width='30px' src={"https://social-group-backend.onrender.com/assets/instagram.png"} /> 
                        <Typography color={medium}>
                            Instagram
                        </Typography>
                    </Box>
                    <EditOutlined color={main} />
                </Box>

                <Box  className="flexbetween">
                    <Box className="flexbetween" gap='0.75rem'>
                        <img  height='30px' width='30px' src={"https://social-group-backend.onrender.com/assets/linkedin.png"}/> 
                        <Typography color={medium}>
                            LinkedIn
                        </Typography>
                    </Box>
                    <EditOutlined color={main} />
                </Box>
            </Box>
            
        </WidgetWrapper>
    )
}

export default UserWidgit;
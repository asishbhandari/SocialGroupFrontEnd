import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { setFriends } from "../State/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import '../pages/cssforpages.css';

const Friend= ({userPicturePath, name, location, friendId })=>{
    const { _id }= useSelector((state) => state.user)
    const friends = useSelector((state)=> state.user.friends)
    const token= useSelector((state)=> state.token)
    const dispatch= useDispatch();
    const navigate=useNavigate();

    const {palette}= useTheme();
    const primaryLight= palette.primary.light;
    const primaryDark= palette.primary.dark;
    const main= palette.neutral.main;
    const medium= palette.neutral.medium;
    
    const isfriend = friends.find((friend)=> friend._id === friendId);

    const patchFriend= async ()=>{
        const response= await fetch(`https://social-group-backend.onrender.com/verifiedUser/${_id}/${friendId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        console.log(data)
        dispatch(setFriends({friends: data}))
    };

    return(
        <Box className='flexbetween'>
            <Box className='flexbetween' gap='1rem'>
                <UserImage image={userPicturePath} size="55px"/>
                <Box 
                    onClick={()=> {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                        }}>
                    <Typography
                        color={main} variant="h5" fontWeight='500'
                        sx={{
                            "&:hover":{
                                color: palette.primary.light, 
                                cursor: "pointer"
                            },
                        }}>
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize='0.75rem'>
                        {location}
                    </Typography>
                </Box>
            </Box>
            <IconButton
                onClick={()=> patchFriend()}
                sx={{backgroundColor:primaryLight, p:'0.6rem'}}
            >
            {isfriend ? (
                <PersonRemoveOutlined sx={{color: primaryDark}}/>
            ):(
                <PersonAddOutlined sx={{color: primaryDark}} />
            )}
            </IconButton>
        </Box>
    );
};

export default Friend;
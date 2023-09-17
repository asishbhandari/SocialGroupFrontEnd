import { useDispatch, useSelector } from "react-redux";
import Friend from "../component/Friend";
import WidgetWrapper from "../component/WidgetWrapper";
import { Box, Typography, useTheme } from "@mui/material";
import { setFriends } from "../State/AuthSlice";
import { useEffect } from "react";


const FriendListWidgit = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state => state.token));
    const friends = useSelector((state) => state.user.friends);

    const getUserFriend = async () => {
        const response = await fetch(`https://social-group-backend.onrender.com/verifiedUser/${userId}/friends`,
        {
            method: "GET",
            headers: { Authorization : `Bearer ${token}`},
        });
        const data = await response.json();
        // console.log({data})
        dispatch(setFriends({ friends : data }));
    };

    useEffect(() => {getUserFriend()}, []);

    return(
        <WidgetWrapper m='2rem 0'>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{mb: "1.5rem"}}
            >
                Friends List
            </Typography>
            <Box sx={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
            {friends.map(
                ({_id,picturePath,firstName,lastName,location}) =>               
                <Friend 
                    key={_id}
                    userPicturePath={picturePath}
                    name={`${firstName} ${lastName}`}  
                    location={location}
                    friendId={_id}
                />
            )}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidgit;
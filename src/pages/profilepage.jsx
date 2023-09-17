import FriendListWidgit from "../Widgit/FriendListWidgit";
import UserWidgit from "../Widgit/UserWidgit";
import AllPostWidgit from "../Widgit/AllPostWidgit";
import SponsersWidgit from "../Widgit/SponsersWidgit";
import NavBar from './navbar';
import { Box, useMediaQuery} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage =()=>{
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const ismediumScreen= useMediaQuery('(min-width: 780px)');
    // const iswideScreen= useMediaQuery('(min-width: 1000px )');

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/verifiedUser/${userId}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"}
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {getUser()}, []);

    if (!user) {
        return null;
      }

    return(
        <div>
            <NavBar />
            <Box 
                display={ismediumScreen ? 'flex' :'block'} gap="2rem"
                padding='2rem 6%' width='100vw' justifyContent="center">
                <div style={{ flexBasis : ismediumScreen ? '26%' : undefined }}>
                    <UserWidgit userId={userId} picturePath={user.picturePath} />
                    <FriendListWidgit userId={userId} />
                </div>
                <div style={{ flexBasis : ismediumScreen ? '42%'  : undefined, 
                    marginTop:ismediumScreen ? undefined :'1rem'}}>
                    <SponsersWidgit />
                    <AllPostWidgit loggeduserId={userId} marginTop="0"/>
                </div>
                
            </Box>
        </div>
    )
}

export default ProfilePage;

// import { Margin } from '@mui/icons-material';
import UserWidgit from '../Widgit/UserWidgit';
// import WidgetWrapper from '../component/WidgetWrapper';
import UserPostWidgit from '../Widgit/UserPostWidgit';
import AllPostWidgit from '../Widgit/AllPostWidgit';
import NavBar from './navbar';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import SponsersWidgit from "../Widgit/SponsersWidgit";
import FriendListWidgit from '../Widgit/FriendListWidgit';

const HomePage =()=>{
    const {_id, picturePath} =useSelector((state)=> state.user)
    const ismediumScreen= useMediaQuery('(min-width: 780px)');
    const iswideScreen= useMediaQuery('(min-width: 1000px )');
    return(
        <div>
            <NavBar width="100%"/>
            <Box 
                display={iswideScreen ? 'flex' : (ismediumScreen ? 'flex':'block')} 
                padding='2rem 6%' width='100vw' justifyContent='space-between'>
                <div style={{ flexBasis : iswideScreen ? '26%' : (ismediumScreen? '36%' : undefined) }}>
                    <UserWidgit userId={_id} picturePath={picturePath}/>
                </div>
                <div style={{ flexBasis : iswideScreen ? '42%' : (ismediumScreen? '52%' : undefined), 
                    marginTop:iswideScreen ? undefined : (ismediumScreen? undefined :'1rem')}}>
                    <UserPostWidgit picturePath={picturePath} />
                    <AllPostWidgit loggeduserId={_id} />
                </div>
                {iswideScreen && (
                    <div style={{ flexBasis: '26%' }}>
                        <SponsersWidgit />
                        <FriendListWidgit userId={_id} />
                    </div>
                )}
                
            </Box>
        </div>
    )
}

export default HomePage;
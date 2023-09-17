import { useState } from "react";
import { Box, IconButton, Avatar, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material';
import { DarkMode, Search, Message, LightMode, Notifications, Help, Menu, Close, Directions } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../State/AuthSlice";
import { useNavigate } from "react-router-dom";
import './cssforpages.css';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [mobilerightnav, setmobilerightnav] = useState(false);
    const seachoptionbar = useMediaQuery('(min-width: 1000px)');
    const rightnavitems = useMediaQuery('(min-width: 780px)')
    const theme = useTheme();
    const light = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const fullname = `${user.firstName} ${user.lastName}`;
    // const fullname = 'test user';
    // console.log(mobilemenuon);


    return (
        <div className="flexbetween" style={{ backgroundColor: alt, padding: '1rem 6%'}}>
            <div className='flexbetween' style={{ gap: '1.75rem' }}>
                <Typography
                    fontWeight='bold'
                    fontSize="clamp(1rem, 1.5rem, 2rem)"
                    color='primary'
                    onClick={() => navigate('/home')}
                    sx={{
                        '&:hover': {
                            color: primaryLight,
                            cursor: 'pointer',
                        }
                    }}
                >
                    AIM SCOCIAL GROUP
                </Typography>
                {/* search option only for non mobile users */}
                {seachoptionbar && (
                    <div className="flexbetween" style={{ backgroundColor: light, borderRadius: "9px", gap: '0.7rem', padding: '0.1rem 1.5rem' }}>
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </div>
                )}
            </div>

            {/* desktop Nav */}
            {rightnavitems ?
                (
                    <div className="flexbetween" style={{ gap: '2rem' }}>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: '25px' }} />
                            )
                            }
                        </IconButton>
                        <Message sx={{ fontSize: '25px' }} />
                        <Notifications sx={{ fontSize: '25px' }} />
                        <Help sx={{ fontSize: '25px' }} />
                        <Box className="flexbetween">
                            <Avatar src={`http://localhost:3001/assets/${user.picturePath}`} />
                            <FormControl>
                                <Select
                                    value={fullname}
                                    sx={{ backgroundColor: light }}
                                    input={<InputBase />}
                                >
                                    <MenuItem >
                                        <Typography>{fullname}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        dispatch(setLogout())
                                        navigate('/')
                                    }}>
                                        logout
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                ) :
                (
                    <div>
                        {!mobilerightnav ? (
                            <div className="flexbetween">
                                <div className="flexbetween">
                                    <Avatar />
                                    <FormControl>
                                        <Select value={fullname} input={<InputBase />}>
                                            <MenuItem >
                                                <Typography>{fullname}</Typography>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    dispatch(setLogout())
                                                    navigate('/')
                                                }}>
                                                logout
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <IconButton onClick={() => setmobilerightnav(!mobilerightnav)}>
                                    <Menu />
                                </IconButton>
                            </div>
                        ) :
                            (
                                <div>
                                    <div className="flexbetween" style={{ marginRight: '60px' }}>
                                        <Avatar />
                                        <FormControl>
                                            <Select value={fullname} input={<InputBase />}>
                                                <MenuItem >
                                                    <Typography>{fullname}</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => {
                                                    dispatch(setLogout())
                                                    navigate('/')
                                                }}>
                                                    logout
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <Box position='fixed' right='0' top='0' zIndex='10' width='100px' backgroundColor={background}>
                                        <Box display='flex' justifyContent='center' p='1rem'>
                                            <IconButton onClick={() => setmobilerightnav(!mobilerightnav)}>
                                                <Close />
                                            </IconButton>
                                        </Box>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.2rem' }}>
                                            <IconButton onClick={() => dispatch(setMode())}>
                                                {theme.palette.mode === 'dark' ? (
                                                    <DarkMode sx={{ fontSize: '25px' }} />
                                                ) : (
                                                    <LightMode sx={{ color: dark, fontSize: '25px' }} />
                                                )
                                                }
                                            </IconButton>
                                            <Message sx={{ fontSize: '25px' }} />
                                            <Notifications sx={{ fontSize: '25px' }} />
                                            <Help sx={{ fontSize: '25px' }} />
                                        </div>
                                    </Box>
                                </div>
                            )
                        }
                    </div>
                )
            }


        </div>
    );
}

export default NavBar;


// (
//     <div className="flexbetween">
//     <div className="flexbetween">
//         <Avatar />
//         <FormControl>
//             <Select value={fullname} input={<InputBase />}>
//                 <MenuItem >
//                     <Typography>{fullname}</Typography>
//                 </MenuItem>
//                 <MenuItem onClick={()=> dispatch(setLogout())}>
//                     logout
//                 </MenuItem>
//             </Select>
//         </FormControl>
//     </div>
//     <IconButton onClick={()=> setmobilerightnav(!mobilerightnav)}>
//         <Menu />
//     </IconButton>
// </div>
// )


// {/*  mobile side Nav */}
// { !rightnavitems && mobilerightnav && (
//     <Box position='fixed' right='0' top='0' zIndex='10' width='150px' backgroundColor={background}>
//         <Box display='flex' justifyContent='flex-end' p='1rem'>
//             <IconButton onClick={()=> setmobilerightnav(!mobilerightnav)}>
//                 <Close />
//             </IconButton>
//         </Box>
//         <div  style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', gap: '1.2rem'}}>
//             <IconButton onClick={()=> dispatch(setMode())}>
//                 {theme.palette.mode === 'dark' ? (
//                     <DarkMode sx={{ fontSize: '25px'}} />
//                 ):(
//                     <LightMode sx={{ color: dark, fontSize:'25px'}}/>
//                 )
//                 }
//             </IconButton>
//             <Message sx={{ fontSize: '25px'}}/>
//             <Notifications sx={{ fontSize: '25px'}} />
//             <Help sx={{ fontSize: '25px'}} />
//         </div>
//     </Box>
// )}
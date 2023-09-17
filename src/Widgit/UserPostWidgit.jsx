
import { Box, Typography, useTheme, InputBase, Divider, IconButton, useMediaQuery, Button } from '@mui/material';
import WidgetWrapper from '../component/WidgetWrapper';
import '../pages/cssforpages.css';
import UserImage from '../component/UserImage';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { EditOutlined, DeleteOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, AttachFileOutlined, MoreHorizOutlined} from '@mui/icons-material';
import { setPosts } from '../State/AuthSlice';


const UserPostWidgit = ({ picturePath })=>{
    const dispatch= useDispatch();
    const {palette} = useTheme();
    const alt = palette.background.alt;
    const main= palette.primary.main;
    const medium = palette.neutral.medium;
    const mediumMain = palette.neutral.mediumMain;
    const { _id }= useSelector((state)=> state.user);
    const token = useSelector((state)=> state.token)
    const [isImage, setisImage] = useState(false);
    const [image, setImage]= useState(null);
    const [descp, setDescp]= useState('');
    const ismediumScreen= useMediaQuery('(min-width: 780px)');

    const handleUserPost= async ()=>{
            const formdata = new FormData();
            formdata.append("userId", _id);
            formdata.append("descripition", descp);
            if(image){
                formdata.append("picture", image);
                formdata.append("picturePath", image.name);
            }
            // console.log(_id)
    
            const response= await fetch('https://social-group-backend.onrender.com/post', {
                method: 'POST',
                headers: {Authorization : `Bearer ${token}`},
                body: formdata,
            })
            const allPost= await response.json();
            const reversedata= allPost.reverse();
            dispatch(setPosts({data : reversedata}));
            setImage(null);
            setDescp('');
            // console.log(allPost);
    }

    return(
        <WidgetWrapper mb="2rem">
            <div className='flexbetween' style={{ gap:'1.5rem'}} >
                <UserImage image={picturePath} />
                <InputBase 
                    placeholder="What's on your mind"
                    onChange={(e)=> setDescp(e.target.value)}
                    value={descp}
                    sx={{borderRadius: '2rem', backgroundColor: palette.neutral.light , width:'100%', padding: '1rem 2rem' }}
                />
            </div>
            
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius='5px'
                    p='1rem'
                    mt='1rem'
                >
                    <Dropzone
                        acceptedFlies= '.jpg, .jpeg, .png'
                        multiple={false}
                        onDrop={(acceptedFlies)=> setImage(acceptedFlies[0])}
                    >
                        {({getRootProps, getInputProps}) => (
                            <div className='flexbetween'>
                                <Box 
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p='1rem'
                                    width='100%'
                                    sx={{'&:hover':{cursor: 'pointer'}}}
                                >
                                    <input {...getInputProps()}/>
                                    {!image ? (
                                        <p>Add image Here</p>
                                    ):(
                                    
                                        <div className="flexbetween">
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined />
                                        </div>  
                                    
                                    )}
                                </Box>
                                {image && (
                                    <IconButton 
                                        onClick={()=> setImage(null)}
                                        sx={{width: "15%"}}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </div>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{margin: '1.5rem 0'}}/>

            <Box className="flexbetween" >
                <Box className="flexbetween" gap='0.25rem' onClick={()=> setisImage(!isImage)}>
                    <ImageOutlined sx={{color:mediumMain}}/>
                    <Typography sx={{color: mediumMain, "&:hover": {cursor: 'pointer', color: medium}}}> 
                        Image
                    </Typography>
                </Box>
                {ismediumScreen ? (
                <>
                    <Box className="flexbetween" gap='0.25rem'>
                        <GifBoxOutlined sx={{color:mediumMain}}/>
                        <Typography sx={{color: mediumMain, "&:hover": {cursor: 'pointer', color: medium}}}> 
                            Gif
                        </Typography>
                    </Box>
                    <Box className="flexbetween" gap='0.25rem' >
                        <AttachFileOutlined sx={{color:mediumMain}}/>
                        <Typography sx={{color: mediumMain, "&:hover": {cursor: 'pointer', color: medium}}}> 
                            File
                        </Typography>
                    </Box>
                    <Box className="flexbetween" gap='0.25rem' >
                        <MicOutlined sx={{color:mediumMain}}/>
                        <Typography sx={{color: mediumMain, "&:hover": {cursor: 'pointer', color: medium}}}> 
                            Audio
                        </Typography>
                    </Box>
                </>    
                ):
                <Box className="flexbetween" gap='0.25rem'>
                    <MoreHorizOutlined sx={{color:mediumMain}}/>
                    <Typography sx={{color: mediumMain, "&:hover": {cursor: 'pointer', color: medium}}}> 
                        More
                     </Typography>
                </Box>
                }

                <Button 
                    disabled={!descp}
                    onClick={()=> {handleUserPost();
                        setisImage(!isImage)}}
                    sx={{
                        borderRadius:'3rem', color: alt, backgroundColor: main
                    }}
                    
                >
                    POST
                </Button>
            </Box>
            
        </WidgetWrapper>
    )
}

export default UserPostWidgit;
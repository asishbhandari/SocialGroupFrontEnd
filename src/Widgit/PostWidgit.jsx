import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Typography, Divider,IconButton, useTheme, InputBase } from "@mui/material";
import WidgetWrapper from "../component/WidgetWrapper";
import '../pages/cssforpages.css';
import Friend from '../component/Friend';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPost } from "../State/AuthSlice";

const PostWidgit= ({postId, postUserId, name, descripition, location, picturePath, userPicturePath, likes, comments}) =>{
    const loggedUserId = useSelector((state)=> state.user._id)
    const dispatch= useDispatch();
    const isLiked= Boolean(likes[loggedUserId]);
    const [isComment, setIsComment]= useState(false);
    const [comment, setComment]= useState("");
    const token= useSelector((state)=> state.token);
    const likeCount= Object.keys(likes).length;

    const {palette}= useTheme();
    const main= palette.neutral.main;
    const primary= palette.primary.main;
   
    const patchLike= async()=>{ 
        const likedposts= await fetch(`https://social-group-backend.onrender.com/posts/${postId}/like`,{
            method: "PATCH",
            headers: {Authorization: `Bearer ${token}`, "content-Type": "application/json"},
            body: JSON.stringify({userId: loggedUserId})
        });
        const updatedPosts= await likedposts.json();
        
        dispatch(setPost({post: updatedPosts}));
    }

    const patchComment= async(e)=>{ 
        const response= await fetch(`https://social-group-backend.onrender.com/posts/${postId}/comment`,{
            method: "PATCH",
            headers: {Authorization: `Bearer ${token}`, "content-Type": "application/json"},
            body: JSON.stringify({userId: loggedUserId, comment: comment})
        });
        const updatedPosts= await response.json();
        dispatch(setPost({post: updatedPosts}));
        setComment("")
        console.log(comment)
    }

    // useEffect(()=>{console.log('woked in postwidgit')}, [])
    return(
        <WidgetWrapper mb='2rem'>
            
            <Friend userPicturePath={userPicturePath} name={name} location={location} friendId={postUserId}/>
            <Typography color={main} sx={{mt:'1rem'}}>
                {descripition}
            </Typography>

            {picturePath && (
                <img 
                    src={`https://social-group-backend.onrender.com/assets/${picturePath}`}
                    width='100%' height='auto' alt="post"
                    style={{borderRadius:'0.75rem', marginTop:'0.75rem'}}
                />
            )}

            <Box className='flexbetween' mt='0.25rem'>

                <Box className='flexbetween' gap='0.3rem'>
                    <IconButton onClick={()=>patchLike()}>
                        {isLiked ? (
                            <FavoriteOutlined sx={{color: primary}} />
                        ):(
                            <FavoriteBorderOutlined />
                        )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </Box>

                <Box className='flexbetween' gap='0.3rem'>
                    <IconButton onClick={()=>setIsComment(!isComment)}>
                        <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <Typography>{comments.length}</Typography>
                </Box>
                
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </Box>
            {isComment && (
                <>
                    <form onSubmit={(e) => 
                        {   e.preventDefault();
                            patchComment()}}>
                        <InputBase 
                            placeholder="your comment"
                            onChange={(e)=> setComment(e.target.value)}
                            value={comment}
                            sx={{borderRadius: '1rem', backgroundColor: palette.neutral.light , width:'100%', padding: '0.5rem 0.5rem' }}
                        />
                    </form>
                    <Box mt='0.5rem'>
                        {comments.map((comment, i)=>(
                            <Box key={`${i}`}>
                                <Divider/>
                                <Typography sx={{color: main, m:"0.5rem", pl: '1rem'}}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider/>
                    </Box>
                </>
            )}
            
        </WidgetWrapper>
    )
}

export default PostWidgit;
import { useDispatch, useSelector } from 'react-redux';
import PostWidgit from './PostWidgit';
import { setPosts } from '../State/AuthSlice';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
// import Friend from '../component/Friend';

const AllPostWidgit = ({loggeduserId, isProfile= false}) =>{
    const dispatch=useDispatch();
    const user= useSelector((state)=> state.user)
    const posts= useSelector((state)=> state.posts)
    const token= useSelector((state)=> state.token)

    const getPosts= async ()=>{
        const response= await fetch('https://social-group-backend.onrender.com/posts',{
            method: 'GET',
            headers: {Authorization : `Bearer ${token}`},
        })
        const data= await response.json();
        const reversedata= data.reverse();
        dispatch(setPosts({data: reversedata}));
    }

    const getUserPosts= async ()=>{
        const response= await fetch(`https://social-group-backend.onrender.com/posts/${loggeduserId}/posts`,{
            method: 'GET',
            headers: {Authorization : `Bearer ${token}`},
        })
        const reversedata= data.reverse();
        dispatch(setPosts({data: reversedata}));
    }

    useEffect(()=>{
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    }, []);
    
    // console.log('after')
    // console.log({posts})

    return(
        <>
            {posts.map(({_id, userId, firstName, lastName,location, descripition, picturePath, userPicturePath, likes, comments})=>  
                <PostWidgit 
                    key={_id}
                    postId={_id}
                    postUserId={userId} 
                    name={`${firstName} ${lastName}`} 
                    location={location} 
                    descripition={descripition} 
                    picturePath={picturePath} 
                    userPicturePath={userPicturePath} 
                    likes={likes} 
                    comments={comments}   
                />  
                
            )}
        </>
    )
}

export default AllPostWidgit;
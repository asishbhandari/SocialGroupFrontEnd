import { createSlice } from '@reduxjs/toolkit';

const  initialState={
    mode: 'light',
    user: null,
    token: null,
    posts: [],
}

const authSclice= createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setMode: (state)=>{
            state.mode= state.mode ==='light'? 'dark': 'light';
        },
        setLogin: (state, action)=>{
            state.token= action.payload.token;
            state.user= action.payload.user;
        },
        setLogout: (state) =>{
            state.token=null;
            state.user= null;
            state.posts=[];
        },
        setFriends: (state, action)=>{
            if(state.user){
                state.user.friends= action.payload.friends;
            }else (console.error('user friends not found :('))
        },
        setPosts: (state, action)=>{
            state.posts= action.payload.data;
        },
        setPost: (state, action)=> {
            const updatedPost= state.posts.map((post)=>{
                if(post._id=== action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts= updatedPost;
        }
    }
})


export const { setFriends, setLogin, setLogout, setMode, setPost, setPosts} = authSclice.actions;
export default authSclice.reducer;
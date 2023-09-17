import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff} from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {Formik} from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../State/AuthSlice";
import Dropzone from 'react-dropzone';
import '../pages/cssforpages.css';

const registerSchema= yup.object().shape({
    firstName: yup.string().min(3).max(15).required('it is required'),
    lastName: yup.string().min(2).max(15).required('it is required'),
    email: yup.string().email('Invalid Email').required('email is required'),
    password: yup.string().min(6).required('password is required'),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string(),
    joinedon: yup.date().default(() => new Date()),
})

const loginSchema= yup.object().shape({
    email: yup.string().email('Invalid Email').required('email is required'),
    password: yup.string().min(6).required('password is required'),
})

const initialValueRegister={
    firstName: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword:'',
    picture: '',
    location: '',
    occupation: '',
    joinedon: '',
}

const initialValueLogin={
    email: '',
    password: '',
}

const Form=()=>{
    const [pagetype, setpagetype] =useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const {palette} =useTheme();
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const isnonMobileScreen= useMediaQuery('(min-width: 800px)');
    const isLogin = pagetype === 'login';
    const isRegister = pagetype === 'register';

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    //   };

    const register= async (values, onSubmitProps) =>{ 
        // this is done to  send image with the forma infomation
        try{const formData = new FormData();
        
        for( let value in values){
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name)

        const saveUserResponse= await fetch("https://social-group-backend.onrender.com/authentication/register",
        {
            method: "POST",
            body: formData,
        });
        const savedUser= await saveUserResponse.json();
        onSubmitProps.resetForm();
        // console.log(savedUser)

        if(savedUser){
            setpagetype("login")
        }
        }catch(err){
            // console.log(err.message)
        }
        // try{
        //     const responseFromServer= await fetch("http://localhost:3001/")
        //     const respense= await responseFromServer.json();
        //     console.log(respense)

        // }
        
    }

    const login = async (values, onSubmitProps)=>{
        // console.log(JSON.stringify(values))
        const loggedUserResponse= await fetch("https://social-group-backend.onrender.com/authentication/login",
        {
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({values}),
        });
        const loggedUser= await loggedUserResponse.json();
        onSubmitProps.resetForm();
        // console.log(loggedUser.msg);
        if(loggedUser.msg === 'User does not exit'){
            alert('User does not exit')
        }else if(loggedUser.msg === 'credentials does not match'){
            alert('credentials does not match')
        }else{
            dispatch(setLogin({
                user: loggedUser.user,
                token: loggedUser.token,
            }))
            navigate('/home');
        }
    };

    const handleFormSubmit= async (values, onSubmitProps) => {
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
    };

    return(
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValueLogin : initialValueRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            })=>(
                <form onSubmit={handleSubmit}>
                    <Box 
                        display='grid'
                        gap='30px'
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        sx={{
                            '& > div':{gridColumn: isnonMobileScreen ? undefined : 'span 4'},
                        }}
                    >
                        {isRegister && (
                            <>
                            <TextField 
                                label= 'First Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{gridColumn: 'span 2'}}
                            />
                            <TextField 
                                label= 'Last Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{gridColumn: 'span 2'}}
                            />
                            </>
                        )}
                        {/* <> */}
                        <TextField 
                            label= 'Email'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{gridColumn: 'span 4'}}
                        />
                        <TextField 
                            label= 'Password'
                            type={showPassword ? "text" : "password"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{gridColumn: 'span 4'}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {isRegister && (
                            <>
                            <TextField 
                                label= 'Confirmpassword'
                                type={showPassword ? "text" : "password"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmpassword}
                                name="confirmpassword"
                                error={Boolean(touched.confirmpassword) && Boolean(errors.confirmpassword)}
                                helperText={touched.confirmpassword && errors.confirmpassword}
                                sx={{gridColumn: 'span 4'}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField 
                                label= 'Location'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{gridColumn: 'span 4'}}
                            />
                            <TextField 
                                label= 'Occupation'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                helperText={touched.occupation && errors.occupation}
                                sx={{gridColumn: 'span 4'}}
                            />
                            <Box
                                gridColumn='span 4'
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius='5px'
                                p='1rem'
                            >
                                <Dropzone
                                    acceptedFlies= '.jpg, .jpeg, .png'
                                    multiple={false}
                                    onDrop={(acceptedFlies)=> setFieldValue('picture', acceptedFlies[0])}
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p='1rem'
                                            sx={{'&:hover':{cursor: 'pointer'}}}
                                        >
                                            <input {...getInputProps()}/>
                                            {!values.picture ? (
                                                <p>Add Pircture Here</p>
                                            ):(
                                                <div className="flexbetween">
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                                </div>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            </>
                        )}
                        {/* </> */}
                    </Box>
                    
                    {/* Submit button*/}
                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: '2rem 0',
                            p: '1rem',
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            '&:hover':{color: palette.primary.main}
                        }}>
                            {isLogin ? 'LOGIN' : 'REGISTER'}
                        </Button>
                        <Typography 
                        onClick={()=> {setpagetype(isLogin? 'register':'login')}}
                        sx={{
                            textDecoration: 'underline',
                            color: palette.primary.main,
                            '&:hover':{
                                cursor: 'pointer',
                                color: palette.primary.light,
                            },
                        }}
                        >
                            {isLogin ? 'Don\'t have an account? Sign Up here' : 'Already have an account? Login here.'}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}


export default Form;
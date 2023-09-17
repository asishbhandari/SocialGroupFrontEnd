import { Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Form from '../component/Form.jsx';

const LoginPage =()=>{
    const theme =useTheme();
    const isnonMobileScreen= useMediaQuery('(min-width: 800px )');
    return(
        <Box>
            <Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center' >
                <Typography fontWeight='bold' fontSize='1.5rem' color= 'primary'>
                    AIM SCOCIAL GROUP
                </Typography>
            </Box>
            <Box 
                width={isnonMobileScreen ? '50%': '93%'} 
                p='2rem'm='2rem auto' 
                borderRadius='1.5rem' 
                backgroundColor={theme.palette.background.alt}
                
            >
                <Typography fontWeight='500' variant="h5" textAlign='center' sx={{mb:'1.5rem'}}>
                    Welcome AIMions to your own social plateform
                </Typography>
                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage;
import { Typography, Box, useTheme } from "@mui/material";
import WidgetWrapper from "../component/WidgetWrapper"
import "../pages/cssforpages.css"

const SponsersWidgit = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return(
        <WidgetWrapper mb="2rem">     
            <Box className="flexbetween">
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>
                    Create Add
                </Typography>
            </Box>
            <img 
                width="100%" height="auto"
                src={`https://social-group-backend.onrender.com/assets/add1.jpg`}
                style={{borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <Box className="flexbetween">
                <Typography color={main}> ASA </Typography>
                <Typography color={medium}>aimscholar.org</Typography>
            </Box>
            <Typography>
                Ignite your potential, transform your life. with Aim Scholar Academy.
                Your path to success starts here.
            </Typography>
                
        </WidgetWrapper>
    )
};

export default SponsersWidgit;
import { useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography,
    Modal,
} from '@mui/material';

import Upload from "./Upload"

const Navbar = () => {

    const [ openUF, setOpenUF ] = useState(false);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: "pointer" }}
                        >
                            Magic Moments
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button color="inherit" onClick={()=> setOpenUF(!openUF)}>
                            Upload
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Modal
                open={openUF}
                onClose={() => setOpenUF(!openUF)}
            >
                <> <Upload /> </>
            </Modal>
        </>
    );
};

export default Navbar;

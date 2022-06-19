import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Tags from './Tags';
// import File from './File';



import isWeekend from 'date-fns/isWeekend';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import axios from 'axios';




export default function SignIn() {

    const theme = createTheme();

    const [name, setName] = React.useState('');
    const [venue, setVenue] = React.useState('');
    var file = [];
    const [date, setDate] = React.useState(new Date());


    // for file upload
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleFileRead = async (event) => {

        for (let i = 0; i < event.target.files.length; i++) {
            const newValue = await convertBase64(event.target.files[i]);
            // files[i] = newValue;

            file.push(newValue);

        }
        // const file = event.target.files[0]
        // const base64 = await convertBase64(file)
        // props.setFile(base64)
        // console.log(base64)
        console.log(file);
    }

    // for file upload -*-

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleVenue = (event) => {
        setVenue(event.target.value);
    }



    const handleSubmit = (event) => {

        // if (file !== []) {

        // setFile(localStorage.getItem('files'))
        // console.log(file)


        event.preventDefault();
        var formdata = {
            name: name,
            venue: venue,
            file: file,
            date: date
        }

        console.log(formdata);

        axios.post(" http://localhost:4000/img/", formdata)
            .then(function (response) {
                console.log(response);
            })
        // }
        // else {
        //     alert('Please upload a file');
        // }




    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Upload your Moments...
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Like Felicity..."
                            name="name"
                            autoFocus
                            onChange={handleName}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="venue"
                            label="Felicity Ground..."
                            name="venue"
                            autoFocus
                            onChange={handleVenue}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                orientation="landscape"
                                openTo="day"
                                value={date}
                                shouldDisableDate={isWeekend}
                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            // id="originalFileName"
                            type="file"
                            webkitdirectory="true" // for chrome
                            inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt', multiple: true }}
                            required

                            name="originalFileName"
                            onChange={e => handleFileRead(e)}
                            size="small"
                            // variant="standard"
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        // type="file"

                        />



                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            SUBMIT
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

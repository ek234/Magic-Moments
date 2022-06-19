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
import Tags from './Tags';
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
    const [files, setFiles] = React.useState({});
    const [date, setDate] = React.useState(new Date());


    async function convertBase64 (file) {
		let b64 = await new Promise((resolve, reject) => {
			let reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
			reader.readAsDataURL(file);
		});
		return b64;
	};

	async function convAll () {
		var fs = []
		for ( let i = 0; i < files.length; i++ ) {
			fs.push(await convertBase64(files[i]))
		}
		return fs
	}

    const handleFileRead = async (event) => {
		setFiles(event.target.files)
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleVenue = (event) => {
        setVenue(event.target.value);
    }



    const handleSubmit = (event) => {
        // if (file !== []) {
        event.preventDefault();
		convAll()
			.then( fs => {
				var formdata = {
					name: name,
					venue: venue,
					imgs: fs,
					date: date
				}

				axios.post("http://localhost:4000/img/postImage", formdata)
					.then(function (response) {
						console.log(response);
					})
					.catch(function (error) {
						console.log(error);
					})
			})
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

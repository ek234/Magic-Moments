import { useState } from 'react';
import axios from 'axios';
import isWeekend from 'date-fns/isWeekend';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
} from '@mui/material';

//import Tags from './Tags';


export default function SignIn () {

    const [name, setName] = useState('');
    const [venue, setVenue] = useState('');
    const [files, setFiles] = useState({});
    const [date, setDate] = useState(new Date());

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
            <Container component="main" >
                <CssBaseline />
                <Box
                    sx={{
                        bgcolor: 'background.paper',
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
                            label="event"
                            name="name"
                            autoFocus
                            onChange={handleName}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="venue"
                            label="location"
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
                            type="file"
                            webkitdirectory="true" // for chrome
                            inputProps={{
                                accept: 'image/*',
                                multiple: true,
                            }}
                            required
                            name="originalFileName"
                            onChange={e => handleFileRead(e)}
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
    );
}

import { useState, useRef }from 'react';
import axios from 'axios';
import { LocalizationProvider, AdapterDateFns, MobileDatePicker } from '@mui/x-date-pickers';
import { Cancel, Tag } from "@mui/icons-material";
import {
    TextField,
    Stack,
    Checkbox,
    Typography,
    Box,
    Grid,
    Button,
    FormControl,
} from '@mui/material';

export default function Filter () {
    // const [venue, setVenue] = useState('');
    const [date, setDate] = useState(new Date());

    const [people, setPeople] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    const [occassion, setOccassion] = useState('');


    const [tags, SetTags] = useState([]);
    const tagRef = useRef();

    const handleDelete = (value) => {
        const newtags = tags.filter((val) => val !== value);
        SetTags(newtags);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        SetTags([...tags, tagRef.current.value]);
        tagRef.current.value = "";
    };

    var filters = {
        date: date,
        people: people,
        occassion: occassion,
        tags: tags
    }

    // axios.get('api here', filters)
    //     .then(res => {
    //         console.log(res);
    //     });

    const handleUnique = (e) => {
        setPeople(!people);
    }

    return (
        <>
            <div>
                <Stack
                    sx={{ pt: 4, pd: 2 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"

                >
                    <TextField
                        id="occassion"
                        label="occassion"
                        name="occassion"
                        onChange={e => setOccassion(e.target.value)}
                        size="small"
                        variant="outlined"
                    />
                    {/* <TextField
                        id="venue"
                        label="Venue"
                        name="venue"
                        onChange={e => setVenue(e.target.value)}
                        size="small"
                        variant="outlined"
                    /> */}

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            label="Select Event Date"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField
                                size="small"
                                variant="outlined"
                                {...params} />}
                        />
                    </LocalizationProvider>


                    <Stack

                        direction="row"
                    >
                        <Typography wrap="true"> Want Unique Faces? <Checkbox onClick={handleUnique}{...label} /> </Typography>
                    </Stack>

                </Stack>

                <Stack>

                    <Box sx={{ flexGrow: 1 }}>
                        <form onSubmit={handleOnSubmit}>
                            <TextField
                                inputRef={tagRef}
                                variant='outlined'
                                size='small'
                                sx={{ margin: "1rem 0" }}
                                margin='none'
                                placeholder={tags.length < 5 ? "Enter tags" : ""}
                                InputProps={{
                                    startAdornment: (
                                        <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                                            {tags.map((data, index) => {
                                                return (
                                                    <Tags data={data} handleDelete={handleDelete} key={index} />
                                                );
                                            })}
                                        </Box>
                                    ),
                                }}
                            />
                        </form>
                    </Box>
                </Stack>

            </div>
        </>
    );
};

export default Filter;

const Tags = ({ data, handleDelete }) => {
    return (
        <Box
            sx={{
                background: "#283240",
                height: "100%",
                display: "flex",
                padding: "0.4rem",
                margin: "0 0.5rem 0 0",
                justifyContent: "center",
                alignContent: "center",
                color: "#ffffff",
            }}
        >
            <Stack direction='row' gap={1}>
                <Typography>{data}</Typography>
                <Cancel
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        handleDelete(data);
                    }}
                />
            </Stack>
        </Box>
    );
};

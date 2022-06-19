import * as React from 'react';
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const theme = createTheme();

function AddOns(props) {
    const handleAddOnSubmit = (event) => {
        event.preventDefault();
        const addOn = {
            name: document.getElementById(`addOnName${props.index}`).value,
            price: document.getElementById(`addOnPrice${props.index}`).value
        };
        console.log(addOn);
        // console.log(props);
        if (addOn.name === '' || addOn.price === '') {
            alert("Please enter a valid name and price");
        } else {
            if ((props.addOnNames).length < props.index) {
                alert("Make sure previous add-ons are added before adding new ones");
            } else if (props.addOnNames.length === props.index) {
                props.setAddOnNames([...props.addOnNames, addOn.name]);
                props.setAddOnPrices([...props.addOnPrices, addOn.price]);
                console.log(props.addOnNames);
                console.log(props.addOnPrices);
            } else {
                let newNames = [...props.addOnNames];
                let newPrices = [...props.addOnPrices];
                newNames[props.index] = addOn.name;
                newPrices[props.index] = addOn.price;
                console.log(newNames);
                props.setAddOnNames(newNames);
                props.setAddOnPrices(newPrices);
            }
        }
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                    id={`addOnName${props.index}`}
                    label="Name"
                    fullWidth
                    size="small"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Button
                    onClick={handleAddOnSubmit}
                    fullWidth
                    variant="contained"
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
}

function AddTags(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const Tags = {
            name: document.getElementById(`tags${props.index}`).value,
        }
        console.log(Tags);
        if (Tags.name === '') {
            alert("Please enter a valid name and price");
        } else {
            if (props.tags.length < props.index) {
                alert("Make sure previous Tags are added before adding new ones");
            } else if (props.tags.length === props.index) {
                props.setTag([...props.tags, Tags.name]);
            } else {
                let newTags = [...props.tags];
                newTags[props.index] = Tags.name;
                props.setTag(newTags);
            }
        }

    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
                <TextField
                    id={`tags${props.index}`}
                    label="Tag"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    color="inherit"
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );

}



export default function AddItem() {
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const [count, setCount] = useState(0);
    const [countTags, setCountTags] = useState(0);

    const onChangeName = (event) => {
        setName(event.target.value);
    };


    const onChangeTags = (event) => {
        setTags(event.target.value);
    };


    const handleChange = (event) => {
        event.preventDefault();
        const newFoodItem = {
            name: document.getElementById("name").value,
            tags: tags,

        };
        console.log(newFoodItem);
        axios
            .post("http://localhost:4000/v_dashboard/add_item", newFoodItem)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
        alert("Item added successfully");
        window.location.reload();
    };

    var tagFields = [];
    for (var i = 0; i < countTags; i++) {
        tagFields.push(<AddTags key={i} index={i} tags={tags} setTag={setTags} />);
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
                    <Box component="form" noValidate onSubmit={handleChange} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => { setCountTags(countTags + 1) }}
                                > ADD TAGS</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {tagFields}
                            </Grid>

                        </Grid>


                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

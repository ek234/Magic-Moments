import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import axios from 'axios';
import { TextField } from '@mui/material';
import Fuse from 'fuse.js'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';



const theme = createTheme();

export default function Album() {

    const [images, setImages] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const [showFaces, setShowFaces] = useState(false);
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/img/getimages")
            .then(res => {
                setImages(res.data);
                setAllImages(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const [taginput, setTagInput] = useState(false);
    const [temptag, setTempTag] = useState('');
    const AddTag = () => {

        var id = {
            id: localStorage.getItem('tempimageid'),
            addtag: temptag
        }
        console.log(id);

        axios.post("http://localhost:4000/img/addtag", id)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            }
            )


    }

    function handleFuzzySearch() {
        console.log("fuzzy searching");
        let search = document.getElementById("fuzzySearch").value;
        console.log(search);
        console.log(allImages);
        // covert search to lowercase
        search = search.toLowerCase();
        if (search === "") {
            setImages(allImages);
        } else {
            const fuse = new Fuse(allImages, {
                keys: ["occasion"]
            });
            // console.log(foods.name);
            let result = fuse.search(search);
            let newCards = [];
            for (var i = 0; i < result.length; i++) {
                newCards.push(result[i].item);
            }
            console.log(newCards);
            setImages(newCards);
        }
    }



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Album layout
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below???its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                        <Stack
                            sx={{ pt: 3 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" sx={{ width: 200 }}> <FilterAltIcon /> &nbsp; Apply Filters</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField
                                id="fuzzySearch"
                                label="Fuzzy Search"
                                type="search"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleFuzzySearch()}
                            >
                                <SearchIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowFaces(!showFaces)}
                            >
                                Faces
                            </Button>
                        </Grid>
                        {showFaces ?
                            templates.map((template, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <img src={template.src} alt={template.title} />
                                </Grid>
                            ))
                            :
                            null
                        }
                    </Grid>
                    <Grid container spacing={4}>
                        {images.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image={card.img}
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.occasion}, &nbsp; {new Date(card.date).toLocaleDateString()}, &nbsp; {card.tags.map((tag) => ("#" + tag + " "))}
                                        </Typography>
                                        {/* <Typography>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography> */}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={(e) => {
                                            setTagInput(!taginput);
                                            localStorage.setItem("tempimageid", card._id);
                                        }
                                        }>
                                            Add Tag
                                        </Button>
                                    </CardActions>
                                    <Box component="form" noValidate sx={{ mt: 1 }} >
                                        {taginput ? (
                                            <div>
                                                <TextField id="outlined" size="small" fullWidth onChange={(e) => {
                                                    setTempTag(e.target.value);
                                                }} />
                                                <Button size="small" onClick={AddTag}>
                                                    <AddIcon />
                                                </Button>

                                            </div>
                                        ) : null}
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>

            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

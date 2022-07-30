import { useEffect, useState } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js'
import { FilterAlt as FilterAltIcon, Search as SearchIcon, Add as AddIcon }from '@mui/icons-material';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CssBaseline,
    Grid,
    Stack,
    Box,
    Typography,
    Container,
    TextField,
} from '@mui/material';

export default function Album () {

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
    useEffect(() => {
        axios.get("http://localhost:4000/img/getTemplates")
            .then(res => {
                setTemplates(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const [tagInput, setTagInput] = useState(false);
    const [tempTag, setTempTag] = useState('');
    const AddTag = () => {
        var id = {
            id: localStorage.getItem('tempimageid'),
            addtag: tempTag
        }
        console.log(id);

        axios.post("http://localhost:4000/img/addtag", id)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
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
        <>
            <CssBaseline />
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
                            gutterBottom
                        >
                            Album layout
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            Something short and leading about the collection below—its contents,
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
                    <Grid container spacing={4} maxWidth="md">
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
                                onClick={handleFuzzySearch}
                            >
                                <SearchIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                onClick={() => setShowFaces(!showFaces)}
                            >
                                Faces
                            </Button>
                        </Grid>
                        {showFaces ?
                            templates.map((template, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <img src={"data:image;base64, " + template.image} alt={template._id} />
                                </Grid>
                            ))
                            :
                            null
                        }
                    </Grid>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {images.map((card, idx) => (
                            <Grid item key={idx} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{pt: '56.25%'}} // 16:9
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
                                            setTagInput(!tagInput);
                                            localStorage.setItem("tempimageid", card._id);
                                        }
                                        }>
                                            Add Tag
                                        </Button>
                                    </CardActions>
                                    <Box component="form" noValidate sx={{ mt: 1 }} >
                                        {tagInput ? (
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
        </>
    );
}

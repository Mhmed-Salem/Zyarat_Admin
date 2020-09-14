import React, { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery'
import ImageUploader from 'react-images-upload';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';
import { toast } from 'react-toastify';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
 
    },

    btn: {
        marginTop: theme.spacing(1.5),
        
    }, 

    upload: {
        marginLeft: '574px',
        marginBottom: '16px',
        display: 'block'
    }
}))


function SliderAbout() {

const [slider, setSlider] = useState([])
    useEffect(() => {
        const fetchSlider = async () => {
            axios.get('/api/slider')
                .then(res => setSlider(res.data))
        }

        fetchSlider()
    }, [])
    const [picture, setPicture] = useState(null);
    const  fileUploaderHandler = () => {
        const fd = new FormData();
        fd.append("image", picture, picture.name);
        axios.post("/api/slider", fd).then(res => {
            toast.success("Image upload successfully");
            window.location.reload()
        });
        
    }
    
    const [about, setAbout] = useState('');
    const handleSubmit = async () => {
        toast.success("about has succcessfuly submitted.")
         await axios.post('/api/about', {about})
                    .then(res => console.log(res))
                    .catch(err => {
                        toast.error("failed to submit about page.")
                    })
    }

    const handleDelete = async (id) => {
        
    const originalImgs = slider;
    const filterd = slider.filter(s => s.id !== id);
    setSlider(filterd);

    try {
      await axios.delete(`/api/slider/${id}`);
      toast.success("deleted successfully")
    } catch (error) {
      setSlider(originalImgs);
      toast.error("failed to delete an image!")
    }

    }

    function onDrop(picture) {
        setPicture(...picture);
    }
    const classes = useStyles();
    return (
        <div>
             <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                buttonStyles={{background: '#EC5C42', fontSize: '18px', borderRadius: '5px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}}
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview
            />
            <Button onClick={fileUploaderHandler} className={classes.upload} variant="outlined"
             color="primary">Upload images</Button>
             <Grid>
                 <ImageGallery slider={slider} onDelete={handleDelete} />
             </Grid>
            <Grid container justify="center">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <h3>Upload About us text:</h3>
                        <TextField
                            id="standard-multiline-static"
                            label="About us"
                            multiline
                            fullWidth
                            rows={4}
                            variant="outlined"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            />
                         <Button className={classes.btn} variant="contained" color="primary" endIcon={<PublishIcon>send</PublishIcon>}
                                      onClick={handleSubmit}    type="submit" > UPLOAD TEXT</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default SliderAbout

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { getCurrentUser } from '../../../../api/index'
import axios from 'axios';
import useStyles from './styles';
import { createPost, updatePost, getVinInfo } from '../../../../_actions/posts';


const Form = ({ currentId, setCurrentId }) => {
  //Set default post data
  const [postData, setPostData] = useState({
    make: '', model: '', year: '', mileage: '', vin: '', amountPaid: '',
    listingAmount: '', selectedFile: '', owner: ''
  });

  //Current post is the post equal to the id in the state. This allows for the form information to fill when attempting to update a post.
  const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  const updateEmail = async () => {
    let userEmail;
    await getCurrentUser().then(user => {
      userEmail = user
    }).catch(error => {
      console.log(error)
    })
    console.log(userEmail)
    setPostData({ owner: userEmail })
  }

  useEffect(() => {
    updateEmail()
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData)
    if (currentId === 0) {
      //If the current ID is zero when submitting, create a post
      console.log("Dispatching create post");
      dispatch(createPost(currentId, postData));
      clear();
    } else {
      //If the currentID has a value, update the post with that ID
      console.log("Update Post");
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  //Sets the currentID to zero and fills the form with empty string
  const clear = () => {
    setCurrentId(0);
    setPostData({
      make: '', model: '', year: '', mileage: '', vin: '', amountPaid: '',
      listingAmount: '', selectedFile: ''
    });
  }

  const setVinInfo = async () => {
    console.log("SetVinInfo from Form Called");
    const { newVinData } = await getVinInfo(postData.vin);
    console.log(newVinData);
  }

  return (
    <>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? `Editing "${post.make}"` : 'Add a car'}</Typography>
          <div>
            <TextField name="vin" variant="outlined" label="Vin" fullWidth value={postData.vin} onChange={(e) => setPostData({ ...postData, vin: e.target.value })} />
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" onClick={setVinInfo} fullWidth>Pull vin information</Button>
          </div>
          <TextField name="make" variant="outlined" label="Make" fullWidth value={postData.make} onChange={(e) => setPostData({ ...postData, make: e.target.value })} />
          <TextField name="model" variant="outlined" label="Model" fullWidth value={postData.model} onChange={(e) => setPostData({ ...postData, model: e.target.value })} />
          <TextField name="year" variant="outlined" label="Year" fullWidth value={postData.year} onChange={(e) => setPostData({ ...postData, year: e.target.value })} />
          <TextField name="mileage" variant="outlined" label="Mileage" fullWidth value={postData.mileage} onChange={(e) => setPostData({ ...postData, mileage: e.target.value })} />
          <TextField name="amountPaid" variant="outlined" label="Amount Paid" fullWidth value={postData.amountPaid} onChange={(e) => setPostData({ ...postData, amountPaid: e.target.value })} />
          <TextField name="listingAmount" variant="outlined" label="Listing Price" fullWidth value={postData.listingAmount} onChange={(e) => setPostData({ ...postData, listingAmount: e.target.value })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullwidth>Add</Button>
          <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullwidth>Clear</Button>
        </form>
      </Paper>
    </>
  )
}

export default Form;
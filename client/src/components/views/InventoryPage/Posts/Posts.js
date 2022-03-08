import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../api';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const [state, setState] = useState(0)
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    const updateEmail = async () => {
        let userEmail;
        await getCurrentUser().then(user => {
          userEmail = user
        }).catch(error => {
          console.log(error)
        })
        console.log(userEmail)
        setState({ email: userEmail })
      }

    useEffect(() => {
        updateEmail();

    }, [])
    const filteredPosts = posts.filter(function (post) {
        return post.owner == state.email
    })

    return ( 
        //If no posts, play a circular progress bar
        //For each post, create a post component
        !filteredPosts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={4}>
                {filteredPosts.map((post) => (
                    <Grid key={post._id} item xs={16} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;
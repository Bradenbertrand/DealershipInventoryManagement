import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../../../_actions/posts';


const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card} image={post.selectedFile}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
            <div className={classes.overlay}>
                <Typography variant="h6" >{post.make} {post.model}</Typography>
                <Typography variant="h6" >{post.year}</Typography>
            </div>
            <div className={classes.overlay2}>
                <CardActions className={classes.cardActions}>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
            </div>
        </Card>
    )
}

export default Post;
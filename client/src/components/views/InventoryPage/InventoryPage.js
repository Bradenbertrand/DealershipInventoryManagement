import { useEffect, useState } from 'react';
import React from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../../_actions/posts';
import Posts from './Posts/Posts';
import Form from './Form/Form';
import useStyles from './styles';

const InventoryPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    //Set current id to 0
    const [currentId, setCurrentId] = useState(0);
    const [email, setEmail] = useState(1)

    //Sets the state to update from the database
    useEffect(() => {
        dispatch(getPosts());
      }, [currentId, dispatch]);

    return (
            <Grow in>
                <Container style={{ marginTop: "5vh"}} >
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <Form setCurrentId={setCurrentId} currentId={currentId}/>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    );
}

export default InventoryPage;
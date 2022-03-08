import * as api from '../api/index';
import Axios from 'axios';

import { FETCH_ALL, CREATE, UPDATE, DELETE, DECODE_VIN } from '../_actions/actionTypes';

//Gets posts using api, dispatches them to store
export const getPosts = () => async (dispatch) => {
    try {
        console.log("Getting posts from actions");
        const { data }  = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
//Create a post using api, dispatches new post to store
export const createPost = (currentId, post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
//Updates a post using api, dispatches new info to store
export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
      
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
//Deletes a post from db, removes it from store
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
  
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

//Non functional ATM
export const getVinInfo = (vin) => async (dispatch) => {
  try {
    const { vinData } = await api.getVinInfo(vin);

    dispatch({type: DECODE_VIN, payload: vinData });
  } catch (error) {
    console.log(error.message)
  }
}
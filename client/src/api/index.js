import axios from 'axios';
import { USER_SERVER } from '../components/Config.js';
const url = 'http://localhost:5000/cars';


export const getCurrentUser = async () => {
    let user = await axios.get(`${USER_SERVER}/auth`)
    let userEmail = await user.data.email
    return userEmail
}

export const fetchPosts = () => {
    console.log("Fetching Posts");
    return axios.get(url);
};

export const createPost = (newPost) => {
    axios.post(url, newPost);
}

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);
//Non functional ATM

export const getVinInfo = (vin) => {
    console.log("GetVinInfo From Api Called");
    return axios.get(`http://api.carmd.com/v3.0/decode?vin=${vin}`, {
    headers: {
        "content-type":"application/json",
        "authorization":"Basic MDdhZjg0NjgtODYyYi00NWMzLWE2OTktODI2NjQ2OTAwZWZm",
        "partner-token":"2a3565894cb2408aaa6e234a9dd042f8"
      } 
})};
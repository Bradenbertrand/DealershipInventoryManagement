import { FETCH_ALL, CREATE, UPDATE, DELETE, DECODE_VIN } from '../_actions/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
      case FETCH_ALL:
        return action.payload;
      case CREATE:
        return [...posts, action.payload];
      case UPDATE:
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      case DELETE:
        return posts.filter((post) => post._id !== action.payload);
      case DECODE_VIN:
        return action.payload;
      default:
        return posts;
    }
  };
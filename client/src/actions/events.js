import { FETCH_ALL, CREATE } from "../constants/actionTypes";

import { fetchEvents, createEvents } from "../api/event";

//Action creator
//GET
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await fetchEvents();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//CREATE
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await createEvents(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

/* //UPDATE
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//DELETE

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
}; */

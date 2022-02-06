import axios from "axios";

const url = "http://localhost:5001/events";

export const fetchEvents = () => axios.get;
export const createEvents = (newPost) => axios.post(url, newPost);

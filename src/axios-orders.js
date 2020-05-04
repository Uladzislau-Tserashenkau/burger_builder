import axios from "axios";

const instance = axios.create({
  baseURL: "https://food-builder-34606.firebaseio.com/",
});

export default instance;

import axios from "axios";

// eslint-disable-next-line
const apiURL = "https://phonebook-server.herokuapp.com/";
// eslint-disable-next-line
const localURL =
  window.location.protocol + "//" + window.location.hostname + ":" + 3001;

const URL = window.location.hostname === "localhost" ? localURL : apiURL;

export default axios.create({
  baseURL: URL
});

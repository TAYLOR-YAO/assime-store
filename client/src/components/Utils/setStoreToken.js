import axios from "axios";
const setStoreToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["StoreAuthorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["StoreAuthorization"];
  }
};
export default setStoreToken;
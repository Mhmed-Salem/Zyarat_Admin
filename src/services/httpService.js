import axios from "axios";
import { toast } from 'react-toastify';

  axios.defaults.headers.post['Content-Type'] = "application/json";
  axios.defaults.headers.post['Accept'] = "application/json";
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

  


  const tok = JSON.parse(localStorage.getItem("token")) 

if(tok) {
    axios.defaults.headers.common["x-auth-token"] =  tok.token 
    axios.defaults.headers.common["Authorization"] = `Bearer ${tok.token}`;

    }



axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
      console.log("Logging the error",error);
     toast.error("An un expected error happened!")
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

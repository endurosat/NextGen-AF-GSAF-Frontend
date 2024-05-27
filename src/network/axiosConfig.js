import axios from 'axios';
import { showToast } from '../store/actions';
import { store } from '../store/store';

// Set the base URL for all Axios requests
const axiosInstance = axios.create({
  baseURL: 'https://your.domain.com/api/',
  // Default response type is JSON
  responseType: 'json',
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use((config) => {
  // Access user ID from the Redux store
  const userId = store.getState().user.userId;
  console.log("sending request with header " + userId)//yes yes i know, it has to be JWT Token with this as payload, but lets keep it simple for now for test
    
  if (userId) {
    config.headers['Authorization'] = userId; // Adapt this if your header structure is different
  }

  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});


// Function for standard GET requests
export const get = (url, params) => axiosInstance.get(url, { params });

// Function for GET request that returns a file (binary data)
export const getFile = (url, params) => axiosInstance.get(url, { 
  params,
  responseType: 'blob' // This ensures the response is treated as a Blob
});

// Functions for POST, PUT, DELETE as previously defined
export const post = (url, data) => axiosInstance.post(url, data);
export const put = (url, data) => axiosInstance.put(url, data);
export const del = (url) => axiosInstance.delete(url);

axiosInstance.interceptors.response.use(
  response => {
    // Check for status code 200
    if (response.status === 200) {
      store.dispatch(showToast('Request successful', 'success'));
    }
    else{
      store.dispatch(showToast(response.data.message, 'error'));
    
    }
    return response;
  },
  error => {
    // Handle specific status code
    if (error.response && error.response.status === 500) {
      store.dispatch(showToast(error.response.data.message, 'error'));
      return error.response; // Continue by returning the error response
    } else {
      // Handle other statuses
      store.dispatch(showToast(error.message, 'error'));
      return Promise.reject(error); // Reject the promise for other errors
    }
  }
);

export default axiosInstance;

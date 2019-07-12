import axios from 'axios'

const instance = axios.create({
  baseURL: "https://react-myburger-2cf8d.firebaseio.com/"
});

export default instance;
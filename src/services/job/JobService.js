import axios from 'axios';

const getJobById = (_id) => {
    if (_id >= 0) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get", //you can set what request you want to be
          url: "http://localhost:5000/api/job/" + _id,
        })
          .then((res) => {
            resolve(res.data)
          })
          .catch(error => reject(error));
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(null);
      });
    }
  }
  export {
    getJobById,
  };
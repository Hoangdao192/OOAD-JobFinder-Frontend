// @ts-nocheck
import axios from 'axios';

// import config from '../../config.json';

const url = process.env.SERVER_URL

// const getTemplate = (_method = "get", _url = process.env.SERVER_URL, _data, _headers) => {
//     return new Promise((resolve, reject) => {
//         axios({
//             method: _method, //you can set what request you want to be
//             url: _url,
//             data: _data,
//             headers: _headers
//           })
//     });
// }

const getListMajor = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get", //you can set what request you want to be
      url: "http://localhost:5000/api/major",
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch(error => reject(error));
  });
}

const getListCompanyDefault = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get", //you can set what request you want to be
      url: "http://localhost:5000/api/company",
    })
      .then((res) => {
        resolve(res.data.elements)
      })
      .catch(error => reject(error));
  });
}

const getListJobDefault = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get", //you can set what request you want to be
      url: "http://localhost:5000/api/job",
    })
      .then((res) => {
        resolve(res.data.elements)
      })
      .catch(error => reject(error));
  });
}
const getListJobFullFilter = (_filterKey) => {
  let filterKey = { ..._filterKey };
  if (filterKey.jobTitle == null)
    delete filterKey.jobTitle;
  if (filterKey.major == null)
    delete filterKey.major;
  if (filterKey.workingForm == null) {
    delete filterKey.workingForm;
  }

  return new Promise((resolve, reject) => {
    axios({
      method: "get", //you can set what request you want to be
      url: "http://localhost:5000/api/job",
      params: filterKey,
    })
      .then((res) => {
        resolve(res.data.elements)
      })
      .catch(error => reject(error));
  });
}

const getCompanyById = (_id) => {
  if (_id >= 0) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get", //you can set what request you want to be
        url: "http://localhost:5000/api/company/" + _id,
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
  getListMajor,
  getListCompanyDefault,
  getListJobDefault,
  getListJobFullFilter,
  getCompanyById,
};
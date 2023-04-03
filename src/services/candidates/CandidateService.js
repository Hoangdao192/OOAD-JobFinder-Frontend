// @ts-nocheck
import axios from 'axios';

// import config from '../../config.json';

const url = process.env.SERVER_URL

const getTemplate = (_method = "get", _url = process.env.SERVER_URL, _data, _headers) => {
    return new Promise((resolve, reject) => {
        axios({
            method: _method, //you can set what request you want to be
            url: _url,
            data: _data,
            headers: _headers
          })
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

const getCompanyById = (_id) => {
    if (_id >= 0 ) {
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
    getTemplate,
    getListCompanyDefault,
    getListJobDefault,
    getCompanyById,
};
import axios from "axios";
require("dotenv").config();

const getClientDetailsApi = () => {
    const promise = new Promise((resolve, reject) => {
    axios.get(`https://${process.env.REACT_APP_SERVER_URL}/api/fs/client/getClientDetails`)
      .then((res) => {
          let data = {
              data: res.data,
              id: "clientDetails"
          };
          resolve(data)
      })
      .catch(err => reject(err));
    });
    return promise;
}

const getDeveloperDetailsApi = () => {
    const promise = new Promise((resolve, reject) => {
    axios.get(`https://${process.env.REACT_APP_SERVER_URL}/api/fs/developer/getDeveloperDetails`)
      .then((res) => {
        let data = {
            data: res.data,
            id: "developerDetails"
        };
        resolve(data)
    })
      .catch(err => reject(err));
    });
    return promise;
}

const clientDeveloperMapping = (request) => {
    const promise = new Promise((resolve, reject) => {
    axios.post(`https://${process.env.REACT_APP_SERVER_URL}/api/fs/client/clientDeveloperMapping`, request)
      .then((res) => {
        resolve(res)
    }).catch(err => reject(err));
    });
    return promise;
}

const clientDeveloperUnmapping = (request) => {
  const promise = new Promise((resolve, reject) => {
  axios.post(`https://${process.env.REACT_APP_SERVER_URL}/api/fs/client/clientDeveloperUnmapping`, request)
    .then((res) => {
      resolve(res)
  }).catch(err => reject(err));
  });
  return promise;
}

export {
    getClientDetailsApi,
    getDeveloperDetailsApi,
    clientDeveloperMapping,
    clientDeveloperUnmapping
};

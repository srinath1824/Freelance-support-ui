import axios from "axios";

const getClientDetailsApi = () => {
    const promise = new Promise((resolve, reject) => {
    axios.get("http://localhost:4000/api/fs/client/getClientDetails")
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
    axios.get("http://localhost:4000/api/fs/developer/getDeveloperDetails")
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
    axios.post("http://localhost:4000/api/fs/client/clientDeveloperMapping", request)
      .then((res) => {
        resolve(res)
    }).catch(err => reject(err));
    });
    return promise;
}

export {
    getClientDetailsApi,
    getDeveloperDetailsApi,
    clientDeveloperMapping
};

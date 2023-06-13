import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async newObj => {
  console.log(token)
  const config = {
    headers: { Authorization: token}
  }
  console.log(config)

  const res = await axios.post(baseUrl, newObj, config);
  return res.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken };

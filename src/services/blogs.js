import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const get = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const create = async (newObj) => {
  // console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  // console.log(config);

  const res = await axios.post(baseUrl, newObj, config);
  return res.data;
};

const update = async (updObj, id) => {
  // console.log(updObj);
  // console.log(id);
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, updObj, config)
  console.log(res.data)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
  console.log('deletion successful');
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, get, create, update, remove, setToken };

import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: process.env.REACT_APP_API_CLIENT_URL,
  headers: {'Content-Type': 'application/json'}
});

// Registration
export const register = async (payload) => {
  try {
    const res = await axios.post('users/', {
      "email": payload.email,
      "password": payload.password,
      "username": payload.username,
    })

    return res.data
  } catch(err) {
    return {error: true, message: err?.response?.data?.message || 'Internal error'}
  }
}

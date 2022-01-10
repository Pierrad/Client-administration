import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: process.env.REACT_APP_API_CLIENT_URL,
  headers: {'Content-Type': 'application/json'}
});

// Authentification
export const auth = async (payload) => {
  try {
    const res = await axios.post('users/login', {
      "email": payload.email,
      "password": payload.password
    })
    return res.data
  } catch(err) {
    return {error: true, message: err?.response?.data?.message || 'Internal error'}
  }
}

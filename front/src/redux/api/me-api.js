import defaultAxios from 'axios'

// Get user
export const getUser = async (payload) => {
  try {
    const axios = defaultAxios.create({
      baseURL: process.env.REACT_APP_API_CLIENT_URL
    });
    const res = await axios.get(`users/${payload.id}`)
    return res.data
  } catch(err) {
    return {error: true, message: err?.response?.data?.message || 'Internal error'}
  }
}

// Logout
export const logout = async (payload) => {
  try {
    const axios = defaultAxios.create({
      baseURL: process.env.REACT_APP_API_CLIENT_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${payload.token.token}`
      }
    });
    const res = await axios.get('users/logout')

    return res.data
  } catch(err) {
    return {error: true, message: err?.response?.data?.message || 'Internal error'}
  }
}

// Delete account
export const deleteAccount = async (payload) => {
  try {
    const axios = defaultAxios.create({
      baseURL: process.env.REACT_APP_API_CLIENT_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${payload.token}`
      }
    });
    const res = await axios.delete(`users/${payload._id}`)

    return res.data
  } catch(err) {
    return {error: true, message: err?.response?.data?.message || 'Internal error'}
  }
}

import defaultAxios from 'axios'

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
    return console.error(err)
  }
}


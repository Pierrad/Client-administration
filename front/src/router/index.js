import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { GET_ME } from '../redux/actions/me-action';

const GuardedRoute = ({ component: Component, me, location, handleUserVerification, ...rest }) => {
  useEffect(() => {
    if ((Object.keys(me).length === 0 || !me) && location.search !== '') {
      const infos = location.search.split('&')
      const id = infos[0].split('=')[1]
      const token = infos[1].split('=')[1]
      handleUserVerification({ id, token })
    }
  }, [handleUserVerification, location.search, me])

  useEffect(() => {
    if (location.search === '' && Object.keys(me).length === 0) {
      window.location.href = `/login`
    }
  }, [location, me])

  return (
    <Route {...rest} render={(props) => (
      <Component {...props} />
    )} />
  )
}

const mapStateToProps = (state) => ({
  me: state.me.me
})

const mapDispatchToProps = (dispatch) => ({
  handleUserVerification: ({ id, token }) => dispatch({ type: GET_ME, payload: { id, token } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuardedRoute);
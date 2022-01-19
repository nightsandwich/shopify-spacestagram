import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, username, isLoggedIn}) => (
  <div>
    <h1 style={{color: 'whitesmoke', textAlign: 'center'}}>NASA's Photo of the Day</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <a style={{color: 'red'}} href="#" onClick={handleClick}>
            Logout {username}
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

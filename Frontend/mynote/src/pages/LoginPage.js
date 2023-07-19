import React , { useContext }  from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div >
      <form onSubmit={loginUser} className='logging-form'>
        <h1>Welcome back, stranger! 👋</h1>
        <input type='text' name='username' placeholder='Enter username'></input>
        <input type='password' name='password' placeholder='Enter password'></input>
        <button type='submit'>Login</button>
        <Link to='/register'>
          <p>Don't have an account? Register here.</p>
        </Link>

      </form>
    </div>
  )
}

export default LoginPage

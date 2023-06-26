import React , { useContext }  from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={loginUser}>
        <input type='text' name='username' placeholder='Enter username'></input>
        <input type='password' name='password' placeholder='Enter password'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default LoginPage

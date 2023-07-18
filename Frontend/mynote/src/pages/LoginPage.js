import React , { useContext }  from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div >
      <form onSubmit={loginUser} className='logging-form'>
        <h1>Hello, stranger! 👋</h1>
        <input type='text' name='username' placeholder='Enter username'></input>
        <input type='password' name='password' placeholder='Enter password'></input>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage

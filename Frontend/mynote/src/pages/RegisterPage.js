import React , { useContext }  from 'react'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
  let {registerUser} = useContext(AuthContext)
  return (
    <div >
      <form onSubmit={registerUser} className='logging-form'>
        <h1>Hello, stranger! 👋</h1>
        <input type='text' name='username' placeholder='Enter username'></input>
        <input type='email' name='email' placeholder='Enter email'></input>
        <input type='password' name='password' placeholder='Enter password'></input>
        <input type='password' name='password-retype' placeholder='Confirm password'></input>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage

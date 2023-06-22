import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <form>
        <input type='text' name='username' placeholder='Enter username'></input>
        <input type='password' name='password' placeholder='Enter password'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default LoginPage

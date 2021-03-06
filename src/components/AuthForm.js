import { authService, firebaseInstance } from 'fbase'
import { useState } from 'react'

const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = event => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmit = async event => {
    event.preventDefault()
    try {
      let data
      if (newAccount) {
        // create newAccount
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev)

  return (
    <div>
      <form onSubmit={onSubmit} className="container">
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Log In'}
          className="authInput authSubmit"
        />
        <br />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
    </div>
  )
}

export default AuthForm

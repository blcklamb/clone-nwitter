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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
        <br />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
    </div>
  )
}

export default AuthForm;

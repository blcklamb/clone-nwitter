import { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChange = event => {
    console.log(event.target.name)
  }

  const onSubmit = event => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required value={email} onChange={onChange} />
        <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth

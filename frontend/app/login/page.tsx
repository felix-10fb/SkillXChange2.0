import React, {useState} from 'react'
import axios from 'axios'

export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleLogin(e:any){
    e.preventDefault()
    try{
      const res = await axios.post('/api/auth/login', {email, password})
      setMessage('Logged in')
    }catch(err){
      setMessage('Login failed')
    }
  }

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
      <div>{message}</div>
    </main>
  )
}

import React, {useState} from 'react'
import axios from 'axios'
import Header from '../../../components/Header'

const API = process.env.NEXT_PUBLIC_API_URL || ''

export default function SignupPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')

  async function handleSignup(e:any){
    e.preventDefault()
    try{
      const res = await axios.post(`${API}/auth/register`, {email, password, full_name: fullName})
      setMessage('Registered')
      if(res.data?.access_token) localStorage.setItem('sx_token', res.data.access_token)
    }catch(err){
      setMessage('Registration failed')
    }
  }

  return (
    <>
      <Header />
      <main style={{maxWidth:480, margin:'32px auto'}}>
        <h2>Sign up</h2>
        <form onSubmit={handleSignup} style={{display:'grid', gap:8}}>
          <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full name" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
          <button type="submit" style={{background:'var(--sx-orange)', color:'white', padding:'8px 12px', borderRadius:6}}>Create account</button>
        </form>
        <div style={{marginTop:12}}>{message}</div>
      </main>
    </>
  )
}

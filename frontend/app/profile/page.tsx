"use client"
import React, {useEffect, useState} from 'react'
import Header from '../../../components/Header'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || ''

export default function Profile(){
  const [user, setUser] = useState<any>(null)

  useEffect(()=>{
    const token = localStorage.getItem('sx_token')
    if(!token) return
    axios.get(`${API}/users/me`, {headers:{Authorization: `Bearer ${token}`}}).then(r=>setUser(r.data)).catch(()=>{})
  },[])

  if(!user) return (<>
    <Header />
    <main style={{padding:24}}>Please log in to view your profile.</main>
  </>)

  return (
    <>
      <Header />
      <main style={{maxWidth:720, margin:'24px auto', padding:12}}>
        <h2>Profile</h2>
        <div><strong>{user.full_name || user.email}</strong></div>
        <div>Skillcoins: {user.skillcoins}</div>
        <div>Streak: {user.streak}</div>
      </main>
    </>
  )
}

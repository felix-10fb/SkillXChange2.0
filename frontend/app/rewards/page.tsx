"use client"
import React, {useEffect, useState} from 'react'
import Header from '../../../components/Header'
import axios from 'axios'
import RewardCard from '../../../components/RewardCard'

const API = process.env.NEXT_PUBLIC_API_URL || ''

export default function Rewards(){
  const [rewards, setRewards] = useState<any[]>([])
  const [message, setMessage] = useState('')

  useEffect(()=>{
    axios.get(`${API}/rewards/list`).then(r=>setRewards(r.data)).catch(()=>{})
  },[])

  async function purchase(id:number){
    const token = localStorage.getItem('sx_token')
    try{
      await axios.post(`${API}/rewards/purchase`, {user_id: 1, reward_id: id}, {headers: {Authorization: `Bearer ${token}`}})
      setMessage('Purchased')
    }catch(err){
      setMessage('Purchase failed')
    }
  }

  return (
    <>
      <Header />
      <main style={{maxWidth:900, margin:'24px auto', padding:12}}>
        <h2>Rewards</h2>
        <div style={{display:'grid', gap:12}}>
          {rewards.map(r=> <RewardCard key={r.id} id={r.id} title={r.title} cost={r.cost} onPurchase={purchase} />)}
        </div>
        <div style={{marginTop:12}}>{message}</div>
      </main>
    </>
  )
}

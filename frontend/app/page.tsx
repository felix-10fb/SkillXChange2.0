import React from 'react'
import Header from '../../components/Header'
import '../../styles/globals.css'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section style={{textAlign:'center', marginTop:48}}>
          <h1 style={{color:'var(--sx-purple)'}}>SkillXChange</h1>
          <p style={{maxWidth:720, margin:'12px auto'}}>Interactive learning and rewards coming soon. Earn Skillcoins, keep streaks, and redeem rewards.</p>
        </section>
      </main>
    </>
  )
}

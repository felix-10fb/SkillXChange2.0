import React from 'react'

export default function Header(){
  return (
    <header className="sx-header">
      <div className="sx-container">
        <a href="/" className="sx-brand">
          <img src="/logo.png" alt="SkillXChange" className="sx-logo" />
          <span className="sx-title">SkillXChange</span>
        </a>
        <nav className="sx-nav">
          <a href="/login" className="sx-link">Login</a>
          <a href="/profile" className="sx-link">Profile</a>
          <a href="/rewards" className="sx-link">Rewards</a>
          <a href="/signup" className="sx-cta">Get Started</a>
        </nav>
      </div>
    </header>
  )
}

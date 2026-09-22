"use client"
import React from 'react'

type Props = {
  id: number
  title: string
  cost: number
  onPurchase: (id: number) => void
}

export default function RewardCard({id, title, cost, onPurchase}: Props){
  return (
    <div className="reward-card">
      <div>
        <strong>{title}</strong>
        <div className="small">Cost: {cost} Skillcoins</div>
      </div>
      <div>
        <button className="sx-cta" onClick={() => onPurchase(id)}>Purchase</button>
      </div>
    </div>
  )
}

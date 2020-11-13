import React from 'react';

export default function ViewTitle ({text, children}) {
  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
      <div className='align-self-center'>{children}</div>
    </div>
  )
}
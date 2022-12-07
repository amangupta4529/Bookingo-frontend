import React from 'react'
import "./nav.css"
import { Link } from 'react-router-dom'

export default function Nav({type}) {
  return (
    <div className='nav-box' > 
    <div className='nav-item '><Link  className='wc' to="/">Bookingo.com</Link></div>
    <div className='auth' ><Link className='wc' to={`/${type}`}>{type}</Link></div>
    </div>
  )
}

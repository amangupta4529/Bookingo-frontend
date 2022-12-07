import React from 'react'
import "./status.css";
export default function Success({success,setOpen}) {
  return (
    <div className="statusModal">
    <div className='img-box'>
    {success==1 ? <>
    <img src="/success.gif" alt="this is a gif"  className='statusGIF' />
    <h2 className='successText'>Wohooo! We Have Received Your Payment Successfully </h2>
    </>: <>
    <img src="/failed.gif" alt="this is a gif"  className='statusGIF' />
    <h2 className='failedText'>oops ! Payment Failed</h2>
    </> 
    }
    </div>
    <button className='backButton' onClick={()=>setOpen(false)}>Go Back</button>
    </div>
  )
}

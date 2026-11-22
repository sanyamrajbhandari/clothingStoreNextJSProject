import React from 'react'


const PROMISES = [
    "Natural Fibres Only",
    "Full-canvas tailoring",
    "Made in Portugal",
    "Free alterations",
    "Carbon-neutral shipping",
    "60-day returns",
]
function Marquee() {

    //render the list twice for no visible gap
    const doubled = [...PROMISES,...PROMISES]
  return (
    <div className='mt-10 overflow-hidden bg-forest text-cream py-3 '>
        <div className='marquee-track flex gap-10 font-display italic whitespace-nowrap'>
            {doubled.map((text,i)=>(
                <span key={i} className='flex items-center gap-10'>
                    {text} 
                    <span className='text-lime'>&#10022;</span>
                </span>
            ))}
        </div>
    </div>
  )
}

export default Marquee
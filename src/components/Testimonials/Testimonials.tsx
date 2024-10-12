import React from 'react'
import SlickSlider from './SlickSlider'
import './Testimonials.css'

const Testimonials = () => {
  return (
    <div className="t-wrapper">
        <div className="container">
            <div className="t-container">
                <div className="t-head">
                    <span className='tag'>Testimonials</span>
                    <span className='title'>Testimonails</span>
                    <span className='des'>Discover your potential!</span>
                </div>
            </div>
            {/* slider */}
            <SlickSlider/>
        </div>
    </div>
  )
}

export default Testimonials
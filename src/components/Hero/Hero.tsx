"use client"

import React from 'react'
import './Hero.css'
import { HeroData } from '../../utils/data'
import {motion} from 'framer-motion'

const Hero = () => {

    const variants = (delay = 0) => ({
        initial : {
            y: "18rem"
        },
        animate : {
            y: "0rem",
            transition: {
                type: "spring",
                damping: 25,
                duration: 2.5,
                delay: delay
            }
        }
    })

    const imgVariants = () => ({
        initial : {
            y: "18rem"
        }, 
        animate: {
            y: "0rem",
            transition: {
                type: "spring",
                duration: 2,
                stiffness: 30,
            }
        }
    })

  return (
    <div className="h-wrapper wwhome-wrapper">
        <div className="container">
            <img src="hero/hero-arrow.png" alt="" className="h-arrow" />
            <div className="h-container">
                {/* left Side */}
                <div className="h-left">
                    <div className="image-row">
                        {
                            HeroData.slice(0, 3).map((person, i)=> (
                                <div className='person-pill' key={i}>
                                    <motion.div 
                                    initial={"initial"}
                                    animate={"animate"}
                                    variants={variants()}
                                    style={{backgroundColor: person.bg}}
                                    className="person-pill-bg">
                                        <motion.img 
                                        initial={"initial"}
                                        animate={"animate"}
                                        variants={imgVariants()}
                                        src={person.src} 
                                        alt={person.src} />
                                    </motion.div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="image-row">
                        {
                            HeroData.slice(3, 6).map((person, i)=> (
                                <div className='person-pill' key={i}>
                                    <motion.div 
                                    initial={"initial"}
                                    animate={"animate"}
                                    variants={variants()}
                                    style={{backgroundColor: person.bg}}
                                    className="person-pill-bg">
                                        <motion.img 
                                        initial={"initial"}
                                        animate={"animate"}
                                        variants={imgVariants()}
                                        src={person.src} 
                                        alt={person.src} />
                                    </motion.div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* right Side */}
                <div className="h-right">
                    <div className="h-title">
                        <span className="highlight-title">Software</span>
                        <span className="highlight-title">Opportunities</span>
                        <span>Connected!</span>
                    </div>
                    <div className="h-description">
                        <p>
                    <span className="title-company-name">Pragma Once</span>&nbsp;connects employers with the right talent and helps professionals grow their careers.
                    </p>
                    <p className="contact-us-email">Get in touch: info@pragmaonce.co.za</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero
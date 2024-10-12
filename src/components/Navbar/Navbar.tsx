"use client"

import React, { useState } from 'react'
import './Navbar.css'
import {BiMenuAltRight} from 'react-icons/bi'
import {RxCross2} from 'react-icons/rx'
import {motion, useMotionValueEvent, useScroll} from 'framer-motion';
import { Link } from 'react-scroll'

const Navbar = () => {
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false)
    const [navStyle, setNavStyle] = useState("");
    const { scrollYProgress } = useScroll();
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.2) {
            setNavStyle("sticky");
        } else {
            setNavStyle("")
        }
    })

  return (
    <div className={`n-wrapper ${navStyle}`}>
        {/* desktop version */}
        <div className="container">
            <div className="n-container">
                {/* left side */}
                <div className="n-logo">
                <Link to="wwhome-wrapper" spy={true} smooth={true} >
                <img src="hero/logo.png" alt="" className="logo" />
                        </Link>
                    {/* <span>Pragma Once Software</span> */}
                </div>

                {/* right side */}
                <div className="n-right">
                    <div className="n-menu">
                        <Link to="wwd-wrapper" spy={true} smooth={true} >
                            <span>What we do</span>
                        </Link>
                        <Link to="hiw-wrapper" spy smooth offset={100} >
                            <span>How it works</span>
                        </Link>
                        <Link to="wwi-wrapper" spy smooth >
                            <span>Who we work with</span>
                        </Link>
                        <Link to="talent-hub-wrapper" spy smooth offset={100} >
                            <span className="highlight">Talent hub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* mobile version */}
        <div className="nm-container">
            {/* logo */}
            {/* <span>Pragma Once Software</span> */}
            <Link to="wwhome-wrapper" spy={true} smooth={true} >
                <img src="hero/logo.png" alt="" className="logo" />
                        </Link>
            {/* menu icon */}
            {
                !mobileMenuOpened ? 
                <BiMenuAltRight
                size={30}
                onClick={() => setMobileMenuOpened(true)} 
                /> : 
                <RxCross2 
                size={30}
                onClick={() => setMobileMenuOpened(false)}
                />
            }

            {/* mobile menu */}
            <div className="nm-menu">
                <Link to="wwd-wrapper" spy={true} smooth={true} onClick={() => setMobileMenuOpened(false)}>
                    <span className="mobile-menu">What we do</span>
                </Link>
                <Link to="hiw-wrapper" spy smooth offset={100} onClick={() => setMobileMenuOpened(false)}>
                    <span className="mobile-menu">How it works</span>
                </Link>
                <Link to="wwi-wrapper" spy smooth onClick={() => setMobileMenuOpened(false)}>
                    <span className="mobile-menu">Who we work with</span>
                </Link>
                <Link to="talent-hub-wrapper" spy smooth offset={100} onClick={() => setMobileMenuOpened(false)}>
                    <span className="mobile-menu highlight">Talent hub</span>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default Navbar
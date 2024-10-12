import React from 'react'
import './Footer.css'
import { Link } from 'react-scroll'

const Footer = () => {
  return (
    <div className="f-wrapper">
        <div className="container">
            <div className="f-container">
                <span className="title">Looking for the Best?</span>
                <p className="h-description">Get in touch: info@pragmaonce.co.za</p>
                <hr/>
                <div className="f-menu">
                    <Link to="wwhome-wrapper" spy={true} smooth={true} >
                            <span>Home</span>
                        </Link>
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
                <hr />
            </div>
        </div>
    </div>
  )
}

export default Footer
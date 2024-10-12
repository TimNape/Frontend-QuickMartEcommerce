import React from 'react'
import './WhoWeInvest.css'
import { whoWeInvest } from '../../utils/data'
import { motion } from 'framer-motion'
import { containerVariants, tagVariants, titleVariants } from '../../utils/animation'

const WhoWeInvest = () => {
  return (
    <div className="wwi-wrapper">
        <div className="container">
            <div className="wwi-container">
                {/* left side */}
                <div className="wwi-left">
                    <div className="head">
                        <motion.span 
                        variants={tagVariants}
                        initial="offscreen"
                        whileInView={"onscreen"}
                        className='tag'>
                            We work with
                        </motion.span>
                        <motion.span 
                        variants={titleVariants}
                        initial="offscreen"
                        whileInView={"onscreen"}
                        className='title'>
                            {" "}
                           This Builders
                        </motion.span>
                    </div>

                    {/* features */}
                    <div className="wwi-features">
                        {
                            whoWeInvest.map((feature,i) => (
                                <motion.div 
                                variants={containerVariants(i * 0.05 + 1)}
                                initial="offscreen"
                                whileInView={"onscreen"}
                                className='wwi-feature' key={i}>
                                    <span className='des'>{feature.title}</span>
                                    <span className='text'>{feature.des}</span>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>

                {/* right side */}
                <div className="wwi-right">
                    <motion.img 
                    variants={containerVariants(0.5)}
                    initial="offscreen"
                    whileInView={"onscreen"}
                    src="persons.png"
                    alt="persons" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhoWeInvest
'use client'

import React from 'react'
import './WhatWeDo.css'
import { features } from '../../utils/data'
import { motion } from 'framer-motion'
import { containerVariants, desVariants, tagVariants, titleVariants } from '../../utils/animation'
import DynamicFaIcon from '../../components/DynamicFaIcon/DynamicFaIcon';
const WhatWeDo = () => {
  return (
    <div className="wwd-wrapper">
        <div className="container">
            <div className="wwd-container">
                {/* head of section */}
                <div className="wwd-head">
                    <motion.span
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={tagVariants}
                    className='tag'
                    >What we do</motion.span>
                    <motion.span
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                    className='title'
                    >
                        {" "}
                        We drive digital innovation through talent solutions and software consulting.
                    </motion.span>
                    <motion.span
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={desVariants}
                    className='des'
                    >Here is how we can collaborate</motion.span>
                </div>
                {/* two blocks */}
                <div className="wwd-blocks">
                    {/* first block */}
                    <div className="wwd-block">
                        <motion.span 
                        variants={titleVariants}
                        initial="offscreen"
                        whileInView={"onscreen"}
                        className='sec-title'>
                            Talent
                        </motion.span>
                        <motion.span 
                        variants={desVariants}
                        initial="offscreen"
                        whileInView={"onscreen"}
                        className='text'>
                            We match the right talent with the right opportunities, ensuring a seamless hiring process for both clients and candidates
                        </motion.span>
                        <div className="block-features">
                            {
                                features.slice(0, 3).map((feature, i)=> (
                                    <motion.div 
                                    initial="offscreen"
                                    whileInView={"onscreen"}
                                    variants={containerVariants((i+1)*0.1)}
                                    className='block-feature' key={i}>
                                        <DynamicFaIcon name={feature.icon} className="icon-large outline-icon"/>
                                        <span>{feature.title}</span>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                    {/* second block */}
                    <div className="wwd-block">
                        <motion.span 
                        variants={titleVariants}
                        initial="offscreen"
                        whileInView={"onscreen"}
                        className='sec-title'>
                            Consulting
                        </motion.span>
                        <motion.span 
                        variants={desVariants}
                        initial="offscreen"
                        whileInView={"onscreen"}
                        className='text'>
                            We provide strategic insights and practical advice to help you optimize your software investments and achieve your business goals
                        </motion.span>
                        <div className="block-features">
                            {
                                features.slice(3, 6).map((feature, i)=> (
                                    <motion.div 
                                    initial="offscreen"
                                    whileInView={"onscreen"}
                                    variants={containerVariants((i+1)*0.1)}
                                    className='block-feature' 
                                    key={i}>
                                        <DynamicFaIcon name={feature.icon}  className="icon-large outline-icon"/>
                                        <span>{feature.title}</span>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* support block */}
                <motion.div 
                initial="offscreen"
                whileInView={"onscreen"}
                variants={containerVariants(0.3)}
                className="wwd-support">
                    {/* left side */}
                    <div>
                        <span className="sec-title">
                            Talent
                        </span>
                        <span className="des">
                        Tailored Solutions 
                        </span>
                    </div>

                    {/* right side */}
                    <div>
                        <span className='text'>
                        With deep expertise in software development, Pragma Once uses comprehensive pre-screening to match your company with top-tier talent.
                        </span>
                        <span className='text'>
                        Our tailored approach ensures only highly qualified candidates reach your shortlist, saving you time and effort.
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default WhatWeDo
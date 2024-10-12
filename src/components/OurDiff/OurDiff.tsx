import React from 'react'
import './OurDiff.css'
import { ourDiffFeatures } from '../../utils/data'
import { motion } from 'framer-motion'
import { containerVariants, desVariants, tagVariants, titleVariants } from '../../utils/animation'
import DynamicFaIcon from '../DynamicFaIcon/DynamicFaIcon';

const OurDiff = () => {
  return (
    <div className="od-wrapper">
        <div className="container">
            <div className="od-container">
                {/* head */}
                <div className="od-head">
                    <motion.span 
                    variants={tagVariants}
                    initial="offscreen"
                    whileInView={"onscreen"}
                    className='tag'>
                        Our Difference
                    </motion.span>
                    <motion.span 
                    variants={titleVariants}
                    initial="offscreen"
                    whileInView={"onscreen"}
                    className='title'>
                        Expertise, Tailored, Efficiency
                    </motion.span>
                    <motion.span 
                    variants={desVariants}
                    initial="offscreen"
                    whileInView={"onscreen"}
                    className='text'>
                        Pragma Once combines industry expertise with a tailored recruitment approach, 
                        <br />ensuring efficient matching of top-tier talent to meet your specific needs.
                    </motion.span>
                </div>
                {/* features */}
                <div className="od-features">
                    {
                        ourDiffFeatures.map((feature, i)=> (
                            <motion.div 
                            variants={containerVariants((i + 1) * 0.1)}
                            initial="offscreen"
                            whileInView="onscreen"
                            key={i} className='od-feature'>
                                <DynamicFaIcon name={feature.icon}  className="icon-xlarge outline-icon"/>
                                <span className='sec-title'>{feature.title}</span>
                                <span className='text'>{feature.des}</span>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default OurDiff
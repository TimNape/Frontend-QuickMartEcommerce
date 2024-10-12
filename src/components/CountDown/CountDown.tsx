import React, { useState, useEffect }  from 'react'
import './CountDown.css'
import {motion} from 'framer-motion'
import { containerVariants } from '../../utils/animation'
import DynamicFaIcon from '../../components/DynamicFaIcon/DynamicFaIcon';



const targetTime = new Date("2025-01-01").getTime();

const CountDown = () => {

  const [currentTime, setCurrentTime] = useState(Date.now());
  const timeBetween = targetTime - currentTime;
  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className='count-down'>
    <motion.div 
    initial={{
      width: ".5rem",
      borderRadius: "100%"
    }}
    whileInView={{
      //width: "50%",
      borderRadius: "999px",
      transition: {
        type: "easeOut",
        duration: 1,
      },
    }}
    className="wrapper">
        {/* icon */}
        <motion.div
        variants={containerVariants(0.6)}
        initial="offscreen"
        whileInView={"onscreen"}
        viewport={{
          once: true,
        }}
        >
             <DynamicFaIcon name={'FaStopwatch'}  className="icon-xlarge outline-icon"/>
        </motion.div>

        {/* get funded button */}
        <motion.div 
        variants={containerVariants(0.9)}
        initial="offscreen"
        whileInView={"onscreen"}
        viewport={{
          once: true,
        }}
        className="countDownValue h-title">
           {Math.round(days/7/2)} 
        </motion.div>

           {/* unit of measure*/}
           <motion.div 
        variants={containerVariants(0.9)}
        initial="offscreen"
        whileInView={"onscreen"}
        viewport={{
          once: true,
        }}  className="h-title">
           Sprints!
        </motion.div>
    </motion.div>
    </div>
    
  )
}

export default CountDown
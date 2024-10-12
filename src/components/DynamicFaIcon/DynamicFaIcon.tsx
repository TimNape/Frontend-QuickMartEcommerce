import { FaUserCog, FaUserPlus, FaCog, FaChalkboardTeacher, FaRobot, FaLaptopCode, FaLightbulb, FaHandshake, FaStopwatch, FaUserFriends, FaUserCheck } from "react-icons/fa";
import './DynamicFaIcon.css'
import { IconType } from "react-icons/lib";
/* Your icon name from database data can now be passed as prop */
const DynamicFaIcon = (props : {name: string, className: string}) => {

  const iconMap = new Map<string, IconType>([
    [FaUserCog.name.toUpperCase(), FaUserCog],
    [FaUserPlus.name.toUpperCase(), FaUserPlus],
    [FaCog.name.toUpperCase(), FaCog],
    [FaChalkboardTeacher.name.toUpperCase(), FaChalkboardTeacher],
    [FaRobot.name.toUpperCase(), FaRobot],
    [FaLaptopCode.name.toUpperCase(), FaLaptopCode],
    [FaLightbulb.name.toUpperCase(), FaLightbulb],
    [FaHandshake.name.toUpperCase(), FaHandshake],
    [FaStopwatch.name.toUpperCase(), FaStopwatch],
    [FaUserFriends.name.toUpperCase(), FaUserFriends],
    [FaUserCheck.name.toUpperCase(), FaUserCheck],
    ]);
    
    const IconComponent = iconMap.get(props.name.toUpperCase());

  if (!IconComponent) { // Return a default one
    return <FaLaptopCode  className={props.className}/>;
  }

  return <IconComponent className={props.className}/>;
};

export default DynamicFaIcon

import './TalentHub.css'
import CountDown from '../CountDown/CountDown'
const TalentHub = () => {
  return (
    <div className="talent-hub-wrapper wrapper">
        <div className="container">
            <div className="t-container">
                <div className="t-head">
                    <span className='tag highlight'>Talent Hub</span>
                    <span className='title'>Effortlessly connect with tailored talent &amp; opportunities.</span>
                    <span className='des'>Time left before our builders ship this feature: </span>
                    <CountDown/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TalentHub
import React, {useState} from 'react'
import con from './confirmation.module.css'
import img1 from '../images/business guy.png'
import { Link } from 'react-router-dom'
import logo from '../../assets/Group 7753.svg'
import  SignUpConfirmation  from '../Signup/SignUpConfirmation'


const Confirmation = () => {

    const [showSignUpConfirmation, setShowSignUpConfirmation] = useState(false);

  //   const [closePop, setClosePop] = useState(true); 
  // const handleClosePop = () => {
  //   setClosePop(false); 
  // };


    const handleSendEmailAgain =(e)=>{
      e.preventDefault()
      setShowSignUpConfirmation(true)
    }

    const handleClosePop = () => {
      setShowSignUpConfirmation(false);
    };
  
  return (
    <div className={con.maindiv}>
        <div>
            <img src={img1} alt="sidepic" className={con.sidepic}/>
           
        </div>
        <img src={logo} alt="logo" className={con.logo}/>
        <section className={con.confirm_sect}>
                <h1 className={con.confirmationheading}>Confirmation email sent !</h1>

                
                <p className={con.confirmationtext}>Didn't receive the email ? <br /> Please check the email address you used to make sure it matches the address <br /> 
                on your account, try looking in your spam folder or request another email below.</p>
                
                <button onClick={handleSendEmailAgain} className={con.sendagain}>Send Again</button>
                <Link to='/signup' className={con.link}>Go back to Sign Up page</Link>
        </section>

        <Link to='/token' className={con.next}>Next &gt; &gt; </Link>

        {showSignUpConfirmation && <SignUpConfirmation handleClosePop={handleClosePop}/>}
    </div>
  )
}

export default Confirmation
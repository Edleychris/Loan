import { useEffect, useState } from 'react';
import forgot from './forgotpwd.module.css';
import sidepic from '../images/business guy.png';
import logo from '../../assets/Group 7753.svg';
import { FgtPswdConfirm } from './FgtPswdConfirm';
import axios from 'axios';
import Resend from './Resend';


const INITIAL_STATE = {email: ''}
const ForgotPwd = () => {
    const [form, setForm] = useState(INITIAL_STATE);
    const [showResetConfirmation, setShowResetConfirmation] = useState(false)
    const [resendTimer, setResendTimer] = useState(null);
    const [showResendLink, setShowResendLink] = useState(false);
    useEffect(() => {
        return () => {
          clearTimeout(resendTimer);
        };
      }, [resendTimer]);
      

    const [errorUI, setErrorUI] = useState(null);

    const VALIDATION = {
        email: [
            {
              isValid: (value) => !!value,
              message: 'Is required.',
            },
            {
              isValid: (value) => /\S+@\S+\.\S+/.test(value),
              message: 'Not an email.',
            },
        ]
    };

    const getErrorFields = (form) =>
        Object.keys(form).reduce((acc, key) => {
            if (!VALIDATION[key]) return acc;
    
            const errorsPerField = VALIDATION[key]
                .map((validation) => ({
                    isValid: validation.isValid(form[key]),
                    message: validation.message,
                }))
                .filter((errorPerField) => !errorPerField.isValid);
        
            return { ...acc, [key]: errorsPerField };
        }, {});

    function handleChange(e) {
        const {id, value} = e.target;
        if (errorUI) setErrorUI(null);
        setForm(prevState => ({
            ...prevState,
            [id]: value
        }))
        console.log({id, value})
    }
    function handleSubmit(event) {
        event.preventDefault();
        const errorFields = getErrorFields(form);
        const hasErrors = Object.values(errorFields).flat().length > 0;
        if (hasErrors) {
            return setErrorUI({ ...errorFields });
        }
        console.log(`${form.email} ${form.password}`);
        setForm(INITIAL_STATE);
        setShowResetConfirmation(true); // Set the showResetConfirmation state to true
        setShowResendLink(true)
   
        
    axios({
        method: 'POST',
        url: "https://loanifyteama-production.up.railway.app/api/v1/auth/reset-password",
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        data: {
  
          "email": form.email,
          // Add any other data fields as needed
        }
      })
        .then(response => {
          // Handle the response data
          console.log(response.data);
  
    
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
          if(error.message !== "A mail has been sent to your email") {
            setErrorUI("There was an error. Please try again!")
          }
        })
    }
    

    return (
        <div className={forgot.holder}>
          {/* <div className={forgot.holder_body} > */}

         
            <div className={forgot.image}>
                <img src={sidepic} alt="sidepic" className={forgot.sideimg} />
            </div>
            <div className={forgot.right_side}>
            <img src={logo} alt="logo" className={forgot._logo_forgot} />

                <div className={forgot.forgot_details}>
                    <h1 className={forgot.forgot_text}>Forgot Password?</h1>
                <form action="submit" onSubmit={handleSubmit} className={forgot.forgot_form}>
                    <div className={forgot.email_input}>
                        <input
                            type="text"
                            className={forgot.forgot_input}
                            id='email' value={form.email} 
                            onChange={handleChange} 
                            placeholder='Email address...'
        
                        />
                        <div className={forgot.errMsg}>
                            {errorUI?.email?.length ? (
                                <span style={{ color: 'red' }}>
                                    {errorUI.email[0].message}
                                </span>
                            ) : null}
                        </div>
                    </div>
                    <span className={forgot.forgotPwdText}>Reset link will be sent to your email</span>
                    {showResetConfirmation ? (
  <FgtPswdConfirm />
) : (
  <div>
    <button type="submit" className={forgot.reset_btn}>
      Submit
    </button>

    {showResendLink ? (
      <Resend />
    ) : (
      <div
        className={forgot.reset_link}
        onClick={() => {
          setShowResendLink(true);
          setResendTimer(
            setTimeout(() => {
              setShowResendLink(false);
            }, 2000)
          );
        }}
      >
        Resend reset link
      </div>
    )}
  </div>
)}
                </form>
            </div>
                </div> </div>
            // </div>
    );
}

export default ForgotPwd;

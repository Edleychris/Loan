import React, { useState } from 'react';
import style from './signup.module.css';
import pic from '../images/business guy.png';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Group 7753.svg';
import axios from 'axios';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { SpinnerCircular } from 'spinners-react';

const INITIAL = {
  firstName: '',
  lastName: '',
  role: '',
  phoneNumber: '',
  email: '',
  password: ''
};

const Signup = () => {
  const [form, setForm] = useState(INITIAL);
  const [errorUI, setErrorUI] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();


  const VALIDATION = {
    firstName: [
      {
      isValid: (value) => !!value,
      message: "Is required.",
      },
      {
        isValid: (value) => /^[^0-9]*[a-zA-Z][^0-9]*[a-zA-Z][^0-9]*[a-zA-Z][^0-9]*$/.test(value),
        message: "At least 2 alphabets, no numbers"
      },
    ],
    email: [
      {
        isValid: (value) => !!value,
        message: 'Is required.',
      },
      {
        isValid: (value) => /\S+@\S+\.\S+/.test(value),
        message: 'Not an email.',
      },
    ],

    password: [
      {
        isValid: (value) => !!value,
        message: "Is required.",
      },
      {
        isValid: (value) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value),
        message:
          "Requires 6+ characters, Uppercase, Lowercase letters, numeric digit (0-9) and a special character.",
      },
    ],


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

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (errorUI) setErrorUI({});
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log({ id, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorFields = getErrorFields(form);
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return setErrorUI({ ...errorFields });

    setForm(INITIAL);
    console.log("Form submitted");

    setLoading(true);
    axios.post('https://loanifyteama-production.up.railway.app/api/v1/auth/sign-up', form)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('signup', response.data.token)
        navigate('/confirmation');
      })
      .catch((error) => {
        if (error.message === 'Request failed with status code 500') {
          setErrorUI('User already exists');
        }
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  

  return (
    <div className={style.signup_container}>
      <div className={style.signup_body}>
        <img src={pic} alt="picture" className={style.sideimg} />
        <section className={style.section}>
          <img src={logo} alt="logo" className={style.logo} />
          <div className={style.formContainer}>
            <h1 className={style.signupheading}>Sign Up</h1>
            <div className={style.signup_details}>


              <form onSubmit={handleSubmit} className={style.singup_form}>

                <div className={style.inputFieldBlock}>
                  <label className={style.label} htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={style.signup__input}
                    required
                  />
                </div>

                <div className={style.inputFieldBlock}>
                  <label className={style.label} htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={style.signup__input}
                    required
                  />
                </div>

                <div className={style.inputFieldBlock}>
                  <label className={style.label} htmlFor="role">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="John"
                    className={style.signup__input}
                    required
                  />
                </div>

                <div className={style.inputFieldBlock}>
                  <label className={style.label} htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="081456789101"
                    maxLength= "11"
                    className={style.signup__input}
                    required
                  />
                </div>

                <div>
                  <div className={style.inputFieldBlock}>
                    <label className={style.label} htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="johndoe@gmail.com"
                      className={style.signup__input}
                    />
                  </div>
                  <p className={style.error}>
                    {errorUI?.email?.length ? (
                      <span style={{ color: 'red' }}>
                        {errorUI.email[0].message}
                      </span>
                    ) : null}
                  </p>
                </div>

                <div>
                  <div className={style.inputFieldBlock}>
                    <label className={style.label} htmlFor="password">
                      Password
                    </label>
                    <input
                      type= {showPassword ? 'text' : 'password'}
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className={style.signup__input}
                    />
                    <span className={style.eye_icon}>{showPassword ? <BsEye onClick={()=> setShowPassword(!showPassword)}/> : <BsEyeSlash onClick={()=> setShowPassword(!showPassword)}/>}</span>
                  </div>
                  <p className={style.error}>
                    {errorUI?.password?.length ? (
                      <span style={{ color: "red" }}>
                        {errorUI.password[0].message}
                      </span>
                    ) : null}
                  </p>
                </div>

                <button type="submit" className={style.submit} disabled={loading}> {loading ? <SpinnerCircular size={30} color='#FFFFFF' secondaryColor='#3944BC'/> : <p>Sign up</p>}</button>
              </form>
              <div className={style.login_signup}>
                <p className={style.logintext}>Already have an account?</p>
                <Link to="/login" className={style.loginlink}>
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;

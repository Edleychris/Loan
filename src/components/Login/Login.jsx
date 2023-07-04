import { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./login.module.css";
import business from "../images/business guy.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Group 7753.svg";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";

const INITIAL = { email: "", password: "" };

const Login = () => {

  const [form, setForm] = useState(INITIAL);
  const [errorUI, setErrorUI] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const VALIDATION = {
    email: [
      {
        isValid: (value) => !!value,
        message: "Is required.",
      },
      {
        isValid: (value) => /\S+@\S+\.\S+/.test(value),
        message: "Not an email.",
      },
    ],

    password: [
      {
        isValid: (value) => !!value,
        message: "Is required.",
      },
      {
        isValid: (value) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value),
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
    setLoading(true);
    console.log("Form submitted");

    
    setTimeout(() => {
      axios
        .post(
          "https://loanifyteama-production.up.railway.app/api/v1/auth/login",
          form
        )
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          if (response.data.status == true) {
            navigate("/token");
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.message === "Request failed with status code 404") {
            setErrMsg("Incorrect email or password. Try again!");
          } else {
            navigate("/token");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  };

 
  const showPwd = () => {
    setShowPassword((prevVisible) => !prevVisible);
  };

  return (
    <div className={styles.bodyContainer}>
      <section className={styles.body}>
        <div>
          <img src={business} alt="picture" className={styles.sidepic} />
        </div>
        <div className={styles.right_login_page}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.main_login}>
            <h2 className={styles.welcome}>Welcome Back</h2>

            <form onSubmit={handleSubmit} className={styles.login_form}>
              <div className={styles.input}>
                <div className={styles.username}>
                  <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={handleChange}
                    value={form.email}
                    required
                    className={styles.form_input}
                    placeholder="Email Address"
                  />
                  <p className={styles.errMsg}>
                    {errorUI?.email?.length ? (
                      <span style={{ color: "red" }}>
                        {errorUI.email[0].message}
                      </span>
                    ) : null}
                  </p>
                </div>

                <div>
                  <div className={styles.password}>
                    {/* <label htmlFor="password" className={styles.form_label2}>Password</label> */}
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      onChange={handleChange}
                      value={form.password}
                      required
                      className={styles.form_input}
                      placeholder="Password"
                    />
                    {showPassword ? (
                      <BsEye onClick={showPwd} className={styles.login__icon} />
                    ) : (
                      <BsEyeSlash
                        onClick={showPwd}
                        className={styles.login__icon}
                      />
                    )}
                  </div>
                  <p className={styles.errMsg}>
                    {errorUI?.password?.length ? (
                      <span style={{ color: "red" }}>
                        {errorUI.password[0].message}
                      </span>
                    ) : null}
                  </p>
                </div>

                <Link to="/forgotpwd" className={styles.forgotpwd}>
                  Forgot password?
                </Link>
              </div>

              <button  className={styles.login}>
                {loading ? (
                  <SpinnerCircular
                    size={30}
                    color="#FFFFFF"
                    secondaryColor="#3944BC"
                  />
                ) : (
                  <p>Log In</p>
                )}
              </button>
            </form>

            <div className={styles.signup}>
              <p className={styles.signuptext}>Just joined the team? </p>
              <Link to="/signup" className={styles.signuplink}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

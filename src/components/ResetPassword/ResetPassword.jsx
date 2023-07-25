import { useState } from "react";
import sidepic from "../images/business guy.png";
import logo from "../../assets/Group 7753.svg";
import style from "./resetpassword.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ResetSuccessPage } from "./ResetSuccessPage";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";

const INITINPUT = { code: "", email: "", password: "" };

export const ResetPassword = ({ onSuccess }) => {
  const [form, setForm] = useState(INITINPUT);
  const [errorUI, setErrorUI] = useState({});
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible((prevVisible) => !prevVisible);
  };

  const VALIDATION = {
    password: [
      {
        isValid: (value) => !!value,
        message: "Is required.",
      },
      {
        isValid: (value) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value),
        message:
          "Requires 8+ characters, Uppercase, Lowercase letters, numeric digit (0-9) and a special character.",
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
    if (errorUI) setErrorUI(null);
    if (id === "code") {
      setForm((prevState) => ({
        ...prevState,
        [id]: Number(value),
      }));
    } else if (id === "email" || id === "password") {
      setForm((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
    console.log({ id, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorFields = getErrorFields(form);
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return setErrorUI({ ...errorFields });

    setLoading(true);
    //api call begins
    axios
      .post(
        "https://loanifyteama-production.up.railway.app/api/v1/auth/update-password",
        form
      )
      .then((response) => {
        console.log(response.data);
        console.log("Form submitted");
        setShowResetSuccess(true);
        onSuccess();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={style.reset_holder}>
      {/* <div className={style.reset_holder_section}> */}
        <div className={style.image}>
          <img src={sidepic} alt="sidepic" className={style.sideimg} />
        </div>
        <div className={style.reset__whole}>
        <div className={style.right_logo}>
          <img src={logo} alt="logo" className={style.reset_logo} />
          </div>

          <div className={style.reset_details}>
            <h1 className={style.reset_text}>Reset Password</h1>

            <form
              onSubmit={handleSubmit}
              className={style.reseteditPopUp_change_psw}
            >
              <div className={style.resetpasswordWrapper}>
                <div className={style.resetcodeBlock}>
                  <input
                    type="number"
                    id="code"
                    placeholder="Enter code"
                    value={form.code}
                    onChange={handleChange}
                    className={style.reset__input}
                  />
                </div>
                <div className={style.resetemailBlock}>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className={style.reset__input}
                  />
                </div>
                <div className={style.editPasswordBlock}>
                  <input
                    type={newPasswordVisible ? "text" : "password"}
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="New Password"
                    className={style.reset__input}
                  />
                  {newPasswordVisible ? (
                    <BsEye
                      onClick={toggleNewPasswordVisibility}
                      className={style.reseteditPasswordBlock__icon}
                    />
                  ) : (
                    <BsEyeSlash
                      onClick={toggleNewPasswordVisibility}
                      className={style.reseteditPasswordBlock__icon}
                    />
                  )}
                </div>
                <p className={style.error}>
                  {errorUI?.new_password?.length ? (
                    <span style={{ color: "red" }}>
                      {errorUI.new_password[0].message}
                    </span>
                  ) : null}
                </p>
              </div>

              {/* <div></div> */}
              <button
                type="submit"
                className={style.changePasswordBtn}
                disabled={loading}
              >
                {loading ? (
                  <SpinnerCircular
                    size={30}
                    color="#FFFFFF"
                    secondaryColor="#3944BC"
                  />
                ) : (
                  <p>Reset Password</p>
                )}
              </button>
              {showResetSuccess && <ResetSuccessPage />}
            </form>
          </div>
        </div>
      </div>
    // </div>
  );
};

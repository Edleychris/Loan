import { Link } from 'react-router-dom'
import style from './fgtpswdconfirm.module.css'

export const FgtPswdConfirm = ({ message }) => {
  return (
    <div className={style.FogotcomfirmationContainer}>
      <div className={style.Fogot_confirmation}>
        <p className={style.Fogot_reset}>Reset password link has been sent to your email.</p>
        <Link to='/resetpassword'>
        <p className={style.Fogot_reset_password}>Reset Password</p>
        
        </Link>
      </div>
    </div>
  )
}

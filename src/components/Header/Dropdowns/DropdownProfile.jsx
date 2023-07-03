import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import dropcss from './Dropdown.module.css';

function DropdownProfile({ onClose }) {
  const [visible, setVisible] = useState(true);

  const handleFixClick = () => {
    setVisible(false);
    onClose();
  };

  const handleItemClick = () => {
    setVisible(false);
    onClose();
  };

  if (!visible) {
    return null;
  }

  const handleLogout = () => {
    console.log("logout")
    localStorage.removeItem('token');
    // setLoggedIn(false);
    // Redirect the user to the login page
    // window.location.href = '/login';
  };

  return (
    <div className={dropcss.profile_container}>
      <div className={dropcss.picon}>
        <FiX className={dropcss.fix} onClick={handleFixClick} />
      </div>
      <div className={dropcss.pro_list}>
        <ul>
          <Link to="/profile">
            <li onClick={handleItemClick}>View Profile</li>
          </Link>
          <Link to="/settings/profile">
            <li onClick={handleItemClick}>Profile Settings</li>
          </Link>
          <Link to='/login'><li
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => {
              handleLogout();
              handleItemClick();
            }}
            className={dropcss.logout}
          >
            Log Out
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

// DropdownProfile.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   handleLogout: PropTypes.func.isRequired,
// };

export default DropdownProfile;

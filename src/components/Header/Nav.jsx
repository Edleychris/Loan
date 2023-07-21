import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import dropcss from './Dropdown.module.css';
import { AiOutlineMail } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import NavOverview from './NavOverview';
import navstyle from './Nav.module.css';
import img1 from '../../assets/Group 7753.svg';
import img2 from '../../assets/Avatar.png';
import DropNotify from './Dropdowns/DropNotify';
import Dropmsg from './Dropdowns/Dropmsg';

function Navbar({ handleLogout, selectedItem }) {
  const [open, setOpen] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const history = useHistory();

  const handleProfileClick = (e) => {
    e.preventDefault();
    setOpen(!open);
    setShowNotify(false);
    setShowMsg(false);
  };

  const handleNotifyClick = (e) => {
    e.preventDefault();
    setOpen(false);
    setShowNotify(!showNotify);
    setShowMsg(false);
  };

  const handleMsgClick = (e) => {
    e.preventDefault();
    setOpen(false);
    setShowNotify(false);
    setShowMsg(!showMsg);
  };

  return (
    <div className={navstyle.navbar}>
      <div className={navstyle.nav}>
        <div className={navstyle.logo}>
          <img src={img1} alt="logo" />
        </div>
        <div className={navstyle.links}>
          <a href="" onClick={handleMsgClick}>
            <AiOutlineMail className={navstyle.nav_icon} />
          </a>
          <a href="" onClick={handleNotifyClick}>
            <IoIosNotificationsOutline className={navstyle.nav_icon} />
          </a>
          <a href="" className={navstyle.profile_pic} onClick={handleProfileClick}>
            <img src={img2} alt="" />
          </a>
        </div>
      </div>

      {open && (
        <div className={dropcss.profile_container}>
          <div className={dropcss.picon}>
            <FiX className={dropcss.fix} onClick={handleProfileClick} />
          </div>
          <div className={dropcss.pro_list}>
            <ul>
              <Link to="/settings/profile">
                <li>Online</li>
              </Link>
              <Link to="/settings/profile">
                <li>On Break</li>
              </Link>
              <Link to="/settings/profile">
                <li>Offline</li>
              </Link>
              <Link to="/profile">
                <li>View Profile</li>
              </Link>
              <Link to="/settings/profile">
                <li>Profile Settings</li>
              </Link>
              <li style={{ cursor: 'pointer', color: 'red' }} onClick={handleLogout}>
                Log Out
              </li>
            </ul>
          </div>
        </div>
      )}

      {showNotify && <DropNotify onClose={handleNotifyClick} />}

      {showMsg && <Dropmsg onClose={handleMsgClick} />}

      <NavOverview selectedItem={selectedItem} />
    </div>
  );
}

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired,
};

export default Navbar;

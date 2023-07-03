import React, { useContext, useEffect, useState } from "react";
import navstyle from "./Navbar.module.css";
import img1 from "../../assets/Group 7753.svg";
import img2 from '../../assets/Default_pfp.svg.png';
import { CgMail } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import DropdownProfile from "../Header/Dropdowns/DropdownProfile";
import DropNotify from "../Header/Dropdowns/DropNotify";
import Dropmsg from "../Header/Dropdowns/Dropmsg";
import PropTypes from "prop-types";
import { AvatarInfo } from "../../Context";
import { BsFillRecordFill } from "react-icons/bs";

function Navbar({ handleLogout }) {
  const [open, setOpen] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const { photo, setPhoto } = useContext(AvatarInfo);

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

  const handleDropdownClose = () => {
    setOpen(false);
  };

  const handleNotifyClose = () => {
    setShowNotify(false);
  };

  const handleMsgClose = () => {
    setShowMsg(false);
  };

  useEffect(() => {
    const storedPhoto = localStorage.getItem("photo");
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, [setPhoto]);

  useEffect(() => {
    if (photo) {
      localStorage.setItem("photo", photo);
    }
  }, [photo]);

  useEffect(() => {
    // Retrieve photo from local storage on page reload
    const storedPhoto = localStorage.getItem("photo");
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, [setPhoto]);

  return (
    <div className={navstyle.nav_container}>
      <div className={navstyle.nav}>
        <div className={navstyle.logo}>
          <img src={img1} alt="logo" />
        </div>
        <div className={navstyle.links}>
          <a href="" onClick={handleMsgClick}>
            <CgMail className={navstyle.nav_icon} />
          </a>
          <a href="" onClick={handleNotifyClick}>
            <IoIosNotificationsOutline className={navstyle.nav_icon} />
          </a>
          <a href="" className={navstyle.profile_pic} onClick={handleProfileClick}>
            {photo ? (
            <img src={photo} alt="" />
            ) : ( 
              <img src={img2} alt="" />
            )}

          </a>
          <span><BsFillRecordFill className={navstyle.bsfillrecordfill}/></span>
        </div>
      </div>

      {open && <DropdownProfile onClose={handleDropdownClose} handleLogout={handleLogout} />}

      {showNotify && <DropNotify onClose={handleNotifyClose} />}

      {showMsg && <Dropmsg onClose={handleMsgClose} />}
    </div>
  );
}

// Navbar.propTypes = {
//   selectedItem: PropTypes.string.isRequired,
// };

export default Navbar;

import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./profilesettings.module.css";
import { Link, Outlet } from "react-router-dom";
import profileData from "./ProfileData";
import ParentSwitch from "../Switch/ParentSwitch";
import { BiChevronRight, BiCamera } from "react-icons/bi";
import empty from '../../../../assets/Default_pfp.svg.png';
import { AvatarInfo } from "../../../../Context";

export const ProfileSettings = () => {
  const {photo, setPhoto} = useContext(AvatarInfo)
  const {firstName, setFirstName} = useContext(AvatarInfo);
  const {lastName, setLastName} = useContext(AvatarInfo);
  const [email, setEmail] = useState("olufemiayo@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("08022222222");
  const [address, setAddress] = useState("No 10, Superman lane, Infinity street, Oz");
  const {role, setRole} = useContext(AvatarInfo);
  const [isEditing, setIsEditing] = useState(false);
  // const [photo, setPhoto] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleGalleryClick = () => {
    fileInputRef.current.click(); 
  };

  const handleGalleryDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e) => {
    // Handle photo upload logic here
    const uploadedPhoto = e.target.files[0];
    setPhoto(URL.createObjectURL(uploadedPhoto));

    // Pass the new photo to the App component
    handlePhotoChange(URL.createObjectURL(uploadedPhoto));
  };

  const handleCameraDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleCameraOption = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing camera: ", error);
        });
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match the video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop the video stream
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    // Convert the captured canvas image to base64 data URL
    const dataURL = canvas.toDataURL("image/jpeg");
    setPhoto(dataURL);

    // Hide the camera dropdown
    setShowDropdown(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNameClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const storedProfileData = localStorage.getItem("profileData");
    if (storedProfileData) {
      const parsedProfileData = JSON.parse(storedProfileData);
      setFirstName(parsedProfileData.firstName);
      setLastName(parsedProfileData.lastName);
      setEmail(parsedProfileData.email);
      setPhoneNumber(parsedProfileData.phoneNumber);
      setAddress(parsedProfileData.address);
      setRole(parsedProfileData.role);
      setPhoto(parsedProfileData.photo);
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);

    const profileData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      role,
      photo,
    };

    localStorage.setItem("profileData", JSON.stringify(profileData));
console.log("saved")
    // updateProfilePhoto(photo);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
        <div>
          <div className={style.profilesettingsNav}>
            <Link to="/dashboard">Home</Link>
            <BiChevronRight className={style.icon} />
            <Link to="/settings">Settings</Link>
            <BiChevronRight className={style.icon} />
            <Link to="#">Profile</Link>
          </div>
          <div className={style.settings_tab_container}>
            <div className={style.settings_tab_header}>
              <div className={style.settings_tab_tabs}>
              <Link to="/settings">
                <div
                  className={`${style.settings_tab_tab} ${
                    activeTab === "General" ? style.active : ""
                  }`}
                  onClick={() => handleTabClick("General")}
                >
                General
                </div>
                </Link>
                <Link to="/settings/profile">
                <div
                  className={`${style.settings_tab_tab} ${
                    activeTab === "Profile" ? style.active : ""
                  }`}
                  onClick={() => handleTabClick("Profile")}
                >
                  Profile
                </div>
                </Link>
                <Link to="/settings/userPermission">
                <div
                  className={`${style.settings_tab_tab} ${
                    activeTab === "User Permissions" ? style.active : ""
                  }`}
                  onClick={() => handleTabClick("User Permissions")}
                >
                  User Permissions
                </div>
                </Link>
                <Link to="/settings/notification">
                <div
                  className={`${style.settings_tab_tab} ${
                    activeTab === "Notifications" ? style.active : ""
                  }`}
                  onClick={() => handleTabClick("Notifications")}
                >
                Notifications
                </div>
                </Link>
                <Link to="/settings/security">
                <div
                  className={`${style.settings_tab_tab} ${
                    activeTab === "Security" ? style.active : ""
                  }`}
                  onClick={() => handleTabClick("Security")}
                >
                  Security
                </div>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className={style.userProfile_settings_container}>
              <div className={style.user_block}>
                <div className={style.displayPhoto}>
                  {!photo ? (
                    <img src={empty} alt="default photo" className={style.noPhoto} />
                  ) : (
                    <img
                      className={style.avatar}
                      alt="user profile"
                      src={photo}
                      sx={{ width: 140, height: 140 }}
                    />
                  )}
                  <BiCamera className={style.camera} onClick={handleCameraDropdown} />
                  {showDropdown && (
                    <div className={style.dropdowns}>
                      <div className={style.dropdownItem} onClick={handleCameraOption}>
                        Camera
                      </div>
            <div className={style.dropdownItem}>
              <label htmlFor="galleryInput" onClick={handleGalleryClick}>Gallery</label>
              <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
            </div>
          </div>
        )}
  
            </div>
            <div>
              <div className={style.about_user}>
                <h3>
                  {firstName} {lastName}
                </h3>
                <p>
                  Role:
                  <span className={style.role}>{role}</span>
                </p>
                <p>
                  Status:
                  <span className={style.status}>{status}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={style.User_form_header}>
          <h3>Personal Information</h3>
        </div>

        <div className={style.profileForm}>
        <div>
          <div className={style.user_wrapper}>
            <label>First Name</label>
            {!isEditing ? (
              <span onClick={handleNameClick}>{firstName}</span>
            ) : (
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            )}
          </div>

          <div className={style.user_wrapper}>
            <label>Email</label>
            {!isEditing ? (
              <span onClick={handleNameClick}>{email}</span>
            ) : (
              <input type="email" value={email} onChange={handleEmailChange} />
            )}
          </div>

          <div className={style.user_wrapper}>
            <label>Address</label>
            {!isEditing ? (
              <span onClick={handleNameClick}>{address}</span>
            ) : (
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
              />
            )}
          </div>

          <ParentSwitch className={style.user_parent_switch} />
        </div>

        <div>
          <div className={style.user_wrapper}>
            <label>Last Name</label>
            {!isEditing ? (
              <span onClick={handleNameClick}>{lastName}</span>
            ) : (
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
              />
            )}
          </div>

          <div className={style.user_wrapper}>
            <label>Phone Number</label>
            {!isEditing ? (
              <span onClick={handleNameClick}>{phoneNumber}</span>
            ) : (
              <input
                type="number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            )}
          </div>

          <div className={style.user_wrapper}>
            <label>Role</label>
            {!isEditing ? (
              <span onClick={handleNameClick}>{role}</span>
            ) : (
              <input type="text" value={role} onChange={handleRoleChange} />
            )}
          </div>
        </div>
      </div>
      <div className={style.save_profile_btn_container} >
        <button className={style.save_profile_btn} onClick={handleSave}>Save</button>
      </div>
    </div>
    </div>
  );
};


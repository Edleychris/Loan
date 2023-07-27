import { RiDashboard2Line, RiBitCoinLine } from 'react-icons/ri'
import { CgProfile, CgMail } from 'react-icons/cg';
import { TbUsers, TbReportAnalytics } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiLifeBuoy } from 'react-icons/fi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import side from './side.module.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import 'animate.css';



function Side() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hamburgerVisible, setHamburgerVisible] = useState(true);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);


  const handleLinkClick = (path) => {
    setActiveLink(path);
    setSidebarOpen(false); // Close the sidebar when a link is clicked
    setHamburgerVisible(true); // Show the hamburger icon when a link is clicked
  };

  const handleSidebarToggle = () => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    setHamburgerVisible(false); // Hide the hamburger icon when the sidebar is open
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    setHamburgerVisible(true); // Show the hamburger icon when the sidebar is closed
  };


  return (
    <div className={side.side}>
          <div class="animate__animated animate__fadeInLeft">

      <div className={side.side_ham} >
         {sidebarOpen ? (
        <>
          <div className={side.side_hamIcon} onClick={handleCloseSidebar}>
            <IoCloseOutline />
          </div>
          <div class="animate__animated animate__fadeInLeft">

          <aside className={side.sidebarHamList} >
          <ul>
          <li>
            <Link
              to="/dashboard"
              className={`${side.activeLink} ${activeLink.includes('/dashboard') ? side.active : ''}`}
              onClick={() => handleLinkClick('/dashboard')} 
            >
              <RiDashboard2Line className={side.sideicon} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/loans"
              className={`${side.activeLink} ${activeLink.includes('/loans') ? side.active : ''}`}
              onClick={() => handleLinkClick('/loans')} 
            >
              <RiBitCoinLine className={side.sideicon} /> Loans
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`${side.activeLink} ${activeLink === '/profile' ? side.active : ''}`}
              onClick={() => handleLinkClick('/profile')} 
            >
              <CgProfile className={side.sideicon} /> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className={`${side.activeLink} ${activeLink.includes('/messages') ? side.active : ''}`}
              onClick={() => handleLinkClick('/messages')} 
            >
              <CgMail className={side.sideicon} /> Messages
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className={`${side.activeLink} ${activeLink === '/notifications' ? side.active : ''}`}
              onClick={() => handleLinkClick('/notifications')}
            >
              <IoIosNotificationsOutline className={side.sideicon} /> Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className={`${side.activeLink} ${activeLink.includes('/reports') ? side.active : ''}`}
              onClick={() => handleLinkClick('/reports')}
            >
              <TbReportAnalytics className={side.sideicon} /> Reports
            </Link>
          </li>
          <li>
            <Link
              to="/clients"
              className={`${side.activeLink} ${activeLink.includes('/clients') ? side.active : ''}`}
              onClick={() => handleLinkClick('/clients')}
            >
              <TbUsers className={side.sideicon} /> Clients
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`${side.activeLink} ${activeLink.includes('/settings') ? side.active : ''}`}
              onClick={() => handleLinkClick('/settings')}
            >
              <IoSettingsOutline className={side.sideicon} /> Settings
            </Link>
          </li>
          <li>
            <Link
              to="/support"
              className={`${side.activeLink} ${activeLink.includes('/support') ? side.active : ''}`}
              onClick={() => handleLinkClick('/support')} 
            >
              <FiLifeBuoy className={side.sideicon} /> Support
            </Link>
          </li>
        </ul>
          </aside>
      </div >


        </>
      ) : (
        <div className={side.side_hamIcon} onClick={handleSidebarToggle}>
          {hamburgerVisible ? <RxHamburgerMenu /> : <IoCloseOutline />}
        </div>
      )}
    {/* </div> */}

      </div>
      </div>



      <aside className={side.sidebarList}>
      <ul>
          <li>
            <Link
              to="/dashboard"
              className={`${side.activeLink} ${activeLink.includes('/dashboard') ? side.active : ''}`}
              onClick={() => handleLinkClick('/dashboard')} 
            >
              <RiDashboard2Line className={side.sideicon} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/loans"
              className={`${side.activeLink} ${activeLink.includes('/loans') ? side.active : ''}`}
              onClick={() => handleLinkClick('/loans')} 
            >
              <RiBitCoinLine className={side.sideicon} /> Loans
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`${side.activeLink} ${activeLink === '/profile' ? side.active : ''}`}
              onClick={() => handleLinkClick('/profile')} 
            >
              <CgProfile className={side.sideicon} /> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className={`${side.activeLink} ${activeLink.includes('/messages') ? side.active : ''}`}
              onClick={() => handleLinkClick('/messages')} 
            >
              <CgMail className={side.sideicon} /> Messages
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className={`${side.activeLink} ${activeLink === '/notifications' ? side.active : ''}`}
              onClick={() => handleLinkClick('/notifications')}
            >
              <IoIosNotificationsOutline className={side.sideicon} /> Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className={`${side.activeLink} ${activeLink.includes('/reports') ? side.active : ''}`}
              onClick={() => handleLinkClick('/reports')}
            >
              <TbReportAnalytics className={side.sideicon} /> Reports
            </Link>
          </li>
          <li>
            <Link
              to="/clients"
              className={`${side.activeLink} ${activeLink.includes('/clients') ? side.active : ''}`}
              onClick={() => handleLinkClick('/clients')}
            >
              <TbUsers className={side.sideicon} /> Clients
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`${side.activeLink} ${activeLink.includes('/settings') ? side.active : ''}`}
              onClick={() => handleLinkClick('/settings')}
            >
              <IoSettingsOutline className={side.sideicon} /> Settings
            </Link>
          </li>
          <li>
            <Link
              to="/support"
              className={`${side.activeLink} ${activeLink.includes('/support') ? side.active : ''}`}
              onClick={() => handleLinkClick('/support')} 
            >
              <FiLifeBuoy className={side.sideicon} /> Support
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Side
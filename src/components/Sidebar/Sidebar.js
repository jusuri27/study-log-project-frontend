import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from './useNavigation';
import { FaHome, FaPlane, FaComment, FaClipboardList, FaDollarSign, FaRegCalendarAlt, FaBriefcase, FaSignOutAlt} from 'react-icons/fa';


function Sidebar() {
  const navigation = useNavigation();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li onClick={navigation.toHome}>
            <FaHome className="icon" />
            <span>홈</span>
          </li>

          <li onClick={navigation.toSolve}>
            <FaBriefcase className="icon" />
            <span>문제</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
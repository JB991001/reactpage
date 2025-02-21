import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Menu.scss';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-item">
          <Link to="/login">로그인</Link>
        </div>
        <div className="menu-item">
          <Link to="/rank">랭킹</Link>
        </div>
        <div className="menu-item">
          <Link to="/luxury">럭셔리</Link>
        </div>
        <div className="menu-item">
          <Link to="/men">남성</Link>
        </div>
        <div className="menu-item">
          <Link to="/women">여성</Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;

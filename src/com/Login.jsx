import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Login.scss';

const Login = () => {
  const handleNaverLogin = () => {
    console.log('네이버 로그인');
  };

  const handleKakaoLogin = () => {
    console.log('카카오톡 로그인');
  };

  const handleInstagramLogin = () => {
    console.log('인스타그램 로그인');
  };

  return (
    <div className='login-outBox'>
      <div className="login-container">
        <h2>로그인</h2>
        <div className="login-buttons">
          <button className="login-button naver" onClick={handleNaverLogin}>
            네이버 로그인
          </button>
          <button className="login-button kakao" onClick={handleKakaoLogin}>
            카카오톡 로그인
          </button>
          <button className="login-button instagram" onClick={handleInstagramLogin}>
            인스타그램 로그인
          </button>
        </div>
      </div>

      <Link to="/">
        <button className="home-button">Home</button>
      </Link>
    </div>
  );
};

export default Login;

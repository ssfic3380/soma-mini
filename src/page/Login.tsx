import React, { ChangeEvent, useState } from "react";
import Logo from "../icon/dog.svg";
import Mail from "../icon/mail.svg";
import Lock from "../icon/lock.svg";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { sliceActions } from "../redux/slice";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fail, setFail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const pwChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setFail(false);
  };

  const users = useSelector((state: RootState) => state.users);
  const login = () => {
    const user = users.find((user) => user.id === email);
    if (user && user.pw === password) {
      dispatch(sliceActions.login({ name: user.name }));
      navigate('/feed');
    } else {
      setFail(true);
    }
  };

  return <div className="login">
    <div className="login-logo">
      <img className="login-logo-img" src={Logo} alt="logo" />
      <div className="login-logo-text">개서리
        <div className="login-logo-text-small">개발 서적 리뷰</div>
      </div>
    </div>
    <div className="login-input">
      <img className="login-input-img" src={Mail} alt="mail" />
      <input placeholder="이메일" onChange={emailChangeHandler} />
    </div>
    <div className="login-input">
      <img className="login-input-img" src={Lock} alt="lock" />
      <input placeholder="비밀번호" onChange={pwChangeHandler} type="password" />
    </div>
    <div aria-hidden className="login-button b1" onClick={login}>로그인</div>
    <div aria-hidden className="login-button b2" onClick={() => navigate('/signup')}>회원가입</div>
  </div>
};

export default Login;
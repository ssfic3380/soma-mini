import React, { ChangeEvent, useState } from "react";
import Logo from "../icon/dog.svg";
import Mail from "../icon/mail.svg";
import Lock from "../icon/lock.svg";
import Human from "../icon/human.svg";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { sliceActions } from "../redux/slice";
import { useDispatch } from "react-redux";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const pwChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signup = () => {
    console.log(1);
    if (email.length > 0 && name.length > 0 && password.length > 0) {
      console.log(2);
      dispatch(sliceActions.signup({ id: email, name, pw: password }));
      navigate('/feed');
    }
  };


  return <div className="signup">
    <div className="signup-header">
      <img src={Logo} alt="logo" />
      <div className="signup-header-title">회원가입</div>
    </div>
    <div className="login-input">
      <img className="login-input-img" src={Human} alt="human" />
      <input placeholder="이름" onChange={nameChangeHandler} />
    </div>
    <div className="login-input">
      <img className="login-input-img" src={Mail} alt="mail" />
      <input placeholder="이메일" onChange={emailChangeHandler} />
    </div>
    <div className="login-input">
      <img className="login-input-img" src={Lock} alt="lock" />
      <input placeholder="비밀번호" onChange={pwChangeHandler} type="password" />
    </div>
    <div aria-hidden className="login-button b2" onClick={signup}>회원가입</div>
  </div>
};

export default SignUp;
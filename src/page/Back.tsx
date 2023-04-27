import React from "react"
import BackArrow from "../icon/back.svg";
import { useNavigate } from "react-router-dom";
import "./Back.scss";

function Back() {
  const navigate = useNavigate();
  return <div className="back">
    <img src={BackArrow} alt="back" onClick={() => navigate(-1)} />
  </div>
};

export default Back;
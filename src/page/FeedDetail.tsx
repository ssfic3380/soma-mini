import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Heart from "../icon/heart.svg";
import Logo from "../icon/dog.svg";
import "./FeedDetail.scss";
import Back from "./Back";
import Save from "../icon/save.svg";
import slice, { sliceActions } from "../redux/slice";

function FeedDetail() {
  const feed = useSelector((state: RootState) => state.currentPost);
  const name = useSelector((state: RootState) => state.name);
  const [entered, setEntered] = useState('');
  const dispatch = useDispatch();
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntered(e.target.value);
  };

  const addComment = () => {
    dispatch(sliceActions.addComments({ id: feed.id, name, comment: entered }));
  };

  const heartClickHandler = () => {
    dispatch(sliceActions.heartPlus({ id: feed.id }));
  };


  const comments = feed.comment.map((c) => {
    return <div className="detail-comments-item">
      <div className="detail-comments-item-name">{c.name}</div>
      <div className="detail-comments-item-content">{c.comment}</div>
    </div>
  })

  return <div className="detail">
    <Back />
    <img className="detail-img" src={feed.bookImg} alt="bookimg" />
    <div className="detail-title">{feed.title}
      <div className="detail-reader">읽은이 : {feed.reader}</div></div>

    <p className="detail-content">{feed.content}</p>
    <div className="detail-heart">
      <img src={Heart} alt="heart" aria-hidden onClick={heartClickHandler} />
      <div className="detail-heart-count">{feed.heart}</div>
    </div>
    <div className="detail-comments">
      {comments}
    </div>
    <div className="detail-add-comment">
      <input value={entered} onChange={inputChangeHandler} placeholder="댓글 남기기" />
      <img src={Save} alt="save" aria-hidden onClick={addComment} />
    </div>
  </div>
};

export default FeedDetail;
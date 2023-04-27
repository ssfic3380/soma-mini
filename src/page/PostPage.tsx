import React, { useMemo, useState } from "react";
import Star from "../icon/star.svg";
import Empty from "../icon/star-empty.svg";
import { books } from "./books";
import Save from "../icon/save.svg";
import "./PostPage.scss";
import Back from "./Back";
import { useDispatch, useSelector } from "react-redux";
import { sliceActions } from "../redux/slice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

interface book {
  title: string;
  img: string;
}

function PostPage() {
  const [rating, setRating] = useState(0);
  const [entered, setEntered] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [option, setOption] = useState<book[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.name);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntered(e.target.value);
    setImage('');

    if (e.target.value.length > 1) {
      const autoComplete = books.filter((book) => {
        return book.title.includes(e.target.value);
      });
      setOption(autoComplete);
    } else {
      setOption([]);
    }
  };

  const contentChangeHander = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const autoCompleteContext = option.map((book) => {
    const onClickHandler = () => {
      setOption([]);
      setEntered(book.title);
      setImage(book.img);
    };
    return <div className="post-title-auto-item" aria-hidden onClick={onClickHandler}>
      {book.title}
    </div>
  })

  const savePostHandler = () => {
    dispatch(sliceActions.postReview({
      title: entered,
      reader: userName,
      content,
      rating,
      comment: [],
      heart: 0,
      img: image,
    }));
    navigate('/feed');
  };


  const stars = useMemo(() => {
    return <div className="post-stars">
      <img id="1" src={rating > 0 ? Star : Empty} alt="star" onClick={() => setRating(1)} />
      <img src={rating > 1 ? Star : Empty} alt="star" onClick={() => setRating(2)} />
      <img src={rating > 2 ? Star : Empty} alt="star" onClick={() => setRating(3)} />
      <img src={rating > 3 ? Star : Empty} alt="star" onClick={() => setRating(4)} />
      <img src={rating > 4 ? Star : Empty} alt="star" onClick={() => setRating(5)} />
    </div>
  }, [rating]);

  return <div className="post">
    <Back />
    <div className="post-title">글쓰기</div>
    <img className="post-save" src={Save} alt="save" onClick={savePostHandler} />
    {image.length > 0 && <img className="post-book-cover" src={image} alt="book-cover" />}
    {stars}
    <input value={entered} className="post-book-title" placeholder="책 이름" onChange={inputChangeHandler} />
    {option.length > 0 && entered.length > 0 && <div className="post-title-auto">{autoCompleteContext}</div>}
    <textarea value={content} onChange={contentChangeHander} className="post-book-content" placeholder="내용을 입력하세요" />
  </div>
};

export default PostPage;
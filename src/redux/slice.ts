import { createSlice } from "@reduxjs/toolkit";

interface commentType {
  name: string;
  comment: string;
}

const initialState = {
  feeds: [
    {
      id: 1,
      title: "한 권으로 읽는 컴퓨터 구조와 프로그래밍",
      reader: "김형래",
      content:
        "이 책은 컴퓨터 공학에 대한 전반을 담고 있다. 절대 얇지 않은 두께의 책이지만 컴퓨터 공학에 대해 거시적으로 다루는 느낌을 받았다. 역사를 잘 알고 있으려면 흐름을 봐야 한다는 말을 어릴 때 들은 적이 있는데, 이 책이 마치 그...",
      rating: 5,
      comment: [
        { name: "허윤석", comment: "잘 읽었습니다" },
        { name: "조석환", comment: "저도 한번 읽어봐야겠습니다" }
      ],
      heart: 10,
      img: "https://image.yes24.com/goods/98997716/XL"
    },
    {
      id: 2,
      title: "한 권으로 읽는 컴퓨터 구조와 프로그래밍",
      reader: "김형래",
      content:
        "이 책은 컴퓨터 공학에 대한 전반을 담고 있다. 절대 얇지 않은 두께의 책이지만 컴퓨터 공학에 대해 거시적으로 다루는 느낌을 받았다. 역사를 잘 알고 있으려면 흐름을 봐야 한다는 말을 어릴 때 들은 적이 있는데, 이 책이 마치 그...",
      rating: 5,
      comment: [
        { name: "허윤석", comment: "잘 읽었습니다" },
        { name: "조석환", comment: "저도 한번 읽어봐야겠습니다" }
      ],
      heart: 10,
      img: "https://image.yes24.com/goods/98997716/XL"
    }
  ],
  users: [
    {
      name: "김찬규",
      id: "cksr1@naver.com",
      pw: "qwer1234"
    }
  ],
  currentId: 3,
  name: "",
  currentPost: {
    id: 0,
    title: "",
    reader: "",
    content: "",
    rating: 0,
    comment: [] as commentType[],
    heart: 0,
    bookImg: ""
  }
  // isSignIn: false,
};

const slice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setUser(state, action) {
      state.users = action.payload;
    },
    postReview(state, action) {
      return {
        users: state.users,
        feeds: [
          ...state.feeds,
          {
            ...action.payload,
            id: state.currentId
          }
        ],
        currentId: state.currentId + 1,
        name: state.name,
        currentPost: state.currentPost
        // isSignIn: state.isSignIn
      };
    },
    signup(state, action) {
      return {
        ...state,
        users: [
          ...state.users,
          {
            name: action.payload.name,
            id: action.payload.id,
            pw: action.payload.pw
          }
        ]
      };
    },
    login(state, action) {
      state.name = action.payload.name;
    },
    setCurrentPost(state, action) {
      state.currentPost = action.payload;
    },
    addComments(state, action) {
      const updated = state.feeds.map((feed) => {
        if (feed.id !== action.payload.id) return feed;
        const updatedComment = [
          ...feed.comment,
          { name: action.payload.name, comment: action.payload.comment }
        ];
        state.currentPost.comment = updatedComment;
        return { ...feed, comment: updatedComment };
      });
      state.feeds = updated;
    },
    heartPlus(state, action) {
      const updated = state.feeds.map((feed) => {
        if (feed.id !== action.payload.id) return feed;
        state.currentPost.heart = state.currentPost.heart + 1;
        return { ...feed, heart: feed.heart + 1 };
      });
      state.feeds = updated;
    }
    // login(state, action) {
    //   const user = state.users.find(
    //     (user) => user.id === action.payload.email
    //   );
    //   if(user && action.payload.password === user.pw){
    //     state.isSignIn = true;
    //   }
    // }
  }
});

export const sliceActions = slice.actions;
export default slice.reducer;

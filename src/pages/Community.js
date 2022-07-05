// 커뮤니티 탭
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import PostList from "../components/community/PostList";
import PostWrite from "../images/mode@3x.png";

const Community = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const posts = useSelector((state) => state.post.post);

  // 서버에서 postlist 로드
  useEffect(() => {
    dispatch(postActions.postDB());
  }, []);

  useEffect(() => {
    setData(posts);
  }, [posts]);

  // 카테고리 목록
  const categories = ["전체", "MBTI", "자유", "고민상담", "익명"];
  const [activeCat, setActiveCat] = useState(categories);

  // 해당 카테고리 게시물 목록을 보여주기 위한 객체
  const [data, setData] = useState([]);
  console.log(data);

  const activeCategory = (btn) => {
    if (btn === "전체") {
      setData(posts);
      console.log("전체", data);
      return data;
    }

    const filteredData = posts.filter((item) => item.postCategory === btn);
    setData(filteredData);
    console.log(btn, filteredData);
    return data;
  };

  return (
    <CommunityWrap>
      <Category>
        {activeCat.map((cate, index) => {
          if (cate === "전체") {
            return (
              <CategoryAll onClick={() => activeCategory(cate)} key={index}>
                {cate}
              </CategoryAll>
            );
          } else
            return (
              <CategoryButton onClick={() => activeCategory(cate)} key={index}>
                {cate}
              </CategoryButton>
            );
        })}
      </Category>
      <Notice>
        <span>필독!</span>커뮤니티 이용 규칙
      </Notice>
      <CommunityList>
        {data.map((card, index) => (
          <PostList card={card} key={index}/>
        ))}
      </CommunityList>
      <PostButton onClick={() => {navigate("/postwrite")}}>
        <img src={PostWrite} alt="postwrite" />
        <br />
        글작성
      </PostButton>
    </CommunityWrap>
  );
};

const CommunityWrap = styled.div`
  background-color: var(--gray1);
  margin-bottom: 80px;
`;

const Category = styled.div`
  height: 40px;
  align-content: center;
  display: flex;
  justify-content: flex-start;
  background-color: white;
`;

const CategoryAll = styled.div`
  text-align: center;
  width: 44px;
  height: 30px;
  margin: 10px 20px 0 20px;
`;

const CategoryButton = styled.div`
  text-align: center;
  width: 100px;
  height: 30px;
  margin-top: 10px;
`;

const Notice = styled.div`
  background-color: var(--subcolor);
  width: 100vh;
  height: 50px;
  font-size: 14px;
  text-align: left;
  display: table-cell;
  vertical-align: middle;

  & span {
    color: var(--pointcolor);
    font-weight: bold;
    margin-left: 20px;
    margin-right: 10px;
  }
`;

const CommunityList = styled.div``;

const PostButton = styled.div`
  background-color: var(--maincolor);
  color: white;
  font-size: 12px;
  position: fixed;
  bottom: 100px;
  margin-left: 80%;
  width: 68px;
  height: 68px;
  border-radius: 34px;
  z-index: 2;

  &:hover {
    cursor: pointer;
  }

  & img {
    width: 24px;
    margin: 12px 0 2px 0;
  }
`;

export default Community;

// 게시글 카드 목록
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoDB } from '../../redux/modules/userInfo';
import { actionCreators as likeActions } from '../../redux/modules/like';

import '../../css/component.css';
import PostSwiper from './PostSwiper';
import MoreButton from '../../elements/MoreButton';

import ProfileCharacter from '../../images/character/profile-character.png';
import Comment from '../../images/icons/chat-bubble-outline@3x.png';
import { ReactComponent as Like } from '../../images/icons/favorite-border.svg';
import SweetAlert from '../sweetAlert/SweetAlert';

const PostList = ({ card, click, cmtCnt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 user
  const token = sessionStorage.getItem('is_login');
  const userNum = sessionStorage.getItem('userNum');

  // 게시글 작성 user
  const postUser = useSelector((state) => state.userInfo.user);
  //   console.log(postUser);

  // 좋아요
  const likes = useSelector((state) => state.like.like);
  const likeUsers = useSelector((state) => state.like.user);
  const [likeState, setLikeState] = useState();
  const [likeCnt, setLikeCnt] = useState();

  useEffect(() => {
    dispatch(userInfoDB(card.userNum));
    dispatch(likeActions.getLikeAC(card.postId));
  }, []);

  useEffect(() => {
    if (likeUsers && likeUsers.includes(Number(userNum)))
      setLikeState(1);
  }, [likeUsers]);

  useEffect(() => {
    setLikeCnt(likes);
  }, [likes]);

  // 유저 프로필 보기
  const showProfile = () => {
    if (click !== 'yes')
      navigate('/chatprofile', {
        state: { data: postUser, from: 'postlist' },
      });
  };

  // 커뮤니티 탭에서 post 클릭 시 상세보기
  const showPost = (postId) => {
    if (click === 'yes')
      navigate('/posts/' + postId, {
        state: { data: card },
      });
  };

  // 좋아요
  const handleLike = () => {
    if (likeState) {
      dispatch(likeActions.deleteLikeAC(card.postId));
      setLikeCnt(likeCnt - 1);
    } else {
      dispatch(likeActions.addLikeAC(card.postId));
      setLikeCnt(likeCnt + 1);
    }

    setLikeState(!likeState);
  };

  return (
    <PostListWrap>
      <PostWrap className='contents-container'>
        <PostInfo>
          {card.userImage.length && card.postCategory !== '익명' ? (
            <img
              src={card.userImage[0]}
              alt='user profile'
              onClick={() => showProfile()}
            />
          ) : (
            <img src={ProfileCharacter} alt='no profile' />
          )}
          <PostUser>
            {card.postCategory !== '익명' ? card.nickname : '익명'}
            <br />
            <span>{card.createdAt}</span>
          </PostUser>
        </PostInfo>

        {Number(card.userNum) === Number(userNum) &&
        click !== 'yes' ? (
          <MoreButton
            id={card.postId}
            type={'post'}
            user={card.userId}
          />
        ) : null}
      </PostWrap>

      <PostContents
        className='contents-container'
        onClick={() => showPost(card.postId)}
      >
        {card.postContent}
        {card.postImage.length === 1 ? (
          <img src={card.postImage.toString()} alt='postImage' />
        ) : card.postImage.length !== 0 ? (
          <PostSwiper card={card} />
        ) : null}
      </PostContents>

      {click === 'yes' ? null : (
        <PostAction className='contents-container'>
          <PostButton
            onClick={() => {
              if (token) {
                handleLike();
                return;
              }
              if (!token) {
                SweetAlert({
                  icon: 'warning',
                  title: '좋아요 누르기 불가',
                  text: '로그인을 해주세요!',
                });
              }
            }}
          >
            <Like
              className='icons'
              style={{ fill: likeState ? '#ff6565' : '#adadad' }}
            />
          </PostButton>
          좋아요 {likeCnt}
          <img src={Comment} alt='comment' />
          댓글 {cmtCnt}
        </PostAction>
      )}
    </PostListWrap>
  );
};

const PostListWrap = styled.div`
  text-align: left;
  padding: 20px 0 12px 0;
  background-color: white;
  border-bottom: 12px solid var(--gray1);
  color: #333333;
  width: 100%;

  & hr {
    opacity: 0.1;
    margin: 12px 0;
  }
`;

const PostWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;

  & img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background-color: var(--subcolor);
    border: 1px solid var(--gray1);
  }

  & img:hover {
    cursor: pointer;
  }
`;

const PostUser = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;

  & span {
    font-size: 10px;
    font-weight: normal;
    color: var(--gray3);
  }
`;

const PostContents = styled.div`
  width: 100%;

  margin: 12px 0;
  font-size: 16px;

  & img {
    border-radius: 6px;
    width: 100%;
    margin: 12px 0 4px 0;
    border: 1px solid var(--subcolor);
  }

  &:hover {
    cursor: pointer;
  }
`;

const PostAction = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--gray3);
  margin-bottom: 16px;

  & img {
    width: 16px;
    margin: 0 7px 0 20px;
  }
`;

const PostButton = styled.div`
  .icons {
    width: 16px;
    margin: 2px 4px 0 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default PostList;

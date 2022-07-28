// 댓글 작성하기 컴포넌트
import React, { useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import Swal from "sweetalert2";
import "../../css/component.css";

const CommentWrite = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.index;
  const token = sessionStorage.getItem("is_login");

  const content_ref = useRef();

  const activeComment = () => {
    if (content_ref.current.value === "")
      Swal.fire("", "내용을 입력해주세요!", "warning");
    else {
      dispatch(commentActions.addCommentAC(postId, content_ref.current.value));
      content_ref.current.value = "";
    }
  };

  return (
    <CommentWriteWrap className="contents-container">
      <CommentInput>
        <input type="text" placeholder="댓글을 입력하세요." ref={content_ref} />
        <InputButton
          onClick={() => {
            if (token) activeComment();
            else Swal.fire("댓글 작성 불가", "로그인을 해주세요!", "warning");
          }}
        >
          입력
        </InputButton>
      </CommentInput>
    </CommentWriteWrap>
  );
};

const CommentWriteWrap = styled.div`
  position: sticky;
  background-color: var(--subcolor);
  height: 80px;
  width: 100%;
  bottom: 80px;
  display: flex;
`;

const CommentInput = styled.div`
  background-color: #f8f8f8;
  border: 0.5px solid var(--maincolor);
  border-radius: 6px;
  height: 40px;
  margin: 20px 0;
  font-size: 16px;
  width: 100%;

  &:hover {
    border: 1px solid var(--maincolor);
  }

  & input {
    font-size: 16px;
    border: none;
    float: left;
    margin-left: 16px;
    height: 38px;
    width: 70%;
    background-color: #f8f8f8;
  }

  & input:focus {
    outline: none;
    border: none;
  }

  & input::placeholder {
    color: var(--gray2);
  }
`;

const InputButton = styled.div`
  float: right;
  width: auto;
  padding: 2px 16px;
  margin-top: 5px;
  color: var(--maincolor);
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

export default CommentWrite;

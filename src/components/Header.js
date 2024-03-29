import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import "../css/component.css";
import Logo from "../images/header/logo@2x.png";

import { ReactComponent as BackSvg } from "../images/header/keyboard-arrow-left.svg";
import { ReactComponent as LogoSvg } from "../images/logo/Group 15.svg";
import { ReactComponent as AlarmSvg } from "../images/header/notifications_none.svg";
import { ReactComponent as CloseSvg } from "../images/header/close.svg";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isLogin = sessionStorage.getItem("is_login");

  const goBack = () => {
    if (
      location !== "/" &&
      location !== "/community" &&
      location !== "/chatlist" &&
      location !== "/mbtifriends"
    )
      navigate(-1);
  };

  const close = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <HeaderWrap
      className="contents-container"
      style={{
        backgroundColor:
          location !== "/my" && location !== "/chat" ? "#fff" : "transparent",
      }}
    >
      <BackIcon
        onClick={goBack}
        className={
          location === "/" ||
          location === "/community" ||
          location === "/login" ||
          location === "/join" ||
          location === "/info" ||
          location === "/info/change" ||
          location === "/my" ||
          location === "/my/profile" ||
          location === "/mbtifriends" ||
          location === "/mbtifilter" ||
          location === "/chatlist"
            ? "hide"
            : null
        }
        style={{
          display: location === "/mbtifilter" ? "none" : null,
        }}
      >
        <BackSvg
          style={{
            fill: location === "/chat" ? "#fff" : "#323232",
          }}
        />
      </BackIcon>

      <FilterIcon
        onClick={goBack}
        className={location === "/mbtifilter" ? null : "hide"}
        style={{
          display: location === "/mbtifilter" ? null : "none",
        }}
      >
        필터
      </FilterIcon>

      <LogoIcon
        onClick={goHome}
        className={
          location === "/login" || location === "/mbtifilter" ? "hide" : null
        }
      >
        {location === "/my" || location === "/chat" ? (
          <LogoSvg />
        ) : (
          <img src={Logo} alt="logo" width="85px" />
        )}
      </LogoIcon>

      <AlarmIcon
        className={
          location === "/login" ||
          location === "/join" ||
          location === "/info" ||
          location === "/info/change" ||
          isLogin === null
            ? "hide"
            : null
        }
        style={{
          display:
            location === "/login" ||
            location === "/join" ||
            location === "/info/change" ||
            location === "/my/profile" ||
            location === "/mbtifilter"
              ? "none"
              : null,
        }}
      >
        <AlarmSvg
          style={{
            fill:
              location === "/my" || location === "/chat" ? "#fff" : "#323232",
          }}
        />
      </AlarmIcon>

      <CloseIcon
        onClick={close}
        style={{
          display:
            location === "/login" ||
            location === "/join" ||
            location === "/info/change" ||
            location === "/my/profile" ||
            location === "/mbtifilter"
              ? null
              : "none",
        }}
      >
        <CloseSvg />
      </CloseIcon>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  padding: 58px 5% 36px 5%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 99;

  & div:hover {
    cursor: pointer;
  }
`;

const BackIcon = styled.div.attrs((props) => ({
  className: props.className,
}))`
  &.hide {
    opacity: 0;
  }
`;

const LogoIcon = styled.div.attrs((props) => ({
  className: props.className,
}))`
  &.hide {
    opacity: 0;
  }
`;

const AlarmIcon = styled.div.attrs((props) => ({
  className: props.className,
}))`
  opacity: 0;
  &.hide {
    opacity: 0;
  }
`;

const CloseIcon = styled.div.attrs((props) => ({
  className: props.className,
}))`
  &.hide {
    opacity: 0;
  }
`;

const FilterIcon = styled.div.attrs((props) => ({
  className: props.className,
}))`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.8px;
  margin-left: 5.4%;

  &.hide {
    opacity: 0;
  }
`;

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MainRecommend from '../components/main/MainRecommend';
import MainCommunity from '../components/main/MainCommunity';

import '../css/component.css';
import character from '../images/character/frame-main@3x.png';

const Main = () => {
  const navigate = useNavigate();

  return (
    <MainWrap>
      <MainIntro>
        <img src={character} alt='므팅이' />
        <div>
          다양한 MBTI 중에
          <br /> <span>나의 찐친을 찾아봐요✨</span>
        </div>
      </MainIntro>

      <MainButtons className='contents-container'>
        <VoiceButton>보이스로 랜덤 상대 MBTI 맞추기</VoiceButton>
        <BottomBtns>
          <RandomButton onClick={() => navigate('/mbtitest')}>
            MBTI 약식 테스트
          </RandomButton>
          <RandomButton>다양한 MBTI 친구들</RandomButton>
        </BottomBtns>
      </MainButtons>

      <RecommendWrap>
        <MainRecommend />
      </RecommendWrap>

      <CommunityWrap className='contents-container'>
        <MainCommunity />
      </CommunityWrap>
    </MainWrap>
  );
};

const MainWrap = styled.div`
  padding-top: 10px;
`;

const MainIntro = styled.div`
  margin: 30px auto;

  & img {
    width: 104px;
  }

  & div {
    padding: 24px 0;
    font-size: 24px;
    font-weight: 300;
    letter-spacing: -1.2px;
  }

  & span {
    font-weight: 500;
  }
`;

const MainButtons = styled.div`
  margin: 30px auto 20px auto;
  padding-bottom: 20px;
  & div {
    height: 60px;
    border-radius: 10px;
    // box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const VoiceButton = styled.div`
  background-color: var(--maincolor);
  color: white;
`;

const BottomBtns = styled.div`
  display: flex;
  flex-flow: row;
  gap: 10px;
  margin-top: 16px;
`;

const RandomButton = styled.div`
  width: 100%;
  color: var(--maincolor);
  border: 1px solid var(--maincolor);
`;

const RecommendWrap = styled.div`
  padding-top: 20px;
`;

const CommunityWrap = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
  background-color: var(--subcolor);
  padding-top: 40px;
  padding-bottom: 60px;
`;

export default Main;

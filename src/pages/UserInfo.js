import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { userInfoDB } from '../redux/modules/user';
import imageCompression from 'browser-image-compression';

import Input01 from '../elements/Input01';
import Button03 from '../elements/Button03';
import Button01 from '../elements/Button01';
import Dropdown from '../elements/Dropdown';
import MbtiSelect from '../components/MbtiSelect';
import SweetAlert from '../components/sweetAlert/SweetAlert';

import { ReactComponent as Person } from '../images/icons/person.svg';
import { ReactComponent as Camera } from '../images/icons/camera_alt.svg';
import { ReactComponent as Warning } from '../images/icons/warning.svg';

const UserInfo = () => {
  // 버튼 선택지 중 택1 구현
  const [gender, setGender] = React.useState([true, false]);

  // 버튼 선택 시 데이터 저장 부분 (성별, mbti)
  const [userGender, setUserGender] = React.useState('Male');
  const [mbti, setMbti] = React.useState();

  // 유저 닉네임, 소개 저장
  const [nickname, setNickname] = React.useState('');
  const [introduction, setIntroduction] = React.useState('');

  // 생년월일 저장
  const [userYear, setUserYear] = React.useState('');
  const [userMon, setUserMon] = React.useState('');
  const [userDay, setUserDay] = React.useState('');

  //! 프로필 사진 저장
  const [profile, setProfile] = React.useState(null);
  const [imgBase64, setImgBase64] = React.useState([]);

  // 디스패치
  const dispatch = useDispatch();

  // 이미지 인풋 파일 ref
  const imageInput = useRef();

  // 유저 생년월일 저장 부분
  const birthday_mon = () => {
    if (userMon < 10) {
      const new_userMon = '0' + userMon;
      return new_userMon;
    } else {
      return userMon;
    }
  };

  const birthday_day = () => {
    if (userDay < 10) {
      const new_userDay = '0' + userDay;
      return new_userDay;
    } else {
      return userDay;
    }
  };

  const birthday = userYear + '-' + birthday_mon() + '-' + birthday_day();

  // 생년월일 드롭다운 부분
  const now = new Date();
  const year = now.getFullYear();

  const yearSelectList = [];
  const monSelectList = [];
  const daySelectList = [];

  // 연도 셀렉트 박스
  for (let i = year; i >= 1963; i--) {
    if (i <= 2006) {
      yearSelectList.push(i);
    }
  }
  // 월 셀렉트 박스
  for (let i = 1; i <= 12; i++) {
    monSelectList.push(i);
  }
  // 일 셀렉트 박스
  for (let i = 1; i <= 31; i++) {
    daySelectList.push(i);
  }

  //! 입력 완료 버튼 클릭 시
  const completed = () => {
    if (nickname === '' || birthday.length < 5 || introduction === '') {
      SweetAlert({ text: '빈칸을 모두 채워주세요!', icon: 'error' });
      return;
    }

    const formData = new FormData();
    if (profile !== null) formData.append('userImage', profile);
    formData.append('nickname', nickname);
    formData.append('gender', userGender);
    formData.append('birthday', birthday);
    formData.append('mbti', mbti);
    formData.append('introduction', introduction);

    dispatch(userInfoDB(formData, nickname));
  };

  // 드롭다운에서 데이터 받아오기
  const yearDropdown = (x) => {
    setUserYear(x);
  };

  const monDropdown = (x) => {
    setUserMon(x);
  };

  const dayDropdown = (x) => {
    setUserDay(x);
  };

  // MbtiSelect.js에서 데이터 받아오기
  const userMbti = (x) => {
    setMbti(x);
  };

  // 이미지 압축
  const compressImage = async (image) => {
    try {
      const options = {
        maxSizeMb: 0.2,
        maxWidthOrHeight: 600,
      };
      return await imageCompression(image, options);
    } catch (e) {
      console.log(e);
    }
  };

  //! 프로필 사진 업로드 부분
  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const handleChangeFile = async (e) => {
    const originalImg = e.target.files[0];
    const compressedImg = await compressImage(originalImg);

    setProfile(compressedImg);
    setImgBase64([]);

    for (var i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[i]);
      reader.onload = () => {
        const base64 = reader.result;

        if (base64) {
          var base64Sub = base64.toString();
          setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
        }
      };
    }
  };

  console.log(profile);

  return (
    <Container className='container'>
      <Profile onClick={onClickImageUpload}>
        {profile === null ? <Person /> : <img src={imgBase64} alt='' />}

        <div>
          <Camera />
        </div>
        <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          ref={imageInput}
          onChange={handleChangeFile}
        />
      </Profile>

      <div style={{ width: '100%' }}>
        <div>
          <p>닉네임</p>
          <Input01
            placeholder='닉네임을 입력해주세요.'
            _onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </div>

        <div>
          <p>성별</p>

          <Buttons>
            <Button03
              state={gender[0]}
              _onClick={() => {
                setGender([true, false]);
                setUserGender('Male');
              }}
            >
              남성
            </Button03>
            <Button03
              state={gender[1]}
              _onClick={() => {
                setGender([false, true]);
                setUserGender('Female');
              }}
            >
              여성
            </Button03>
          </Buttons>
        </div>

        <SelectBox>
          <p>생년월일</p>

          <DropdownList>
            <div>
              <Dropdown
                data={yearSelectList}
                height='300px'
                parent={yearDropdown}
              >
                년
              </Dropdown>
              <span>년</span>
            </div>

            <div>
              <Dropdown data={monSelectList} parent={monDropdown}>
                월
              </Dropdown>
              <span>월</span>
            </div>

            <div>
              <Dropdown
                data={daySelectList}
                height='300px'
                parent={dayDropdown}
              >
                일
              </Dropdown>
              <span>일</span>
            </div>
          </DropdownList>
        </SelectBox>

        <div>
          <p style={{ marginBottom: '4px' }}>MBTI</p>

          <WaringBox
            className='display-Hcenter'
            style={{ marginBottom: '20px' }}
          >
            <Warning style={{ marginRight: '5.4px' }} />
            <span>MBTI는 한번 선택하면 변경할 수 없습니다.</span>
          </WaringBox>
          <MbtiSelect parent={userMbti} />
        </div>

        <div>
          <p>유저님에 대해 알려주세요 :)</p>
          <textarea
            placeholder='안녕하세요! 저는 식물 키우는걸 좋아하고, 평소에 책 읽는걸 좋아합니다!'
            onChange={(e) => {
              setIntroduction(e.target.value);
            }}
          />
        </div>

        <Button01
          color='#fff'
          backgroundColor='#64be72'
          margin='0 0 77px 0'
          _onClick={completed}
        >
          입력 완료
        </Button01>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;

  * {
    box-sizing: border-box;
  }

  p {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.8px;

    text-align: left;

    margin-top: 20px;
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    min-height: 160px;
    margin-bottom: 43px;

    box-sizing: border-box;
    padding: 15px 19px;
    border-radius: 14px;
    border: solid 1px #c0c9c2;

    resize: none;

    &:focus {
      outline: 0.5px solid #64be72;
    }

    &::placeholder {
      color: #d9d9d9;
    }
  }
`;

const Profile = styled.div`
  width: 137px;
  height: 137px;

  border-radius: 49px;
  background-color: #e3e3e3;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 49px;
    object-fit: cover;
  }

  & > div {
    width: 30px;
    height: 30px;
    background-color: #64be72;
    border-radius: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 2px;
    bottom: 2px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 10px;
`;

const SelectBox = styled.div``;

const DropdownList = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;

  & > div {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
  }

  span {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.8px;
    margin-left: 4px;
    margin-right: 12px;
  }
`;

const WaringBox = styled.div`
  & > span {
    font-size: 10px;
    letter-spacing: -0.5px;
    font-weight: 300;
    color: #ff6565;
  }
`;

export default UserInfo;

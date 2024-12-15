import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { axiosInstanceBE } from "../apis/axios-instance-BE.ts";
import styled from "styled-components";

// 프로필 데이터 타입 정의
type Profile = {
  email: string;
  username: string;
  created_at: string;
};

const ProfilePage: React.FC = () => {
  const { accessToken, accountId } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken && accountId) {
      const fetchProfile = async () => {
        try {
          const response = await axiosInstanceBE.get<Profile>(`/account/${accountId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setProfile(response.data);
        } catch (err) {
          setError("사용자 정보를 불러오는 데 실패했습니다.");
        }
      };
      fetchProfile();
    } else {
      setError("사용자 정보가 없습니다.");
    }
  }, [accessToken, accountId]);

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  if (!profile) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>내 정보</ProfileHeader>
      <ProfileDetails>
        <Detail>
          <strong>이메일:</strong> {profile.email}
        </Detail>
        <Detail>
          <strong>사용자 이름:</strong> {profile.username}
        </Detail>
        <Detail>
          <strong>가입일:</strong> {profile.created_at}
        </Detail>
      </ProfileDetails>
    </ProfileContainer>
  );
};

export default ProfilePage;

// 스타일드 컴포넌트
const ProfileContainer = styled.div`
  padding: 20px;
  color: white;
`;

const ProfileHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  font-size: 18px;
`;

const Detail = styled.div`
  margin: 10px 0;
`;

const LoadingText = styled.div`
  color: white;
`;

const ErrorText = styled.div`
  color: red;
`;

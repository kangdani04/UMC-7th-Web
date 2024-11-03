// navbar.jsx
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <Nav>
            <StyledLink onClick={()=>{navigate('/');}}>
            <Youngcha>YOUNGCHA</Youngcha>
            </StyledLink>
            <Div>
                <StyledLink onClick={()=>{navigate('login');}}>
                    <Login>로그인</Login>
                </StyledLink>
                <StyledLink onClick={()=>{navigate('signup');}}>
                    <SignIn>회원가입</SignIn>
                </StyledLink>
            </Div>
        </Nav>
    );
};

export default Navbar;

const Nav=styled.nav`
    width:100%;
    height:100px;
    margin:0px;
    padding:0px;
    display:flex;
    justify-content: space-between; 
    align-items: center; 
    background-color:#282828;

`

const Youngcha=styled.div`
    color:#FF1493;
    font-weight:900;
    border: none;
    background-color:transparent;
    padding:20px;
    font-size:large;
`


const Login = styled.div`
    background-color: transparent;
    border: none;
    border-radius: 10px;
    color: white;
    margin:20px;
    padding:10px;

    &:hover {
        background-color: rgba(100, 100, 100, 0.8); /* 어두운 회색으로 변경 */
    }
`

const SignIn=styled.div`
    background-color: #FF1493;
    color:white;
    border: none;
    border-radius: 10px;
    margin:20px;
    padding:10px;
    &:hover {
        background-color: #D5006D; /* 어두운 핑크색으로 변경 */
    }
`

const StyledLink = styled.button`
    background-color: transparent;
    margin:0px;
    padding:0px;
    border:none;
    color: inherit; /* 부모의 색상(흰색)을 상속받음 */
    display: flex;
    align-items: center; /* 아이콘과 텍스트를 세로 정렬 */
`;

const Div=styled.div`
    display:flex;
    justify-content: space-between; 
    align-items: center; 
`
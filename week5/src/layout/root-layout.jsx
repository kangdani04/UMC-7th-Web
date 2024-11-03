import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/sidebar.jsx";
import styled from "styled-components";

const RootLayout = () => {
    return (
        <Root>
            <Navbar />
            <Content>
                <Sidebar />
                <MainContent>
                    <Outlet />
                </MainContent>
                
            </Content>    
            
        </Root>
    );
};

export default RootLayout;


const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
`;

const MainContent = styled.div`
    flex: 1; /* 사이드바와 함께 사용할 때 나머지 공간을 차지하도록 설정 */
    padding: 20px; /* 내부 여백을 추가하여 텍스트가 더 잘 보이도록 함 */
    overflow: auto; /* 스크롤이 가능하게 설정 */
    min-height: calc(100vh - 100px); /* Navbar 높이를 제외한 최소 높이 설정 */
`;
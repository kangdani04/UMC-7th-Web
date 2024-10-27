import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchCircle } from "react-icons/io5";
import { HiFilm } from "react-icons/hi";
import { SidebarContainer, SidebarButton } from "../styles/sidebar.style"; // 스타일 임포트


const Sidebar = () => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate("/search");
      };
    
    const handleMoviesClick = () => {
        navigate("/movies");
      };
    return (
        <SidebarContainer>
            <SidebarButton onClick={handleSearchClick}>
                <IoSearchCircle style={{ marginRight: "8px" }} />
                찾기
            </SidebarButton>
            <SidebarButton onClick={handleMoviesClick}>
                <HiFilm style={{ marginRight: "8px" }} />
                영화
            </SidebarButton>
        </SidebarContainer>
    );
};

export default Sidebar;

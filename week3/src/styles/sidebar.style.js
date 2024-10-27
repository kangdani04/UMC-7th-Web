// styles/sidebar.style.js
import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: #343a40;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const SidebarButton = styled.button`
  margin: 10px 0;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;

  &:hover {
    background-color: #e9ecef; // hover 시 색상 변화
  }
`;

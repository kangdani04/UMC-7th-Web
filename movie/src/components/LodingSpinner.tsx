import styled from "styled-components";

const LoadingSpinner: React.FC = () => {
  return <Spinner>Loading...</Spinner>;
};

export default LoadingSpinner;

const Spinner = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 16px;
  color: gray;
  font-weight: bold;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

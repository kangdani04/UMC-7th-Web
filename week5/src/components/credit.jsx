import styled from "styled-components";

const Credit=({credit})=>{
    const imageUrl = credit.profile_path 
        ? `https://image.tmdb.org/t/p/w500${credit.profile_path}` 
        : null; // 이미지 경로가 없으면 null로 설정
    
    return (
        <Card>
            <StyledImg 
                src={imageUrl} // TMDB의 포스터 이미지를 불러옵니다.
                alt={credit.title}
            />
            
            <Name>
                {credit.name}
            </Name>
            <Characer>
                {credit.character}
            </Characer>
        </Card>
    );

}

export default Credit;

const Card = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    color:white;
    overflow:hidden;
    background-color:black;
    
    width: 100px; /* px 단위를 추가하여 적절한 크기 지정 */
    height:130px; /* px 단위를 추가하여 적절한 크기 지정 */
`;

const StyledImg=styled.img`
    object-fit:cover;
    border-radius: 50%; /* 모서리를 둥글게 설정 */
    width: 80px; /* px 단위를 추가하여 적절한 크기 지정 */
    height:80px; /* px 단위를 추가하여 적절한 크기 지정 */

    /* 이미지가 없을 경우 배경색만 표시하고 빈 상태 유지 */
    ${({ src }) => !src && `
        background-color: white;
        
    `}
`;


const Name=styled.span`
    font-size:12px;
`
const Characer=styled.span`
    font-size:9px;
`
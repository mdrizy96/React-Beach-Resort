import styled from "styled-components";
import defaulImg from '../images/defaultBcg.jpeg';

const StyledHero = styled.header`
    min-height: 60vh;
    background: url(${props => props.img ? props.img : defaulImg}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default StyledHero;
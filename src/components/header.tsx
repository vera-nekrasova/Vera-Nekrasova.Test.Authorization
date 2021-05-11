import React from 'react';
import styled from 'styled-components';
import {colors as c} from "../styled-components/colors";

const StyledHeader = styled.header`
    margin-bottom: 10vh;
`

const StyledLogo = styled.div`
    font-weight: bold;
    font-size: 64px;
    line-height: 78px;
    color: ${c.black};
    text-align: center;
    padding: 40px 0;
`

const Header = () => {
    return (
        <StyledHeader>
            <StyledLogo>ONLY.</StyledLogo>
        </StyledHeader>
    )
}

export default Header;

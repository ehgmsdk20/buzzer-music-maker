import styled from 'styled-components';

const StyledButton = styled.button`
    all: unset;
    min-width: 80px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid #000000;
    box-sizing: border-box;
    &.white {
        background: #ffffff;
    }
`;

const Button = (props) => {
    const { children, onClick, style } = props;
    return (
        <StyledButton onClick={onClick} style={style}>
            {children}
        </StyledButton>
    );
};

export default Button;

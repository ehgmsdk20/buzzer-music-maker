import styled from "styled-components"

const AddressInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const StyledInput = styled.input`
    unset: all;
    padding-left: 16px;
    width: 100px;
    min-height: 48px;
    background: #FFFFFF;
    border: 1px solid #E1E1E1;
    box-sizing: border-box;
    border-radius: 8px;
    font-family: Montserrat;
    font-weight: normal;
    font-size: 14px;
    line-height: 32px;
    &:focus, &:hover {
        border: 1px solid #000000;
    }
`;

const Input = (props) => {
    const { value, setValue } = props;

    return (
        <AddressInputWrapper>
            <StyledInput
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                value={value}
            />
        </AddressInputWrapper>

    )
}

export default Input;
import styled, { css } from "styled-components";

// $sub-color: grey;
// $main-color: black;
const subColor = "grey";
const mainColor = "black";

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ shrink }) =>
    shrink &&
    shrinkLabelStyles}// If shrink is true, we apply the shrinkLabelStyle

    /* &.shrink {
      @include shrinkLabel();
    } */
`;

export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  // This mean that when we focus on an input (with the class "form-input"), the next sibling (inside "group") with the class "form-input-label" will include shrinkLabel (i.e., will include the style from shrinkLabel).. So the next sibling need to be the label, so the input need to be before the label
  &:focus ~ ${FormInputLabel} {
    /* @include shrinkLabel(); */
    ${shrinkLabelStyles}
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;
  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;

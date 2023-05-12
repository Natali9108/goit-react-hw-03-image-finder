import styled from '@emotion/styled';

export const SearchbarBox = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: ${props => props.theme.spacing(12)};
  padding-left: ${props => props.theme.spacing(12)};
  padding-top: ${props => props.theme.spacing(6)};
  padding-bottom: ${props => props.theme.spacing(6)};
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.blue};
  box-shadow: ${props => props.theme.shadows.medium};
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 3px;
  overflow: hidden;
`;

export const SearchFormBtn = styled.button`
display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  background-image: url('https://cdn-icons-png.flaticon.com/512/109/109164.png');
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity ${props => props.theme.animation.cubicBezier};
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
`;

export const SearchFormBtnLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
`;

export const SearchFormInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: ${props => props.theme.fontSizes.medium};
  border: none;
  outline: none;
  padding-left: ${props => props.theme.spacing(2)};
  padding-right: ${props => props.theme.spacing(2)};

  &::placeholder {
      font: inherit;
      font-size: ${props => props.theme.fontSizes.small};
`;

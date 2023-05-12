import styled from '@emotion/styled';

export const ButtonLoadMore = styled.button`
  padding: 8px 16px;
  margin: 0 auto;
  border-radius: ${props => props.theme.spacing(2)};
  background-color: ${props => props.theme.colors.blue};
  transition: all ${props => props.theme.animation.cubicBezier};
  text-align: center;
  display: inline-block;
  color: ${props => props.theme.colors.white};
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: ${props => props.theme.fontSizes.small};
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  width: 150px;
  box-shadow: ${props => props.theme.shadows.small};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.darkBlue};
  }
`;

import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${props => props.theme.spacing(8)};
  padding-bottom: ${props => props.theme.spacing(12)};
`;

export const MessageText = styled.p`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.large};
  font-weight: 700;
  letter-spacing: 0.03em;
`;

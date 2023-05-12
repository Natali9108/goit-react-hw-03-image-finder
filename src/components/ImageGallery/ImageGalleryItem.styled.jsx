import styled from '@emotion/styled';

export const GalleryItem = styled.li`
  border-radius: ${props => props.theme.spacing(1)};
  box-shadow: ${props => props.theme.shadows.regular};
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform ${props => props.theme.animation.cubicBezier};

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

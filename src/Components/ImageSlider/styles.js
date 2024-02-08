import styled, { css } from "styled-components";
import { breakPoints, Colors } from "styles/GlobalStyles";
import { CORTE1, CORTE2 } from "constants/index";

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const BigImage = styled.div`
  width: 35.1875rem;
  height: 21.875rem;
  margin: 1.875rem 0;
  position: relative;
  & #modelViewer {
    width: 100%;
    height: 100%;
    border-radius: 0.625rem;
    background-color: rgb(86, 130, 133);
  }

  ${breakPoints.tablet} {
    width: 33rem;
  }
  ${breakPoints.tableVertical} {
    width: 28rem;
  }
`;

export const Message = styled.p`
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 455px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;

  ${breakPoints.tablet} {
    width: 380px;
  }
`;

const BORDERS_SLIDES = {
  selected: `2px solid ${Colors.selectedItem}`,
  rejected: `2px solid ${Colors.rejectItem}`,
  default: `1px solid ${Colors.default}`,
};

const borderStyle = ({ accepted, rejected, reviewed, currentModule }) => {
  if (currentModule === CORTE1 || currentModule === CORTE2) {
    if (reviewed) {
      return BORDERS_SLIDES.selected;
    }
  }
  if (accepted) {
    return BORDERS_SLIDES.selected;
  }
  if (rejected) {
    return BORDERS_SLIDES.rejected;
  } else {
    return BORDERS_SLIDES.default;
  }
};

export const Slide = styled.button`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: ${({ urlImage }) => urlImage && `url(${urlImage})`};
  background-color: ${({ isSelected }) =>
    isSelected ? Colors.black : Colors.white};
  transition: 300ms margin-left ease-in-out;
  border: ${borderStyle};
  border-radius: 8px;
  margin-right: 15px;
  margin-left: ${({ id, currentSlide, firstItem }) =>
    id === firstItem ? `-${currentSlide * 25}%` : undefined};
  cursor: pointer;

  ${breakPoints.tablet} {
    width: 80px;
    height: 80px;
  }
`;

export const Thumbnail = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const SlideButton = css`
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid ${Colors.black};
  cursor: pointer;
  background: none;
  text-align: center;

  ${breakPoints.tablet} {
    width: 32px;
    height: 32px;
  }

  svg {
    fill: ${Colors.black};
  }

  :disabled {
    border: 1px solid ${Colors.default};
    cursor: not-allowed;
    svg {
      fill: ${Colors.default};
    }
  }
`;

export const ButtonRight = styled.button`
  ${SlideButton}
  right:-10%;
`;
export const ButtonLeft = styled.button`
  ${SlideButton}
  left: -12%;
  transform: rotate(-180deg);
`;

export const Hotspot = styled.button`
  display: block;
  width: 0.375rem;
  height: 0.375rem;
  border: none;
  border-radius: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  background-color: ${Colors.white};
  position: relative;

  :not([data-visible]) {
    width: 0.375rem;
    height: 0.375rem;
    background-color: transparent;
    border: 3px solid ${Colors.white};
  }
`;

export const HotspotAnnotation = styled.div`
  background: ${Colors.white};
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  color: #000;
  display: block;
  font-family: Raleway;
  font-size: 0.8rem;
  max-width: 8rem;
  overflow-wrap: break-word;
  padding: 0.5em 1em;
  position: absolute;
  left: 25px;
  width: max-content;
  height: max-content;
  transform: translate3d(0, -1rem, 0);
  --min-hotspot-opacity: 0;
  font-weight: bold;
`;

const ButtonScreen = css`
  background: none;
  position: absolute;
  outline: none;
  border: none;
  top: 50%;
  cursor: pointer;
`;

export const ButtonScreenReject = styled.button`
  ${ButtonScreen}
  left: 10%;
`;
export const ButtonScreenCheck = styled.button`
  ${ButtonScreen}
  right: 10%;
`;

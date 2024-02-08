import styled from "styled-components";
import { breakPoints, Colors } from "styles/GlobalStyles";

export const Progress = styled.div`
  background-color: ${Colors.white};
  border-radius: 10px;
  padding: 2rem 0 2rem 2rem;
  width: 100%;
  max-height: 536px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  min-width: 240px;

  ${breakPoints.tablet} {
    overflow-y: hidden;
    justify-content: center;
    padding: 0 2rem;
  }
`;

export const Steps = styled.ul`
  border-left: 1px solid ${Colors.default};
  padding-left: 10px;
  position: relative;
  height: auto;

  ${breakPoints.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: none;
    padding-left: 0;
  }
`;

export const Bar = styled.div`
  position: absolute;
  width: 3px;
  height: ${({ height }) => height}%;
  max-height: 100%;
  left: -2px;
  background-color: #000;
  transition: height 0.2s 0.15s ease-in-out;

  ${breakPoints.tablet} {
    display: none;
  }
`;

export const Step = styled.li`
  position: relative;
  color: ${({ active }) => (active ? Colors.black : Colors.default)};
  counter-increment: step;

  &.active {
    color: ${Colors.black};
    transform-origin: 0 0;
    transform: scale(1.1);

    transition: all 0.2s 0.15s cubic-bezier(0.175, 0.885, 0.32, 2);

    ${breakPoints.tablet} {
      transform: scale(0.9);
    }
  }

  &.active:before {
    background-color: ${Colors.white};
    color: ${Colors.selectedItem};
    border: 2px solid ${Colors.selectedItem};
  }

  &.selected {
    color: ${Colors.black};
    font-weight: 700;
  }

  &.selected:before {
    color: ${Colors.white};
    background-color: ${Colors.black};
    border: none;
  }

  :before {
    content: counter(step);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: white;
    border: 1px solid;
    border-radius: 50%;
    position: absolute;
    font-size: 18px;
    text-align: center;
    left: -28px;
    top: calc(50% - 16px);

    ${breakPoints.tablet} {
      left: -20px;
    }
  }
`;

export const Text = styled.span`
  display: block;
  padding: 25px;
  font-size: 12px;
`;

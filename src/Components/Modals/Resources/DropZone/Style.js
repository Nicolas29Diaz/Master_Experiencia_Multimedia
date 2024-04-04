import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const DropContainer = styled.div`
  border: ${(props) => (props.isDragActive ? "2px" : "2px")} dashed
    ${(props) => (props.isDragActive ? Colors.secondary : Colors.primary)};
  height: 200px;

  border-radius: 15px;
  padding: 1vw;
  margin: 1vw 6vw;
  text-align: center;
  background-color: ${(props) =>
    props.isDragActive ? "rgba(40, 59, 75,0.05)" : ""};
  color: ${(props) => (props.isDragActive ? "#ffffff" : "")};
  position: relative;
  transition: background-color 0.3s ease;}
  transition: border 0.2s ease;
`;

export const TitleContainer = styled.h1`
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 1s ease;
  opacity: ${(props) => (props.isDragActive ? "1" : "0")};
`;

export const ZoneDropContainer = styled.div`
  display: flex;
  height: 100%;
`;

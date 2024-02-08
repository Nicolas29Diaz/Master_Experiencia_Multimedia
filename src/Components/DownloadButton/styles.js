import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "styles/GlobalStyles";
export const StyleDownloadButton = styled(Link)`
  border: 2px solid ${Colors.secondary};
  border-radius: 3.75rem;
  cursor: pointer;
  display: inline-block;
  height: 2.5rem;
  outline: none;
  text-align: center;
  line-height: 2.1875rem;
  transition: 0.2s;
  font-size: 1.125rem;
  min-width: 10rem;
  padding: 0 0.625rem;
  text-decoration: none;
  color: ${Colors.secondary};
  font-family: Lato;

  :hover {
    background-color: ${Colors.secondary};
    color: #fff;
  }
`;

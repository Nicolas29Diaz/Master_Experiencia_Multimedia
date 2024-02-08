import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";
import { Link } from "react-router-dom";
import { animated } from "react-spring";
export const Header = styled.header`
  background-color: ${Colors.primary};
  width: 100%;
  padding: 1rem;
  color: ${Colors.white};
  margin-bottom: 1rem;
`;

export const Nav = styled.nav`
  width: 82%;
  margin: 0 auto;
  z-index: 3;
`;

export const NavMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
export const NavItem = styled.li`
  font-family: Lato;
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  text-transform: capitalize;
`;

export const NavAnchor = styled(Link)`
  font-family: Lato;
  text-decoration: none;
  color: ${Colors.white};
`;

export const ContainerSignOff = styled(animated.div)`
  position: absolute;
  right: 0;
  top: 50px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${Colors.primary};
  z-index: 2;
`;

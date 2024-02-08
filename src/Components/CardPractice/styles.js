import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const CardContainer = styled.article`
  width: 244px;
  height: 280px;
  background-color: ${Colors.white};
  border-radius: 20px;
  border: 2px solid ${Colors.default};
  margin-top: 1rem;
  :hover {
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%),
      0 2px 6px 2px rgb(60 64 67 / 15%);
  }
`;
export const BackgrounImage = styled.div`
  width: 100%;
  height: 50%;
  background-color: ${Colors.primary};
  border-radius: 20px 20px 0 0;
`;
export const CardInfo = styled.div`
  padding: 1rem 0.5rem;
  overflow: hidden;
  max-width: 300px;
  overflow-wrap: break-word;
  height: 90px;

  h1 {
    font-size: 20px;
    text-decoration: underline;
    color: ${Colors.black};

    :hover {
      color: ${Colors.primary};
    }
  }
`;

export const TitleCard = styled.h1`
  font-size: 1.25rem;
  cursor: pointer;
`;

export const CardActions = styled.footer`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${Colors.default};
`;

export const ButtonAction = styled.button`
  padding: 0.5rem 0.4rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  :hover {
    background-color: ${Colors.delete};
    & svg {
      fill: ${Colors.white};
    }
  }
`;

import styled, { css } from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const SubgroupContainer = styled.section`
  width: 100%;
  border-radius: 8px;
  height: 8rem;
`;

export const SubgroupInfo = styled.div`
  width: 100%;
  height: auto;
`;

export const SubgroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  h4 {
    margin-right: 0.625rem;
  }
`;

export const SubgroupList = styled.ul`
  width: 100%;
  overflow-y: scroll;
  height: 64px;
`;

const selectedRow = ({ selected }) => {
  return selected
    ? css`
        background-color: ${Colors.black};
        color: ${Colors.white};
        cursor: pointer;
        border-radius: 2px;
      `
    : css`
        :hover {
          background-color: #737274;
          color: ${Colors.white};
          border-radius: 2px;
          cursor: pointer;
        }
      `;
};

export const SubgroupItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2px;
  width: 98%;
  ${selectedRow}
`;

export const SubgroupValue = styled.span`
  margin-right: 2px;
`;

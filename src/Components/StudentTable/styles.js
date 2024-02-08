import styled from "styled-components";
import { breakPoints, Colors, scrollBarStyle } from "styles/GlobalStyles";

export const StudentTableMainContainer = styled.div`
  width: 100%;
  border: 1px solid ${Colors.default};
  border-radius: 8px;
`;

export const ContainerSelect = styled.div`
  margin: 20px;
  display: flex;
  gap: 10px;
`;

export const TableContainer = styled.div`
  width: 100%;
  max-width: 660px;
  overflow-y: auto;
  padding: 10px 20px;
  max-height: 160px;

  ${breakPoints.tablet} {
    max-width: none;
  }
  ${scrollBarStyle}
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 600px;
  border-radius: 8px;
  table-layout: fixed;
  thead {
    font-size: 18px;
  }

  tr {
    font-family: Lato;
  }

  td {
    font-family: Raleway;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  }

  tr,
  td {
    text-align: left;
    padding: 5px 0;
  }
`;

import styled from "styled-components";

export const TeacherContainerPractices = styled.div`
  width: 100%;
  display: ${({ practices }) => (practices.length > 0 ? "flex" : "")};
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row-reverse;
`;

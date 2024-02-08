import Spinner from "Components/Spinner";
import React from "react";
import { ContainerLoading } from "./styles";
const Loading = () => {
  return (
    <ContainerLoading>
      <Spinner />
    </ContainerLoading>
  );
};

export default Loading;

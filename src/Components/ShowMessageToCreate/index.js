import React, { memo } from "react";
import { Container, ContainerImage, Info } from "./styles";
import character from "assets/character_images/character.png";

const ShowMessageToCreate = ({ text }) => {
  const Image = memo(function Image({ src }) {
    return <img src={src} alt={src} />;
  });

  return (
    <Container>
      <ContainerImage>
        <Image src={character} />
      </ContainerImage>
      <Info>
        <h2>{text}</h2>
      </Info>
    </Container>
  );
};

export default ShowMessageToCreate;

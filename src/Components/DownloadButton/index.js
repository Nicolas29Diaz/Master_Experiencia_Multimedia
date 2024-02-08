import React from "react";
import { StyleDownloadButton } from "./styles";
import tableConstantControlGraphic from "Files/Tabla de constantes para graficos de control.pdf";
import tableAnsi from "Files/tabla muestreo ANSI.rar";

const files = {
  table: tableConstantControlGraphic,
  ansi: tableAnsi,
};

const DownloadButton = ({ file, children }) => {
  return (
    <StyleDownloadButton to={files[file]} target="_blank" download>
      {children}
    </StyleDownloadButton>
  );
};

export default DownloadButton;

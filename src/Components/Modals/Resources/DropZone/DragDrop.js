import React from "react";
import { Drop } from "Icons/Drop";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { DropContainer, TitleContainer, ZoneDropContainer } from "./Style";
function DragDrop({ setFile, cleanInput, typeFile = "all" }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];

      if (typeFile !== "all") {
        if (selectedFile.type !== typeFile) {
          toast.error(`El tipo de archivo debe ser .${typeFile.split("/")[1]}`);

          cleanInput();
          return;
        }
      }

      setFile(selectedFile);
    },
    [setFile, cleanInput, typeFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <DropContainer
      isDragActive={isDragActive}
      {...getRootProps({
        onClick: (e) => {
          e.stopPropagation();
        },
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <ZoneDropContainer>
          <TitleContainer isDragActive={isDragActive}>
            ¡Suéltalo!
          </TitleContainer>
          {/* <Drop style={{ position: "relative", zIndex: "-1" }}></Drop> */}
        </ZoneDropContainer>
      ) : (
        <ZoneDropContainer>
          <Drop style={{ position: "relative", zIndex: "-1" }}></Drop>
        </ZoneDropContainer>
      )}
    </DropContainer>
  );
}

export default DragDrop;

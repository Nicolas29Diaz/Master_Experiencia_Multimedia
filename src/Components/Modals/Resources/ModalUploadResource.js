import { useState } from "react";
import ModalSimple from "./ModalSimple";
import { useRef } from "react";
import useResource from "hooks/useResource";

const ModalUploadResource = ({ isOpen, close }) => {
  const { postDocuments } = useResource();
  const [file, setFile] = useState(false);
  const [upload, setUpload] = useState(false);
  const inputRef = useRef(null);
  const [indexButtons, setIndexButtons] = useState(0);
  const buttons = [
    [
      {
        text: "Cancelar",
        style: "secondary",
        action: () => cleanInput(),
      },
      {
        text: "Seleccionar",
        style: "primary",
        action: () => inputRef.current?.click(),
      },
    ],
    [
      {
        text: "Cancelar",
        style: "secondary",
        action: () => cleanInput(),
      },
      {
        text: "Subir",
        style: "primary",
        action: () => {
          setIndexButtons(2);
          setUpload(true);
        },
      },
    ],
    [
      {
        text: "Seguro",
        style: "primary",
        action: () => uploadResource(),
      },
      {
        text: "Cancelar",
        style: "secondary",
        action: () => cleanInput(),
      },
    ],
  ];

  const cleanInput = () => {
    setFile(null);
    setIndexButtons(0);
    setUpload(false);
    close();
  };

  const resourceSelected = (e) => {
    setFile(e.target.files[0]);
    setIndexButtons(1);
  };

  const uploadResource = async () => {
    try {
      const data = {
        file: file,
        name: file.name,
      };

      postDocuments(data);
      cleanInput();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalSimple isOpen={isOpen} close={close} buttons={buttons[indexButtons]}>
      {upload ? (
        <h1 style={{ textAlign: "center" }}>
          ¿Estás seguro que deseas subir un nuevo archivo?
        </h1>
      ) : file ? (
        <div style={{ textAlign: "center" }}>
          <h1>Archivo seleccionado: </h1>
          <h2 style={{ margin: "15px" }}>{file.name}</h2>
        </div>
      ) : (
        <>
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => resourceSelected(e)}
            style={{ display: "none" }}
          />
          <h1 style={{ textAlign: "center" }}>
            Selecciona o arrastra el archivo que deseas subir
          </h1>
          <br />
          <br />
          <h1 style={{ textAlign: "center" }}>DROP</h1>
          <br />
          <br />
        </>
      )}
    </ModalSimple>
  );
};

export default ModalUploadResource;

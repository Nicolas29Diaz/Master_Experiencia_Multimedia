import { useState } from "react";
import ModalSimple from "./ModalSimple";
import { useRef } from "react";
import useResource from "hooks/useResource";
import toast from "react-hot-toast";
import Papa from "papaparse";
import { useEffect } from "react";
import DragDrop from "./DragDrop";
// import { options } from "constants/modalsConstants";

function ModalUploadStudents({ isOpen, close, resourceType = "documents" }) {
  const { postStudents } = useResource();
  const [file, setFile] = useState(false);

  const inputRef = useRef(null);

  const [dataCSV, setDataCSV] = useState();

  const [actualButton, setActualButton] = useState("INSTRUCTIONS");
  const options = {
    INSTRUCTIONS: {
      title: "IMPORTANTE:",
      titleStyle: { textAlign: "left" },
      buttons: [
        {
          text: "Cancelar",
          style: "secondary",
          action: () => cleanInput(),
        },
        {
          text: "Siguiente",
          style: "primary",
          action: () => setActualButton("SELECT"),
        },
      ],
    },
    SELECT: {
      title: "Selecciona o arrastra el archivo de Excel",
      titleStyle: { textAlign: "left" },
      buttons: [
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
    },
    UPLOAD: {
      title: "Excel seleccionado:",
      titleStyle: { textAlign: "left" },
      buttons: [
        {
          text: "Cancelar",
          style: "secondary",
          action: () => cleanInput(),
        },
        {
          text: "Subir",
          style: "primary",
          action: () => setActualButton("CONFIRM"),
        },
      ],
    },
    CONFIRM: {
      title: "  ¿Estás seguro que deseas registrar nuevos estudiantes?",
      titleStyle: { textAlign: "center" },
      buttons: [
        {
          text: "Seguro",
          style: "primary",
          action: () => readCSVFile(file),
        },
        {
          text: "Cancelar",
          style: "secondary",
          action: () => cleanInput(),
        },
      ],
    },
  };

  const cleanInput = () => {
    setFile(null);
    setActualButton("INSTRUCTIONS");
    close();
  };

  const resourceSelected = (e) => {
    const selectedFile = e.target.files[0];
    // Verificar si el tipo de archivo es .csv si el resourceType es "students"
    if (selectedFile.type !== "text/csv") {
      toast.error("El tipo de archivo debe ser .csv");
      cleanInput()
      return;
    } else {
      // console.log("Tipo de archivo correcto");
      setFile(selectedFile);
      setActualButton("UPLOAD");
    }
  };

  const readCSVFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setDataCSV(result.data);
      },
    });
  };

  useEffect(() => {
    if (dataCSV?.length > 0) {
      dataStudentsArray();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCSV]);

  const dataStudentsArray = () => {
    const array = [];
    dataCSV.forEach((row) => {
      if (
        row["Número de ID"] ||
        row["Nombre"] ||
        row["Apellido(s)"] ||
        row["Dirección de correo"] ||
        row["Número de ID"]
      ) {
        array.push({
          id: row["Número de ID"],
          firstname: row["Nombre"],
          lastname: row["Apellido(s)"],
          email: row["Dirección de correo"],
          password: row["Número de ID"],
        });
      }
    });
    if (array.length > 0) {
      uploadResource(array);
    } else {
      toast.error(
        "No se encontraron columnas con datos, verifica el nombre de estas"
      );
      cleanInput();
    }
  };

  const uploadResource = async (array) => {
    try {
      postStudents(array);
      cleanInput();
    } catch (error) {
      console.error(error);
    }
  };

  const contentComponent = () => {
    switch (actualButton) {
      case "INSTRUCTIONS":
        return (
          <>
            <p>
              El documento debe contener cuatro columnas que coincidan con los
              siguientes titulos:
            </p>
            <div style={{ margin: " 5px 20px" }}>
              <li>Nombre</li>
              <li>Apellido(s)</li>
              <li>Número de ID</li>
              <li>Dirección de correo</li>
            </div>
            <p style={{ fontWeight: 1000, fontStyle: "italic" }}>
              El documento debe ser formato .csv
            </p>
          </>
        );
      case "SELECT":
        return <DragDrop />;
      case "UPLOAD":
        return (
          <>
            <p style={{ margin: "15px 0", color: "#989898", fontSize: "25px" }}>
              {file.name}
            </p>
          </>
        );
      default:
        break;
    }
  };

  return (
    <ModalSimple
      isOpen={isOpen}
      close={close}
      buttons={options[actualButton].buttons}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => resourceSelected(e)}
        style={{ display: "none" }}
      />
      <h1 style={options[actualButton].titleStyle}>
        {options[actualButton].title}
      </h1>
      {contentComponent()}
    </ModalSimple>
  );
}

export default ModalUploadStudents;

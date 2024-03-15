import ModalSimple from "./ModalSimple";
const ModalUploadResource = ({ isOpen, close }) => {
  // const modalState = {
  //   selectResource: "selectResource",
  //   uploadResource: "uploadResource",
  //   confirmUpload: "confirmUpload",
  // };
  const buttons = [
    {
      text: "Cancelar",
      style: "secondary",
      action: close,
    },
    {
      text: "Seleccionar",
      style: "primary",
      action: close,
    },
  ];

  return (
    <ModalSimple
      isOpen={isOpen}
      close={close}
      title={"Selecciona o arrastra el archivo que deseas subir"}
      // description={"chao"}
      buttons={buttons}
    >
      <div style={{ margin: "auto" }}>
        <br />
        <br />
        <br />
        <h2>DROP</h2>
        <br />
        <br />
        <br />
      </div>
    </ModalSimple>
  );
};

export default ModalUploadResource;

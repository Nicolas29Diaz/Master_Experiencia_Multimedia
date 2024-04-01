import React, { useEffect, useRef } from "react";

import { Iframe, ContainerIframe } from "./styles";
import useModal from "hooks/useModal";
import useAuth from "hooks/useAuth";
import useProduct from "hooks/useProduct";
import useStudent from "hooks/useStudent";
import { useHistory } from "react-router";
import { CORTE3 } from "constants/index";
import ModalEnviromentBack from "Components/Modals/ModalEnviromentBack";
const Enviroment = ({ location }) => {
  let history = useHistory();
  const iFrameRef = useRef(null);
  const { userAuthenticate } = useAuth();
  const { modulo } = useStudent();
  const { changeStateMessage } = useProduct();
  const { isOpen, handleModalState } = useModal();

  // const url = "http://127.0.0.1:5501";
  const url = "https://melodious-horse-18ea10.netlify.app"

  useEffect(() => {
    userAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lo que recibo
  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== url) return;

      if (e.data === "Abort") {
        handleModalState();
      }

      if (e.data === "openedReady") {
        iFrameRef.current?.contentWindow.postMessage(
          JSON.stringify(location.state),
          url
        );
      }

      if (e.data !== "openedReady") {
        console.log(e.data);
        if (modulo === CORTE3) {
          changeStateMessage(true);
          history.push(e.data);
        } else {
          if (e.data !== "Abort") history.push(e.data);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, history, modulo]);

  return (
    <>
      <ContainerIframe>
        <Iframe
          ref={iFrameRef}
          id="entorno"
          title="Entorno"
          frameBorder={0}
          allowFullScreen
          src={url}
        />
      </ContainerIframe>

      <ModalEnviromentBack
        isOpen={isOpen}
        close={handleModalState}
        onClick={() => history.goBack()}
      />
    </>
  );
};

export default Enviroment;

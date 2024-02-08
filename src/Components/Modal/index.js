import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useTransition } from "react-spring";
import { Background, Content } from "./styles";

const portalRoot = document.getElementById("portal");

const Modal = ({ children, close, isOpen }) => {
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" },
  });

  const modalRef = useRef();
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflowY = "hidden";

    function listenerOutside(e) {
      if (modalRef.current?.contains(e.target)) return;
      close();
    }

    window.addEventListener("click", listenerOutside);
    return () => {
      window.removeEventListener("click", listenerOutside);
      document.body.removeAttribute("style");
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Background>
      {transitions(
        (style, item, key) =>
          item && (
            <Content style={style} ref={modalRef} key={key}>
              {children}
            </Content>
          )
      )}
    </Background>,

    portalRoot
  );
};

export default Modal;

import React, { useEffect, useState, useRef } from "react";
import useAuth from "hooks/useAuth";
import {
  Header,
  Nav,
  NavMenu,
  NavItem,
  NavAnchor,
  ContainerSignOff,
} from "./styles";
import { useTransition } from "react-spring";
import Button from "Components/Button";
import { Avatar } from "Icons/Avatar";
import { LogoIcon } from "Icons/LogoIcon";
const Navbar = () => {
  const refButton = useRef();
  const [isShowButton, setIsShowButton] = useState(false);
  // Extraer la información de autenticación
  const { userAuthenticate, user, signOff } = useAuth();

  const transitions = useTransition(isShowButton, {
    from: { opacity: 0, top: "-120px" },
    enter: { opacity: 1, top: "60px" },
    leave: { opacity: 0, top: "120px" },
  });

  const handleShow = () => {
    setIsShowButton(!isShowButton);
  };

  useEffect(() => {
    userAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function listenerOutside(e) {
      if (refButton.current?.contains(e.target)) return;
      setIsShowButton(false);
    }

    document.addEventListener("mousedown", listenerOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", listenerOutside);
    };
  }, [isShowButton]);
  return (
    <Header>
      <Nav ref={refButton}>
        <NavMenu>
          <NavItem>
            {user?.estudiante && (
              <NavAnchor to="/practice/student">
                <LogoIcon height={40} />
              </NavAnchor>
            )}
            {user?.profesor && (
              <NavAnchor to="/courses">
                {" "}
                <LogoIcon height={40} />
              </NavAnchor>
            )}
          </NavItem>
          {user?.estudiante && (
            <NavItem onClick={handleShow}>
              {`${user.estudiante.nombreEstudiante} ${user.estudiante.apellidoEstudiante}`}{" "}
              <Avatar width={50} height={50} />
            </NavItem>
          )}
          {user?.profesor && (
            <NavItem onClick={handleShow}>
              {`${user.profesor.nombreProfesor} ${user.profesor.apellidoProfesor}`}{" "}
              <Avatar width={50} height={50} />
            </NavItem>
          )}

          {transitions(
            (style, item, key) =>
              item && (
                <ContainerSignOff style={style} key={key}>
                  <Button
                    type="button"
                    styleButton="secondary"
                    onClick={signOff}
                  >
                    Cerrar sesión
                  </Button>
                </ContainerSignOff>
              )
          )}
        </NavMenu>
      </Nav>
    </Header>
  );
};

export default Navbar;

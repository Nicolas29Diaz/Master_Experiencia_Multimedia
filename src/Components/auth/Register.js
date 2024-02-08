import React, { useEffect, memo, useState } from "react";
import greeting from "assets/character_images/image_login.png";
import { Controller, useForm } from "react-hook-form";
import TextField from "Components/TextField";
import MultiSelectAll from "Components/MultiSelectAll";
import { optionsRoles } from "constants/index";
import useAuth from "hooks/useAuth";
import {
  Container,
  ContainerImage,
  TitleForm,
  FieldForm,
  ContainerLink,
  Link,
  Form,
  ButtonForm,
  ContainerForm,
} from "./styles";
import PasswordInput from "Components/PasswordInput";
import { Logo } from "Icons/Logo";
const Register = ({ history }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm();
  const { registerUser, authenticated, user } = useAuth();
  const [showButton, setShowButton] = useState(false);

  const onSubmit = (data) => {
    registerUser(data);
  };

  const handleShowButton = () => {
    setShowButton(!showButton);
  };

  const Image = memo(function Image({ src }) {
    return <img src={src} alt={src} />;
  });

  // En caso que el usuario autenticado sea un estudiante o un profesor los redirige a su página
  // correspondiente

  useEffect(() => {
    if (authenticated) {
      if (user) {
        if (user.estudiante) {
          history.push("/");
        }
        if (user.profesor) {
          history.push("/courses");
        }
      }
    }
  }, [authenticated, user, history]);

  return (
    <Container>
      <ContainerImage>
        <Image src={greeting} />
      </ContainerImage>
      <ContainerForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleForm>
            <Logo height={110} />
          </TitleForm>
          <FieldForm>
            <TextField
              type="text"
              placeholder="Nombre"
              error={errors?.firstname}
              {...register("firstname", {
                required: "Ingrese su nombre",
              })}
            />
          </FieldForm>
          <FieldForm>
            <TextField
              type="text"
              placeholder="Apellido"
              error={errors?.lastname}
              {...register("lastname", {
                required: "Ingrese su apellido",
              })}
            />
          </FieldForm>
          <FieldForm>
            <TextField
              type="email"
              placeholder="Email institucional"
              error={errors?.email}
              {...register("email", {
                required: "Ingrese su email",
                pattern: {
                  value: /.+@uao.edu\.co/,
                  message: "Su correo debe terminar en @uao.edu.co",
                },
              })}
            />
          </FieldForm>
          <FieldForm>
            <PasswordInput
              showButton={showButton}
              onShowButton={handleShowButton}
              isWithButton={true}
              error={errors?.password}
              {...register("password", {
                required: "Ingrese su contraseña",
              })}
            />
          </FieldForm>
          <FieldForm>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Selecciona un rol" }}
              render={({ field }) => (
                <MultiSelectAll
                  isMulti={false}
                  widthSelect={"9rem"}
                  options={optionsRoles}
                  placeholder="Soy"
                  error={errors?.role}
                  {...field}
                />
              )}
            />
          </FieldForm>
          <FieldForm>
            <ButtonForm type="submit" styleButton="primary">
              Registrarse
            </ButtonForm>
          </FieldForm>
          <ContainerLink>
            <p>¿Ya tienes cuenta?</p>
            <Link to="/">Inicia sesión</Link>
          </ContainerLink>
        </Form>
      </ContainerForm>
    </Container>
  );
};

export default Register;

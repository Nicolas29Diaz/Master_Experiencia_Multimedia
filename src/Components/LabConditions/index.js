import React, { useEffect } from "react";
import {
  PageContainer,
  Features,
  FeatureContainer,
  ImageContainer,
  TextContainer,
  PageActions,
  ContainerAnswerPractice,
  RowForm,
} from "./styles";

import Button from "Components/Button";
import TextField from "Components/TextField";
import { ICONS_MODULE_3 } from "constants/index";
import useStudent from "hooks/useStudent";
import useProgressBar from "hooks/useProgressBar";
import useProduct from "hooks/useProduct";
import { useForm } from "react-hook-form";
import useAuth from "hooks/useAuth";
import Loading from "Components/Loading";
import DownloadButton from "Components/DownloadButton";

const LabConditions = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const { user } = useAuth();
  const { handleStep } = useProgressBar();
  const { handleMessageActive } = useProduct();
  const {
    getConditions,
    conditions,
    idPractica,
    numberProducts,
    createInspectionProductC3,
    isCreateProduct,
    resetCreateProducts,
    isloading,
  } = useStudent();

  useEffect(() => {
    if (!conditions.lenght) {
      getConditions(idPractica, user?.estudiante.idEstudiante);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPractica, user?.estudiante.idEstudiante]);

  useEffect(() => {
    if (isCreateProduct) {
      handleStep();
      handleMessageActive();
      resetCreateProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateProduct]);

  const handleNextStep = () => {
    handleMessageActive();
    handleStep();
  };

  const featureData = [
    {
      icon: ICONS_MODULE_3.lote,
      text: (
        <>
          <p>Tamaño de lote</p>
          <strong>{conditions.tamanioLote}</strong>
        </>
      ),
    },
    {
      icon: ICONS_MODULE_3.severidad,
      text: (
        <>
          <p>Severidad</p>
          <strong>{conditions.severidad}</strong>
        </>
      ),
    },
    {
      icon: ICONS_MODULE_3.aql,
      text: (
        <>
          <p>AQL</p>
          <strong>{conditions.aql}</strong>
        </>
      ),
    },
    {
      icon: ICONS_MODULE_3.inspeccion,
      text: (
        <>
          <p>Nivel de Inspección</p>
          <strong>{conditions.nivelInspeccion}</strong>
        </>
      ),
    },
    {
      ...(conditions.metodos && {
        icon: ICONS_MODULE_3.metodo,
        text: (
          <>
            <p>Método</p>
            <strong>{conditions.metodos}</strong>
          </>
        ),
      }),
    },
  ];

  const onSubmit = ({ tamanioMuestra }) => {
    const createPractice = { tamanioMuestra, ...conditions };
    createInspectionProductC3(createPractice);
  };

  const renderForm = () => {
    return numberProducts === 1 ? (
      <ContainerAnswerPractice>
        <form onSubmit={handleSubmit} noValidate>
          <RowForm>
            <TextField
              type="number"
              placeholder="Tamaño de la muestra"
              error={errors?.tamanioMuestra}
              {...register("tamanioMuestra", {
                min: {
                  value: 1,
                  message: `Debe ser mínimo 1`,
                },
                max: {
                  value: conditions.tamanioLote,
                  message: `Debe ser máximo ${conditions.tamanioLote}`,
                },
                valueAsNumber: true,
                required: "Debe esribir el tamaño de la muestra",
              })}
            />

            <Button
              type="submit"
              styleButton="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Continuar práctica
            </Button>
          </RowForm>
        </form>
      </ContainerAnswerPractice>
    ) : (
      <ContainerAnswerPractice>
        <Button type="submit" styleButton="primary" onClick={handleNextStep}>
          Continuar práctica
        </Button>
      </ContainerAnswerPractice>
    );
  };

  return (
    <PageContainer>
      <Features>
        {featureData
          .filter((feature) => Object.keys(feature).length > 1)
          .map(({ icon, text }, index) => {
            return (
              <FeatureContainer key={index}>
                <ImageContainer>{icon}</ImageContainer>
                <TextContainer>{text}</TextContainer>
              </FeatureContainer>
            );
          })}
      </Features>

      <p>
        Con la información anterior, descarga la tabla de muestreo ANSI y luego,
        escribe el tamaño de la muestra a valuar en el campo de texto.
      </p>

      <PageActions>
        <DownloadButton file="ansi">Descargar tabla</DownloadButton>

        {isloading ? <Loading /> : renderForm()}
      </PageActions>
    </PageContainer>
  );
};

export default LabConditions;

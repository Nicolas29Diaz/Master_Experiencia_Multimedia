import React, { useEffect, useCallback } from "react";
import {
  Information,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Title,
  Text,
  FeatureList,
  FeatureItem,
  ProductsNumber,
  Item,
  ExamineNumber,
  Description,
  ItemName,
} from "./styles";
import Button from "Components/Button";
import StudentSubgroup from "Components/StudentSubgroup";
import StudentReviewedProducts from "Components/StudentReviewedProducts";
import { CORTE1, CORTE2, CORTE3, VARIABLE } from "constants/index";

import useStudent from "hooks/useStudent";
import useProduct from "hooks/useProduct";
import useAuth from "hooks/useAuth";
import useProgressBar from "hooks/useProgressBar";
import DownloadButton from "Components/DownloadButton";

const StudentInfo = () => {
  const { user } = useAuth();
  const {
    modulo,
    typeOfGraphic,
    features,
    products,
    selectedSubgroup,
    arraySubgroupSelectedByGraphic,
    getSubgroup,
    practicesStudent,
    idPractica,
    getFeaturesProductC1,
    getFeaturesProductC2,
    getFeaturesProductC3,
  } = useStudent();
  const {
    reviewed,
    productIndex,
    handleProductIndex,
    isCounterEmpty,
    handleMessageActive,
    counterAccepted,
    counterRejected,
    rejected,
    accepted,
    updateProductsStates,
    isUpdateProducts,
  } = useProduct();

  const { handleStep } = useProgressBar();

  useEffect(() => {
    if (modulo === CORTE1) {
      getFeaturesProductC1(idPractica, user?.estudiante.idEstudiante);
    }
    if (modulo === CORTE2) {
      getFeaturesProductC2(idPractica, user?.estudiante.idEstudiante);
    }
    if (modulo === CORTE3) {
      getFeaturesProductC3(idPractica, user?.estudiante.idEstudiante);
    }

    // eslint-disable-next-line
  }, [modulo, idPractica, user?.estudiante.idEstudiante]);

  useEffect(() => {
    if (isUpdateProducts) {
      handleMessageActive();
      handleStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateProducts]);

  const getDescriptionPractice = practicesStudent
    .filter((practice) => practice.id === idPractica)
    .map(({ descripcion }) => descripcion);

  const listSubgs =
    arraySubgroupSelectedByGraphic &&
    arraySubgroupSelectedByGraphic?.map((subgroup) => subgroup);

  const totalSubgroups = listSubgs?.reduce(
    (total, item) => total + item.grupos.length,
    0
  );

  const IstotalSubgroupsCountEqualtoSubgroupReview =
    reviewed.length === totalSubgroups;

  const totalSelectedSubgroup =
    selectedSubgroup === null ? 0 : selectedSubgroup?.grupos?.length;

  const reviews = modulo === CORTE2 ? isCounterEmpty() : reviewed.length;

  const totalReviews =
    modulo === CORTE2 ? totalSelectedSubgroup : products?.products?.length;

  const isTotalReviewed = reviews !== 0 && reviews === totalReviews;

  const isAcceptedAndRejectedEqualTotalReviewed =
    counterAccepted + counterRejected === totalReviews;

  const ListFeatures = useCallback(() => {
    return features.map((feature, id) => {
      return (
        <FeatureItem key={id}>
          <ItemName>{feature.name} :</ItemName>
          <Item>{feature.value}</Item>
        </FeatureItem>
      );
    });
  }, [features]);

  const handleNextGroup = useCallback(() => {
    handleProductIndex(
      productIndex === listSubgs.length - 1 ? productIndex : productIndex + 1
    );
    getSubgroup(listSubgs[productIndex]);
  }, [listSubgs, productIndex, getSubgroup, handleProductIndex]);

  function finishPractice() {
    handleMessageActive();
  }

  function finishPractice2() {
    handleMessageActive();
  }

  function finishPractice3() {
    const data = { accepted, rejected };
    updateProductsStates(idPractica, user?.estudiante.idEstudiante, data);
  }

  return (
    <Information>
      <Section1>
        {(modulo === CORTE1 || modulo === CORTE3) && (
          <>
            <Title>Inspección del producto</Title>
            <Description>
              <Text>{getDescriptionPractice[0]}</Text>
            </Description>
          </>
        )}
        {modulo === CORTE2 && (
          <>
            <Title>Subgrupo</Title>
            <StudentSubgroup />
          </>
        )}
      </Section1>

      {modulo === CORTE2 && (
        <Section2>
          <Title>Instrucciones</Title>
          <Text>{getDescriptionPractice[0]}</Text>
        </Section2>
      )}

      <Section3>
        {(modulo === CORTE1 ||
          (modulo === CORTE2 && typeOfGraphic !== VARIABLE) ||
          modulo === CORTE3) && (
          <>
            <Title>Detalles a considerar</Title>
            <FeatureList>{ListFeatures()}</FeatureList>
          </>
        )}

        {modulo === CORTE2 && typeOfGraphic === VARIABLE && (
          <>
            <Title>Tablas de constantes para gráficos de control</Title>
            <DownloadButton file="table">Descargar tablas</DownloadButton>
          </>
        )}
      </Section3>

      <Section4>
        <Title>Número de productos</Title>
        {modulo === CORTE3 ? (
          <StudentReviewedProducts />
        ) : (
          <ProductsNumber>
            <Item>Revisados:</Item>
            <ExamineNumber>{`${reviews} de ${totalReviews}`}</ExamineNumber>
          </ProductsNumber>
        )}
      </Section4>

      <Section5>
        {(modulo === CORTE1 || modulo === CORTE3) && (
          <Button
            type="button"
            styleButton="primary"
            onClick={modulo === CORTE1 ? finishPractice : finishPractice3}
            disabled={
              modulo === CORTE3
                ? !isAcceptedAndRejectedEqualTotalReviewed
                : !isTotalReviewed
            }
          >
            Continuar práctica
          </Button>
        )}
        {modulo === CORTE2 && (
          <Button
            type="button"
            styleButton="primary"
            onClick={
              IstotalSubgroupsCountEqualtoSubgroupReview
                ? finishPractice2
                : handleNextGroup
            }
            disabled={!isTotalReviewed}
          >
            Siguiente Subgrupo
          </Button>
        )}
      </Section5>
    </Information>
  );
};

export default React.memo(StudentInfo);

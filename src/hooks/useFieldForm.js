import { Controller, useFormContext, useFieldArray } from "react-hook-form";

const useFieldForm = () => {
  const {
    watch,
    register,
    getValues,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useFormContext();
  const modulo = watch("field.modulo");
  const tipoPractica = watch("field.tipoPractica");
  const tipoMuestreo = watch("field.tipoMuestreo");
  const participantes = watch("field.participantes");

  return {
    Controller,
    register,
    watch,
    errors,
    control,
    modulo,
    tipoMuestreo,
    participantes,
    tipoPractica,
    useFieldArray,
    reset,
    getValues,
    setValue,
  };
};

export default useFieldForm;

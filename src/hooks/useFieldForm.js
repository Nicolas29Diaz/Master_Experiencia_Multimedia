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
  const selectedOption = watch("selectedOption");

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
    selectedOption,
    useFieldArray,
    reset,
    getValues,
    setValue,
  };
};

export default useFieldForm;

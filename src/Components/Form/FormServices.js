import axiosClient from "config/axios";
import toast from "react-hot-toast";

export const registerPracticeModule1 = (data, idCurso, history) => {
  try {
    const response = axiosClient.post("/api/practicas/corte1", data);
    // Alerta que muestra el estado de creación de la práctica
    toast.promise(response, {
      loading: "Creando nueva práctica...",
      success: (res) => {
        history.push(`/courses/${idCurso}/practice1/${res.data.idPractica}`);
        return `Practica creada con éxito`;
      },
      error: "Error al crear la práctica",
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerPracticeModule2 = (data, idCurso, history) => {
  try {
    const response = axiosClient.post("/api/practicas/corte2", data);

    // Alerta que muestra el estado de creación de la práctica
    toast.promise(response, {
      loading: "Creando nueva práctica...",
      success: (res) => {
        history.push(`/courses/${idCurso}/practice2/${res.data.idPractica}`);
        return `Practica creada con éxito`;
      },
      error: "Error al crear la práctica",
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerPracticeModule3 = (data, idCurso, history) => {
  try {
    const response = axiosClient.post("/api/practicas/corte3", data);

    // Alerta que muestra el estado de creación de la práctica
    toast.promise(response, {
      loading: "Creando nueva práctica...",
      success: (res) => {
        history.push(`/courses/${idCurso}/practice3/${res.data.idPractica}`);
        return `Practica creada con éxito`;
      },
      error: "Error al crear la práctica",
    });
  } catch (error) {
    console.log(error);
  }
};

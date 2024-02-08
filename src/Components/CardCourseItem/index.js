import React, { useState } from "react";
import useTeacher from "hooks/useTeacher";
import { useHistory } from "react-router-dom";
import {
  CardContainer,
  BackgrounImage,
  CardInfo,
  CardActions,
  ButtonAction,
} from "./styles";
import { Edit } from "Icons/Edit";
import { Delete } from "Icons/Delete";
import useModal from "hooks/useModal";
import ModalEditCourse from "Components/Modals/ModalEditCourse";
import ModalDeleteCourse from "Components/Modals/ModalDeleteCourse";
const CardCourseItem = ({ course }) => {
  const { isOpen, handleModalState } = useModal();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { getActualCourse, deleteCourse } = useTeacher();
  let history = useHistory();

  const handleHistory = () => {
    getActualCourse(course);
    history.push(`/courses/${course.idCurso}`);
  };

  const handleEdit = () => {
    getActualCourse(course);
    handleModalState();
    setShowModalEdit(true);
    setShowModalDelete(false);
  };

  const handleDelete = () => {
    handleModalState();
    setShowModalEdit(false);
    setShowModalDelete(true);
  };

  return (
    <>
      <CardContainer>
        <BackgrounImage />
        <CardInfo onClick={handleHistory}>
          <h1>{course.nombreCurso}</h1>
        </CardInfo>
        <CardActions>
          <ButtonAction onClick={handleEdit}>
            <Edit />
          </ButtonAction>
          <ButtonAction onClick={handleDelete}>
            <Delete />
          </ButtonAction>
        </CardActions>
      </CardContainer>

      {showModalEdit && (
        <ModalEditCourse isOpen={isOpen} close={handleModalState} />
      )}

      {showModalDelete && (
        <ModalDeleteCourse
          isOpen={isOpen}
          close={handleModalState}
          onClick={() => deleteCourse(course.idCurso)}
        />
      )}
    </>
  );
};

export default CardCourseItem;

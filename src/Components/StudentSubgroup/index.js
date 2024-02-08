import React from "react";
import {
  SubgroupContainer,
  SubgroupInfo,
  SubgroupHeader,
  SubgroupList,
  SubgroupItem,
  SubgroupValue,
} from "./styles";

import useStudent from "hooks/useStudent";
import useProduct from "hooks/useProduct";

const StudentSubgroup = () => {
  const { arraySubgroupSelectedByGraphic, getSubgroup, selectedSubgroup } =
    useStudent();

  const { handleProductIndex } = useProduct();

  const listsIdsubgroups =
    arraySubgroupSelectedByGraphic &&
    arraySubgroupSelectedByGraphic.map((list) => list.id);

  const handleClick = (subgroup) => {
    getSubgroup(subgroup);
    const findIndexArray = listsIdsubgroups.findIndex(
      (index) => index === subgroup.id
    );
    handleProductIndex(findIndexArray === 0 ? 1 : findIndexArray);
  };

  return (
    <SubgroupContainer>
      <SubgroupInfo>
        <SubgroupHeader>
          <h4>Nombre</h4>
          <h4>N° productos</h4>
        </SubgroupHeader>

        <SubgroupList>
          {arraySubgroupSelectedByGraphic &&
            arraySubgroupSelectedByGraphic.map((subgroup) => (
              <SubgroupItem
                selected={
                  selectedSubgroup && selectedSubgroup.id === subgroup.id
                }
                key={subgroup.id}
                onClick={() => handleClick(subgroup)}
              >
                {subgroup.title}
                <SubgroupValue>{subgroup.grupos?.length}</SubgroupValue>
              </SubgroupItem>
            ))}
        </SubgroupList>
      </SubgroupInfo>
    </SubgroupContainer>
  );
};

export default StudentSubgroup;

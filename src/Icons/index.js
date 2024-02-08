import React from "react";
import { Arrow } from "./Arrow";

const Icons = ({ icon }) => {
  const listIcons = {
    Arrow,
  };

  const selectedIcon = listIcons[icon];
  console.log(selectedIcon);

  return selectedIcon;
};

export default Icons;

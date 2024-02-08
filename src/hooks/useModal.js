import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleModalState() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    handleModalState,
  };
};

export default useModal;

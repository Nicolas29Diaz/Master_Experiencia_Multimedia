import useProduct from "hooks/useProduct";
import useStudent from "hooks/useStudent";
import React from "react";
import { List, LisItem, ListValue } from "./styles";
const StudentReviewedProducts = () => {
  const { reviewed, counterAccepted, counterRejected } = useProduct();
  const { products } = useStudent();
  return (
    <List>
      <LisItem>
        Revisados:
        <ListValue>
          {reviewed.length} de {products?.products?.length}
        </ListValue>
      </LisItem>
      <LisItem>
        Aceptados:<ListValue>{counterAccepted}</ListValue>
      </LisItem>
      <LisItem>
        Rechazados:<ListValue>{counterRejected}</ListValue>
      </LisItem>
    </List>
  );
};

export default StudentReviewedProducts;

import { WrapperCardGroup, CardGroupHeader, CardGroupList } from "./styles";
import { ICONS_PRODUCTS } from "constants/index";
import CardGroupItem from "Components/CardGroupItem";

const CardGroup = ({ group }) => {
  const { nombreProducto, productos } = group;

  let iconSelected = ICONS_PRODUCTS[nombreProducto];

  return (
    <WrapperCardGroup>
      <CardGroupHeader>
        <h2>{nombreProducto}</h2>
        {iconSelected}
      </CardGroupHeader>

      <CardGroupList>
        {productos.map((product) => (
          <CardGroupItem products={product} key={product.idGrupo} />
        ))}
      </CardGroupList>
    </WrapperCardGroup>
  );
};

export default CardGroup;

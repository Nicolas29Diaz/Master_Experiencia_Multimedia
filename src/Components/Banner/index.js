import { formatDate } from "helpers/form";
import React from "react";
import { BannerContainer, Content, ItemBanner } from "./styles";
const Banner = ({ banner }) => {
  return (
    <BannerContainer>
      <Content>
        {banner &&
          banner?.map((infoActual) => {
            const date = formatDate(infoActual?.fechaHoraPublicacionPractica);
            return (
              <ul key={infoActual.idPractica}>
                <ItemBanner>
                  <h1>{infoActual?.nombrePractica}</h1>
                </ItemBanner>
                <ItemBanner>
                  <h3>{infoActual?.nombreCurso}</h3>
                </ItemBanner>

                {infoActual.nombreCorte && (
                  <ItemBanner>
                    Módulo:
                    <span> {infoActual.nombreCorte}</span>
                  </ItemBanner>
                )}
                {infoActual.descripcionPractica && (
                  <ItemBanner>
                    Descripción:
                    <span> {infoActual.descripcionPractica}</span>
                  </ItemBanner>
                )}

                {infoActual.fechaHoraPublicacionPractica && (
                  <ItemBanner>
                    Fecha de publicación:
                    <span> {date}</span>
                  </ItemBanner>
                )}

                {infoActual.graficos && (
                  <ItemBanner>
                    Gráficos seleccionados: <span>{infoActual.graficos}</span>
                  </ItemBanner>
                )}
              </ul>
            );
          })}
      </Content>
    </BannerContainer>
  );
};

export default Banner;

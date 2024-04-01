import { formatDate } from "helpers/form";
import React from "react";
import {
  BannerContainer,
  Content,
  ItemBanner,
  DocsBanner,
  DocItemBanner,
} from "./styles";
import { useEffect } from "react";
// import View from "Icons/View";
// import { ButtonAction } from "Components/CardCourseItem/styles";
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
                {infoActual?.recurso?.length > 0 && (
                  <DocsBanner>
                    Documentos:
                    {infoActual?.recurso.map((item) => (
                      <DocItemBanner key={item?.idRecurso}>
                        <a
                          href={item?.urlRecurso}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.nombreRecurso}
                        </a>

                        {/* <ButtonAction style={{ padding: 0 }}>
                          <View />
                        </ButtonAction> */}
                      </DocItemBanner>
                    ))}
                  </DocsBanner>
                )}
              </ul>
            );
          })}
      </Content>
    </BannerContainer>
  );
};

export default Banner;

import React, { useEffect, useState } from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import { dateFormatDbToView } from "../../../Utils/stringFunction";
import ToggleSwitch from "../../../Components/Toggle/Toggle";
// importa a biblioteca de tooltips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableEva.css";

const Table = ({ dados, fnConnect = null, fnShowModal = null }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((e) => {
          return (
            // {dados.length === 0 ? (
            //   <>
            //     <td className="empty-card">
            //       <h3>Aviso!</h3>
            //       <p>O usuário não confirmou presença em nenhum evento.</p>
            //     </td>
            //   </>
            // ) : null}
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.nomeEvento}
              </td>
              
              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {dateFormatDbToView(e.dataEvento)}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                <img
                  className="tbal-data__icon"
                  idEvento={e.idEvento}
                  src={comentaryIcon}
                  alt=""
                  onClick={() => {
                    fnShowModal(e.idEvento);
                  }}
                />

                <ToggleSwitch
                  toggleActive={e.situacao}
                  manipulationFunction={() => {
                    fnConnect(e.idEvento, e.situacao, e.idPresencaEvento);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
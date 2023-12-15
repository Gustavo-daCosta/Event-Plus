import React from 'react';

import './TableDe.css';
import EmptyTableCard from '../../../Components/EmptyTableCard/EmptyTableCard';

const Table = ( { dado, nF } ) => {
    dado = {};
    console.log(Object.keys(dado).length === 0);
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
                    descricao
                </th>
                <th className="tbal-data__head-title tbal-data__head-title--big">
                    Tipo de Evento
                </th>
                <th className="tbal-data__head-title tbal-data__head-title--big">
                    Instituicao
                </th>
                </tr>
            </thead>
            {Object.keys(dado).length !== 0 ? (
                <>
                    <tbody>
                        <tr className="tbal-data__head-row" key={Math.random()}>
                        <td className="tbal-data__data tbal-data__data--big">
                            {dado.nomeEvento}
                        </td>

                        <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                            {new Date(dado.dataEvento).toLocaleDateString()}
                        </td>

                        <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                            {dado.descricao}
                        </td>

                        <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                            {dado.tiposEvento.titulo}
                        </td>

                        <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                            {nF}
                        </td>
                        </tr>
                    </tbody>
                </>
            ) : (
                <>
                    <EmptyTableCard
                        message='Este evento ainda não possui nenhum comentário.'
                    />
                </>
            )}
        </table>
    );
}

export default Table;
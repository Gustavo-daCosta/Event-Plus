import React from 'react';
import './TableEv.css';

import editPen from '../../../assets/images/edit-pen.svg';
import trashDelete from '../../../assets/images/trash-delete.svg';

const TableEv = ({ dados, fnUpdate, fnDelete }) => {
    return (
        <table className='table-data'>
            <thead className='table-data__head'>
                <tr className='table-data__head-row'>
                    <th className="table-data__head-title table-data__head-title--little">Nome</th>
                    <th className="table-data__head-title table-data__head-title--little">Descrição</th>
                    <th className="table-data__head-title table-data__head-title--little">Tipo do Evento</th>
                    <th className="table-data__head-title table-data__head-title--little">Data</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>
            <tbody>
                {
                    dados.map((evento) => {
                        return (
                            <tr className='table-data__head-row'>
                                <td className="table-data__data table-data__data--little">{evento.nomeEvento}</td>
                                <td className="table-data__data table-data__data--little">{evento.descricao}</td>
                                <td className="table-data__data table-data__data--little">{evento.tiposEvento.titulo}</td>
                                <td className="table-data__data table-data__data--little">
                                    {new Date(evento.dataEvento).toLocaleDateString()}
                                </td>
                                {/* new Date(eventDate).toLocaleDateString() */}
                                <td className="table-data__data table-data__data--little">
                                    <img
                                        className='table-data__icon'
                                        src={editPen} alt=''
                                        onClick={() => fnUpdate(evento.idEvento)}
                                    />
                                </td>
                                <td className="table-data__data table-data__data--little">
                                    <img
                                        className="table-data__icon"
                                        src={trashDelete} alt=""
                                        onClick={() => fnDelete(evento.idEvento)}
                                    />
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export default TableEv;
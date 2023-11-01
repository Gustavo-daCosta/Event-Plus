import React from 'react';
import './Input.css';

const Input = (props) => {
    return (
        <div>
            <input
                type={props.tipo}
                id={props.id}
                name={props.nome}
                placeholder={props.dicaCampo}
                value={props.valor}
                // Encapsular a função em uma arrow function para não executar na montagem/renderização do componente
                onChange={(e) => props.fnAlterar(e.target.value)}
            />
            <span>{props.valor}</span>
        </div>
    );
};

export default Input;
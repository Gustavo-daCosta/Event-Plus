import React from 'react';
import './FormComponents.css';

export const Input = ({
    type,
    id,
    required,
    additionalClass,
    name,
    value,
    placeholder,
    manipulationFunction
}) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            required={required}
            className={`input-component ${additionalClass}`}
            placeholder={placeholder}
            onChange={manipulationFunction}
            autoComplete='off'
        />
    );
}

export const Button = ({
    textButton,
    id,
    name,
    type,
    manipulationFunction,
    additionalClass
}) => {
    return (
        <button
            type={type}
            name={name}
            id={id}
            className={`button-component ${additionalClass}`}
            onClick={manipulationFunction}
        >
            {textButton}
        </button>
    );
}

export const Select = ({
    dados = [],
    id,
    name,
    required,
    additionalClass = "",
    manipulationFunction,
    value
}) => {
    return (
        <select
            id={id}
            name={name}
            required={required}
            className={`input-component ${additionalClass}`}
            onChange={manipulationFunction}
            // value={defaultValue}
            // defaultValue={""}
        >
            <option value="">Selecione</option>
            {
                dados.map((dado) => {
                    return (
                        <option key={dado.idTipoEvento} value={dado.idTipoEvento}>{dado.titulo}</option>
                    );
                })
            }
        </select>
    );
}

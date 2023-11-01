import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import './TestePage.css';

const TestePage = () => {
    const [total, setTotal] = useState();
    const [n1, setN1] = useState();
    const [n2, setN2] = useState();

    function handleCalcular(e) { // Chamar no submit do form
        e.preventDefault();
        setTotal(parseFloat(n1) + parseFloat(n2));
    }

    return (
        <>
            <h1>Página de Testes</h1>
            <h2>Calculator</h2>
            <form onSubmit={handleCalcular}>
                <Input // Passando a "props" (propriedades)
                    tipo = "number"
                    id = "numero1"
                    nome = "numero1"
                    dicaCampo = "Digite o 1º número"
                    valor = {n1}
                    fnAlterar = {setN1}
                />
                <Input
                    tipo = "number"
                    id = "numero2"
                    nome = "numero2"
                    dicaCampo = "Digite o 2º número"
                    valor = {n2}
                    fnAlterar = {setN2}
                />

                <Button
                    tipo = "submit"
                    textoBotao = "Somar"
                />
            </form>
            <p>Resultado: <strong>{total}</strong></p>
        </>
    );
};

export default TestePage;
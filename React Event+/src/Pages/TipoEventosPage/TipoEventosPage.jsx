import React, { useState } from 'react';
import './TipoEventosPage.css';
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent';
import ImageIllustrator from '../../Components/ImageIllustrator/ImageIllustrator';
import Container from '../../Components/Container/Container';
import { Input, Button } from '../../Components/FormComponents/FormComponents';
import api from '../../Services/Service';
import TableTp from './TableTp/TableTp';

import eventTypeImage from '../../assets/images/tipo-evento.svg';

const TipoEventosPage = () => {
    const [frmEdit/*, setFrmEdit*/] = useState(false);
    const [titulo, setTitulo] = useState();
    const [tipoEventos, setTipoEventos] = useState([
        { "idTipoEvento": "1111", "titulo": "Show de Música" },
        { "idTipoEvento": "2222", "titulo": "Festa de aniversário" },
        { "idTipoEvento": "3333", "titulo": "Aula no Senai" },
    ]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (titulo.trim().length < 3) {
            alert("O título deve ter no mínimo 3 caracteres");
            return;
        }

        try {
            const retorno = await api.post("/TiposEvento", {titulo: titulo});
            console.log(retorno.data);
            setTitulo(""); // Limpa a variável
        } catch (error) {
            console.log("Deu ruim na API!");
            console.log(error);
        }
    }

    // Atualização dos dados
    function showUpdateForm() {
        alert("Mostrando a tela de Update");
    }

    function handleUpdate() {
        alert("Bora Atualizar");
    }

    function editActionAbort() {
        alert("Cancelar a tela de edição");
    }

    function handleDelete() {
        alert("Bora lá apagar na API");
    }

    return (
        <MainContent>
            {/* Cadastro de Tipo de Evento */}
            <section className="cadastro-evento-section">
                <Container>
                    <div className="cadastro-evento__box">
                        <Title titleText={"Página Tipos de Eventos"} />
                        <ImageIllustrator
                            alterText={"???"}
                            imageRender={eventTypeImage}
                        />

                        <form
                            className='ftipo-evento'
                            onSubmit={frmEdit ? handleUpdate : handleSubmit}
                        >
                            {!frmEdit ? (
                            <>
                                <Input
                                    type={"text"}
                                    id={"titulo"}
                                    name={"titulo"}
                                    placeholder={"Título"}
                                    required={"required"}
                                    value={titulo}
                                    manipulationFunction={(e) => {
                                        setTitulo(e.target.value);
                                    }}
                                />
                            </>
                            ) : (
                                <p>Tela de Edição</p>
                            )}
                            <Button
                                type={"submit"}
                                id={"cadastrar"}
                                name={"cadastrar"}
                                textButton={"Cadastrar"}
                            />
                        </form>
                    </div>
                </Container>
            </section>

            {/* Listagem de Tipo de Evento */}
            <section className="lista-eventos-section">
                <Container>
                    <Title titleText={"Lista Tipo de Evento"} color='white' />
                    <TableTp
                        dados={tipoEventos}
                        fnUpdate={showUpdateForm}
                        fnDelete={handleDelete}
                    />
                </Container>
            </section>
        </MainContent>
    );
};

export default TipoEventosPage;
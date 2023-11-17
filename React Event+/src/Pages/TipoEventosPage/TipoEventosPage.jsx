import React, { useState, useEffect } from 'react';
import './TipoEventosPage.css';
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent';
import ImageIllustrator from '../../Components/ImageIllustrator/ImageIllustrator';
import Container from '../../Components/Container/Container';
import { Input, Button } from '../../Components/FormComponents/FormComponents';
import api from '../../Services/Service';
import Notification from '../../Components/Notification/Notification';
import TableTp from './TableTp/TableTp';

import eventTypeImage from '../../assets/images/tipo-evento.svg';

const TipoEventosPage = () => {
    const [frmEdit/*, setFrmEdit*/] = useState(false);
    const [titulo, setTitulo] = useState();
    const [tipoEventos, setTipoEventos] = useState([]);
    const [notifyUser, setNotifyUser] = useState();

    useEffect(() => {
        async function getTipoEventos() {
            try {
                const promise = await api.get("/TiposEvento");
                // console.log(promise.data);
                setTipoEventos(promise.data);
            } catch (error) {
                console.log("Deu ruim na api");
            }
        }
        getTipoEventos();
    }, tipoEventos);

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

    async function handleDelete(id) {
        try {
            const retorno = await api.delete(`/TiposEvento/${id}`);
            tipoEventos.filter((tipoEvento) => tipoEvento.idTipoEvento !== id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <Notification {...notifyUser} setNotifyUser={setNotifyUser} />

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
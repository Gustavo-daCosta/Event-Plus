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
import Spinner from '../../Components/Spinner/Spinner';

import eventTypeImage from '../../assets/images/tipo-evento.svg';
import { notifier } from '../../Utils/notifier';

const TipoEventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [tipoEventos, setTipoEventos] = useState([]);
    const [notifyUser, setNotifyUser] = useState({});
    const [idEvento, setIdEvento] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    async function updateList() {
        const promise = await api.get("/TiposEvento");
        setTipoEventos(promise.data);
    }

    useEffect(() => {
        async function getTipoEventos() {
            setShowSpinner(true);
            try {
                const promise = await api.get("/TiposEvento");
                setTipoEventos(promise.data);
            } catch (error) {
                notifier("danger", "Problemas ao deletar. Verifique a conexão com a internet!", setNotifyUser);
                console.log(error);
            }
            setShowSpinner(false);
        }
        getTipoEventos();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (titulo.trim().length < 3) {
            notifier("advice", "O título deve ter no mínimo 3 caracteres", setNotifyUser);
            return;
        }

        try {
            await api.post("/TiposEvento", { titulo: titulo });
            notifier("success", "Cadastrado com sucesso", setNotifyUser);
            setTitulo(""); // Limpa a variável
            updateList();
        } catch (error) {
            notifier("danger", "Problemas ao cadastrar. Verifique a conexão com a internet!", setNotifyUser);
            console.log(error);
        }
    }

    // Atualização dos dados
    async function showUpdateForm(idElemento) {
        setFrmEdit(true);

        try {
            const retorno =  await api.get("/TiposEvento/" + idElemento);
            setTitulo(retorno.data.titulo);
            setIdEvento(idElemento);
        } catch (error) {
            notifier("danger", "Erro ao listar os Tipos de Eventos.", setNotifyUser);
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        if (titulo.trim().length < 3) {
            notifier("danger", "O título deve conter no mínimo 3 caracteres!", setNotifyUser);
            return;
        }

        try {
            await api.put('/TiposEvento/' + idEvento, {
                titulo: titulo
            });
            notifier("success", "Atualizado com sucesso!", setNotifyUser);

            updateList();
            editActionAbort();
        } catch (error) {
            notifier("danger", "Problemas na atualização. Verifique a conexão com a internet!", setNotifyUser);
        }
    }

    function editActionAbort() {
        setFrmEdit(false);
        setTitulo("");
        setIdEvento(null);
    }

    async function handleDelete(id) {
        try {
            await api.delete(`/TiposEvento/${id}`);
            notifier("success", "Deletado com sucesso!", setNotifyUser);
            updateList();
        } catch (error) {
            notifier("danger", "Problemas ao deletar. Verifique a conexão com a internet!", setNotifyUser);
        }
    }

    return (
        <MainContent>
            <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
            {showSpinner ? <Spinner /> : null}

            {/* Cadastro de Tipo de Evento */}
            <section className="cadastro-evento-section">
                <Container>
                    <div className="cadastro-evento__box">
                        <Title titleText={"Tipos de Eventos"} />
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
                                    <Button
                                        type={"submit"}
                                        id={"cadastrar"}
                                        name={"cadastrar"}
                                        textButton={"Cadastrar"}
                                    />
                                </>
                            ) : (
                                // {/* Editar */ }
                                <>
                                    <Input
                                        id="titulo"
                                        placeholder="Titulo"
                                        name="titulo"
                                        type="text"
                                        required="required"
                                        value={titulo}
                                        manipulationFunction={(e) => {
                                            setTitulo(e.target.value);
                                        }}
                                    />
                                    <div className='buttons-editbox'>
                                        <Button
                                            type={"button"}
                                            id={"cancelar"}
                                            name={"cancelar"}
                                            textButton={"Cancelar"}
                                            manipulationFunction={editActionAbort}
                                            additionalClass={"button-component--midle"}
                                        />
                                        <Button
                                            type={"submit"}
                                            id={"atualizar"}
                                            name={"atualizar"}
                                            textButton={"Atualizar"}
                                            additionalClass={"button-component--midle"}
                                        />
                                    </div>
                                </>
                            )}
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
        </MainContent >
    );
};

export default TipoEventosPage;
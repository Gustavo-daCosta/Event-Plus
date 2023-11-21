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

const TipoEventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [tipoEventos, setTipoEventos] = useState([]);
    const [notifyUser, setNotifyUser] = useState({});
    const [idEvento, setIdEvento] = useState("");
    const [showSpinner, setShowSpinner] = useState(false)

    function notifier(type, textNote) {
        let titleNote;
        let imgAlt;

        if (type.toLowerCase() === "success") {
            titleNote = "Sucesso";
            imgAlt = "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.";
        } else if (type.toLowerCase() === "error") {
            titleNote = "Erro";
            imgAlt = "Imagem de ilustração de erro.";
        } else {
            titleNote = "Aviso"
            imgAlt = "Imagem de ilustração de aviso.";
        }

        return setNotifyUser({
            titleNote,
            textNote,
            imgIcon: type,
            imgAlt,
            showMessage: true
        });
    }

    useEffect(() => {
        async function getTipoEventos() {
            try {
                const promise = await api.get("/TiposEvento");
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
            const retorno = await api.post("/TiposEvento", { titulo: titulo });
            notifier("success", "Cadastrado com sucesso");
            // setNotifyUser({
            //     titleNote: "Sucesso",
            //     textNote: "Cadastrado com sucesso!",
            //     imgIcon: "success",
            //     imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            //     showMessage: true
            // });
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

    async function handleUpdate(e) {
        e.preventDefault();

        if (titulo.trim().length < 3) {
            setNotifyUser({
                titleNote: "Erro",
                textNote: "O título deve conter no mínimo 3 caracteres!",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de erro.",
                showMessage: true
            });
            return;
        }

        try {
            const retorno = await api.put('/TiposEvento/' + idEvento, {
                titulo: titulo
            });

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Editado com sucesso!",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true
            });

            const retornoGet = await api.get('/TiposEvento');
            setTipoEventos(retornoGet.data);
            editActionAbort();
        } catch (error) {
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Problemas na atualização. Verifique a conexão com a internet!",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de erro.",
                showMessage: true
            });
        }
    }

    function editActionAbort() {
        setIdEvento(null);
        setFrmEdit(false);
        setTitulo("");
    }

    async function handleDelete(id) {
        try {
            const retorno = await api.delete(`/TiposEvento/${id}`);
            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Deletado com sucesso!",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true
            });
            tipoEventos.filter((tipoEvento) => tipoEvento.idTipoEvento !== id);
        } catch (error) {
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Problemas ao deletar. Verifique a conexão com a internet!",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de erro.",
                showMessage: true
            });
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
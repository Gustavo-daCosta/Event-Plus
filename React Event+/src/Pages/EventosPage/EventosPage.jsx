import React, { useEffect, useState } from 'react';
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent';
import Notification from '../../Components/Notification/Notification';
import Container from '../../Components/Container/Container';
import ImageIllustrator from '../../Components/ImageIllustrator/ImageIllustrator';
import { Input, Button, Select } from '../../Components/FormComponents/FormComponents';
import TableEv from './TableEv/TableEv';
import { dateFormatToForm } from '../../Utils/stringFunction';
import { notifier } from '../../Utils/notifier';

// import notifier from '../../Utils/notifier';
import api from '../../Services/Service';
import eventImage from '../../assets/images/evento.svg';

const EventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [idEvento, setIdEvento] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [instituicoes, setInstituicoes] = useState([{
        "idInstituicao": "b8e060fa-4a53-4ecf-b781-95856b63183d",
        "cnpj": "18571757000109",
        "endereco": "Rua Quatorze de Outubro",
        "nomeFantasia": "SENAI"
    }]);
    const [tiposEvento, setTiposEvento] = useState([]);
    const [idTipoEvento, setIdTipoEvento] = useState("");
    const [data, setData] = useState("");
    const [notifyUser, setNotifyUser] = useState({});

    async function updateList() {
        const promise = await api.get("/Evento");
        setEventos(promise.data);
    }

    useEffect(() => {
        async function getEventos() {
            try {
                const promise = await api.get("/Evento");
                setEventos(promise.data);
            } catch (error) {
                console.log("deu ruim na API"); // Trocar para notifier
            }
        }
        getEventos();

        async function getTiposEvento() {
            try {
                const promise = await api.get("/TiposEvento");
                setTiposEvento(promise.data);
            } catch (error) {
                console.log("deu ruim na API"); // Trocar para notifier
            }
        }
        getTiposEvento();
    }, []);

    async function encontrarTipoEvento() {
        // console.log(tiposEvento);
        // console.log("IdTipoEvento");
        // console.log(idTipoEvento);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (nome.trim().length < 3) {
            notifier("warning", "O título deve ter no mínimo 3 caracteres", setNotifyUser);
            return;
        }

        // Todo:
        // Dentro da API criar uma exceção para evitar que uma data que já passou seja cadastrada

        try {
            await api.post("/Evento", {
                nomeEvento: nome,
                descricao,
                dataEvento: data,
                idTipoEvento,
                idInstituicao: instituicoes[0].idInstituicao,
            });
            notifier("success", "Cadastrado com sucesso", setNotifyUser);

            setNome("");
            setDescricao("");
            setData("");
            updateList();
        } catch (error) {
            notifier("danger", "Problemas ao cadastrar. Verifique a conexão com a internet!", setNotifyUser);
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        if (nome.trim().length < 3) {
            notifier("warning", "O título deve ter no mínimo 3 caracteres", setNotifyUser);
            return;
        }

        try {
            await api.put("/Evento/" + idEvento, {
                nomeEvento: nome,
                descricao,
                dataEvento: data,
                idTipoEvento,
                idInstituicao: instituicoes[0].idInstituicao,
            });
            notifier("success", "Atualizado com sucesso!", setNotifyUser);

            updateList();
            editActionAbort();
        } catch (error) {
            notifier("danger", "Problemas ao atualizar. Verifique a conexão com a internet!", setNotifyUser);
        }
    }

    function editActionAbort() {
        setFrmEdit(false);
        setNome("");
        setDescricao("");
        setData("");
    }

    async function showUpdateForm(idElemento) {
        setFrmEdit(true);
        
        try {
            encontrarTipoEvento();
            const promise = await api.get("/Evento/" + idElemento);
            setIdEvento(idElemento);
            setNome(promise.data.nomeEvento);
            setDescricao(promise.data.descricao);
            
            // setIdTipoEvento(promise.data.idTipoEvento);
            setData(dateFormatToForm(promise.data.dataEvento));
        } catch (error) {
            notifier("danger", "Erro ao listar os Eventos.", setNotifyUser);
        }
    }

    async function handleDelete(id) {
        try {
            await api.delete(`/Evento/${id}`);
            notifier("success", "Deletado com sucesso!", setNotifyUser);
            updateList();
        } catch (error) {
            notifier("danger", "Problemas ao deletar. Verifique a conexão com a internet!", setNotifyUser);
        }
    }

    return (
        <MainContent>
            <Notification {...notifyUser} setNotifyUser={setNotifyUser} />

            <section className="cadastro-evento-section">
                <Container>
                    <div className="cadastro-evento__box">
                        <Title titleText={"Eventos"} />
                        <ImageIllustrator
                            alterText={""}
                            imageRender={eventImage}
                        />
                        <form
                            className='ftipo-evento'
                            onSubmit={frmEdit ? handleUpdate : handleSubmit}
                        >
                            {!frmEdit ? (
                                <>
                                    <Input
                                        type={"text"}
                                        id={"nome"}
                                        name={"nome"}
                                        placeholder={"Nome"}
                                        required={"required"}
                                        value={nome}
                                        manipulationFunction={(e) => setNome(e.target.value)}
                                    />
                                    <Input
                                        type={"text"}
                                        id={"descricao"}
                                        name={"descricao"}
                                        placeholder={"Descrição"}
                                        required={"required"}
                                        value={descricao}
                                        manipulationFunction={(e) => setDescricao(e.target.value)}
                                    />
                                    <Select
                                        id={"tipoEvento"}
                                        name={"tipoEvento"}
                                        required={"required"}
                                        dados={tiposEvento}
                                        value={idTipoEvento}
                                        manipulationFunction={(e) => setIdTipoEvento(e.target.value)}
                                    />
                                    <Input
                                        type={"date"}
                                        id={"nome"}
                                        name={"nome"}
                                        placeholder={"dd/mm/aaaa"}
                                        required={"required"}
                                        value={data}
                                        manipulationFunction={(e) => setData(e.target.value)}
                                    />
                                    <Button
                                        type={"submit"}
                                        id={"cadastrar"}
                                        name={"cadastrar"}
                                        textButton={"Cadastrar"}
                                    />
                                </>
                            ) : (
                                <>
                                    <Input
                                        type={"text"}
                                        id={"nome"}
                                        name={"nome"}
                                        placeholder={"Nome"}
                                        required={"required"}
                                        value={nome}
                                        manipulationFunction={(e) => setNome(e.target.value)}
                                    />
                                    <Input
                                        type={"text"}
                                        id={"descricao"}
                                        name={"descricao"}
                                        placeholder={"Descrição"}
                                        required={"required"}
                                        value={descricao}
                                        manipulationFunction={(e) => setDescricao(e.target.value)}
                                    />
                                    <Select
                                        id={"tipoEvento"}
                                        name={"tipoEvento"}
                                        required={"required"}
                                        dados={tiposEvento}
                                        value={idTipoEvento}
                                        manipulationFunction={(e) => setIdTipoEvento(e.target.value)}
                                    />
                                    <Input
                                        type={"date"}
                                        id={"nome"}
                                        name={"nome"}
                                        placeholder={"dd/mm/aaaa"}
                                        required={"required"}
                                        value={data}
                                        manipulationFunction={(e) => setData(e.target.value)}
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

            {/* Listagem de Eventos */}
            <section className="lista-eventos-section">
                <Container>
                    <Title titleText={"Lista de Eventos"} color='white' />
                    <TableEv
                        dados={eventos}
                        fnUpdate={showUpdateForm}
                        fnDelete={handleDelete}
                    />
                </Container>
            </section>
        </MainContent>
    );
};

export default EventosPage;
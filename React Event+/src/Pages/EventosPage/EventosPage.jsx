import React, { useEffect, useState } from 'react';
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent';
import Notification from '../../Components/Notification/Notification';
import Container from '../../Components/Container/Container';
import ImageIllustrator from '../../Components/ImageIllustrator/ImageIllustrator';
import { Input, Button, Select } from '../../Components/FormComponents/FormComponents';
import TableEv from './TableEv/TableEv';

// import notifier from '../../Utils/notifier';
import api from '../../Services/Service';
import eventImage from '../../assets/images/evento.svg';

const EventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [idTipoEvento, setIdTipoEvento] = useState("");
    const [instituicoes, setInstituicoes] = useState([{
            "idInstituicao": "b8e060fa-4a53-4ecf-b781-95856b63183d",
            "cnpj": "18571757000109",
            "endereco": "Rua Quatorze de Outubro",
            "nomeFantasia": "SENAI"
        }]);
    const [tiposEvento, setTiposEvento] = useState([]);
    const [data, setData] = useState("");
    const [notifyUser, setNotifyUser] = useState({});

    function notifier(type, textNote, notifyUserFunction) {
        type.toLowerCase();
        let titleNote = type === "success" ?
        "Sucesso" : type === "error" ?
        "Erro" : "Aviso";
    
        let imgAlt = type === "success" ?
        "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok."
        : type === "error" ? "Imagem de ilustração de erro."
        : "Imagem de ilustração de aviso.";
    
        return notifyUserFunction({
            titleNote,
            textNote,
            imgIcon: type,
            imgAlt,
            showMessage: true
        });
    }

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
                console.log("deu ruim na API");
            }
        }
        getEventos();

        async function getTiposEvento() {
            try {
                const promise = await api.get("/TiposEvento");
                console.log(promise.data);
                setTiposEvento(promise.data);
            } catch (error) {
                console.log("deu ruim na API"); // Trocar para notifier
            }
        }
        getTiposEvento();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (nome.trim().length < 3) {
            notifier("advice", "O título deve ter no mínimo 3 caracteres", setNotifyUser);
            return;
        }

        try {

        } catch (error) {
            const promise = await api.post("/Evento", {
                nomeEvento: nome,
                descricao,
                dataEvento: data,
                idTipoEvento: idTipoEvento,
                instituicao: instituicoes[0]
            });
            notifier("success", "Cadastrado com sucesso", setNotifyUser);

            setNome("");
            setDescricao("");
            setData("");
            setIdTipoEvento("");
            updateList();
        }
    }

    function handleUpdate(e) {
        e.preventDefault();

        alert("Atualizar evento");
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
            const retorno = await api.get("/Evento/" + idElemento);
            setNome(retorno.data.nomeEvento);
            setDescricao(retorno.data.descricao);
            setData(new Date(retorno.data.dataEvento).toLocaleDateString());
        } catch (error) {
            notifier("danger", "Erro ao listar os Eventos.", setNotifyUser);
        }
    }

    async function handleDelete(id) {
        try {
            const retorno = await api.delete(`/Evento/${id}`);
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
                                        manipulationFunction={(e) => setTiposEvento(e.target.value)}
                                        // Alterar variável dos dados e do manipulation function (usar variaveis diferentes para cada um)
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
                                            id={"cadastrar"}
                                            name={"cadastrar"}
                                            textButton={"Cadastrar"}
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
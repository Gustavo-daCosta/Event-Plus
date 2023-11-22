import React, { useEffect, useState } from 'react';
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent';
import Notification from '../../Components/Notification/Notification';
import Container from '../../Components/Container/Container';
import ImageIllustrator from '../../Components/ImageIllustrator/ImageIllustrator';
import { Input } from '../../Components/FormComponents/FormComponents';
import TableEv from './TableEv/TableEv';

import api from '../../Services/Service';
import eventImage from '../../assets/images/evento.svg';

const EventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);
    const [eventos, setEventos] = useState([
        {
            "idEvento": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "dataEvento": "2023-11-25T19:55:15.394Z",
            "nomeEvento": "string",
            "descricao": "string",
            "idTipoEvento": "867175ab-0848-48ff-9e43-928371624419",
            "idInstituicao": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
    ]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    // const [tipoEvento, setTipoEvento] = useState("");
    const [data, setData] = useState("");
    const [notifyUser, setNotifyUser] = useState({});
    
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
    }, []);

    function handleSubmit() {
        alert("Cadastrar evento");
    }

    function handleUpdate() {
        alert("Atualizar evento");
    }

    function showUpdateForm() {
        alert("ShowUpdateForm");
    }

    async function handleDelete() {
        alert("Handle delete");
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
                            { !frmEdit ? (
                                <>
                                    <Input
                                        type={"text"}
                                        id={"nome"}
                                        name={"nome"}
                                        placeholder={"Nome"}
                                        required={"required"}
                                        value={nome}
                                        manipulationFunction={(e) => setNome(e.targe.value)}
                                    />
                                    <Input
                                        type={"text"}
                                        id={"descricao"}
                                        name={"descricao"}
                                        placeholder={"Descrição"}
                                        required={"required"}
                                        value={descricao}
                                        manipulationFunction={(e) => setDescricao(e.targe.value)}
                                    />
                                    <Input
                                        type={"date"}
                                        id={"nome"}
                                        name={"nome"}
                                        placeholder={"dd/mm/aaaa"}
                                        required={"required"}
                                        value={data}
                                        manipulationFunction={(e) => setData(e.targe.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>Form de edição</p>
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
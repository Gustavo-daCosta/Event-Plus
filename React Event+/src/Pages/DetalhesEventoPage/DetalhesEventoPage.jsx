import React, { useEffect, useState } from 'react';
import MainContent from '../../Components/MainContent/MainContent';
import Container from '../../Components/Container/Container';
import Title from '../../Components/Title/Title';
import { useParams } from 'react-router-dom';
import api from '../../Services/Service';
import Table from './TableDe/TableDe';
import TableCe from './TableCe/TableCe';

import './DetalhesEventoPage.css';

const DetalhesEventoPage = () => {
    let { id } = useParams(); // Pegar id passado via URL
    const [evento, setEvento] = useState({});
    const [comentarios, setComentarios] = useState ([]);
    const [titulo, setTitulo] = useState("");
    const [nF, setNF] = useState("");

    useEffect(() => {
        async function getEvento() {
            try {
                // TODO: Alterar requisição para GetById
                const promise = await api.get('/Evento');
                const eventoEncontrado = promise.data.find(e => e.idEvento === id);
                setEvento(eventoEncontrado);
                setTitulo(eventoEncontrado.nomeEvento);
                setNF(eventoEncontrado.instituicao.nomeFantasia);
            } catch (error) {
                console.log(error);
            }
        }
        
        async function getComentarios() {
            try {
                const promise = await api.get('/ComentariosEvento');
                const comentariosEvento = promise.data.find((ce) => ce.idEvento === id);
                setComentarios(comentariosEvento);
            } catch (error) {
                console.log(error);
            }
        }
        
        getEvento();
        getComentarios();
    }, [id, comentarios]);

    return (
        <>
            <MainContent>
                <Container>
                    <Title titleText={titulo}/>
                    <Table dado={evento} nF={nF} />
                </Container>

                <section className="lista-comentarios-section">
                    <Container>
                        <Title titleText={"Comentários"} color="white" />
                        <article className="lista-comentarios-container">
                            {/* <TableCe comentarios={comentarios} /> */}
                        </article>
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default DetalhesEventoPage;
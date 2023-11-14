import React, { useState } from 'react';
import './TipoEventosPage.css';
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent';
import ImageIllustrator from '../../Components/ImageIllustrator/ImageIllustrator';
import Container from '../../Components/Container/Container';
import { Input, Button } from '../../Components/FormComponents/FormComponents';

import eventTypeImage from '../../assets/images/tipo-evento.svg';

const TipoEventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(true);
    const [titulo, setTitulo] = useState();

    function handleSubmit() {
        alert("Bora Cadastrar");
    }

    function handleUpdate() {
        alert("Bora Atualizar");
    }

    return (
        <MainContent>
            <section className="cadastro-evento-section">
                <Container>
                    <div className="cadastro-evento__box">
                        <Title titleText={"Página Tipos de Eventos"} />
                        <ImageIllustrator
                            alterText={"???"}
                            imageRender={eventTypeImage}
                        />

                        <form onSubmit={frmEdit ? handleUpdate : handleSubmit}>
                            {!frmEdit ? 
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
                            : (<p>Tela de Edição</p>) }
                            <Button
                                id={""}
                                textButton={"Cadastrar"}
                            />
                        </form>
                    </div>
                </Container>
            </section>
        </MainContent>
    );
};

export default TipoEventosPage;
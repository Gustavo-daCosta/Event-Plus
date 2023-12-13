import React, { useEffect, useState } from 'react';
import MainContent from '../../Components/MainContent/MainContent';
import Container from '../../Components/Container/Container';
import Title from '../../Components/Title/Title';

const DetalhesEventoPage = () => {
    const [evento, setEvento] = useState({});

    useEffect(() => {

    });

    return (
        <>
            <MainContent>
                <Container>
                    <Title></Title>
                </Container>
            </MainContent>
        </>
    );
};

export default DetalhesEventoPage;
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import MainContent from "../../Components/MainContent/MainContent";
import Banner from '../../Components/Banner/Banner';
import VisionSection from '../../Components/VisionSection/VisionSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import NextEvent from '../../Components/NextEvent/NextEvent';
import Container from '../../Components/Container/Container';
import Title from '../../Components/Title/Title';
import api from "../../Services/Service";

const HomePage = () => {
    useEffect(() => {
        // Chamar a API
        async function getProximosEventos() {
            try {
                const promise = await api.get("/Evento/ListarProximos");

                setNextEvents(promise.data);
            } catch (error) {
                alert("Deu ruim na API");
            }
        }
        getProximosEventos();
        console.log("A HomePage foi montada.");
    }, []);

    // fake mock - api mockada
    const [nextEvents, setNextEvents] = useState([]);

    return (
        <MainContent>
            <Banner/>

            {/* Próximos eventos */}
            <section className="proximos-eventos">
                <Container>
                    <Title titleText={"Próximos Eventos"}/>

                    <div className="events-box">
                        {
                            nextEvents.map((e) => {
                                return (
                                    <NextEvent
                                        title={e.nomeEvento}
                                        description={e.descricao}
                                        eventDate={e.dataEvento}
                                        idEvento={e.idEvento}
                                    />
                                );
                            })
                        }

                        {/* <NextEvent
                            title={"Happy Hour Event"}
                            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                            eventDate={"08/11/2023"}
                            idEvento={"jefkhsgdshg25487edbfb"}
                        />
                        <NextEvent
                            title={"Happy Hour Event"}
                            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                            eventDate={"08/11/2023"}
                            idEvento={"jhuyghbjkniug89456df"}
                        /> */}
                    </div>
                </Container>
            </section>

            <VisionSection/>
            <ContactSection/>
        </MainContent>
    );
};

export default HomePage;
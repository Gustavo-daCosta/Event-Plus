import React from 'react';
import './HomePage.css';
import Banner from '../../Components/Banner/Banner';
import VisionSection from '../../Components/VisionSection/VisionSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import NextEvent from '../../Components/NextEvent/NextEvent';
import Container from '../../Components/Container/Container';
import Title from '../../Components/Title/Title';

const HomePage = () => {
    return (
        <>
            <Banner/>

            {/* Próximos eventos */}
            <section className="proximos-eventos">
                <Container>
                    <Title titleText={"Próximos Eventos"}/>

                    <div className="events-box">
                        <NextEvent
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
                        />
                    </div>
                </Container>
            </section>
            <VisionSection/>
            <ContactSection/>
        </>
    );
};

export default HomePage;
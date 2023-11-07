import React, { useState } from 'react';
import Container from '../Container/Container';
import Nav from '../Nav/Nav';
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario';
import './Header.css';

import menuBar from '../../assets/images/menubar.png';

const Header = () => {
    const [exibeNavBar, setExibeNavBar] = useState(false);

    return (
        <header className='headerpage'>
            <Container>
                <div className='header-flex'>
                    <img
                        src={menuBar}
                        alt="Imagem menu de barras. Serve para exibir ou esconder o menu no smartphone."
                        className='headerpage__menubar'
                        onClick={ () => { setExibeNavBar(true) } }
                    />

                    <Nav
                        exibeNavBar={exibeNavBar}
                        setExibeNavBar={setExibeNavBar}
                    />

                    <PerfilUsuario/>
                </div>
            </Container>
        </header>
    );
};

export default Header;
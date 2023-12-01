import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

import logoMobile from '../../assets/images/logo-white.svg';
import logoDesktop from '../../assets/images/logo-pink.svg';
import { UserContext } from '../../context/AuthContext';

const Nav = ( { exibeNavBar, setExibeNavBar } ) => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <nav className={`navbar ${exibeNavBar ? "exibeNavbar": ""}`}>
            <span
                className='navbar__close'
                onClick={() => setExibeNavBar(false)}
            >x</span>

            <Link to="/">
                <img
                    className='eventlogo__logo-image'
                    src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                    alt="Event Plus Logo"
                />
            </Link>

            <div className="navbar__items-box">
                <Link className='navbar__item' to="/">Home</Link>

                {userData.role === "Administrador" ? (
                    <>
                        <Link className='navbar__item' to="/tipo-eventos">Tipos de Eventos</Link>
                        <Link className='navbar__item' to="/eventos">Eventos</Link>
                    </>
                ) : userData.role === "Aluno" ? (
                    <>
                        <Link className='navbar__item' to="/eventos-aluno">Eventos Aluno</Link>
                    </>
                ) : ( null )}
            </div>
        </nav>
    );
};

export default Nav;
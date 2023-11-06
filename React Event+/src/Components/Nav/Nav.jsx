import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

import logoMobile from '../../assets/images/logo-white.svg';
import logoDesktop from '../../assets/images/logo-pink.svg';

const Nav = ( { exibeNavBar, setExibeNavBar } ) => {
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
                <Link to="/">Home</Link>
                <Link to="/tipo-eventos">Tipo Eventos</Link>
                <Link to="/eventos">Eventos</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Nav;
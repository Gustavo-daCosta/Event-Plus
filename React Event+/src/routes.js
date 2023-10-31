import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import EventosPage from './Pages/EventosPage/EventosPage';
import TipoEventosPage from './Pages/TipoEventosPage/TipoEventosPage';
import TestePage from './Pages/TestePage/TestePage';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<HomePage/>} path='/' exact />
                <Route element={<LoginPage/>} path='/login' />
                <Route element={<EventosPage/>} path='/eventos' />
                <Route element={<TipoEventosPage/>} path='/tipo-eventos' />
                <Route element={<TestePage/>} path='/teste' />
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;
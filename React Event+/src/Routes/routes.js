import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../Pages/HomePage/HomePage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import EventosPage from '../Pages/EventosPage/EventosPage';
import TipoEventosPage from '../Pages/TipoEventosPage/TipoEventosPage';
import TestePage from '../Pages/TestePage/TestePage';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { PrivateRoute } from './PrivateRoute';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<HomePage />} path='/' exact />
                <Route element={<LoginPage />} path='/login' />
                <Route element={<EventosPage />} path='/eventos' />

                <Route
                    element={
                        <PrivateRoute redirectTo="/">
                            <EventosPage />
                        </PrivateRoute>
                    }
                    path='/eventos-aluno'
                />

                <Route
                    element={
                        <PrivateRoute redirectTo="/">
                            <TipoEventosPage />
                        </PrivateRoute>
                    }
                    path='/tipo-eventos'
                />
                <Route element={<TestePage />} path='/teste' />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Rotas;
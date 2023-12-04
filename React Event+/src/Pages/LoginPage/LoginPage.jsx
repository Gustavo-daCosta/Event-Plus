import React, { useState, useContext, useEffect } from "react";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import loginImage from "../../assets/images/login.svg";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import { notifier } from "../../Utils/notifier";
import Notification from "../../Components/Notification/Notification";
import api from "../../Services/Service";

import "./LoginPage.css";
import MainContent from "../../Components/MainContent/MainContent";
import { UserContext, userDecodeToken } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [notifyUser, setNotifyUser] = useState({});
  const [user, setUser] = useState({});
  // Dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.nome) navigate("/");
  }, [userData]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.email.length <= 3 || user.senha.length <= 3) {
      notifier(
        "warning",
        "Digite um email ou senha com mais de 3 caracteres",
        setNotifyUser
      );
      return;
    }

    try {
      const promise = await api.post("/Login", {
        email: user.email,
        senha: user.senha,
      });
      const userFullToken = userDecodeToken(promise.data.token);
      setUserData(userFullToken); // Guarda os dados decodificados (payload)
      localStorage.setItem("token", JSON.stringify(userFullToken));
      navigate("/");

      notifier("success", "Login concluído com sucesso!", setNotifyUser);
    } catch (error) {
      notifier(
        "danger",
        "Erro ao fazer login, tente novamente!",
        setNotifyUser
      );
    }
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      <div className="layout-grid-login">
        <div className="login">
          <div className="login__illustration">
            <div className="login__illustration-rotate"></div>
            <ImageIllustrator
              imageRender={loginImage}
              altText="Imagem de um homem em frente de uma porta de entrada"
              additionalClass="login-illustrator "
            />
          </div>

          <div className="frm-login">
            <img src={logo} className="frm-login__logo" alt="" />

            <form className="frm-login__formbox" onSubmit={handleSubmit}>
              <Input
                additionalClass="frm-login__entry"
                type="email"
                id="login"
                name="login"
                required={true}
                value={user.email}
                manipulationFunction={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value.trim(),
                  });
                }}
                placeholder="Username"
              />
              <Input
                additionalClass="frm-login__entry"
                type="password"
                id="senha"
                name="senha"
                required={true}
                value={user.senha}
                manipulationFunction={(e) => {
                  setUser({
                    ...user,
                    senha: e.target.value.trim(),
                  });
                }}
                placeholder="****"
              />

              <a href="" className="frm-login__link">
                Esqueceu a senha?
              </a>

              <Button
                textButton="Login"
                id="btn-login"
                name="btn-login"
                type="submit"
                additionalClass="frm-login__button"
              />
            </form>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default LoginPage;

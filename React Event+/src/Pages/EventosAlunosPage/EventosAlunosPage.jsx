import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api from "../../Services/Service";

import "./EventosAlunosPage.css"
import { UserContext } from "../../Context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  // const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: "1", text: "Todos os eventos" },
    { value: "2", text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.userId]);

  async function loadEventsType() {
    try {
      if (tipoEvento !== "2") {
        const promise = await api.get("/Evento");
        const promiseEventos = await api.get(`/PresencasEvento/ListarMinhas/${userData.userId}`);

        const dadosMarcados = verificaPresenca(promise.data, promiseEventos.data);
        // console.clear();
        // console.log("Dados marcados");
        // console.log(dadosMarcados);

        setEventos(promise.data);
      } else {
        let arrEventos = [];
        const promiseEventos = await api.get(`/PresencasEvento/ListarMinhas/${userData.userId}`);
        promiseEventos.data.forEach((element) => {
          arrEventos.push({
            ...element.evento,
            situacao: element.situacao,
            idPresencaEvento: element.idPresencaEvento,
          });
        });
        setEventos(arrEventos);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      for (let i = 0; i < eventsUser.length; i++) {
        if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break;
        }
      }
    }
    return arrAllEvents;
  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary(idComentary) {
    alert("Carregar o comentário")
  }

  async function postMyComentary() {
    alert("Cadastrar o comentário");
  }

  const commentaryRemove = async () => {
    alert("Remover o comentário");
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  async function handleConnect(idEvent, connect = false, idPresencaEvento = null) {
    if (!connect) {
      try {
        const promise = await api.post("/PresencasEvento", {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: idEvent,
        });

        if (promise.status === 201) {
          loadEventsType();
          console.log("Presença confirmada"); // trocar para notifier
        }
      } catch (error) {
        console.log("Erro ao conectar");
        console.log(error);
      }
    } else {
      try {
        const promiseDelete = await api.delete(`/PresencasEvento/${idPresencaEvento}`);
        
        if (promiseDelete.status === 204) {
          loadEventsType();
          console.log("Presença removida");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            dados={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            additionalClass="select-tp-evento"
            arrayKey={"value"} arrayValue={"text"}
            needInitialValue={false}
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
          fnGet={loadMyComentary}
          fnPost={postMyComentary}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;

import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
// import notifier from "../../Utils/notifier";
import api from "../../Services/Service";

import "./EventosAlunosPage.css";
import { UserContext } from "../../Context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  // const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocadow
  const [quaisEventos, setQuaisEventos] = useState([
    { value: "1", text: "Todos os eventos" },
    { value: "2", text: "Meus eventos" },
]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idEvento, setIdEvento] = useState();

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.userId]);

  async function loadEventsType() {
    try {
      if (tipoEvento !== "2") {
        const promise = await api.get("/Evento");
        const promiseEventos = await api.get(
          `/PresencasEvento/ListarMinhas/${userData.userId}`
        );

        const dadosMarcados = verificaPresenca(
          promise.data,
          promiseEventos.data
        );
        // console.clear();
        // console.log("Dados marcados");
        // console.log(dadosMarcados);

        setEventos(promise.data);
      } else {
        let arrEventos = [];
        const promiseEventos = await api.get(
          `/PresencasEvento/ListarMinhas/${userData.userId}`
        );
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
  };

  async function handleConnect(
    idEvent,
    connect = false,
    idPresencaEvento = null
  ) {
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
        const promiseDelete = await api.delete(
          `/PresencasEvento/${idPresencaEvento}`
        );

        if (promiseDelete.status === 204) {
          loadEventsType();
          console.log("Presença removida");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComentary() {
    console.log(`IdUsuario: ${userData.userId}`);
    console.log(`IdEvento: ${idEvento}`);
    const promise = await api.get(`/ComentariosEvento/BuscarPorIdUsuario`, {
      idUsuario: "ea1a23de-2026-49dc-d888-08dbf29d0325",
      idEvento: "f6c329aa-0b0a-4fea-b581-372b08209fe1",
    });

    console.log(promise.data);

    return promise.data;
    // alert("Carregar o comentário")
  }

  async function postMyComentary(description) {
    // const promise = await api.post("/ComentariosEvento", {
    //   descricao: description,
    //   exibe: true,
    //   idUsuario: userData.userId,
    //   idEvento: idEvento,
    // });
    // alert(promise.data);
  }

  const commentaryRemove = async () => {
    alert("Remover o comentário");
  };

  const showHideModal = (idEvento) => {
    setIdEvento(idEvento);
    setShowModal(!showModal);
  };

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
            arrayKey={"value"}
            arrayValue={"text"}
            needInitialValue={false}
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={(idEvento) => {
              showHideModal(idEvento);
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

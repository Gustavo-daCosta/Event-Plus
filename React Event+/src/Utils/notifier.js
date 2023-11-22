function notifier(type, textNote, notifyUserFunction) {
    type.toLowerCase();
    let titleNote = type === "success" ?
    "Sucesso" : type === "error" ?
    "Erro" : "Aviso";

    let imgAlt = type === "success" ?
    "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok."
    : type === "error" ? "Imagem de ilustração de erro."
    : "Imagem de ilustração de aviso.";

    // if (type.toLowerCase() === "success") {
    //     titleNote = "Sucesso";
    //     imgAlt = "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.";
    // } else if (type.toLowerCase() === "error") {
    //     titleNote = "Erro";
    //     imgAlt = "Imagem de ilustração de erro.";
    // } else {
    //     titleNote = "Aviso"
    //     imgAlt = "Imagem de ilustração de aviso.";
    // }

    return notifyUserFunction({
        titleNote,
        textNote,
        imgIcon: type,
        imgAlt,
        showMessage: true
    });
}

/**
 * Função que inverte a data do banco de dados
 * @param {*} data 
 * @returns 
 */

export const dateFormatDbToView = (data) => {
    // Exemplo: 2023-09-30T00:00:00 para 30/09/2023
    data = data.substr(0, 10); // Retorna apenas a data (2023-09-30)
    data = data.split("-"); // Retorna um array [2023, 09, 30]
    return `${data[2]}/${data[1]}/${data[0]}`;
}

export const dateFormatToForm = (data) => {
    // Exemplo: 2023-09-30T00:00:00 para 30/09/2023
    data = data.substr(0, 10); // Retorna apenas a data (2023-09-30)
    data = data.split("-"); // Retorna um array [2023, 09, 30]
    return `${data[0]}-${data[1]}-${data[2]}`;
}

import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export const userDecodeToken = (theToken) => {
    const decoded = jwtDecode(theToken); // Retorna o payload do token

    return {
        role: decoded.role,
        nome: decoded.name,
        userId: decoded.jti,
        token: theToken,
    }
}

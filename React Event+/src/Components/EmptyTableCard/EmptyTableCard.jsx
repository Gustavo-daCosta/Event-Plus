import React from 'react';
import './EmptyTableCard.css';

const EmptyTableCard = ( { message = "Nenhum valor encontrado", color="red", additionalClass="" } ) => {
    return (
        <div className='card'>
            <h1>!</h1>
            <p className='message'>{message}</p>
        </div>
    );
}

export default EmptyTableCard;
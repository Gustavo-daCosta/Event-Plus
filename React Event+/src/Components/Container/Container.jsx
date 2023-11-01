import React from 'react';
import './Container.css';

const Container = ( { chilren } ) => {
    return (
        <div className='container'>
            {chilren}
        </div>
    );
};

export default Container;
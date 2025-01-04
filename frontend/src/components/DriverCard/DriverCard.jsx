import React from 'react';
import './DriverCard.css';

const DriverCard = ({ driver }) => {
    const { photo, acronym, firstName, surname, driverNumber, teamName } = driver;

    return (
        <div className="driver-card">
            <div className="driver-photo">
                <img src={photo} alt={`${firstName} ${surname}`} />
            </div>
            <div className="driver-details">
                <h2>{acronym}</h2>
                <p>First Name: {firstName}</p>
                <p>Surname: {surname}</p>
                <p>Driver Number: {driverNumber}</p>
                <p>Team Name: {teamName}</p>
            </div>
        </div>
    );
};

export default DriverCard;

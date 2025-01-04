import React from 'react';
import './DriverCard.css';

const DriverCard = ({ driver }) => {
    const { headshot_url, name_acronym, first_name, last_name, driver_number, team_name } = driver;

    return (
        <div className="driver-card">
            <div className="driver-photo">
                <img src={headshot_url} alt={`${first_name} ${last_name}`} />
            </div>
            <div className="driver-details">
                <h2>{name_acronym}</h2>
                <p>First Name: {first_name}</p>
                <p>Surname: {last_name}</p>
                <p>Driver Number: {driver_number}</p>
                <p>Team Name: {team_name}</p>
            </div>
        </div>
    );
};

export default DriverCard;

import React from 'react';
import DriverCard from '../DriverCard/DriverCard';
import './DriversList.css';

const DriversList = ({ drivers }) => {
    return (
        <div className="drivers-list">
            {drivers.map((driver) => (
                <DriverCard key={driver.driverNumber} driver={driver} />
            ))}
        </div>
    );
};

export default DriversList;

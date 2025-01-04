import React from 'react';
import DriversList from '../../components/DriversList/DriversList';

const driversData = [
    {
        photo: 'https://via.placeholder.com/150',
        acronym: 'LH',
        firstName: 'Lewis',
        surname: 'Hamilton',
        driverNumber: '44',
        teamName: 'Mercedes',
    },
    {
        photo: 'https://via.placeholder.com/150',
        acronym: 'MV',
        firstName: 'Max',
        surname: 'Verstappen',
        driverNumber: '33',
        teamName: 'Red Bull Racing',
    },
    {
        photo: 'https://via.placeholder.com/150',
        acronym: 'CL',
        firstName: 'Charles',
        surname: 'Leclerc',
        driverNumber: '16',
        teamName: 'Ferrari',
    },
];

const Drivers = () => {
    return (
        <div>
            <h1>Drivers</h1>
            <DriversList drivers={driversData} />
        </div>
    );
};

export default Drivers;

import React, { useState, useEffect } from 'react';
import DriversList from '../../components/DriversList/DriversList';
import './Drivers.css';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [race, setRace] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRaceAndDrivers = async () => {
            try {
                const raceData = {
                    location: 'Spa-Francorchamps',
                    country_key: 16,
                    country_code: 'BEL',
                    country_name: 'Belgium',
                    circuit_key: 7,
                    circuit_short_name: 'Spa-Francorchamps',
                    session_type: 'Race',
                    session_name: 'Race',
                    date_start: '2023-07-30T13:00:00+00:00',
                    date_end: '2023-07-30T15:00:00+00:00',
                    gmt_offset: '02:00:00',
                    session_key: 9141,
                    meeting_key: 1216,
                    year: 2023,
                };

                const driverData = [
                    {
                        broadcast_name: 'M VERSTAPPEN',
                        country_code: 'NED',
                        driver_number: 1,
                        first_name: 'Max',
                        full_name: 'Max VERSTAPPEN',
                        headshot_url:
                            'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png',
                        last_name: 'Verstappen',
                        meeting_key: 1219,
                        name_acronym: 'VER',
                        session_key: 9158,
                        team_colour: '3671C6',
                        team_name: 'Red Bull Racing',
                    },
                    {
                        broadcast_name: 'L HAMILTON',
                        country_code: 'GBR',
                        driver_number: 44,
                        first_name: 'Lewis',
                        full_name: 'Lewis HAMILTON',
                        headshot_url:
                            'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/1col/image.png',
                        last_name: 'Hamilton',
                        meeting_key: 1219,
                        name_acronym: 'HAM',
                        session_key: 9158,
                        team_colour: '00D2BE',
                        team_name: 'Mercedes',
                    },
                ];

                const enhancedDrivers = driverData.map((driver) => ({
                    ...driver,
                    headshot_url: driver.headshot_url.replace(
                        '.transform/1col/image.png',
                        ''
                    ),
                }));

                setRace(raceData);
                setDrivers(enhancedDrivers);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRaceAndDrivers();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="drivers-page">
            {race && (
                <div className="race-details">
                    <h1>Current Race</h1>
                    <p><strong>Location:</strong> {race.location}</p>
                    <p><strong>Country:</strong> {race.country_name} ({race.country_code})</p>
                    <p><strong>Date:</strong> {new Date(race.date_start).toLocaleString()} - {new Date(race.date_end).toLocaleString()}</p>
                    <p><strong>Session:</strong> {race.session_name}</p>
                </div>
            )}

            <DriversList drivers={drivers} />
        </div>
    );
};

export default Drivers;

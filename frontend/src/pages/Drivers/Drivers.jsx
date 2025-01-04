import React, { useState, useEffect } from 'react';
import DriversList from '../../components/DriversList/DriversList';
import './Drivers.css';
import DataProvider from "../../dataProvider/DataProvider.jsx";
import {Dropdown, DropdownButton} from "react-bootstrap";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [race, setRace] = useState(null);
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDrivers, setLoadingDrivers] = useState(true);

    useEffect(() => {
      const currentYear = localStorage.getItem('selectedYear')
                        || (new Date().getFullYear() - 1);

      const fetchRaces = async () => {
        const response = await DataProvider.dataFetcher.getSessions({
          year: currentYear,
          session_type: 'Race',
          session_name: 'Race'
        });

        const races = response.data;
        setRaces(races);
        if (races.length > 0) {
          setRace(races[0]);
        }
      };

      fetchRaces();
    }, []);

    useEffect(() => {
      if (!race) return;
      setLoadingDrivers(true);

      const fetchDrivers = async () => {
        const response = await DataProvider.dataFetcher.getDrivers({
          session_key: race.session_key,
        });
        const drivers = response.data;

        const enhancedDrivers = drivers.map((driver) => {
          if (!driver.headshot_url) return driver;
          return {
            ...driver,
            headshot_url: driver.headshot_url.replace(
              '.transform/1col/image.png',
              ''
            ),
          };
        });

        setDrivers(enhancedDrivers);
        setLoadingDrivers(false);
      };

      fetchDrivers();
    }, [race]);

    useEffect(() => {
      if (races.length && drivers.length) {
        setLoading(false);
      }
    }, [races, drivers]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="drivers-page">
            <DropdownButton id="dropdown-basic-button" title="Select Race" variant={'secondary'}>
              {races.map((r) => (
                <Dropdown.Item
                  key={r.session_key}
                  onClick={() => setRace(r)}  // <-- Trigger setRace on click
                >
                  {`${r.circuit_short_name} - (${r.country_code})`}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {race && (
                <div className="race-details">
                    <h1>Current Race</h1>
                    <p><strong>Location:</strong> {race.location}</p>
                    <p><strong>Country:</strong> {race.country_name} ({race.country_code})</p>
                    <p><strong>Date:</strong> {new Date(race.date_start).toLocaleString()} - {new Date(race.date_end).toLocaleString()}</p>
                    <p><strong>Session:</strong> {race.session_name}</p>
                </div>
            )}

            {loadingDrivers && <div className="loading">Loading...</div>}
            {!loadingDrivers && <DriversList drivers={drivers} />}

        </div>
    );
};

export default Drivers;

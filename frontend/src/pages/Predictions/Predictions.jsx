import React, { useState, useEffect } from 'react';
import './Predictions.css';
import DataProvider from "../../dataProvider/DataProvider.jsx";
import {Button} from "react-bootstrap";

const Predictions = () => {
    const [drivers, setDrivers] = useState([]);
    const [race, setRace] = useState(null);
    const [races, setRaces] = useState([]);
    const [racesLoading, setRacesLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(true);

    const [predictions, setPredictions] = useState({
        firstPlace: '',
        secondPlace: '',
        thirdPlace: '',
    });

    const [suggestions, setSuggestions] = useState({
        firstPlace: [],
        secondPlace: [],
        thirdPlace: [],
    });

    useEffect(() => {
      const currentYear = localStorage.getItem('selectedYear')
                        || (new Date().getFullYear() - 1);

      const fetchRaces = async () => {
        const response = await DataProvider.dataFetcher.getSessions({
          year: currentYear,
          session_type: 'Race',
          session_name: 'Race'
        });

        let races = response.data;

        const session_keys = races.reduce((result, current) => {
            if (result === '') {
                return current.session_key;
            }
            result = `${result},${current.session_key}`;
            return result;
        }, '');

        const ended_races = await DataProvider.raceSimulator.getSimulationsResults({session_keys: session_keys});

        races = races.filter((race) => ended_races.data[race.session_key] === undefined);

        setRaces(races);
        if (races.length > 0) {
          setRace(races[0]);
        }
      };

      fetchRaces();
    }, []);

    useEffect(() => {
      if (!race) return;
      const fetchDrivers = async () => {
        const response = await DataProvider.dataFetcher.getDrivers({
          session_key: race.session_key,
        });
        const drivers = response.data;

        const enhancedDrivers = drivers.map((driver) => {
          return {
            name_acronym: driver.name_acronym,
            full_name: driver.full_name,
          };
        });

        setDrivers(enhancedDrivers);
      };

      fetchDrivers();
    }, [race]);

    useEffect(() => {
        if (races.length) {
            setRacesLoading(false);
        }
        if (drivers.length) {
            setFormLoading(false);
        }
    }, [races, drivers]);

  const handleRaceChange = (e) => {
    const selectedSessionKey = e.target.value;
    const selectedRace = races.find(
      (r) => r.session_key === Number.parseInt(selectedSessionKey)
    );
    setRace(selectedRace);
    setPredictions({
      firstPlace: '',
      secondPlace: '',
      thirdPlace: '',
    });
    setSuggestions({
      firstPlace: [],
      secondPlace: [],
      thirdPlace: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPredictions({ ...predictions, [name]: value });

    if (value.length >= 3) {
      const filteredSuggestions = drivers
        .map((driver) => driver.full_name)
        .filter((driverName) =>
          driverName.toLowerCase().includes(value.toLowerCase())
        );

      setSuggestions({ ...suggestions, [name]: filteredSuggestions });
    } else {
      setSuggestions({ ...suggestions, [name]: [] });
    }
  };

  const handleSuggestionClick = (fieldName, driverName) => {
    setPredictions({ ...predictions, [fieldName]: driverName });
    setSuggestions({ ...suggestions, [fieldName]: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Predictions Submitted:', predictions);
    const dataForSubmit = {
        session_key: Number.parseInt(race.session_key),
        first_place: drivers.find(driver => driver.full_name === predictions.firstPlace).name_acronym,
        second_place: drivers.find(driver => driver.full_name === predictions.secondPlace).name_acronym,
        third_place: drivers.find(driver => driver.full_name === predictions.thirdPlace).name_acronym,
    };
    await DataProvider.predictionsService.postPredictions(dataForSubmit);
    window.location.reload();
  };

    const submitNotActive = () => {
        return !predictions.firstPlace || !predictions.secondPlace || !predictions.thirdPlace ||
            predictions.firstPlace === predictions.secondPlace ||
            predictions.firstPlace === predictions.thirdPlace ||
            predictions.secondPlace === predictions.thirdPlace ||
            drivers.filter(driver => [predictions.firstPlace, predictions.secondPlace, predictions.thirdPlace].includes(driver.full_name)).length !== 3;
    }

  return (
    <div className="predictions-container">
      <div className="prediction-panel">
        <h1>Prediction Panel</h1>
        {racesLoading ? (
          <p>Loading races...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* RACE DROPDOWN */}
            <div className="form-group">
              <label htmlFor="raceSelect">Current Race</label>
              <select
                id="raceSelect"
                name="raceSelect"
                value={race?.session_key || ''}
                onChange={handleRaceChange}
              >
                {races.map((r) => (
                  <option key={r.session_key} value={r.session_key}>
                    {r.circuit_short_name}
                  </option>
                ))}
              </select>
            </div>

            {/* 1ST PLACE */}
            <div className="form-group">
              <label htmlFor="firstPlace">1st Place</label>
              <input
                type="text"
                id="firstPlace"
                name="firstPlace"
                value={predictions.firstPlace}
                onChange={handleInputChange}
                placeholder="Type to search..."
                autoComplete="off"
                disabled={formLoading}
              />
              {suggestions.firstPlace.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.firstPlace.map((driverName) => (
                    <li
                      key={driverName}
                      onClick={() => handleSuggestionClick('firstPlace', driverName)}
                    >
                      {driverName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 2ND PLACE */}
            <div className="form-group">
              <label htmlFor="secondPlace">2nd Place</label>
              <input
                type="text"
                id="secondPlace"
                name="secondPlace"
                value={predictions.secondPlace}
                onChange={handleInputChange}
                placeholder="Type to search..."
                autoComplete="off"
                disabled={formLoading}
              />
              {suggestions.secondPlace.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.secondPlace.map((driverName) => (
                    <li
                      key={driverName}
                      onClick={() => handleSuggestionClick('secondPlace', driverName)}
                    >
                      {driverName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 3RD PLACE */}
            <div className="form-group">
              <label htmlFor="thirdPlace">3rd Place</label>
              <input
                type="text"
                id="thirdPlace"
                name="thirdPlace"
                value={predictions.thirdPlace}
                onChange={handleInputChange}
                placeholder="Type to search..."
                autoComplete="off"
                disabled={formLoading}
              />
              {suggestions.thirdPlace.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.thirdPlace.map((driverName) => (
                    <li
                      key={driverName}
                      onClick={() => handleSuggestionClick('thirdPlace', driverName)}
                    >
                      {driverName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button type="submit" className="submit-button" disabled={formLoading || submitNotActive()}>
              Submit Predictions
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Predictions;

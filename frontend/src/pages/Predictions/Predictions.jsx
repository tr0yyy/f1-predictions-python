import React, { useState, useEffect } from 'react';
import './Predictions.css';

const Predictions = () => {
    // Mocked backend data (to be replaced with actual API call)
    const [drivers, setDrivers] = useState([]);
    const [currentRace, setCurrentRace] = useState('Monaco Grand Prix'); // Example race

    // Form state
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

    // Load driver data into memory
    useEffect(() => {
        // Replace with API call to fetch driver data
        const fetchDrivers = async () => {
            const driverList = [
                'Lewis Hamilton',
                'Max Verstappen',
                'Charles Leclerc',
                'Fernando Alonso',
                'Sergio Perez',
                'Lando Norris',
                'Carlos Sainz',
            ];
            setDrivers(driverList);
        };
        fetchDrivers();
    }, []);

    // Handle input changes and filter suggestions
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPredictions({ ...predictions, [name]: value });

        if (value.length >= 3) {
            const filteredSuggestions = drivers.filter((driver) =>
                driver.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions({ ...suggestions, [name]: filteredSuggestions });
        } else {
            setSuggestions({ ...suggestions, [name]: [] });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Predictions Submitted:', predictions);
        alert(`Predictions submitted:\n1st: ${predictions.firstPlace}\n2nd: ${predictions.secondPlace}\n3rd: ${predictions.thirdPlace}`);
    };

    return (
        <div className="predictions-container">
            <div className="prediction-panel">
                <h1>Prediction Panel</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentRace">Current Race</label>
                        <input
                            type="text"
                            id="currentRace"
                            name="currentRace"
                            value={currentRace}
                            readOnly
                            className="readonly-field"
                        />
                    </div>

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
                        />
                        {suggestions.firstPlace.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.firstPlace.map((driver) => (
                                    <li
                                        key={driver}
                                        onClick={() =>
                                            setPredictions({ ...predictions, firstPlace: driver })
                                        }
                                    >
                                        {driver}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

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
                        />
                        {suggestions.secondPlace.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.secondPlace.map((driver) => (
                                    <li
                                        key={driver}
                                        onClick={() =>
                                            setPredictions({ ...predictions, secondPlace: driver })
                                        }
                                    >
                                        {driver}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

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
                        />
                        {suggestions.thirdPlace.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.thirdPlace.map((driver) => (
                                    <li
                                        key={driver}
                                        onClick={() =>
                                            setPredictions({ ...predictions, thirdPlace: driver })
                                        }
                                    >
                                        {driver}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button type="submit" className="submit-button">
                        Submit Predictions
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Predictions;

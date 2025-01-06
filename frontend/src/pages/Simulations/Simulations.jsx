import React, {useEffect, useState} from "react";
import DataProvider from "../../dataProvider/DataProvider.jsx";
import './Simulations.css';
import {Button, Container, Dropdown, DropdownButton, Row} from "react-bootstrap";

const Simulations = () => {
    const [race, setRace] = useState(null);
    const [races, setRaces] = useState([]);
    const [simulated, setSimulated] = useState(null);
    const [loading, setLoading] = useState(true);
    const [simulationStatus, setSimulationStatus] = useState('');

    const handleSimulateRace = async (event) => {
        event.preventDefault();
        try {
            const status = await DataProvider.raceSimulator.simulate({
                'session_key': race.session_key
            });
            setSimulationStatus(status.data.message);
        } catch (e) {
            setSimulationStatus(e);
        } finally {
            setSimulated(true);
        }
    }


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
        if (!race) {
            return;
        }
        const fetchSimulation = async () => {
            const response = await DataProvider.raceSimulator.getSimulationResults({
                session_key: race.session_key
            });
            console.log(response.data);
            if (response.data) {
                setSimulated(true);
            } else {
                setSimulated(false);
            }
        }
        fetchSimulation();
    }, [race]);

    useEffect(() => {
      if (races.length && simulated !== null) {
        setLoading(false);
      }
    }, [races, simulated]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
    <Container className='simulations-page mt-4'>
        <h1>Simulations</h1>

        <Row className="mb-5">
            <DropdownButton id="dropdown-basic-button" title="Select Race" variant={'secondary'}>
                  {races.map((r) => (
                    <Dropdown.Item
                      key={r.session_key}
                      onClick={() => setRace(r)}
                    >
                      {`${r.circuit_short_name} - (${r.country_code})`}
                    </Dropdown.Item>
                  ))}
            </DropdownButton>
        </Row>
        <Row className="mb-3">
        <h3>{`${race.circuit_short_name} - (${race.country_code})`}</h3>
        </Row>
        <Row className="mb-3" xs="auto">
        {
            simulated === false && (
                <Button variant="primary" onClick={handleSimulateRace}>
                  Simulate race
                </Button>
            )
        }
        {
            simulated === true && (
                <Button variant="success" disabled>
                    Race already simulated. Go to results
                </Button>
            )
        }
        </Row>
    </Container>
    );
}

export default Simulations;

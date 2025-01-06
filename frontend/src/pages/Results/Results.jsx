import './Results.css';
import React, {useEffect, useState} from "react";
import DataProvider from "../../dataProvider/DataProvider.jsx";
import {Button, Container, Dropdown, DropdownButton, Row, Table} from "react-bootstrap";

const Results = () => {
    const [race, setRace] = useState(null);
    const [result, setResult] = useState(null);
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);


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

        const ended_races = (await DataProvider.raceSimulator.getSimulationsResults({session_keys: session_keys})).data;

        races = races.reduce((result, current) => {
            result[current.session_key] = current;
            return result;
        }, {});
        console.log(races);

        console.log(ended_races);
        const results = [];
        for (const key in ended_races) {
            results.push({
                ...ended_races[key],
                ...races[key]
            });

        }
        setRaces(results);
        if (results.length > 0) {
          setRace(results[0]);
        }
      };

      fetchRaces();
    }, []);

    useEffect(() => {
        console.log(races, race);
        if (races.length && race) {
            setLoading(false);
        }
    }, [races, race]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className='results-page'>
            <h1>Results</h1>
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
            <Container style={{ maxWidth: '600px', marginLeft: 0, marginRight: 'auto' }} >
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Position</th>
                    <th>Driver</th>
                </tr>
                </thead>
                <tbody>
                {
                    race.results.map((result, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{result}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
                </Container>
        </Row>
        </div>
    );
}

export default Results;
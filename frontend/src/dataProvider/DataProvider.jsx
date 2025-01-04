import DataFetcher from "./endpoints/DataFetcher.jsx";
import RaceSimulator from "./endpoints/RaceSimulator.jsx";

class DataProvider {
    static dataFetcher = new DataFetcher('http://localhost:8080/data-fetcher');
    static raceSimulator = new RaceSimulator('http://localhost:8080/race-simulator');
}

export default DataProvider
import DataFetcher from "./endpoints/DataFetcher.jsx";
import RaceSimulator from "./endpoints/RaceSimulator.jsx";
import User from "./endpoints/User.jsx";

class DataProvider {
    static dataFetcher = new DataFetcher('http://localhost:8000');
    static raceSimulator = new RaceSimulator('http://localhost:8002');
    static userService = new User('http://localhost:8001')
}

export default DataProvider
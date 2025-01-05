import DataFetcher from "./endpoints/DataFetcher.jsx";
import RaceSimulator from "./endpoints/RaceSimulator.jsx";
import User from "./endpoints/User.jsx";
import Prediction from "./endpoints/Prediction.jsx";

class DataProvider {
    static dataFetcher = new DataFetcher('http://localhost:8080/data-fetcher');
    static raceSimulator = new RaceSimulator('http://localhost:8080/race-simulator');
    static userService = new User('http://localhost:8080/user-service');
    static predictionsService = new Prediction('http://localhost:8080/predictions-service');
}

export default DataProvider
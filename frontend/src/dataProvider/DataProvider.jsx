import DataFetcher from "./endpoints/DataFetcher.jsx";
import RaceSimulator from "./endpoints/RaceSimulator.jsx";
import User from "./endpoints/User.jsx";
import Prediction from "./endpoints/Prediction.jsx";

class DataProvider {
    static BACKEND_PROXY = `${import.meta.env.VITE_BACKEND_PROXY ?? 'http://localhost:8080'}`;

    static dataFetcher = new DataFetcher(`${DataProvider.BACKEND_PROXY}/data-fetcher`);
    static raceSimulator = new RaceSimulator(`${DataProvider.BACKEND_PROXY}/race-simulator`);
    static userService = new User(`${DataProvider.BACKEND_PROXY}/user-service`);
    static predictionsService = new Prediction(`${DataProvider.BACKEND_PROXY}/predictions-service`);
}

export default DataProvider;
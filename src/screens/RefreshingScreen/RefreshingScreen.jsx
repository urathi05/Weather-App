import { useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";
import "./RefreshingScreen.css";

export default function RefreshingScreen({ coords, setAppState, setWeatherData }) {
    return (
        <div className="refreshing">
            <HashLoader color="#014D4E" speedMultiplier={1.5} />
            <p>Refreshing weather facts...</p>
        </div>
    );
}

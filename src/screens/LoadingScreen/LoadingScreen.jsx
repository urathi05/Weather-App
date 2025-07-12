import { useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";
import "./LoadingScreen.css";

export default function LoadingScreen({ onLocationSuccess, onLocationFail }) {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                await onLocationSuccess({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });
            },
            (err) => {
                onLocationFail();
            }
        );
    }, []);

    return (
        <div className="loading">
            <HashLoader color="#014D4E" speedMultiplier={1.5} />
            <p>Loading location...</p>
        </div>
    );
}

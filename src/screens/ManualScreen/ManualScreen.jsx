import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import "./ManualScreen.css";

export default function ManualScreen({ searchApi, onCitySelect, setAppState, setWeatherData }) {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 300);
    const [suggestions, setSuggestions] = useState([]);

    console.log("SOMEHOW ON MANUAL")

    useEffect(() => {
        if (debouncedQuery) {
            (async () => {
                const results = await searchApi(debouncedQuery);
                setSuggestions(results);
            })();       
        }
    }, [debouncedQuery])

    return (
        <div className="manual-input-screen">
            <h2>Enter Your City</h2>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a city..."
                    className="city-input"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                {suggestions.length > 0 && (    
                    <ul className="suggestions">
                        {suggestions.map(s => (
                            <li key={s.id} onClick={async () => await onCitySelect(s, setAppState, setWeatherData)}>
                                {`${s.name}${s.admin1 ? `, ${s.admin1}` : ''}, ${s.country}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
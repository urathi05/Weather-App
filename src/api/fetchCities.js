export default async function fetchCities(query) {
    const baseUrl = "https://geocoding-api.open-meteo.com/v1/search";
    const params = {
        name: query,
        count: 10,
        format: "json",
        language: "en",
    }

    const paramQuery = Object.entries(params)
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');    
    const endpoint = `${baseUrl}?${paramQuery}`;

    console.log(`Fetching city list from: ${endpoint}`);

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(`API result: ${json}`);

        return json["results"] || [];
    }
    catch (error) {
        console.log(error.message);
        return [];
    }
}
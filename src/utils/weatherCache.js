export function saveWeatherCache(key, data) {
    const now = Date.now();
    const expiry = now + 900000
    const dataToStore = {
        createdAt: now,
        expiresAt: expiry,
        data
    }

    localStorage.setItem(key, JSON.stringify(dataToStore));
    console.log("CACHED DATA WITH KEY: ", key);
}

export function loadWeatherCache(key){
    const now = Date.now();

    const dataToLoad = JSON.parse(localStorage.getItem(key));

    if (!dataToLoad) {
        console.log("CACHE MISS!");
        return null
    };

    if (dataToLoad.expiresAt < now) {
        localStorage.removeItem(key);
        console.log("CLEANING UP EXPIRED DATA AT KEY: ", key);
        return null;
    }

    console.log("LOADED DATA FROM CACHE, KEY: ", key);
    return dataToLoad.data;
}
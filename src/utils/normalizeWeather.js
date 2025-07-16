export default function normalizeWeatherData(data) {
  if (!data || !data.hourly || !data.hourly.time) return data;

  const normalizedTime = data.hourly.time.map(t => new Date(t));

  return {
    ...data,
    hourly: {
      ...data.hourly,
      time: normalizedTime
    }
  };
}

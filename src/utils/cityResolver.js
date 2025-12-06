let CITY_CACHE = null;

export async function loadCities() {
  if (CITY_CACHE) return CITY_CACHE;

  try {
    const res = await fetch("/cities.json");
    if (!res.ok) throw new Error("cities.json not found");
    const data = await res.json();

    CITY_CACHE = data.map((c) => ({
      id: c.id,
      name: c.name,
      country: c.country,
      admin: c.admin1,
      lat: Number(c.lat),
      lng: Number(c.lon),
      population: Number(c.pop || 0),
    }));

    return CITY_CACHE;
  } catch (err) {
    console.error("CITY LOAD FAILURE:", err);
    CITY_CACHE = [];
    return [];
  }
}

export async function resolveCity(query) {
  if (!query) return null;
  const cities = await loadCities();
  const q = query.toLowerCase();

  return cities.find(
    (c) => c.name.toLowerCase() === q || c.name.toLowerCase().includes(q)
  );
}

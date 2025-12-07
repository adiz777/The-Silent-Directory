let CACHE = null;

export async function resolveCity(query) {
  if (!query) return null;

  if (!CACHE) {
    const res = await fetch("/cities.json");
    CACHE = await res.json();
  }

  const q = query.trim().toLowerCase();

  return (
    CACHE.find(
      c =>
        c.name.toLowerCase() === q ||
        `${c.name}, ${c.country}`.toLowerCase() === q
    ) || null
  );
}

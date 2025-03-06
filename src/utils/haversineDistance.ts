// Recurso: https://es.wikipedia.org/wiki/F%C3%B3rmula_del_semiverseno

function haversineDistance(lat1: any, lon1: any, lat2: any, lon2: any): number {
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    throw new Error("Parámetros inválidos: las coordenadas deben ser números");
  }

  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en kilómetros
}

export default haversineDistance;

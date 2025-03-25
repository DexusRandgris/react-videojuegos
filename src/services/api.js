import axios from "axios";

const API_KEY = "2510cbf1ba354a6c8d1bc523df0676ea"; 
const BASE_URL = "https://api.rawg.io/api/games";

/* Función fetchGames:
   - Realiza una petición GET a la API de RAWG.
   - Aplica los filtros recibidos, enviando únicamente aquellos con valores no vacíos.
   - Mapea los campos de los filtros a los parámetros que la API espera:
       • year         → dates: "year-01-01,year-12-31"
       • genre        → genres
       • platform     → platforms
       • tag          → tags
       • developer    → developers
   - Además, si se pasa el parámetro `search` (por el SearchBar), se incluye.
   - Ordena los resultados por la puntuación Metacritic de mayor a menor y devuelve la lista de juegos.
*/
export const fetchGames = async (filters = {}) => {
  try {
    // Filtramos los parámetros que tengan valores no vacíos
    const filteredParams = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value && value.toString().trim() !== "")
    );

    // Mapeamos los filtros a los nombres que espera la API
    const mappedParams = {};

    if (filteredParams.year) {
      mappedParams.dates = `${filteredParams.year}-01-01,${filteredParams.year}-12-31`;
    }
    if (filteredParams.genre) {
      mappedParams.genres = filteredParams.genre;
    }
    if (filteredParams.platform) {
      mappedParams.platforms = filteredParams.platform;
    }
    if (filteredParams.tag) {
      mappedParams.tags = filteredParams.tag;
    }
    if (filteredParams.developer) {
      mappedParams.developers = filteredParams.developer;
    }
    // Puedes decidir si usas "name" en los filtros o dejarlo al SearchBar.
    // En este ejemplo, si se ingresa "name" en FilterBar, lo incluimos:
    if (filteredParams.name) {
      mappedParams.search = filteredParams.name;
    }

    // También, si se envía "search" desde SearchBar, estará en filters.search.
    // Si existe, se sobrescribe o se combina.
    if (filteredParams.search) {
      mappedParams.search = filteredParams.search;
    }

    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        ordering: "-metacritic",
        page_size: 20,
        ...mappedParams,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error al obtener los videojuegos:", error);
    return [];
  }
};

/* Función fetchGameDetails:
   - Realiza una petición GET a la API para obtener los detalles de un videojuego específico usando su ID.
*/
export const fetchGameDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      params: {
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del videojuego:", error);
    return null;
  }
};
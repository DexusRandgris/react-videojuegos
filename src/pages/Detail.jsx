import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Agregar useNavigate
import { fetchGameDetails } from '../services/api';
import '../styles/Detail.css';

const Detail = () => {
  const { id } = useParams();  // Obtener el parámetro `id` de la URL
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Para manejar errores
  const navigate = useNavigate();  // Usar useNavigate para redirigir

  useEffect(() => {
    const getGameDetails = async () => {
      try {
        const details = await fetchGameDetails(id);  // Llamar a la función de la API
        if (details) {
          setGameDetails(details);
        } else {
          setError('No se pudieron obtener los detalles del juego');
        }
      } catch (err) {
        setError('Error al obtener los detalles del juego');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getGameDetails();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del juego...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!gameDetails) {
    return <p>No se encontraron detalles para este juego.</p>;
  }

  return (
    <div className="game-detail">
      <h2>{gameDetails.name}</h2>
      <img src={gameDetails.background_image} alt={gameDetails.name} />
      <p><strong>Género:</strong> {gameDetails.genres ? gameDetails.genres.map(genre => genre.name).join(', ') : 'No disponible'}</p>
      <p><strong>Puntuación:</strong> {gameDetails.metacritic}</p>
      <p><strong>Año de lanzamiento:</strong> {gameDetails.released}</p>
      <p><strong>Plataformas:</strong> {gameDetails.platforms ? gameDetails.platforms.map(platform => platform.platform.name).join(', ') : 'No disponible'}</p>

      {/* Verificar si trailers existe antes de acceder a él */}
      {gameDetails.trailers && gameDetails.trailers.length > 0 && (
        <iframe
          src={`https://www.youtube.com/embed/${gameDetails.trailers[0].data[0].slug}`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {/* Botón de retroceso */}
      <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>
        Regresar
      </button>
    </div>
  );
};

export default Detail;
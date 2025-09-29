import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../logo.svg'; // Using the existing logo for now
import yapeImage from '../yape.jpeg';
import { FaCalculator, FaChartBar, FaShareAlt } from 'react-icons/fa';

function Inicio() {

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Calculadora de Puntaje de Permanencia',
        text: 'Calcula tu puntaje para la Beca de Permanencia.',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <>
      <div className="App inicio-page">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Bienvenido a la Calculadora de Puntaje</h1>
          <p className="subtitle">Prepara tu postulación para la Beca de Permanencia</p>
        </header>

        <div className="inicio-actions">
          <Link to="/formulario" className="btn btn-primary">
            <FaCalculator className="btn-icon" />
            Consulta tu Puntaje
          </Link>
          <a href="https://docs.google.com/spreadsheets/d/1XiYRQPXvstrfugqcWS5qJADG659ViIxq0aAzpKOiRTo/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <FaChartBar className="btn-icon" />
            Estadísticas Beca 2024
          </a>
          <button onClick={shareLink} className="btn btn-tertiary">
            <FaShareAlt className="btn-icon" />
            Compartir
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
        <img src={yapeImage} alt="Donación Yape" style={{ width: '200px' }} />
        <p>Donación no obligatoria</p>
      </div>
    </>
  );
}

export default Inicio;

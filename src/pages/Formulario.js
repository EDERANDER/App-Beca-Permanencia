import React, { useState, useEffect } from 'react';
import '../App.css';
import universidadesPriorizacion from '../data/universidades-priorizacion.json';
import universidadesSelectividad from '../data/universidades-selectividad.json';
import { FaGraduationCap, FaUniversity, FaChartBar, FaUsers, FaStar, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Formulario() {
  // State for each form input
  const [rendimientoAcademico, setRendimientoAcademico] = useState(0);
  const [universidadPriorizacion, setUniversidadPriorizacion] = useState('');
  const [universidadSelectividad, setUniversidadSelectividad] = useState('');
  const [pobreza, setPobreza] = useState('no');
  const [otraCondicion, setOtraCondicion] = useState('Ninguna');

  // State for scores
  const [scoreRA, setScoreRA] = useState(0);
  const [scoreP, setScoreP] = useState(0);
  const [scoreS, setScoreS] = useState(0);
  const [scorePE, setScorePE] = useState(0);
  const [scoreOC, setScoreOC] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // A. Perfil Académico - Rendimiento Académico (RA)
  const raOptions = [
    { label: 'Seleccione una opción', value: 0 },
    { label: '1er y 2do puesto', value: 50 },
    { label: 'Décimo superior', value: 45 },
    { label: 'Quinto superior', value: 40 },
    { label: 'Tercio superior', value: 35 },
    { label: 'Medio superior', value: 30 },
  ];

  // C. Condiciones Priorizables - Otras condiciones
  const otrasCondicionesOptions = [
    { label: 'Ninguna' },
    { label: 'Discapacidad (D)' },
    { label: 'Bomberos activos e hijos de bomberos (B)' },
    { label: 'Voluntarios reconocidos por el Ministerio de la Mujer y Poblaciones Vulnerables (V)' },
    { label: 'Pertenencia a comunidades nativas amazónicas, campesinas o pueblo afroperuano (IA)' },
    { label: 'Licenciados del Servicio Militar Voluntario (L)' },
    { label: 'Población expuesta a metales pesados y otras sustancias químicas (PEM)' },
    { label: 'Víctima de la violencia habida en el país durante los años 1980-200 (RE)' },
    { label: 'Pertenecer al ámbito de intervención directa y de influencia del VRAEM (VR)' },
    { label: 'Pertenecer al ámbito geográfico de la zona del Huallaga (H)' },
    { label: 'Población beneficiaria de la Ley N° 31405 (orfandad)' },
    { label: 'Desprotección familiar (DF)' },
    { label: 'Agente Comunitario de Salud (ACS)' },
  ];

  // --- Effects to calculate scores when inputs change ---

  // A. Rendimiento Académico
  useEffect(() => {
    setScoreRA(parseInt(rendimientoAcademico));
  }, [rendimientoAcademico]);

  // B1. Clasificación de Universidades (Priorización)
  useEffect(() => {
    const uni = universidadesPriorizacion.find(u => u.nombre.toUpperCase() === universidadPriorizacion.toUpperCase());
    if (uni) {
      if (uni.grupo === 1) setScoreP(15);
      else if (uni.grupo === 2) setScoreP(10);
      else if (uni.grupo === 3) setScoreP(5);
      else setScoreP(0);
    } else {
      setScoreP(0);
    }
  }, [universidadPriorizacion]);

  // B2. Ratio de Selectividad
  useEffect(() => {
    const uni = universidadesSelectividad.find(u => u.nombre.toUpperCase() === universidadSelectividad.toUpperCase());
    if (uni) {
      switch (uni.quintil_pdf) {
        case 5: setScoreS(10); break; // Quintil 1 en App
        case 4: setScoreS(9); break;  // Quintil 2 en App
        case 3: setScoreS(8); break;  // Quintil 3 en App
        case 2: setScoreS(7); break;  // Quintil 4 en App
        case 1: setScoreS(0); break;  // Quintil 5 en App (sin puntaje)
        default: setScoreS(0);
      }
    } else {
      setScoreS(0);
    }
  }, [universidadSelectividad]);

  // C1. Pobreza Extrema
  useEffect(() => {
    setScorePE(pobreza === 'extrema' ? 10 : 0);
  }, [pobreza]);

  // C2. Otras Condiciones
  useEffect(() => {
    setScoreOC(otraCondicion !== 'Ninguna' ? 5 : 0);
  }, [otraCondicion]);

  // Total Score Calculation
  useEffect(() => {
    const totalB = Math.min(scoreP + scoreS, 25);
    const totalC = Math.min(scorePE + scoreOC, 25);
    setTotalScore(scoreRA + totalB + totalC);
  }, [scoreRA, scoreP, scoreS, scorePE, scoreOC]);


  return (
    <div className="App">
      <Link to="/" className="back-button" title="Volver al inicio">
        <FaArrowLeft />
      </Link>
      <header className="App-header">
        <h1>Calculadora de Puntaje de Permanencia</h1>
      </header>

      <form>
        {/* SECCIÓN A */}
        <div className="form-section">
          <h2>A: Perfil Académico del Postulante (Máx: 50)</h2>
          <div className="form-group">
            <label htmlFor="rendimientoAcademico">
              <FaGraduationCap className="icon" />
              Rendimiento Académico (RA)
            </label>
            <select id="rendimientoAcademico" value={rendimientoAcademico} onChange={e => setRendimientoAcademico(e.target.value)}>
              {raOptions.map(opt => <option key={opt.label} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        {/* SECCIÓN B */}
        <div className="form-section">
          <h2>B: Características de IES de Estudio (Máx: 25)</h2>
          <div className="form-group">
            <label htmlFor="universidadPriorizacion">
              <FaUniversity className="icon" />
              Clasificación de Universidades (P)
            </label>
            <input 
              type="text" 
              id="universidadPriorizacion" 
              value={universidadPriorizacion}
              onChange={e => setUniversidadPriorizacion(e.target.value)}
              list="universidadesP-list"
              placeholder="Escriba para buscar..."
            />
            <datalist id="universidadesP-list">
              {universidadesPriorizacion.map(uni => <option key={uni.nombre} value={uni.nombre} />)}
            </datalist>
          </div>
          <div className="form-group">
            <label htmlFor="universidadSelectividad">
              <FaChartBar className="icon" />
              Ratio de Selectividad de Universidades Públicas (S)
            </label>
            <input 
              type="text" 
              id="universidadSelectividad" 
              value={universidadSelectividad}
              onChange={e => setUniversidadSelectividad(e.target.value)}
              list="universidadesS-list"
              placeholder="Escriba para buscar..."
            />
            <datalist id="universidadesS-list">
              {universidadesSelectividad.map(uni => <option key={uni.nombre} value={uni.nombre} />)}
            </datalist>
          </div>
        </div>

        {/* SECCIÓN C */}
        <div className="form-section">
          <h2>C: Condiciones Priorizables (Máx: 25)</h2>
          <div className="form-group">
            <label>
              <FaUsers className="icon" />
              Clasificación Socioeconómica (PE)
            </label>
            <div className="radio-group">
                <label><input type="radio" name="pobreza" value="no" checked={pobreza === 'no'} onChange={e => setPobreza(e.target.value)} /> No aplica</label>
                <label><input type="radio" name="pobreza" value="pobreza" checked={pobreza === 'pobreza'} onChange={e => setPobreza(e.target.value)} /> Pobreza</label>
                <label><input type="radio" name="pobreza" value="extrema" checked={pobreza === 'extrema'} onChange={e => setPobreza(e.target.value)} /> Pobreza Extrema (10 Puntos)</label>
            </div>
          </div>
           <div className="form-group">
            <label>
                <FaInfoCircle className="icon" />
                Tasa de Interrupción de Estudios Regional
            </label>
            <p>No se consideran datos para este puntaje.</p>
          </div>
          <div className="form-group">
            <label htmlFor="otraCondicion">
              <FaStar className="icon" />
              Otras Condiciones Priorizables (Máx: 5)
            </label>
            <select id="otraCondicion" value={otraCondicion} onChange={e => setOtraCondicion(e.target.value)}>
              {otrasCondicionesOptions.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
            </select>
            <p><small>Solo puede elegir una opción con un máximo de 5 puntos.</small></p>
          </div>
        </div>
      </form>

      <div className="total-score">
        <h2>Puntaje Total</h2>
        <span>{totalScore}</span>
      </div>

    </div>
  );
}

export default Formulario;

import { useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import fundoOnca from './assets/fundoOnca.png';
import minecraft from './assets/minecraft.png';
import elonmusk from './assets/elonmusk.png';
import jackspirro from './assets/jackspirro.png';
import ladygaga from './assets/ladygaga.png';
import zodiaco from './assets/zodiaco.png';
import southpark from './assets/southpark.png';
import vinaaltina from './assets/vinaaltina.png';
import brocolis from './assets/brocolis.png';
import bratz from './assets/bratz.png';
import baratz from './assets/baratz.png';
import Navbar from './components/Navbar';
import Sobre from './components/Sobre';
import Footer from './components/Footer';
import Quiz from './components/Quiz';

function HomePage() {
  const [abaAtiva, setAbaAtiva] = useState(null);
  const nomeImagens = [
    'minecraft',
    'elonmusk',
    'jackspirro',
    'ladygaga',
    'zodiaco',
    'southpark',
    'vinaaltina',
    'brocolis',
    'bratz',
    'baratz',
  ];

  const imagens = {
    minecraft,
    elonmusk,
    jackspirro,
    ladygaga,
    zodiaco,
    southpark,
    vinaaltina,
    brocolis,
    bratz,
    baratz,
  };

  const imagemAtual = abaAtiva ? imagens[abaAtiva] : null;

  return (
    <section id="center">
      <div className="a">
        <Navbar />
      </div>

      <div className="sobreLayout">
        <div className="sobreLeft">
          <Sobre />
        </div>

        <div className="sobreRight">
          <nav className="abas">
            {nomeImagens.map((value) => (
              <button key={value} onClick={() => setAbaAtiva(value)}>
                {value}
              </button>
            ))}
          </nav>

          <div className="textImg">
            {imagemAtual ? (
              <img className="styleImg" src={imagemAtual} alt={abaAtiva} />
            ) : (
              <div className="imagePlaceholder" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

function PlaceholderPage({ title }) {
  return (
    <section id="center">
      <div className="a">
        <Navbar />
      </div>

      <div className="pageContent">
        <h1>{title}</h1>
        <p>Esta página ainda está sendo preparada.</p>
        <Link to="/" className="backHomeLink">
          Voltar para a página inicial
        </Link>
      </div>

      <Footer />
    </section>
  );
}

function QuizPage() {
  return (
    <section id="center">
      <div className="a">
        <Navbar />
      </div>

      <div className="pageContent">
        <Quiz />
      </div>

      <Footer />
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<Navigate to="/" replace />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/roleta" element={<PlaceholderPage title="Roleta" />} />
      <Route path="/mensagem" element={<PlaceholderPage title="Mensagem" />} />
      <Route path="/sorteio" element={<PlaceholderPage title="Sorteio" />} />
      <Route path="/vini" element={<PlaceholderPage title="Vini" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

import { useMemo, useState } from 'react';
import { Wheel } from 'react-custom-roulette-r19';
import './Roleta.css';

const desafiosIniciais = [
  'Jackpot! Esolha o desafio',
  'Faça uma careta',
  'Imite uma galinha',
  'Dê uma volta na cadeira',
  'Dance por 10 segundos',
  'Faça um coração com a mão',
  'Faça um asmr',
  'Diga P.D.R. e G.N.R.',
];

const colors = [
  '#ff5b5b',
  '#ff8f4d',
  '#ffe066',
  '#7ce8a3',
  '#58d6ff',
  '#b388ff',
  '#ff7ac6',
  '#f5f5f5',
];

const MAX_ACTIVE_DESAFIOS = 4;

const selecionarQuatroDesafios = () => {
  const indices = Array.from(
    { length: desafiosIniciais.length },
    (_, index) => index
  );
  const selecionados = [];

  while (selecionados.length < MAX_ACTIVE_DESAFIOS) {
    const randomIndex = Math.floor(Math.random() * indices.length);
    selecionados.push(indices.splice(randomIndex, 1)[0]);
  }

  return selecionados;
};

function Roleta() {
  const [activeIndices, setActiveIndices] = useState(() =>
    selecionarQuatroDesafios()
  );
  const [usedIndices, setUsedIndices] = useState(() => new Set());
  const [desafioAtual, setDesafioAtual] = useState(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const availableIndices = useMemo(
    () => activeIndices.filter((index) => !usedIndices.has(index)),
    [activeIndices, usedIndices]
  );

  const desafiosRestantesCount = availableIndices.length;

  const data = useMemo(
    () =>
      desafiosIniciais.map((desafio, index) => {
        const isUsed = usedIndices.has(index);

        return {
          option: desafio,
          style: {
            backgroundColor: isUsed ? '#2c2c2c' : colors[index % colors.length],
            textColor: isUsed ? '#f3f4f6' : '#111111',
            fontFamily: 'Almendra Display, serif',
            fontSize: 14,
            fontWeight: '700',
          },
        };
      }),
    [activeIndices, usedIndices]
  );

  const sortearDesafio = () => {
    if (mustSpin || desafiosRestantesCount === 0) return;

    const randomIndex = Math.floor(Math.random() * desafiosRestantesCount);
    const selectedIndex = availableIndices[randomIndex];
    setPrizeNumber(selectedIndex);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setDesafioAtual(desafiosIniciais[prizeNumber]);
    setTimeout(() => {
      setUsedIndices((prev) => new Set(prev).add(prizeNumber));
      setMustSpin(false);
    }, 40);
  };

  const reiniciarRoleta = () => {
    setActiveIndices(selecionarQuatroDesafios());
    setUsedIndices(new Set());
    setDesafioAtual(null);
    setMustSpin(false);
    setPrizeNumber(0);
  };

  return (
    <section className="roletaPage">
      <div className="roletaLayout">
        <div className="roletaWheelOuter">
          <div className="roletaWheelWrapper">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={['#1f1f1f', '#111111']}
              textColors={['#111111']}
              outerBorderColor="#ff4d4d"
              outerBorderWidth={8}
              innerRadius={20}
              innerBorderColor="#ff4d4d"
              innerBorderWidth={6}
              radiusLineColor="#111"
              radiusLineWidth={0}
              fontFamily="Almendra Display, serif"
              fontSize={14}
              fontWeight="700"
              fontStyle="normal"
              perpendicularText={false}
              textDistance={60}
              spinDuration={0.3}
              onStopSpinning={handleStopSpinning}
              disableInitialAnimation={false}
              pointerProps={{
                style: {
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.35))',
                },
              }}
            />
          </div>
        </div>

        <div className="roletaCard">
          <div className="roletaHeader">
            <div>
              <p className="roletaLabel">Roleta de desafios</p>
              <h2 className="roletaTitle">Quem sabe o que vai cair?</h2>
            </div>
            <p className="roletaStatus">
              {desafiosRestantesCount > 0
                ? `${desafiosRestantesCount} desafios ainda`
                : 'Todos os desafios já foram usados'}
            </p>
          </div>

          <div className="roletaInfo">
            <div className="roletaChallengeBox">
              <p className="roletaChallengeLabel">Desafio sorteado</p>
              <p className="roletaChallengeText">
                {desafioAtual || 'Ainda não houve sorteio'}
              </p>
            </div>

            <div className="roletaButtons">
              <button
                className="roletaButton"
                onClick={sortearDesafio}
                disabled={mustSpin || desafiosRestantesCount === 0}
              >
                {mustSpin
                  ? 'Girando...'
                  : desafiosRestantesCount > 0
                    ? 'Sortear desafio'
                    : 'Roleta encerrada'}
              </button>
              <button
                className="roletaSecondaryButton"
                onClick={reiniciarRoleta}
              >
                Recomeçar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Roleta;

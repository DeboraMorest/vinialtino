import { useMemo, useState } from 'react';
import './Quiz.css';
import { perguntas } from './Perguntas';

function Quiz() {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState(false);

  const perguntaAtual = perguntas[indiceAtual];
  const totalPerguntas = perguntas.length;

  const larguraMaiorPergunta = useMemo(() => {
    const maiorPergunta = perguntas.reduce((maior, item) => {
      return item.pergunta.length > maior.length ? item.pergunta : maior;
    }, '');

    const larguraEstimativa = maiorPergunta.length * 18;
    return Math.min(960, Math.max(720, larguraEstimativa));
  }, []);

  const progresso = useMemo(() => {
    if (totalPerguntas === 0) return 0;
    return ((indiceAtual + 1) / totalPerguntas) * 100;
  }, [indiceAtual, totalPerguntas]);

  const selecionarResposta = (index) => {
    if (respostaSelecionada !== null) return;

    const correta = index === perguntaAtual.correta;
    setRespostaSelecionada(index);
    setRespostaCorreta(correta);

    if (correta) {
      setPontuacao((valor) => valor + 1);
    }
  };

  const avancarPergunta = () => {
    if (indiceAtual === totalPerguntas - 1) {
      setMostrarResultado(true);
      return;
    }

    setIndiceAtual((valor) => valor + 1);
    setRespostaSelecionada(null);
    setRespostaCorreta(false);
  };

  const reiniciarQuiz = () => {
    setIndiceAtual(0);
    setRespostaSelecionada(null);
    setPontuacao(0);
    setMostrarResultado(false);
    setRespostaCorreta(false);
  };

  if (mostrarResultado) {
    return (
      <section className="quizPage">
        <div
          className="quizCard"
          style={{ width: '100%', maxWidth: larguraMaiorPergunta }}
        >
          <div className="quizHeader">
            <p className="quizLabel">Quiz finalizado</p>
            <p className="quizScore">
              Pontuação: {pontuacao}/{totalPerguntas}
            </p>
          </div>

          <div className="quizResult">
            <h2 className="quizQuestion">
              {pontuacao === totalPerguntas
                ? 'Você acertou todas! O Vini aprova.'
                : `Você fez ${pontuacao} de ${totalPerguntas} acertos.`}
            </h2>
            <p className="sobreText">
              Agora você já sabe um pouco mais sobre a Brattzynha
            </p>
          </div>

          <div className="quizFooter">
            <button className="quizNextButton" onClick={reiniciarQuiz}>
              Jogar de novo
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quizPage">
      <div
        className="quizCard"
        style={{ width: '100%', maxWidth: larguraMaiorPergunta }}
      >
        <div className="quizHeader">
          <p className="quizLabel">Quiz Brattzynha</p>
          <p className="quizProgress">
            Pergunta {indiceAtual + 1} de {totalPerguntas}
          </p>
        </div>

        <div className="quizContent">
          <div>
            <h2 className="quizQuestion">{perguntaAtual.pergunta}</h2>
            <div className="quizOptions">
              {perguntaAtual.respostas.map((resposta, index) => {
                const isSelected = respostaSelecionada === index;
                const isCorrect = index === perguntaAtual.correta;
                const mostrarCorrecao = respostaSelecionada !== null;

                let className = 'quizOption';
                if (isSelected) className += ' selected';
                if (mostrarCorrecao && isCorrect) className += ' correct';
                if (mostrarCorrecao && isSelected && !isCorrect)
                  className += ' wrong';

                return (
                  <button
                    key={resposta}
                    className={className}
                    onClick={() => selecionarResposta(index)}
                    disabled={respostaSelecionada !== null}
                  >
                    {resposta}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="quizNextButton"
            onClick={avancarPergunta}
            disabled={respostaSelecionada === null}
          >
            Próxima pergunta
          </button>
        </div>
      </div>
    </section>
  );
}

export default Quiz;

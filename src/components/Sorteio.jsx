import { useMemo, useState } from 'react';
import './Sorteio.css';

function Sorteio() {
  const [nomeInput, setNomeInput] = useState('');
  const [nomes, setNomes] = useState([]);
  const [sorteado, setSorteado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const nomesDisponiveis = useMemo(
    () => nomes.filter((nome) => !historico.includes(nome)),
    [nomes, historico]
  );

  const adicionarNome = () => {
    const nome = nomeInput.trim();
    if (!nome) return;
    setNomes((prev) => [...prev, nome]);
    setNomeInput('');
  };

  const removerNome = (index) => {
    setNomes((prev) => prev.filter((_, idx) => idx !== index));
    setHistorico((prev) => prev.filter((nome) => nome !== nomes[index]));
    if (sorteado === nomes[index]) setSorteado(null);
  };

  const sortearNome = () => {
    if (nomesDisponiveis.length === 0) return;
    const randomIndex = Math.floor(Math.random() * nomesDisponiveis.length);
    const nomeEscolhido = nomesDisponiveis[randomIndex];
    setSorteado(nomeEscolhido);
    setHistorico((prev) => [...prev, nomeEscolhido]);
  };

  const reiniciarSorteio = () => {
    setSorteado(null);
    setHistorico([]);
  };

  const limparLista = () => {
    setNomes([]);
    setHistorico([]);
    setSorteado(null);
    setNomeInput('');
  };

  return (
    <section className="sorteioPage">
      <div className="sorteioLayout">
        <div className="sorteioCard sorteioInputCard">
          <div className="sorteioHeader">
            <div>
              <p className="sorteioLabel">Sorteio de nomes</p>
              <h2 className="sorteioTitle">Digite os nomes e sorteie</h2>
            </div>
            <p className="sorteioStatus">
              {nomes.length} nome{nomes.length === 1 ? '' : 's'} adicionad
              {nomes.length === 1 ? 'o' : 'os'}
            </p>
          </div>

          <div className="sorteioBody">
            <label className="sorteioFieldLabel" htmlFor="nomeInput">
              Insira um nome
            </label>
            <div className="sorteioInputRow">
              <input
                id="nomeInput"
                className="sorteioInput"
                type="text"
                value={nomeInput}
                onChange={(event) => setNomeInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    adicionarNome();
                  }
                }}
                placeholder="Ex: Ana, Pedro, Júlia"
              />
              <button
                className="sorteioAddButton"
                type="button"
                onClick={adicionarNome}
                disabled={!nomeInput.trim()}
              >
                Adicionar
              </button>
            </div>

            <div className="sorteioListCard">
              <div className="sorteioListHeader">
                <p className="sorteioListTitle">Nomes para sortear</p>
                <span className="sorteioListBadge">
                  {nomesDisponiveis.length} disponíveis
                </span>
              </div>

              {nomes.length > 0 ? (
                <ul className="sorteioNameList">
                  {nomes.map((nome, index) => {
                    const usado = historico.includes(nome);
                    return (
                      <li
                        key={`${nome}-${index}`}
                        className={`sorteioNameItem ${usado ? 'used' : ''}`}
                      >
                        <span>{nome}</span>
                        <button
                          type="button"
                          className="sorteioRemoveButton"
                          onClick={() => removerNome(index)}
                          aria-label={`Remover ${nome}`}
                        >
                          ×
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="sorteioEmptyState">
                  Adicione nomes para iniciar o sorteio.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sorteioCard sorteioResultCard">
          <div className="sorteioHeader">
            <div>
              <p className="sorteioLabel">Resultado do sorteio</p>
              <h2 className="sorteioTitle">Quem foi escolhido?</h2>
            </div>
            <p className="sorteioStatus">
              {sorteado ? 'Último sorteado' : 'Nenhum sorteio realizado ainda'}
            </p>
          </div>

          <div className="sorteioResultBody">
            <div className="sorteioResultBox">
              <p className="sorteioResultText">
                {sorteado || 'Clique em sortear para escolher um nome.'}
              </p>
            </div>

            <div className="sorteioButtons">
              <button
                type="button"
                className="sorteioPrimaryButton"
                onClick={sortearNome}
                disabled={nomesDisponiveis.length === 0}
              >
                Sortear nome
              </button>

              <button
                type="button"
                className="sorteioSecondaryButton"
                onClick={limparLista}
                disabled={nomes.length === 0}
              >
                Limpar lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sorteio;

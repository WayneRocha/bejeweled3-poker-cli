# Bejeweled Poker - CLI Interativo

Um jogo de Poker interativo em CLI com pontuação, rodadas e análise de combinações necessárias.

## 🎮 Gameplay

1. **Objetivo**: Atingir uma pontuação alvo (ex: 3000 créditos) em até 10 rodadas.
2. **Mãos Disponíveis**: Flush (750), 4 of a Kind (500), Full House (350), 3 of a Kind (200), 2 Pair (150), Spectrum (100), Pair (50).
3. **Controles**:
   - Selecione uma mão para ganhar os pontos associados.
   - **P**: Análise - mostra mãos mínimas necessárias para atingir o alvo (ex: "2x Full House" ou "1x 4 of a Kind").
   - **+**: Aumenta 50 pontos.
   - **-**: Diminui 50 pontos.
   - **Q**: Sair do jogo.

4. **Histórico**: A cada rodada, o histórico de mãos jogadas é mostrado interativamente.

## Pré-requisitos

- Node.js 18+ instalado

## Como rodar

```bash
npm install
npm start
```

## Como usar como comando global `nnn` (opcional)

Se quiser registrar o comando globalmente (para usar `nnn` de qualquer pasta):

```bash
npm link
nnn
```

**Nota**: Sem `npm link`, use apenas `npm start` na pasta do projeto.

## Estrutura

- `package.json`: define o binário `nnn` e dependências
- `src/cli.js`: jogo completo com inquirer
- `.gitignore`: ignora `node_modules/`

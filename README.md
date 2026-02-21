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

### No GitHub Codespaces

1. Abra o repositório no GitHub
2. Clique em **Code** → **Codespaces** → **Create codespace on main**
3. Aguarde o container inicializar

## Como usar como comando global (opcional)

Se quiser registrar o comando globalmente:

```bash
npm link
bej-poker
```

**Nota**: Sem `npm link`, use apenas `npm start` na pasta do projeto.

## 📁 Estrutura

- `.devcontainer/devcontainer.json`: Configuração do Codespaces
- `package.json`: Define dependências e scripts
- `src/cli.js`: Jogo completo com inquirer
- `README.md`: Este arquivo
- `PUBLISH.md`: Guia de publicação no NPM

## 📝 Desenvolvimento

O projeto está configurado com:
- ✅ Prettier para formatting automático
- ✅ ESLint para análise de código
- ✅ Codespaces pronto para desenvolvimento imediato


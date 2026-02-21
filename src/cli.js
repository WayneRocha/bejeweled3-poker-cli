#!/usr/bin/env node

import inquirer from 'inquirer';

// ============================================
// CONFIGURAÇÃO
// ============================================

const HAND_SCORES = {
  flush: { name: 'Flush', points: 750 },
  fourOfAKind: { name: '4 of a Kind', points: 500 },
  fullHouse: { name: 'Full House', points: 350 },
  threeOfAKind: { name: '3 of a Kind', points: 200 },
  twoPair: { name: '2 Pair', points: 150 },
  spectrum: { name: 'Spectrum', points: 100 },
  pair: { name: 'Pair', points: 50 },
};

const TOTAL_ROUNDS = 10;
const SCORE_ADJUSTMENT = 50;

// ============================================
// ESTADO DO JOGO
// ============================================

let gameState = {
  targetScore: 0,
  currentScore: 0,
  round: TOTAL_ROUNDS,
  handsHistory: [],
};

// ============================================
// UTILIDADES
// ============================================

const printHeader = () => {
  console.clear();
  console.log('╔════════════════════════════════════╗');
  console.log('║  BEJEWELED 3 POKER - POC INTERATIVO║');
  console.log('╚════════════════════════════════════╝\n');
};

const printGameStatus = () => {
  console.log(`📊 Rodada: ${gameState.round}/${TOTAL_ROUNDS}`);
  console.log(`💰 Pontos: ${gameState.currentScore}/${gameState.targetScore}`);
  console.log(`📈 Progresso: ${((gameState.currentScore / gameState.targetScore) * 100).toFixed(1)}%\n`);

  if (gameState.handsHistory.length > 0) {
    console.log('📋 Histórico de Mãos:');
    gameState.handsHistory.forEach((entry, idx) => {
      console.log(`   ${idx + 1}. ${entry.hand} (+${entry.points}pts) → Total: ${entry.totalAfter}pts`);
    });
    console.log();
  }
};

const pause = async (message = 'Pressione Enter para continuar...') => {
  await inquirer.prompt([{ type: 'input', name: 'continue', message }]);
};

const getHandChoices = () => {
  return Object.entries(HAND_SCORES).map(([key, data]) => ({
    name: `${data.name} (+${data.points} pts)`,
    value: key,
  }));
};

const calculateRemainingHands = () => {
  const remaining = gameState.targetScore - gameState.currentScore;

  if (remaining <= 0) return null;

  const combinations = Object.entries(HAND_SCORES).map(([key, data]) => {
    const quantity = Math.ceil(remaining / data.points);
    return {
      key,
      hand: data.name,
      points: data.points,
      quantity,
      totalNeeded: quantity * data.points,
    };
  });

  return combinations
    .filter((c) => c.quantity <= gameState.round)
    .sort((a, b) => a.quantity - b.quantity);
};

const printAnalysisTable = () => {
  printHeader();
  printGameStatus();

  const remaining = gameState.targetScore - gameState.currentScore;

  if (remaining <= 0) {
    console.log('✅ PARABÉNS! Você atingiu a pontuação alvo!\n');
    return;
  }

  console.log(`🎯 Mãos mínimas para atingir ${gameState.targetScore}:\n`);

  const combinations = calculateRemainingHands();

  if (!combinations || combinations.length === 0) {
    console.log('❌ Impossível atingir o alvo com as rodadas restantes.\n');
    return;
  }

  combinations.slice(0, 5).forEach((combo) => {
    const calculation = `${combo.quantity} × ${combo.points}pts = ${combo.totalNeeded}pts`;
    console.log(`   • ${combo.quantity}x ${combo.hand} (${calculation})`);
  });

  console.log();
};

const addHand = (handKey) => {
  const handData = HAND_SCORES[handKey];
  const newScore = gameState.currentScore + handData.points;

  gameState.handsHistory.push({
    hand: handData.name,
    points: handData.points,
    totalAfter: newScore,
  });

  gameState.currentScore = newScore;
  gameState.round -= 1;
};

const adjustScore = (amount) => {
  gameState.currentScore = Math.max(0, gameState.currentScore + amount);
  console.log(`\n💾 Pontuação ajustada para: ${gameState.currentScore}\n`);
};

// ============================================
// FLUXO PRINCIPAL
// ============================================

const selectHand = async () => {
  printHeader();
  printGameStatus();

  const { hand } = await inquirer.prompt([
    {
      type: 'list',
      name: 'hand',
      message: 'Escolha uma Mão ou Ação:',
      choices: [
        ...getHandChoices(),
        new inquirer.Separator(),
        { name: '[P] Análise - Mãos necessárias', value: 'analysis' },
        { name: '[+] Aumentar +50 pts', value: 'plus' },
        { name: '[-] Diminuir -50 pts', value: 'minus' },
        new inquirer.Separator(),
        { name: '[Q] Sair do jogo', value: 'quit' },
      ],
    },
  ]);

  return hand;
};

const initGame = async () => {
  printHeader();
  console.log('Bem-vindo ao Bejeweled Poker!\n');

  const { targetScore } = await inquirer.prompt([
    {
      type: 'input',
      name: 'targetScore',
      message: 'Qual é a pontuação máxima a atingir? (ex: 3000)',
      validate: (value) => {
        const num = Number(value);
        return !Number.isNaN(num) && num > 0 ? true : 'Digite um número válido maior que 0.';
      },
    },
  ]);

  gameState.targetScore = Number(targetScore);
  gameState.currentScore = 0;
  gameState.round = TOTAL_ROUNDS;
  gameState.handsHistory = [];
};

const gameLoop = async () => {
  while (gameState.round > 0) {
    const hand = await selectHand();

    switch (hand) {
      case 'quit':
        console.log('\n👋 Obrigado por jogar! Até logo!\n');
        return 'quit';

      case 'analysis':
        printAnalysisTable();
        await pause('Pressione Enter para voltar ao jogo...');
        continue;

      case 'plus':
        adjustScore(SCORE_ADJUSTMENT);
        await pause();
        continue;

      case 'minus':
        adjustScore(-SCORE_ADJUSTMENT);
        await pause();
        continue;

      default:
        // Jogou uma mão válida
        addHand(hand);

        if (gameState.currentScore >= gameState.targetScore) {
          printHeader();
          printGameStatus();
          console.log('🎉 PARABÉNS! Você atingiu a pontuação alvo!\n');
          return 'win';
        }

        if (gameState.round <= 0) {
          printHeader();
          printGameStatus();
          console.log(`⏰ Fim das rodadas! Pontuação final: ${gameState.currentScore}/${gameState.targetScore}\n`);
          return 'end';
        }

        await pause('Pressione Enter para a próxima rodada...');
    }
  }
};

const resetGameState = () => {
  gameState = {
    targetScore: 0,
    currentScore: 0,
    round: TOTAL_ROUNDS,
    handsHistory: [],
  };
};

const main = async () => {
  try {
    await initGame();
    const result = await gameLoop();

    if (result !== 'quit') {
      const { playAgain } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'playAgain',
          message: 'Deseja jogar novamente?',
          default: false,
        },
      ]);

      if (playAgain) {
        resetGameState();
        return main();
      }
    }

    console.log('Até logo! 🎮\n');
  } catch (error) {
    console.error('\n❌ Erro inesperado:', error);
    process.exit(1);
  }
};

main();

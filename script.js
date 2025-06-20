document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DO JOGO ---
    const board = document.getElementById('board');
    const rollButton = document.getElementById('roll-button');
    const diceElement = document.getElementById('dice');
    const loveMessageElement = document.getElementById('love-message');
    const titleElement = document.getElementById('main-title');
    const playerPawnElement = document.getElementById('love-pawn');
    const botPawnElement = document.getElementById('bot-pawn');
    const playerAvatar = document.getElementById('player-avatar');
    const botAvatar = document.getElementById('bot-avatar');
    const diceRollSound = document.getElementById('dice-roll-sound');
    const pawnMoveSound = document.getElementById('pawn-move-sound');
    const victoryCard = document.getElementById('victory-card');
    const victoryMessage = document.getElementById('victory-message');
    const victoryMusic = document.getElementById('victory-music');
    
    // --- PERSONALIZE SUA MENSAGEM FINAL AQUI ---
    // --- PERSONALIZE SUA MENSAGEM FINAL AQUI ---
    const finalLetterMessage = `Parabéns pela vitória, meu bem...
    Fiz esse joguinho simples porque o Ludo sempre foi mais que um passatempo pra gente... é o nosso jeito de ficar juntinhos, de rir, brigar de brincadeira e criar memórias. Enquanto eu via esses peões andando, só conseguia pensar no quanto eu sinto falta de caminhar com você... de te ouvir me chamar de “meu bem”, de ter você perto.
    Tem uma frase que o Soluço diz pra Astrid, em Como Treinar o Seu Dragão, que eu adaptei pra nós:
    “Você sempre esteve lá quando eu precisei... então eu também quero estar por você...Eu te amo, Sara Cristina da Silva... com todo o meu coração. Sempre vou te amar.”
    Com carinho,
    Aquele que te escolheria em todas as vidas.`;

    const loveMessages = [
        "Um 6 da sorte abre os caminhos!", "A jornada te espera.", "Confie no seu dado.", "Cada passo te aproxima da vitória.", "Essa casa é segura, como meu abraço.", "Uau, um 6! Você merece jogar de novo!", "O bot está tentando, mas meu coração torce por você.", "Cuidado, não deixe ele te pegar!", "Uma jogada de mestre!", "Você tem uma proteção especial neste jogo.", "O final está cada vez mais perto."
    ];

    // --- CAMINHOS E REGRAS DO LUDO ---
    const redPlayerPath = [
        { row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 6, col: 7 }, { row: 5, col: 7 }, { row: 4, col: 7 }, { row: 3, col: 7 }, { row: 2, col: 7 }, { row: 1, col: 7 }, { row: 1, col: 8 }, { row: 1, col: 9 }, { row: 2, col: 9 }, { row: 3, col: 9 }, { row: 4, col: 9 }, { row: 5, col: 9 }, { row: 6, col: 9 }, { row: 7, col: 10 }, { row: 7, col: 11 }, { row: 7, col: 12 }, { row: 7, col: 13 }, { row: 7, col: 14 }, { row: 7, col: 15 }, { row: 8, col: 15 }, { row: 9, col: 15 }, { row: 9, col: 14 }, { row: 9, col: 13 }, { row: 9, col: 12 }, { row: 9, col: 11 }, { row: 9, col: 10 }, { row: 10, col: 9 }, { row: 11, col: 9 }, { row: 12, col: 9 }, { row: 13, col: 9 }, { row: 14, col: 9 }, { row: 15, col: 9 }, { row: 15, col: 8 }, { row: 15, col: 7 }, { row: 14, col: 7 }, { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 6 }, { row: 9, col: 5 }, { row: 9, col: 4 }, { row: 9, col: 3 }, { row: 9, col: 2 }, { row: 9, col: 1 }, { row: 8, col: 1 },
        { row: 8, col: 2 }, { row: 8, col: 3 }, { row: 8, col: 4 }, { row: 8, col: 5 }, { row: 8, col: 6 }, { row: 8, col: 7 }
    ];
    const bluePlayerPath = [
        { row: 2, col: 9 }, { row: 3, col: 9 }, { row: 4, col: 9 }, { row: 5, col: 9 }, { row: 6, col: 9 }, { row: 7, col: 10 }, { row: 7, col: 11 }, { row: 7, col: 12 }, { row: 7, col: 13 }, { row: 7, col: 14 }, { row: 7, col: 15 }, { row: 8, col: 15 }, { row: 9, col: 15 }, { row: 9, col: 14 }, { row: 9, col: 13 }, { row: 9, col: 12 }, { row: 9, col: 11 }, { row: 9, col: 10 }, { row: 10, col: 9 }, { row: 11, col: 9 }, { row: 12, col: 9 }, { row: 13, col: 9 }, { row: 14, col: 9 }, { row: 15, col: 9 }, { row: 15, col: 8 }, { row: 15, col: 7 }, { row: 14, col: 7 }, { row: 13, col: 7 }, { row: 12, col: 7 }, { row: 11, col: 7 }, { row: 10, col: 7 }, { row: 9, col: 6 }, { row: 9, col: 5 }, { row: 9, col: 4 }, { row: 9, col: 3 }, { row: 9, col: 2 }, { row: 9, col: 1 }, { row: 8, col: 1 }, { row: 7, col: 1 }, { row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 6, col: 7 }, { row: 5, col: 7 }, { row: 4, col: 7 }, { row: 3, col: 7 }, { row: 2, col: 7 }, { row: 1, col: 7 }, { row: 1, col: 8 },
        { row: 2, col: 8 }, { row: 3, col: 8 }, { row: 4, col: 8 }, { row: 5, col: 8 }, { row: 6, col: 8 }, { row: 7, col: 8 }
    ];
    const safeSpaces = [0, 8, 13, 21, 26, 34, 39, 47];

    let playerPosition = -1;
    let botPosition = -1;
    let isPlayerTurn = true;
    let playerTurnsWithoutSix = 0;

    const sleep = ms => new Promise(res => setTimeout(res, ms));

    async function handlePlayerTurn() {
        if (!isPlayerTurn) return;
        rollButton.disabled = true;
        diceElement.classList.add('rolling');
        diceRollSound.play();

        await sleep(1000);

        diceElement.classList.remove('rolling');
        let diceResult = Math.floor(Math.random() * 6) + 1;

        if (playerPosition === -1 && playerTurnsWithoutSix >= 2) {
            diceResult = 6;
            showMessage("O destino te deu uma força!");
        }
        diceElement.textContent = diceResult;

        if (playerPosition === -1) {
            if (diceResult === 6) {
                playerPosition = 0;
                playerTurnsWithoutSix = 0;
                showMessage("Um 6! Você saiu e joga de novo!");
                updatePawnOnBoard(playerPawnElement, playerPosition, redPlayerPath);
                switchTurnToPlayer(true);
            } else {
                playerTurnsWithoutSix++;
                showMessage("Precisa de um 6 para começar...");
                passTurnToBot();
            }
        } else {
            const finalPosition = playerPosition + diceResult;
            if (finalPosition >= redPlayerPath.length) {
                showMessage("Jogada inválida, precisa de um número exato!");
                if (diceResult !== 6) passTurnToBot();
                else switchTurnToPlayer(true);
            } else {
                playerPosition = await movePawnSequentially(playerPawnElement, playerPosition, diceResult, redPlayerPath);
                checkForPlayerCapture();

                if (playerPosition === redPlayerPath.length - 1) {
                    endTheJourney();
                    return;
                }

                if (diceResult === 6) {
                    showMessage("Ótimo, um 6! Jogue de novo!");
                    switchTurnToPlayer(true);
                } else {
                    passTurnToBot();
                }
            }
        }
    }

    async function handleBotTurn() {
        isPlayerTurn = false;   
        titleElement.textContent = "Vez do Vinicin...";
        playerAvatar.classList.remove('active-turn');
        botAvatar.classList.add('active-turn');
        await sleep(500);

        if (playerPosition > redPlayerPath.length - 12) {
            showMessage("Vinicin viu o brilho nos olhinhos da Sara e ficou paralisado ao se apaixonar!");
            setTimeout(() => switchTurnToPlayer(false), 2000);
            return;
        }

        let diceResult = Math.floor(Math.random() * 6) + 1;
        if (botPosition === -1) {
            if (diceResult === 6) {
                botPosition = 0;
                updatePawnOnBoard(botPawnElement, botPosition, bluePlayerPath);
            }
            setTimeout(() => switchTurnToPlayer(false), 1500);
            return;
        }

        const potentialFinalPosition = botPosition + diceResult;
        if (potentialFinalPosition >= bluePlayerPath.length) {
            setTimeout(() => switchTurnToPlayer(false), 1500);
            return;
        }

        if (potentialFinalPosition === playerPosition && !safeSpaces.includes(playerPosition)) {
            showMessage("Ufa! O oponente errou o cálculo e não te pegou!");
            setTimeout(() => switchTurnToPlayer(false), 1500);
            return;
        }
        
        showMessage(`Oponente tirou ${diceResult}.`);
        await sleep(1000);
        botPosition = await movePawnSequentially(botPawnElement, botPosition, diceResult, bluePlayerPath);
        setTimeout(() => switchTurnToPlayer(false), 500);
    }
    
    async function movePawnSequentially(pawn, startPosition, steps, path) {
        let currentPosition = startPosition;
        for (let i = 0; i < steps; i++) {
            currentPosition++;
            if (currentPosition < path.length) {
                updatePawnOnBoard(pawn, currentPosition, path);
                await sleep(400);
            }
        }
        return currentPosition;
    }

    function passTurnToBot() {
        setTimeout(handleBotTurn, 1000);
    }

    function switchTurnToPlayer(isExtraTurn) {
        titleElement.textContent = "Sua vez de jogar!";
        if (!isExtraTurn) {
            showMessage("Pode avançar!");
        }
        isPlayerTurn = true;
        rollButton.disabled = false;
        botAvatar.classList.remove('active-turn');
        playerAvatar.classList.add('active-turn');
    }

    function checkForPlayerCapture() {
        if (playerPosition === botPosition && botPosition > -1 && !safeSpaces.includes(playerPosition)) {
            showMessage("Você capturou o oponente!");
            botPosition = -1;
            updatePawnOnBoard(botPawnElement, -1, bluePlayerPath);
        }
    }
    
    function updatePawnOnBoard(pawn, position, path) {
        if (position === -1) {
            const pawnId = pawn.id;
            if (pawnId === 'love-pawn') {
                pawn.style.top = `calc(100% / 15 * 2.5)`;
                pawn.style.left = `calc(100% / 15 * 2.5)`;
            } else {
                pawn.style.top = `calc(100% / 15 * 11.5)`;
                pawn.style.left = `calc(100% / 15 * 11.5)`;
            }
            return;
        }
        pawnMoveSound.play();
        pawn.classList.add('hopping');

        const positionData = path[position];
        const cellWidth = 100 / 15;
        pawn.style.top = `calc(${(positionData.row - 1) * cellWidth}% + ${cellWidth * 0.1}%)`;
        pawn.style.left = `calc(${(positionData.col - 1) * cellWidth}% + ${cellWidth * 0.1}%)`;

        setTimeout(() => pawn.classList.remove('hopping'), 500);
    }
    
    function showMessage(msg) {
        loveMessageElement.textContent = msg;
    }

    function endTheJourney() {
        document.getElementById('controls').style.display = 'none';
        document.getElementById('game-container').style.transition = 'opacity 0.5s';
        document.getElementById('game-container').style.opacity = '0';

        victoryMessage.innerText = finalLetterMessage;
        victoryCard.style.display = 'flex';
        
        setTimeout(() => {
            victoryCard.classList.add('visible');
            victoryMusic.play();
        }, 100);
    }
    
    function setupBoard() {
        for (let i = 1; i <= 225; i++) { board.appendChild(document.createElement('div')).classList.add('cell'); }
        document.querySelector(`#board > .cell:nth-child(1)`).classList.add('base', 'red');
        document.querySelector(`#board > .cell:nth-child(10)`).classList.add('base', 'green');
        document.querySelector(`#board > .cell:nth-child(211)`).classList.add('base', 'yellow');
        document.querySelector(`#board > .cell:nth-child(220)`).classList.add('base', 'blue');
        document.querySelector(`#board > .cell:nth-child(113)`).classList.add('home-area');
        
        const paintPath = (path, color) => {
            const homeStretchStart = 51;
            path.forEach((p, index) => {
                const cellIndex = (p.row - 1) * 15 + p.col;
                const cell = board.children[cellIndex - 1];
                if(cell) {
                    if (index < homeStretchStart) cell.classList.add('path-cell'); 
                    else cell.classList.add('home-stretch', color);
                }
            });
            const startPos = path[0];
            const startCellIndex = (startPos.row - 1) * 15 + startPos.col;
            if (board.children[startCellIndex - 1]) board.children[startCellIndex - 1].classList.add('start-cell', color);
        };

        paintPath(redPlayerPath, 'red');
        paintPath(bluePlayerPath, 'blue');

        safeSpaces.forEach(index => {
            if(redPlayerPath[index]) {
                const pos = redPlayerPath[index];
                const cellIndex = (pos.row - 1) * 15 + pos.col;
                if(board.children[cellIndex - 1]) board.children[cellIndex - 1].classList.add('safe-cell');
            }
        });
    }

    // --- INICIALIZAÇÃO DO JOGO ---
    setupBoard();
    updatePawnOnBoard(playerPawnElement, -1, redPlayerPath);
    updatePawnOnBoard(botPawnElement, -1, bluePlayerPath);
    playerAvatar.classList.add('active-turn');
    showMessage("Para começar, você precisa de um 6!");
    rollButton.addEventListener('click', handlePlayerTurn);
});
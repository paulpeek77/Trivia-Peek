// The Way of the High Pimp - The Final, Perfected Script

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AlzaSyB3HPPOOS2ABwOplV6m1seQQoGv43YJsql",
    authDomain: "trivia-peek.firebaseapp.com",
    databaseURL: "https://trivia-peek-default-rtdb.firebaseio.com",
    projectId: "trivia-peek",
    storageBucket: "trivia-peek.appspot.com",
    messagingSenderId: "260468478548",
    appId: "1:260468478548:web:d35f42555b46ad22d293c1",
    measurementId: "G-C672H0S2HD"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// --- DOM ELEMENTS ---
const warningScreen = document.getElementById('warning-screen');
const warningContinueButton = document.getElementById('warning-continue-button');
const homescreen = document.getElementById('homescreen');
const createGameBtn = document.getElementById('create-game-btn');
const roomCodeInput = document.getElementById('room-code-input');
const joinGameBtn = document.getElementById('join-game-btn');
const errorMessage = document.getElementById('error-message');
const lobbyScreen = document.getElementById('lobby-screen');
const roomCodeDisplay = document.getElementById('room-code-display');
const appContainer = document.getElementById('app-container');
const genreSelectionScreen = document.getElementById('genre-selection-screen');
const gameContainer = document.getElementById('game-container');
const currentGenreDisplay = document.getElementById('current-genre-display');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');
const turnIndicator = document.getElementById('turn-indicator');
const questionText = document.getElementById('question-text');
const optionsArea = document.getElementById('options-area');
const optionButtons = Array.from(optionsArea.getElementsByClassName('option-btn'));
const feedbackMessage = document.getElementById('feedback-message');
const nextQuestionButton = document.getElementById('next-question-button');
const gameOverSection = document.getElementById('game-over-section');
const gameOverMessage = document.getElementById('game-over-message');
const restartButton = document.getElementById('restart-button');
const changeGenreButton = document.getElementById('change-genre-button');
const questionArea = document.getElementById('question-area');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

// --- GAME STATE VARIABLES ---
let currentRoomCode = null;
let currentPlayerId = null;
let hostPlayerId = null;

// --- CORE FUNCTIONS ---
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

async function createGame() {
    homescreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');

    try {
        currentRoomCode = generateRoomCode();
        currentPlayerId = 1;
        hostPlayerId = 1;

        const initialGameState = {
            gameState: 'lobby',
            players: { 1: { connected: true, score: 0 }, 2: { connected: false, score: 0 } },
            hostPlayerId: 1
        };
        await db.ref('games/' + currentRoomCode).set(initialGameState);
        listenToGameChanges(currentRoomCode);
    } catch (error) {
        console.error("Error creating game:", error);
        errorMessage.textContent = "Could not create game. Check connection.";
    }
}

async function joinGame() {
    const code = roomCodeInput.value.trim().toUpperCase();
    if (!code) { errorMessage.textContent = 'Please enter a room code.'; return; }
    errorMessage.textContent = '';

    try {
        const gameRef = db.ref('games/' + code);
        const snapshot = await gameRef.once('value');
        if (snapshot.exists()) {
            const gameData = snapshot.val();
            if (gameData.players[2] && gameData.players[2].connected) {
                errorMessage.textContent = 'This room is already full.';
            } else {
                currentRoomCode = code;
                currentPlayerId = 2;
                hostPlayerId = gameData.hostPlayerId;
                const updates = { '/players/2/connected': true, '/gameState': 'selectingGenre' };
                await gameRef.update(updates);
                listenToGameChanges(currentRoomCode);
            }
        } else {
            errorMessage.textContent = 'Room code not found.';
        }
    } catch (error) {
        console.error("Error joining game:", error);
        errorMessage.textContent = "Could not join game. Check code or connection.";
    }
}

function listenToGameChanges(roomCode) {
    const gameRef = db.ref('games/' + roomCode);
    gameRef.on('value', (snapshot) => {
        if (!snapshot.exists()) {
            alert("Game room has closed.");
            window.location.reload();
            return;
        }

        const gameData = snapshot.val();
        homescreen.classList.add('hidden');
        lobbyScreen.classList.add('hidden');
        appContainer.classList.add('hidden');
        genreSelectionScreen.classList.add('hidden');
        gameContainer.classList.add('hidden');

        switch (gameData.gameState) {
            case 'lobby':
                lobbyScreen.classList.remove('hidden');
                roomCodeDisplay.textContent = roomCode;
                break;
            case 'selectingGenre':
                appContainer.classList.remove('hidden');
                genreSelectionScreen.classList.remove('hidden');
                buildGenreSelectionUI(gameData);
                break;
            case 'inProgress':
            case 'gameOver':
                appContainer.classList.remove('hidden');
                gameContainer.classList.remove('hidden');
                updateGameUI(gameData);
                break;
        }
    });
}

function buildGenreSelectionUI(gameData) {
    genreSelectionScreen.innerHTML = `
        <h1>Trivia Peek - Choose a Genre</h1>
        <p>${currentPlayerId === gameData.hostPlayerId ? "You are the host. Please select a genre." : "Waiting for the host to select a genre..."}</p>
        <div id="genre-buttons">
            <button class="genre-btn" data-genre="action">Action</button>
            <button class="genre-btn" data-genre="horror">Horror</button>
            <button class="genre-btn" data-genre="drama">Drama</button>
            <button class="genre-btn" data-genre="suspense">Suspense</button>
            <button class="genre-btn" data-genre="comedy">Comedy</button>
            <button class="genre-btn" data-genre="family">Kids & Family</button>
        </div>`;

    if (currentPlayerId === gameData.hostPlayerId) {
        genreSelectionScreen.querySelectorAll('.genre-btn').forEach(button => {
            button.addEventListener('click', handleGenreSelection);
        });
    }
}

async function handleGenreSelection(event) {
    if (currentPlayerId !== hostPlayerId) return;
    const selectedGenre = event.target.dataset.genre;

    try {
        const questionsRef = db.ref('questions/' + selectedGenre);
        const snapshot = await questionsRef.once('value');
        if (!snapshot.exists()) {
            throw new Error(`Could not find questions for "${selectedGenre}".`);
        }
        let questionsForGenre = snapshot.val();

        // Shuffle the array of questions
        for (let i = questionsForGenre.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionsForGenre[i], questionsForGenre[j]] = [questionsForGenre[j], questionsForGenre[i]];
        }

        const updates = {
            genre: selectedGenre,
            shuffledQuestions: questionsForGenre,
            currentQuestionIndex: 0,
            'players/1/score': 0,
            'players/2/score': 0,
            turnState: { player: 1, answerRevealed: false },
            gameState: 'inProgress'
        };
        await db.ref('games/' + currentRoomCode).update(updates);
    } catch (error) {
        console.error('Error fetching or processing questions:', error);
        alert('Could not start game. Failed to load questions.');
    }
}

function updateGameUI(gameData) {
    if (!gameData || !gameData.players) return;

    player1ScoreDisplay.textContent = gameData.players[1]?.score || 0;
    player2ScoreDisplay.textContent = gameData.players[2]?.score || 0;
    currentGenreDisplay.textContent = `Genre: ${gameData.genre || 'N/A'}`;

    questionArea.classList.remove('hidden');
    optionsArea.classList.remove('hidden');
    turnIndicator.classList.remove('hidden');
    gameOverSection.classList.add('hidden');


    if (gameData.gameState === 'gameOver') {
        displayGameOver(gameData);
        return;
    }

    const turnState = gameData.turnState;
    turnIndicator.textContent = `Player ${turnState?.player}'s Turn`;

    const questionIndex = gameData.currentQuestionIndex;
    if (gameData.shuffledQuestions && questionIndex < gameData.shuffledQuestions.length) {
        const currentQ = gameData.shuffledQuestions[questionIndex];
        questionText.textContent = currentQ.questionText;

        optionButtons.forEach((button, index) => {
            button.textContent = currentQ.options[index];
            button.disabled = false;
            button.className = 'option-btn';
        });

        if (turnState.answerRevealed) {
            optionButtons.forEach(button => {
                button.disabled = true;
                if (button.textContent === turnState.correctAnswer) {
                    button.classList.add('correct-option');
                }
                if (button.textContent === turnState.chosenAnswer && button.textContent !== turnState.correctAnswer) {
                    button.classList.add('incorrect-choice');
                }
            });

            feedbackMessage.textContent = (turnState.chosenAnswer === turnState.correctAnswer) ? "Correct!" : `Incorrect! The answer was: ${turnState.correctAnswer}`;
            feedbackMessage.className = (turnState.chosenAnswer === turnState.correctAnswer) ? 'feedback-message correct' : 'feedback-message incorrect';

            if (currentPlayerId === hostPlayerId) {
                nextQuestionButton.classList.remove('hidden');
                nextQuestionButton.focus();
            } else {
                nextQuestionButton.classList.add('hidden');
            }

        } else {
            optionButtons.forEach(button => {
                button.disabled = (currentPlayerId !== turnState.player);
            });
            feedbackMessage.textContent = '';
            nextQuestionButton.classList.add('hidden');
        }
    }
}

async function handleOptionClick(event) {
    const gameRef = db.ref('games/' + currentRoomCode);
    const snapshot = await gameRef.once('value');
    const gameData = snapshot.val();

    if (!gameData || currentPlayerId !== gameData.turnState.player || gameData.turnState.answerRevealed) return;

    const userAnswer = event.target.textContent;
    const correctAnswer = gameData.shuffledQuestions[gameData.currentQuestionIndex].correctAnswer;
    let newScore = gameData.players[currentPlayerId].score;

    if (userAnswer === correctAnswer) {
        newScore++;
        if (correctSound) correctSound.play();
    } else {
        if (incorrectSound) incorrectSound.play();
    }

    const updates = {};
    updates[`/players/${currentPlayerId}/score`] = newScore;
    updates['/turnState/answerRevealed'] = true;
    updates['/turnState/chosenAnswer'] = userAnswer;
    updates['/turnState/correctAnswer'] = correctAnswer;

    await gameRef.update(updates);
}

async function nextQuestion() {
    if (currentPlayerId !== hostPlayerId) return;

    const gameRef = db.ref('games/' + currentRoomCode);
    const snapshot = await gameRef.once('value');
    const gameData = snapshot.val();

    const nextQuestionIndex = gameData.currentQuestionIndex + 1;
    if (nextQuestionIndex >= 10) { // Game over after 10 questions
        await gameRef.update({ gameState: 'gameOver' });
        return;
    }

    const nextPlayer = gameData.turnState.player === 1 ? 2 : 1;
    const updates = {
        currentQuestionIndex: nextQuestionIndex,
        turnState: { player: nextPlayer, answerRevealed: false }
    };
    await gameRef.update(updates);
}

function displayGameOver(gameData) {
    questionArea.classList.add('hidden');
    optionsArea.classList.add('hidden');
    turnIndicator.classList.add('hidden');
    feedbackMessage.textContent = '';
    nextQuestionButton.classList.add('hidden');
    gameOverSection.classList.remove('hidden');

    const p1Score = gameData.players[1].score;
    const p2Score = gameData.players[2].score;
    let winnerMessageText;

    if (p1Score > p2Score) {
        winnerMessageText = "Player 1 Wins!";
    } else if (p2Score > p1Score) {
        winnerMessageText = "Player 2 Wins!";
    } else {
        winnerMessageText = "It's a Tie!";
    }

    gameOverMessage.textContent = `Game Over! ${winnerMessageText}\n\nFinal Score:\nPlayer 1: ${p1Score}\nPlayer 2: ${p2Score}`;

    if (currentPlayerId !== hostPlayerId) {
        restartButton.classList.add('hidden');
        changeGenreButton.textContent = "Return to Home";
    } else {
        restartButton.classList.remove('hidden');
        changeGenreButton.textContent = "New Game";
    }
}


// --- INITIALIZATION & EVENT LISTENERS ---
function initializeApp() {
    // Attach listeners to the buttons that are always present on the page
    warningContinueButton?.addEventListener('click', () => {
        localStorage.setItem('triviaPeekWarningSeen', 'true');
        warningScreen.classList.add('hidden');
        homescreen.classList.remove('hidden');
    });

    createGameBtn?.addEventListener('click', createGame);
    joinGameBtn?.addEventListener('click', joinGame);
    optionButtons.forEach(button => button.addEventListener('click', handleOptionClick));
    nextQuestionButton?.addEventListener('click', nextQuestion);

    restartButton?.addEventListener('click', async () => {
        if (currentPlayerId !== hostPlayerId) return;
        const gameRef = db.ref('games/' + currentRoomCode);
        const snapshot = await gameRef.once('value');
        const gameData = snapshot.val();
        if (gameData && gameData.genre) {
            handleGenreSelection({ target: { dataset: { genre: gameData.genre } } });
        }
    });

    changeGenreButton?.addEventListener('click', async () => {
        if (currentRoomCode && currentPlayerId === hostPlayerId) {
            await db.ref('games/' + currentRoomCode).remove();
        }
        window.location.reload();
    });

    // Check if the warning has been seen before to decide the initial screen
    if (localStorage.getItem('triviaPeekWarningSeen') === 'true') {
        warningScreen.classList.add('hidden');
        homescreen.classList.remove('hidden');
    } else {
        warningScreen.classList.remove('hidden');
    }
}

// Start the entire application logic
initializeApp();
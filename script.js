//
// The Way of the High Pimp - The TRULY Corrected Scroll
// Changes:
// 1. All Firebase functions updated to use the proper V9 compatibility syntax.
//

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AlzaSyB3HPPOOS2ABwOplV6m1seQQoGv43YJsql",
    authDomain: "trivia-peek.firebaseapp.com",
    databaseURL: "https://trivia-peek-default-rtdb.firebaseio.com",
    projectId: "trivia-peek",
    storageBucket: "trivia-peek.firebasestorage.app",
    messagingSenderld: "260468478548",
    appld: "1:260468478548:web:d35f42555b46ad22d293c1",
    measurementld: "G-C672H0S2HD"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database.getDatabase(app);

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
        const gameRef = firebase.database.ref(db, 'games/' + currentRoomCode);
        await firebase.database.set(gameRef, initialGameState);
        listenToGameChanges(currentRoomCode);
    } catch (error) {
        console.error("Error creating game:", error);
        errorMessage.textContent = "Could not create game. Check connection.";
    }
}

async function joinGame() {
    const code = roomCodeInput.value.trim().toUpperCase();
    if (!code) {
        errorMessage.textContent = 'Please enter a room code.';
        return;
    }
    errorMessage.textContent = "";
    try {
        const gameRef = firebase.database.ref(db, 'games/' + code);
        const snapshot = await firebase.database.get(gameRef);
        if (snapshot.exists()) {
            const gameData = snapshot.val();
            if (gameData.players[2] && gameData.players[2].connected) {
                errorMessage.textContent = 'This room is already full.';
            } else {
                currentRoomCode = code;
                currentPlayerId = 2;
                hostPlayerId = gameData.hostPlayerId;
                const updates = { '/players/2/connected': true, '/gameState': 'selectingGenre' };
                await firebase.database.update(gameRef, updates);
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
    const gameRef = firebase.database.ref(db, 'games/' + roomCode);
    firebase.database.onValue(gameRef, (snapshot) => {
        if (!snapshot.exists()) {
            alert("Game room has closed.");
            window.location.reload();
            return;
        }
        const gameData = snapshot.val();
        updateUIBasedOnGameState(gameData);
    });
}

function updateUIBasedOnGameState(gameData) {
    // This function populates the UI based on the current state of the game.
    // Hides all major containers first, then shows the correct one.
    homescreen.classList.add('hidden');
    lobbyScreen.classList.add('hidden');
    appContainer.classList.add('hidden');
    warningScreen.classList.add('hidden'); // Also hide warning screen

    switch (gameData.gameState) {
        case 'lobby':
            lobbyScreen.classList.remove('hidden');
            roomCodeDisplay.textContent = currentRoomCode;
            break;
        case 'selectingGenre':
            appContainer.classList.remove('hidden');
            genreSelectionScreen.classList.remove('hidden');
            gameContainer.classList.add('hidden');
            buildGenreSelectionUI(gameData);
            break;
        case 'inProgress':
        case 'gameOver':
            appContainer.classList.remove('hidden');
            gameContainer.classList.remove('hidden');
            genreSelectionScreen.classList.add('hidden');
            updateGameUI(gameData);
            break;
    }
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
        </div>
    `;
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
        const questionsRef = firebase.database.ref(db, 'questions/' + selectedGenre);
        const snapshot = await firebase.database.get(questionsRef);

        if (snapshot.exists()) {
            let questionsForGenre = snapshot.val();
            for (let i = questionsForGenre.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [questionsForGenre[i], questionsForGenre[j]] = [questionsForGenre[j], questionsForGenre[i]];
            }
            const gameRef = firebase.database.ref(db, 'games/' + currentRoomCode);
            const updates = {
                genre: selectedGenre,
                shuffledQuestions: questionsForGenre,
                currentQuestionIndex: 0,
                'players/1/score': 0,
                'players/2/score': 0,
                turnState: { player: 1, answerRevealed:.docs-gm-menu-caption-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:16px;color:#202124;font-family:'Google Sans',Roboto,Arial,sans-serif;font-size:14px;letter-spacing:0.25px;line-height:20px}
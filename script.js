// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3HPPOOs2ABwOpIV6m1seQQoGv43YJsqI",
    authDomain: "trivia-peek.firebaseapp.com",
    databaseURL: "https://trivia-peek-default-rtdb.firebaseio.com",
    projectId: "trivia-peek",
    storageBucket: "trivia-peek.firebasestorage.app",
    messagingSenderId: "260468478548",
    appId: "1:260468478548:web:d35f42555b46ad22d293c1",
    measurementId: "G-C672H0S2HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- DOM ELEMENTS ---
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

// --- GAME STATE VARIABLES ---
let currentRoomCode = null;
let currentPlayerId = null;
let hostPlayerId = null;

// --- CORE FUNCTIONS ---

// Function to generate a random 4-letter room code
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

// Function to create a new game
async function createGame() {
    console.log("Creating a new game...");
    currentRoomCode = generateRoomCode();
    currentPlayerId = 1;
    hostPlayerId = 1;

    // The initial state of our game in the database
    const initialGameState = {
        gameState: 'lobby', // States: lobby, selectingGenre, inProgress, gameOver
        players: {
            1: { connected: true, score: 0 },
            2: { connected: false, score: 0 }
        },
        hostPlayerId: 1
        // Other game data will be added later
    };

    // Create the game in the Firebase Realtime Database
    await set(ref(db, 'games/' + currentRoomCode), initialGameState);

    // Start listening for changes in this game room
    listenToGameChanges(currentRoomCode);

    // Show the lobby screen
    homescreen.classList.add('hidden');
    lobbyScreen.classList.remove('hidden');
    roomCodeDisplay.textContent = currentRoomCode;
}

// Function to join an existing game
async function joinGame() {
    const code = roomCodeInput.value.toUpperCase();
    if (!code) {
        errorMessage.textContent = 'Please enter a room code.';
        return;
    }
    console.log("Attempting to join game:", code);

    const gameRef = ref(db, 'games/' + code);
    const snapshot = await get(gameRef);

    if (snapshot.exists()) {
        const gameData = snapshot.val();
        if (gameData.players[2].connected) {
            errorMessage.textContent = 'This room is already full.';
        } else {
            // Join as Player 2
            currentRoomCode = code;
            currentPlayerId = 2;
            hostPlayerId = gameData.hostPlayerId;
            
            await set(ref(db, `games/${currentRoomCode}/players/2/connected`), true);
            await set(ref(db, `games/${currentRoomCode}/gameState`), 'selectingGenre'); // Move to next state

            listenToGameChanges(currentRoomCode);
            homescreen.classList.add('hidden');
        }
    } else {
        errorMessage.textContent = 'Room code not found.';
    }
}

// --- MAIN GAME STATE LISTENER ---
// This is the most important function. It listens for ANY change in the game data
// and updates the UI for BOTH players accordingly.
function listenToGameChanges(roomCode) {
    const gameRef = ref(db, 'games/' + roomCode);

    onValue(gameRef, (snapshot) => {
        if (!snapshot.exists()) {
            // Handle game being deleted or not found
            alert("Game room has closed.");
            window.location.reload();
            return;
        }

        const gameData = snapshot.val();
        console.log("Game data updated:", gameData);

        // A router to decide what to show based on the gameState from Firebase
        switch (gameData.gameState) {
            case 'lobby':
                homescreen.classList.add('hidden');
                lobbyScreen.classList.remove('hidden');
                roomCodeDisplay.textContent = roomCode;
                break;
            case 'selectingGenre':
                // Hide other screens
                homescreen.classList.add('hidden');
                lobbyScreen.classList.add('hidden');
                // Show the main app container and the genre selection screen
                appContainer.classList.remove('hidden');
                genreSelectionScreen.classList.remove('hidden');
                gameContainer.classList.add('hidden');
                // Build the genre selection UI
                buildGenreSelectionUI(gameData);
                break;
            case 'inProgress':
                // TODO: Build the main game screen UI
                // This is where you would show the question, options, scores, etc.
                console.log("Game is in progress! Current Question Index:", gameData.currentQuestionIndex);
                break;
            case 'gameOver':
                // TODO: Build the game over screen UI
                console.log("Game is over! Final Scores:", gameData.players);
                break;
        }
    });
}

// --- UI Building Functions ---

function buildGenreSelectionUI(gameData) {
    // This function will create the genre buttons and handle clicks
    genreSelectionScreen.innerHTML = `
        <h1>Trivia Peek - Choose a Genre</h1>
        <p>${currentPlayerId === hostPlayerId ? "You are the host. Please select a genre." : "Waiting for the host to select a genre..."}</p>
        <div id="genre-buttons">
            <button class="genre-btn" data-genre="action">Action</button>
            <button class="genre-btn" data-genre="horror">Horror</button>
            <button class="genre-btn" data-genre="drama">Drama</button>
            <button class="genre-btn" data-genre="suspense">Suspense</button>
            <button class="genre-btn" data-genre="comedy">Comedy</button>
            <button class="genre-btn" data-genre="kids">Kids & Family</button>
        </div>
    `;

    // Only the host can click the genre buttons
    if (currentPlayerId === hostPlayerId) {
        document.querySelectorAll('.genre-btn').forEach(button => {
            button.addEventListener('click', handleGenreSelection);
        });
    }
}

// --- EVENT HANDLERS (Writing to Firebase) ---

function handleGenreSelection(event) {
    const selectedGenre = event.target.dataset.genre;
    console.log("Host selected genre:", selectedGenre);

    // TODO: You would get the questions for the selected genre, shuffle them,
    // and then update the game state in Firebase to move to 'inProgress'.
    
    // Example of updating Firebase:
    const updates = {};
    updates[`/games/${currentRoomCode}/genre`] = selectedGenre;
    updates[`/games/${currentRoomCode}/currentQuestionIndex`] = 0;
    updates[`/games/${currentRoomCode}/gameState`] = 'inProgress'; // Change the state
    
    set(ref(db), updates);
}

// --- INITIAL EVENT LISTENERS ---
createGameBtn.addEventListener('click', createGame);
joinGameBtn.addEventListener('click', joinGame);
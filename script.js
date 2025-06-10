alert("BREADCRUMB 1: Script execution has begun.");

// Import the functions you need from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue, get, update, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

alert("BREADCRUMB 2: Firebase modules have been imported.");

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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

alert("BREADCRUMB 3: Firebase has been initialized.");

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

alert("BREADCRUMB 4: DOM elements have been identified.");

// --- GAME STATE VARIABLES ---
let currentRoomCode = null;
let currentPlayerId = null;
let hostPlayerId = null;

// --- CORE FUNCTIONS ---
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

async function createGame() {
    // [Function code remains the same]
}

async function joinGame() {
    // [Function code remains the same]
}

function listenToGameChanges(roomCode) {
    // [Function code remains the same]
}

function buildGenreSelectionUI(gameData) {
    // [Function code remains the same]
}

async function handleGenreSelection(event) {
    if (currentPlayerId !== hostPlayerId) return;
    const selectedGenre = event.target.dataset.genre;
    try {
        const questionsRef = ref(db, 'questions/' + selectedGenre);
        const snapshot = await get(questionsRef);
        if (snapshot.exists()) {
            const questionsForGenre = snapshot.val();
            // Shuffle and update game state...
        } else {
            alert('Error: Could not find questions for "' + selectedGenre + '" in the database.');
        }
    } catch (error) {
        console.error('Error fetching questions from Firebase:', error);
        alert('Could not start game. Failed to load questions from Firebase.');
    }
}

function updateGameUI(gameData) {
    // [Function code remains the same]
}

async function handleOptionClick(event) {
    // [Function code remains the same]
}

async function nextQuestion() {
    // [Function code remains the same]
}

function displayGameOver(gameData) {
    // [Function code remains the same]
}

// --- INITIALIZATION & EVENT LISTENERS ---
function initializeApp() {
    alert("BREADCRUMB 5: initializeApp function has been called.");

    warningContinueButton?.addEventListener('click', () => {
        localStorage.setItem('triviaPeekWarningSeen', 'true');
        warningScreen.classList.add('hidden');
        homescreen.classList.remove('hidden');
        alert("VICTORY!: The Proceed button was clicked and its function has run!");
    });

    createGameBtn?.addEventListener('click', createGame);
    joinGameBtn?.addEventListener('click', joinGame);
    optionButtons.forEach(button => button.addEventListener('click', handleOptionClick));
    nextQuestionButton?.addEventListener('click', nextQuestion);
    restartButton?.addEventListener('click', async () => { /* ... */ });
    changeGenreButton?.addEventListener('click', async () => { /* ... */ });

    if (localStorage.getItem('triviaPeekWarningSeen') === 'true') {
        warningScreen.classList.add('hidden');
        homescreen.classList.remove('hidden');
    } else {
        warningScreen.classList.remove('hidden');
    }
    
    alert("BREADCRUMB 6: Initial screen has been set.");
}

// Start the entire application logic
initializeApp();
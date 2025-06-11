// DIAGNOSTIC SCRIPT: Firebase Isolation Test
// All Firebase code has been commented out.

/*
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
*/


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
// ... (The rest of the non-Firebase dependent variables are here)

// --- GAME STATE VARIABLES ---
let currentRoomCode = null;
let currentPlayerId = null;
let hostPlayerId = null;

// --- CORE FUNCTIONS (Firebase parts are disabled) ---
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

async function createGame() {
    // Firebase functionality disabled for test
    errorMessage.textContent = "Create Game is disabled for this test.";
    console.log("Create Game clicked (disabled).");
}

async function joinGame() {
    // Firebase functionality disabled for test
    errorMessage.textContent = "Join Game is disabled for this test.";
    console.log("Join Game clicked (disabled).");
}

// All other game functions that rely on Firebase are effectively disabled
// because they won't be called. The important part is initializeApp below.


// --- INITIALIZATION & EVENT LISTENERS ---
function initializeApp() {
    // THIS IS THE MOST IMPORTANT PART OF THE TEST
    warningContinueButton?.addEventListener('click', () => {
        // This code has NO Firebase dependency.
        localStorage.setItem('triviaPeekWarningSeen', 'true');
        warningScreen.classList.add('hidden');
        homescreen.classList.remove('hidden');
    });

    createGameBtn?.addEventListener('click', createGame);
    joinGameBtn?.addEventListener('click', joinGame);
    // Other listeners are not critical for this specific test

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
// Import the functions you need from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue, get, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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

// --- GAME QUESTIONS (MASSIVELY EXPANDED) ---
const allQuestions = {
    action: [
        // ... (all action questions from the previous response)
        {
            question: "In 'Die Hard', what is John McClane's famous catchphrase?",
            options: ["Hasta la vista, baby", "I'll be back", "Yippee-ki-yay, motherf***er", "Get to the choppa!"],
            answer: "Yippee-ki-yay, motherf***er"
        },
        // ... PASTE ALL OTHER ACTION QUESTIONS HERE ...
        {
            question: "In 'Crouching Tiger, Hidden Dragon', what is the name of the legendary sword that is stolen?",
            options: ["The Dragon's Claw", "The Jade Serpent", "Green Destiny", "The Celestial Blade"],
            answer: "Green Destiny"
        }
    ],
    horror: [
        // ... (all horror questions from the previous response)
        {
            question: "What is the name of the demon that possesses Regan MacNeil in 'The Exorcist'?",
            options: ["Azazel", "Beelzebub", "Pazuzu", "Asmodeus"],
            answer: "Pazuzu"
        },
        // ... PASTE ALL OTHER HORROR QUESTIONS HERE ...
        {
            question: "Which horror movie ends with the main character mercy-killing his son and others, only to find out moments later that help had arrived?",
            options: ["The Road", "The Mist", "Children of Men", "28 Days Later"],
            answer: "The Mist"
        }
    ],
    drama: [
        // ... (all drama questions from the previous response)
        {
            question: "In 'The Shawshank Redemption', what is Andy Dufresne wrongly convicted of murdering?",
            options: ["A bank teller", "His business partner", "His wife and her lover", "A prison guard"],
            answer: "His wife and her lover"
        },
        // ... PASTE ALL OTHER DRAMA QUESTIONS HERE ...
        {
            question: "What is the name of the cruise ship that sinks in 'The Poseidon Adventure' (1972)?",
            options: ["SS Poseidon", "SS Neptune", "SS Titanic", "SS Andrea Doria"],
            answer: "SS Poseidon"
        }
    ],
    suspense: [
        // ... (all suspense questions from the previous response)
        {
            question: "In 'The Silence of the Lambs', what kind of insect does Hannibal Lecter associate with Clarice Starling?",
            options: ["A spider", "A butterfly (Death's-head Hawkmoth)", "A beetle", "A praying mantis"],
            answer: "A butterfly (Death's-head Hawkmoth)"
        },
        // ... PASTE ALL OTHER SUSPENSE QUESTIONS HERE ...
        {
            question: "What is the primary setting for the suspenseful horror film 'The Descent'?",
            options: ["A haunted house", "An abandoned space station", "A deep-sea research facility", "An uncharted cave system"],
            answer: "An uncharted cave system"
        }
    ],
    comedy: [
        // ... (all comedy questions from the previous response)
        {
            question: "In 'Dumb and Dumber', what are Harry and Lloyd trying to return to Mary Swanson (last name Samsonite in error)?",
            options: ["Her lost poodle", "A briefcase full of money", "Her prized ski equipment", "A winning lottery ticket"],
            answer: "A briefcase full of money"
        },
        // ... PASTE ALL OTHER COMEDY QUESTIONS HERE ...
        {
            question: "Which actor plays the lead role of 'Ace Ventura: Pet Detective'?",
            options: ["Adam Sandler", "Mike Myers", "Ben Stiller", "Jim Carrey"],
            answer: "Jim Carrey"
        }
    ],
    kids: [
        // ... (all kids questions from the previous response)
        {
            question: "In 'Toy Story', who is Buzz Lightyear's original owner that receives him as a birthday present?",
            options: ["Sid Phillips", "Molly Davis", "Andy Davis", "Bonnie Anderson"],
            answer: "Andy Davis"
        },
        // ... PASTE ALL OTHER KIDS QUESTIONS HERE ...
        {
            question: "In 'Babe', what does the titular pig get trained to do?",
            options: ["Race", "Act in a movie", "Herd sheep", "Perform in a circus"],
            answer: "Herd sheep"
        }
    ]
};

// --- CORE FUNCTIONS ---

// Function to generate a random 4-letter room code
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

async function createGame() {
    console.log("Creating a new game...");
    try {
        currentRoomCode = generateRoomCode();
        currentPlayerId = 1;
        hostPlayerId = 1;

        const initialGameState = {
            gameState: 'lobby',
            players: {
                1: { connected: true, score: 0 },
                2: { connected: false, score: 0 }
            },
            hostPlayerId: 1
        };

        await set(ref(db, 'games/' + currentRoomCode), initialGameState);
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
    console.log("Attempting to join game:", code);
    errorMessage.textContent = ''; // Clear previous errors

    try {
        const gameRef = ref(db, 'games/' + code);
        const snapshot = await get(gameRef);

        if (snapshot.exists()) {
            const gameData = snapshot.val();
            // Check if player 2 is already connected.
            if (gameData.players && gameData.players[2] && gameData.players[2].connected) {
                errorMessage.textContent = 'This room is already full.';
            } else {
                currentRoomCode = code;
                currentPlayerId = 2;
                hostPlayerId = gameData.hostPlayerId;

                const updates = {};
                updates[`players/2/connected`] = true;
                updates[`gameState`] = 'selectingGenre';

                await update(ref(db, `games/${currentRoomCode}`), updates);
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
    const gameRef = ref(db, 'games/' + roomCode);

    onValue(gameRef, (snapshot) => {
        if (!snapshot.exists()) {
            alert("Game room has closed or does not exist.");
            window.location.reload();
            return;
        }

        const gameData = snapshot.val();
        console.log("Game state change detected:", gameData.gameState);

        // Hide all major screen containers first
        homescreen.classList.add('hidden');
        lobbyScreen.classList.add('hidden');
        appContainer.classList.add('hidden');

        // Show the correct screen based on game state
        switch (gameData.gameState) {
            case 'lobby':
                lobbyScreen.classList.remove('hidden');
                roomCodeDisplay.textContent = roomCode;
                break;
            case 'selectingGenre':
                appContainer.classList.remove('hidden');
                genreSelectionScreen.classList.remove('hidden');
                gameContainer.classList.add('hidden');
                buildGenreSelectionUI(gameData);
                break;
            case 'inProgress':
                appContainer.classList.remove('hidden');
                gameContainer.classList.remove('hidden');
                genreSelectionScreen.classList.add('hidden');
                gameOverSection.classList.add('hidden');
                updateGameUI(gameData);
                break;
            case 'gameOver':
                appContainer.classList.remove('hidden');
                gameContainer.classList.remove('hidden');
                genreSelectionScreen.classList.add('hidden');
                updateGameUI(gameData); // Update final scores
                // Hide active game elements and show game over section
                questionArea.classList.add('hidden');
                optionsArea.classList.add('hidden');
                turnIndicator.classList.add('hidden');
                feedbackMessage.textContent = '';
                gameOverSection.classList.remove('hidden');
                // TODO: Populate winner message in a future step
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
            <button class="genre-btn" data-genre="kids">Kids & Family</button>
        </div>
    `;

    if (currentPlayerId === gameData.hostPlayerId) {
        document.querySelectorAll('.genre-btn').forEach(button => {
            button.addEventListener('click', handleGenreSelection);
        });
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleGenreSelection(event) {
    if (currentPlayerId !== hostPlayerId) return;

    const selectedGenre = event.target.dataset.genre;
    console.log("Host selected genre:", selectedGenre);

    const questionsForGenre = allQuestions[selectedGenre].filter(q => q.options && q.options.length === 4 && q.answer);
    shuffleArray(questionsForGenre);

    const updates = {};
    updates[`/genre`] = selectedGenre;
    updates[`/shuffledQuestions`] = questionsForGenre;
    updates[`/currentQuestionIndex`] = 0;
    updates[`/players/1/score`] = 0;
    updates[`/players/2/score`] = 0;
    updates[`/turnState`] = { player: 1, answer: null };
    updates[`/gameState`] = 'inProgress';

    update(ref(db, `games/${currentRoomCode}`), updates);
}

function updateGameUI(gameData) {
    if (!gameData || !gameData.players) return;

    player1ScoreDisplay.textContent = gameData.players[1]?.score || 0;
    player2ScoreDisplay.textContent = gameData.players[2]?.score || 0;

    const currentTurnPlayer = gameData.turnState?.player;
    if (turnIndicator) turnIndicator.textContent = `Player ${currentTurnPlayer}'s Turn`;

    const questionIndex = gameData.currentQuestionIndex;
    if (gameData.shuffledQuestions && questionIndex < gameData.shuffledQuestions.length) {
        const currentQ = gameData.shuffledQuestions[questionIndex];

        questionText.textContent = currentQ.question;

        optionButtons.forEach((button, index) => {
            button.textContent = currentQ.options[index];
            button.disabled = false;
            button.className = 'option-btn';
        });

        nextQuestionButton.classList.add('hidden');
        feedbackMessage.textContent = '';
    } else if (gameData.gameState !== 'gameOver') {
        if (currentPlayerId === hostPlayerId) {
            update(ref(db, `games/${currentRoomCode}`), { gameState: 'gameOver' });
        }
    }
}

function handleOptionClick(event) {
    // TODO: This is the next major function to build.
    console.log("Option clicked. Logic to be implemented.");
    alert("Handling answers is the next step to code!");
}

// --- INITIALIZATION & EVENT LISTENERS ---
function initializeAppLogic() {
    console.log("Attaching event listeners...");

    if (warningContinueButton) {
        warningContinueButton.addEventListener('click', () => {
            console.log("Proceed button clicked!");
            warningScreen.classList.add('hidden');
            homescreen.classList.remove('hidden');
        });
    } else {
        console.error("FATAL: Could not find the 'warning-continue-button'. Check HTML ID.");
    }

    if (createGameBtn) {
        createGameBtn.addEventListener('click', createGame);
    } else {
        console.error("FATAL: Could not find the 'create-game-btn'. Check HTML ID.");
    }
    
    if (joinGameBtn) {
        joinGameBtn.addEventListener('click', joinGame);
    } else {
        console.error("FATAL: Could not find the 'join-game-btn'. Check HTML ID.");
    }

    optionButtons.forEach(button => button.addEventListener('click', handleOptionClick));
    // nextQuestionButton and restartButton listeners will be added or refactored later
}

// Start the app
initializeAppLogic();
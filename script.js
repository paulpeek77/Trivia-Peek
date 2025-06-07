document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const warningScreen = document.getElementById('warning-screen');
    const warningContinueButton = document.getElementById('warning-continue-button');
    const appContainer = document.getElementById('app-container');
    const genreSelectionScreen = document.getElementById('genre-selection-screen');
    const gameContainer = document.getElementById('game-container');
    const genreButtons = document.querySelectorAll('.genre-btn');
    const genreFeedback = document.getElementById('genre-feedback');
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

    // Game Questions
    const allQuestions = {
        action: [
            {
                question: "In 'Die Hard', what is John McClane's famous catchphrase?",
                options: ["Hasta la vista, baby", "I'll be back", "Yippee-ki-yay, motherf***er", "Get to the choppa!"],
                answer: "Yippee-ki-yay, motherf***er"
            },
            {
                question: "What vehicle is prominently featured in 'Mad Max: Fury Road'?",
                options: ["The Gigahorse", "The Nux Car", "The Doof Wagon", "The War Rig"],
                answer: "The War Rig"
            },
            {
                question: "In 'Terminator 2: Judgment Day', what is the model number of the liquid metal Terminator?",
                options: ["T-800", "T-1000", "T-X", "Skynet Model 101"],
                answer: "T-1000"
            },
            {
                question: "What color pill does Neo take in 'The Matrix' to learn the truth?",
                options: ["Blue pill", "Green pill", "Red pill", "Yellow pill"],
                answer: "Red pill"
            },
            {
                question: "What is the primary motivation for John Wick's return to his old life in the first 'John Wick' film?",
                options: ["His car was stolen", "A bounty was placed on him", "The killing of his puppy", "His house was burned down"],
                answer: "The killing of his puppy"
            },
            {
                question: "Which fictional spy is known for the code number 007?",
                options: ["Ethan Hunt", "Jason Bourne", "James Bond", "Jack Ryan"],
                answer: "James Bond"
            },
            {
                question: "What is the name of the main protagonist in the 'Mission: Impossible' film series?",
                options: ["James Bond", "Ethan Hunt", "Jason Bourne", "Jack Reacher"],
                answer: "Ethan Hunt"
            },
            {
                question: "In 'Gladiator', what is Maximus's former military rank before being betrayed?",
                options: ["Centurion", "Legate", "Tribune", "General"],
                answer: "General"
            },
            {
                question: "What weapon does Indiana Jones famously wield in addition to his revolver?",
                options: ["A machete", "A bullwhip", "A crossbow", "A spear"],
                answer: "A bullwhip"
            },
            {
                question: "Which Marvel superhero is known as the 'First Avenger'?",
                options: ["Iron Man", "Thor", "Captain America", "Hulk"],
                answer: "Captain America"
            },
            {
                question: "In 'The Dark Knight', what type of vehicle does the Joker primarily use for his bank heist?",
                options: ["An armored truck", "A motorcycle", "A school bus", "A garbage truck"],
                answer: "A school bus"
            },
            {
                question: "Which martial arts legend starred in 'Enter the Dragon' (1973)?",
                options: ["Jackie Chan", "Jet Li", "Donnie Yen", "Bruce Lee"],
                answer: "Bruce Lee"
            },
            {
                question: "What is the name of the airborne unit in 'Apocalypse Now' known for playing Wagner's 'Ride of the Valkyries'?",
                options: ["101st Airborne", "1st Air Cavalry Division", "Delta Force", "Navy SEALs"],
                answer: "1st Air Cavalry Division"
            },
            {
                question: "In 'Kill Bill: Vol. 1', what is The Bride's real name, eventually revealed?",
                options: ["Elle Driver", "O-Ren Ishii", "Beatrix Kiddo", "Vernita Green"],
                answer: "Beatrix Kiddo"
            },
            {
                question: "What is the name of the futuristic, dystopian city in 'Blade Runner' (1982)?",
                options: ["Neo Tokyo", "Mega-City One", "Zion", "Los Angeles"],
                answer: "Los Angeles"
            },
            {
                question: "Who directed the acclaimed 1995 crime film 'Heat', starring Al Pacino and Robert De Niro?",
                options: ["Martin Scorsese", "Quentin Tarantino", "Michael Mann", "Ridley Scott"],
                answer: "Michael Mann"
            },
            {
                question: "What is the name of Mad Max's iconic black pursuit special vehicle in 'The Road Warrior'?",
                options: ["Pursuit Special (V8 Interceptor)", "The Gigahorse", "The War Rig", "The Nux Car"],
                answer: "Pursuit Special (V8 Interceptor)"
            },
            {
                question: "In 'Predator', what is the Predator's shoulder-mounted energy weapon called?",
                options: ["Pulse Rifle", "Smart Disc", "Plasma Caster", "Netgun"],
                answer: "Plasma Caster"
            },
            {
                question: "What specific artifact does Indiana Jones retrieve from the temple at the beginning of 'Raiders of the Lost Ark'?",
                options: ["The Sankara Stone", "The Holy Grail", "The Crystal Skull", "The Chachapoyan Fertility Idol"],
                answer: "The Chachapoyan Fertility Idol"
            },
            {
                question: "What is the name of Dom Toretto's crew/family often referred to as in 'The Fast and the Furious' series?",
                options: ["The Syndicate", "The Nightcrawlers", "The Wrenchmen", "La Familia / The Family / His Crew"], 
                answer: "La Familia / The Family / His Crew"
            },
            {
                question: "In 'Aliens' (1986), what is the name of the tough Colonial Marine sergeant who leads the initial squad?",
                options: ["Sgt. Apone", "Cpl. Hicks", "Pvt. Hudson", "Pvt. Vasquez"],
                answer: "Sgt. Apone"
            },
            {
                question: "What cherished item does Léon, the hitman in 'Léon: The Professional', care for meticulously?",
                options: ["A bonsai tree", "A houseplant (Aglaonema)", "A pet cat", "A collection of opera records"],
                answer: "A houseplant (Aglaonema)"
            },
            {
                question: "In the movie 'Speed' (1994), what is the minimum speed the bus must maintain to prevent a bomb from exploding?",
                options: ["55 mph", "60 mph", "45 mph", "50 mph"],
                answer: "50 mph"
            },
            {
                question: "What signature weapon is John Rambo most skilled with in 'First Blood'?",
                options: ["M60 machine gun", "Compound bow", "Combat knife", "Rocket launcher"],
                answer: "Combat knife"
            },
            {
                question: "Which actor originally played Max Rockatansky in the 'Mad Max' trilogy (1979-1985)?",
                options: ["Tom Hardy", "Mel Gibson", "Kurt Russell", "Hugh Jackman"],
                answer: "Mel Gibson"
            },
            {
                question: "What is the name of the deadly martial arts tournament a Shaolin monk is invited to in 'Enter the Dragon'?",
                options: ["Kumite", "Han's Island Tournament", "Bloodsport Championship", "The Iron Fist Tournament"],
                answer: "Han's Island Tournament"
            },
            {
                question: "In 'Taken' (2008), what is Bryan Mills' famous quote about his skills?",
                options: ["I will find you, and I will kill you.", "I have a very particular set of skills.", "They're going to regret this.", "Nobody takes my daughter."],
                answer: "I have a very particular set of skills."
            },
            {
                question: "What type of advanced fighter jet does Maverick fly in 'Top Gun'?",
                options: ["F-22 Raptor", "F-16 Fighting Falcon", "F-14 Tomcat", "F/A-18 Hornet"],
                answer: "F-14 Tomcat"
            },
            {
                question: "In 'Point Break' (1991), what extreme sport are the bank robbers, led by Bodhi, passionate about?",
                options: ["Skydiving", "Motocross", "Surfing", "Rock climbing"],
                answer: "Surfing"
            },
            {
                question: "What is the name of the fictional British intelligence agency James Bond works for?",
                options: ["CIA", "KGB", "MI6", "Mossad"],
                answer: "MI6"
            },
            {
                question: "In 'The Fugitive' (1993), Dr. Richard Kimble is wrongly accused of murdering whom?",
                options: ["His colleague", "His patient", "His wife", "His neighbor"],
                answer: "His wife"
            },
            {
                question: "What is the name of the rebellious AI in 'The Matrix' that created the simulated reality?",
                options: ["The Oracle", "The Architect", "Skynet", "Deus Ex Machina"],
                answer: "The Architect" 
            },
            {
                question: "Which historical battle is depicted in the opening scene of 'Saving Private Ryan'?",
                options: ["Battle of the Bulge", "D-Day (Omaha Beach)", "Battle of Stalingrad", "Pearl Harbor"],
                answer: "D-Day (Omaha Beach)"
            },
            {
                question: "In 'John Wick: Chapter 2', where is the 'neutral territory' hotel for assassins located?",
                options: ["The Continental Hotel, New York", "The Excelsior, Rome", "The Imperial, Tokyo", "The Grand Budapest, Zubrowka"],
                answer: "The Continental Hotel, New York"
            },
            {
                question: "What is the primary weapon used by Robocop?",
                options: ["Plasma Rifle", "Auto-9 pistol", "Shoulder-mounted rocket", "Laser cannon"],
                answer: "Auto-9 pistol"
            },
            {
                question: "In 'Die Hard with a Vengeance', who is Simon Gruber's brother?",
                options: ["John McClane", "Zeus Carver", "Hans Gruber", "Karl Vreski"],
                answer: "Hans Gruber"
            },
            {
                question: "What city serves as the primary setting for 'Escape from New York'?",
                options: ["Los Angeles", "Chicago", "New York City (Manhattan)", "Washington D.C."],
                answer: "New York City (Manhattan)"
            },
            {
                question: "Which character in 'The Expendables' franchise is known for using throwing knives?",
                options: ["Barney Ross", "Lee Christmas", "Gunnar Jensen", "Toll Road"],
                answer: "Lee Christmas"
            },
            {
                question: "What precious metal are the villains seeking in 'The Good, the Bad and the Ugly'?",
                options: ["Silver bars", "Confederate gold", "Aztec treasure", "Diamonds"],
                answer: "Confederate gold"
            },
            {
                question: "In 'True Lies', what is Harry Tasker's (Arnold Schwarzenegger) cover job to his wife?",
                options: ["Software Engineer", "Salesman (Computer Sales)", "Accountant", "Construction Worker"],
                answer: "Salesman (Computer Sales)"
            },
            {
                question: "In 'The Bourne Identity', what item found surgically implanted in Jason Bourne's hip provides the first clue to his identity?",
                options: ["A microchip", "A key", "A laser projector with a bank account number", "A coded message"],
                answer: "A laser projector with a bank account number"
            },
            {
                question: "What is the name of the special forces unit led by Arnold Schwarzenegger in 'Predator'?",
                options: ["Delta Force", "Special Activities Division", "The Commandos", "MAJ 'Dutch' Schaefer's private military company"],
                answer: "MAJ 'Dutch' Schaefer's private military company"
            },
            {
                question: "In 'Lethal Weapon', what is Sergeant Murtagh's catchphrase expressing his fatigue with dangerous situations?",
                options: ["'I'm getting too old for this stuff.'", "'Just one more day 'til retirement.'", "'Why is it always me?'", "'This is not in my job description.'"],
                answer: "'I'm getting too old for this stuff.'"
            },
            {
                question: "Which 1997 film features Nicolas Cage as a wrongly convicted ex-con aboard a prison transport plane full of criminals?",
                options: ["Face/Off", "The Rock", "Con Air", "Gone in 60 Seconds"],
                answer: "Con Air"
            },
            {
                question: "What is the name of the program that created super-soldiers like Captain America in the MCU?",
                options: ["The Weapon X Program", "The Super-Soldier Serum Project", "Project Rebirth", "The Avengers Initiative"],
                answer: "Project Rebirth"
            },
            {
                question: "In 'Baby Driver', what medical condition requires Baby to listen to music constantly?",
                options: ["Hyperacusis", "Vertigo", "Tinnitus", "Synesthesia"],
                answer: "Tinnitus"
            },
            {
                question: "What is the name of the elite police unit that Judge Dredd belongs to in 'Dredd' (2012)?",
                options: ["The Arbitrators", "The Hall of Justice", "The Street Judges", "The Peacekeepers"],
                answer: "The Street Judges"
            },
            {
                question: "In 'Casino Royale' (2006), what high-stakes card game does James Bond play against Le Chiffre?",
                options: ["Baccarat", "Blackjack", "Texas Hold'em Poker", "Bridge"],
                answer: "Texas Hold'em Poker"
            },
            {
                question: "Which city is the primary setting for the 2011 action film 'The Raid: Redemption'?",
                options: ["Bangkok, Thailand", "Hong Kong", "Manila, Philippines", "Jakarta, Indonesia"],
                answer: "Jakarta, Indonesia"
            },
            {
                question: "In 'Face/Off', what is the profession of Sean Archer (John Travolta) before he undergoes the face-transplant procedure?",
                options: ["FBI Special Agent", "CIA Operative", "Police Detective", "U.S. Marshal"],
                answer: "FBI Special Agent"
            },
            {
                question: "What vehicle does the protagonist use to make a daring escape from Alcatraz in 'The Rock'?",
                options: ["A helicopter", "A speed boat", "A stolen tourist ferry", "A rocket-propelled mine cart"],
                answer: "A rocket-propelled mine cart"
            },
            {
                question: "In '300', what is King Leonidas' famous response to the Persian demand to lay down their weapons?",
                options: ["'This is Sparta!'", "'We will never surrender!'", "'Come and get them!'", "'For freedom!'"],
                answer: "'Come and get them!'"
            },
            {
                question: "What is the name of the AI that assists Tony Stark in his Iron Man suit?",
                options: ["J.A.R.V.I.S.", "Ultron", "F.R.I.D.A.Y.", "Karen"],
                answer: "J.A.R.V.I.S."
            },
            {
                question: "Which Quentin Tarantino film features a group of Jewish-American soldiers hunting Nazis in WWII?",
                options: ["Pulp Fiction", "Reservoir Dogs", "Inglourious Basterds", "Django Unchained"],
                answer: "Inglourious Basterds"
            },
            {
                question: "In 'Edge of Tomorrow', what is the name of the alien race humanity is fighting against?",
                options: ["The Chitauri", "The Formics", "The Mimics", "The Ceph"],
                answer: "The Mimics"
            },
            {
                question: "Which actor plays the main antagonist, Bane, in 'The Dark Knight Rises'?",
                options: ["Heath Ledger", "Cillian Murphy", "Liam Neeson", "Tom Hardy"],
                answer: "Tom Hardy"
            },
            {
                question: "What is the title of the secret organization that challenges John Wick in 'John Wick: Chapter 3 – Parabellum'?",
                options: ["The Syndicate", "The League of Assassins", "The High Table", "The Order of Wick"],
                answer: "The High Table"
            },
            {
                question: "In 'Mad Max: Fury Road', what do the characters call gasoline?",
                options: ["Aqua-Cola", "Mother's Milk", "Guzzoline", "Nux-fuel"],
                answer: "Guzzoline"
            },
            {
                question: "What is the name of the protagonist in the 'Ip Man' film series, a master of Wing Chun?",
                options: ["Chen Zhen", "Wong Fei-hung", "Ip Man", "Fong Sai-yuk"],
                answer: "Ip Man"
            },
            {
                question: "In 'Crouching Tiger, Hidden Dragon', what is the name of the legendary sword that is stolen?",
                options: ["The Dragon's Claw", "The Jade Serpent", "Green Destiny", "The Celestial Blade"],
                answer: "Green Destiny"
            }
        ],
        horror: [
            {
                question: "What is the name of the demon that possesses Regan MacNeil in 'The Exorcist'?",
                options: ["Azazel", "Beelzebub", "Pazuzu", "Asmodeus"],
                answer: "Pazuzu"
            },
            {
                question: "Who is the dream-haunting villain in 'A Nightmare on Elm Street'?",
                options: ["Jason Voorhees", "Michael Myers", "Leatherface", "Freddy Krueger"],
                answer: "Freddy Krueger"
            },
            {
                question: "What is the name of the hotel in Stanley Kubrick's 'The Shining'?",
                options: ["The Bates Motel", "The Overlook Hotel", "The Grand Budapest Hotel", "Hotel California"],
                answer: "The Overlook Hotel"
            },
            {
                question: "In 'Halloween', what is the name of Michael Myers' hometown?",
                options: ["Springwood, Ohio", "Haddonfield, Illinois", "Derry, Maine", "Crystal Lake, New Jersey"],
                answer: "Haddonfield, Illinois"
            },
            {
                question: "What is the name of the camp where Jason Voorhees supposedly drowned in 'Friday the 13th'?",
                options: ["Camp Blood", "Camp Arawak", "Camp Crystal Lake", "Camp Stillwater"],
                answer: "Camp Crystal Lake"
            },
            {
                question: "Which classic horror film features a famous shower scene scored by Bernard Herrmann?",
                options: ["The Texas Chainsaw Massacre", "Psycho", "Halloween", "The Exorcist"],
                answer: "Psycho"
            },
            {
                question: "In Jordan Peele's 'Get Out', what is the terrifying procedure the Armitage family performs?",
                options: ["Brainwashing", "The Coagula Procedure", "Soul Transference", "Hypnotherapy"],
                answer: "The Coagula Procedure"
            },
            {
                question: "What creature is the primary antagonist in the 'Alien' franchise, known for its acidic blood?",
                options: ["Predator", "Yautja", "Xenomorph", "Neomorph"],
                answer: "Xenomorph"
            },
            {
                question: "What type of doll is Chucky in the 'Child's Play' series?",
                options: ["A Cabbage Patch Kid", "A My Buddy doll", "A Raggedy Ann doll", "A Good Guy doll"],
                answer: "A Good Guy doll"
            },
            {
                question: "In 'The Texas Chainsaw Massacre' (1974), what is Leatherface's signature weapon?",
                options: ["A Machete", "An Axe", "A Chainsaw", "A Cleaver"],
                answer: "A Chainsaw"
            },
            {
                question: "Which film features a demonic entity named 'Valak' that often appears as a nun?",
                options: ["Insidious", "Sinister", "The Conjuring 2", "Annabelle: Creation"],
                answer: "The Conjuring 2"
            },
            {
                question: "In 'A Quiet Place', what sense do the creatures primarily use to hunt their prey?",
                options: ["Sight", "Smell", "Touch", "Hearing"],
                answer: "Hearing"
            },
            {
                question: "What is the name of the cursed videotape in the American version of 'The Ring'?",
                options: ["The Grudge Tape", "The Samara Tape", "The Well Video", "It is unnamed"],
                answer: "It is unnamed"
            },
            {
                question: "What is the profession of Dr. Hannibal Lecter, as introduced in 'The Silence of the Lambs'?",
                options: ["Surgeon", "Forensic Pathologist", "Forensic Psychiatrist", "Medical Examiner"],
                answer: "Forensic Psychiatrist"
            },
            {
                question: "In 'Hereditary', what distinct sound is infamously associated with Charlie Graham before her demise?",
                options: ["A cough", "A whistle", "A hum", "A tongue click"],
                answer: "A tongue click"
            },
            {
                question: "What is the primary setting (town name) for Stephen King's 'It'?",
                options: ["Castle Rock", "Jerusalem's Lot", "Haven", "Derry"],
                answer: "Derry"
            },
            {
                question: "Which found-footage film tells the story of three student filmmakers who disappear in the woods while investigating a local legend?",
                options: ["Paranormal Activity", "Cloverfield", "REC", "The Blair Witch Project"],
                answer: "The Blair Witch Project"
            },
            {
                question: "What is the name of the iconic vampire in Bram Stoker's novel, frequently adapted into films?",
                options: ["Nosferatu", "Lestat", "Angelus", "Count Dracula"],
                answer: "Count Dracula"
            },
            {
                question: "Which George A. Romero film is widely credited with creating the modern zombie genre in 1968?",
                options: ["Dawn of the Dead", "Day of the Dead", "Land of the Dead", "Night of the Living Dead"],
                answer: "Night of the Living Dead"
            },
            {
                question: "In 'Jaws' (1975), what is the name of the police chief who hunts the shark?",
                options: ["Matt Hooper", "Quint", "Martin Brody", "Larry Vaughn"],
                answer: "Martin Brody"
            },
            {
                question: "What item is used to ward off vampires in many traditional lores and films, like 'Dracula' (1931)?",
                options: ["Silver bullets", "Sunlight", "Garlic", "Holy water"],
                answer: "Garlic" 
            },
            {
                question: "Which horror film features a group of friends terrorized by a family of cannibals in rural Texas?",
                options: ["The Hills Have Eyes", "Wrong Turn", "The Texas Chainsaw Massacre", "House of 1000 Corpses"],
                answer: "The Texas Chainsaw Massacre" 
            },
            {
                question: "What is the name of the demonic doll in 'The Conjuring' universe, first appearing in 'The Conjuring'?",
                options: ["Chucky", "Annabelle", "Billy (Saw)", "Brahms"],
                answer: "Annabelle"
            },
            {
                question: "In John Carpenter's 'The Thing' (1982), what is the nature of the alien creature?",
                options: ["A parasitic slug", "An energy being", "A shapeshifting organism", "A giant insect"],
                answer: "A shapeshifting organism"
            },
            {
                question: "What type of animal is 'Cujo' in Stephen King's novel and film adaptation?",
                options: ["A rabid German Shepherd", "A rabid St. Bernard", "A rabid Doberman", "A rabid Rottweiler"],
                answer: "A rabid St. Bernard"
            },
            {
                question: "Which horror film is known for its tagline: 'In space, no one can hear you scream'?",
                options: ["Event Horizon", "Lifeforce", "Alien", "Sunshine"],
                answer: "Alien"
            },
            {
                question: "What is the name of the Cenobite leader with pins in his head in the 'Hellraiser' series?",
                options: ["Chatterer", "Butterball", "Pinhead", "The Engineer"],
                answer: "Pinhead"
            },
            {
                question: "In 'Scream' (1996), what is the killer's masked persona called?",
                options: ["Ghostface", "Stab Mask", "The Woodsboro Killer", "Slasher"],
                answer: "Ghostface"
            },
            {
                question: "What is the name of the fictional New England town in many of H.P. Lovecraft's stories, often depicted in films?",
                options: ["Dunwich", "Innsmouth", "Arkham", "Salem"],
                answer: "Arkham" 
            },
            {
                question: "Which horror film features a character saying, 'They're coming to get you, Barbara'?",
                options: ["Dawn of the Dead", "The Return of the Living Dead", "Night of the Living Dead", "Zombieland"],
                answer: "Night of the Living Dead"
            },
            {
                question: "What object serves as a gateway to a realm of demons in 'The Evil Dead' series?",
                options: ["A cursed amulet", "The Necronomicon Ex-Mortis (Book of the Dead)", "A haunted mirror", "An ancient Ouija board"],
                answer: "The Necronomicon Ex-Mortis (Book of the Dead)"
            },
            {
                question: "In 'It Follows' (2014), how is the supernatural entity passed from person to person?",
                options: ["Through a cursed object", "By looking at it", "Through sexual intercourse", "By speaking its name"],
                answer: "Through sexual intercourse"
            },
            {
                question: "What is the name of the antagonist in the 'Saw' franchise, known for his elaborate traps?",
                options: ["Jigsaw (John Kramer)", "Billy the Puppet", "Detective Hoffman", "Amanda Young"],
                answer: "Jigsaw (John Kramer)"
            },
            {
                question: "Which film, directed by Alfred Hitchcock, is often considered a precursor to the slasher genre?",
                options: ["The Birds", "Vertigo", "Rear Window", "Psycho"],
                answer: "Psycho"
            },
            {
                question: "What is the primary monster in Mary Shelley's 'Frankenstein', often depicted in film?",
                options: ["A vampire", "A werewolf", "A reanimated corpse (Frankenstein's Monster)", "A golem"],
                answer: "A reanimated corpse (Frankenstein's Monster)"
            },
            {
                question: "In 'The Babadook', what form does the titular creature initially take?",
                options: ["A shadow figure", "A character in a children's pop-up book", "A disembodied voice", "A large black dog"],
                answer: "A character in a children's pop-up book"
            },
            {
                question: "What phrase must be spoken three times in front of a mirror to summon the titular spirit in 'Candyman'?",
                options: ["Bloody Mary", "Beetlejuice", "Candyman", "Here I come"],
                answer: "Candyman"
            },
            {
                question: "Which Japanese horror film, later remade in the US, features a vengeful spirit named Sadako/Samara associated with a cursed videotape?",
                options: ["Ju-On: The Grudge", "Dark Water", "Audition", "Ringu (Ring)"],
                answer: "Ringu (Ring)"
            },
            {
                question: "What is the title of the controversial 1932 horror film directed by Tod Browning featuring real circus performers with disabilities?",
                options: ["The Monster", "Freaks", "Sideshow", "Carnival of Souls"],
                answer: "Freaks"
            },
            {
                question: "In 'The Witch' (2015), what is the name of the family's goat, suspected of being a familiar of Satan?",
                options: ["Black Bart", "Black Tom", "Black Phillip", "Blackheart"],
                answer: "Black Phillip"
            },
            {
                question: "Which horror film is shot entirely from the perspective of a character's webcam and computer screen?",
                options: ["The Den", "Searching", "Unfriended", "Megan is Missing"],
                answer: "Unfriended"
            },
            {
                question: "In David Cronenberg's 'The Fly', what is Seth Brundle's profession?",
                options: ["Biologist", "Chemist", "Physicist", "Geneticist"],
                answer: "Physicist"
            },
            {
                question: "What is the famous tagline for the 1979 film 'The Amityville Horror'?",
                options: ["'Some houses are born bad.'", "'For God's sake, get out!'", "'Based on a true story.'", "'You'll never sleep again.'"],
                answer: "'For God's sake, get out!'"
            },
            {
                question: "In '28 Days Later', what causes the zombie-like apocalypse?",
                options: ["A parasitic fungus", "A nuclear fallout", "An airborne virus ('Rage')", "A supernatural curse"],
                answer: "An airborne virus ('Rage')"
            },
            {
                question: "What is the profession of the main characters, Ed and Lorraine Warren, in 'The Conjuring' universe?",
                options: ["Exorcists", "Paranormal Investigators", "Occult Detectives", "Demonologists"],
                answer: "Paranormal Investigators"
            },
            {
                question: "Which 1982 film, co-written by Steven Spielberg, features a family haunted by ghosts who communicate through their television?",
                options: ["The Fog", "Poltergeist", "The Entity", "The Changeling"],
                answer: "Poltergeist"
            },
            {
                question: "In the film 'Midsommar', where does the midsummer festival that the main characters attend take place?",
                options: ["Norway", "Denmark", "Sweden", "Finland"],
                answer: "Sweden"
            },
            {
                question: "What is the name of the serial killer who possesses the Chucky doll in 'Child's Play'?",
                options: ["Eddie Caputo", "Andy Barclay", "Charles Lee Ray", "Mike Norris"],
                answer: "Charles Lee Ray"
            },
            {
                question: "In 'Rosemary's Baby', what is the name of Rosemary's suspiciously friendly, elderly neighbors?",
                options: ["The Kopeskes", "The Tanners", "The Castevets", "The Gordons"],
                answer: "The Castevets"
            },
            {
                question: "What is the setting for the majority of the original 'Saw' film?",
                options: ["A warehouse", "A police station", "An abandoned hospital", "A derelict bathroom"],
                answer: "A derelict bathroom"
            },
            {
                question: "Which Guillermo del Toro film features a young girl, Ofelia, discovering a mythical world during the Spanish Civil War?",
                options: ["The Devil's Backbone", "The Shape of Water", "Crimson Peak", "Pan's Labyrinth"],
                answer: "Pan's Labyrinth"
            },
            {
                question: "In the movie 'Us' by Jordan Peele, what are the doppelgängers called?",
                options: ["The Shadows", "The Others", "The Untethered", "The Tethered"],
                answer: "The Tethered"
            },
            {
                question: "What classic monster is the antagonist in 'An American Werewolf in London'?",
                options: ["A Vampire", "A Frankenstein's Monster", "A Werewolf", "A Mummy"],
                answer: "A Werewolf"
            },
            {
                question: "Which horror movie features the line, 'What's your favorite scary movie?'",
                options: ["I Know What You Did Last Summer", "Urban Legend", "Scream", "Final Destination"],
                answer: "Scream"
            },
            {
                question: "In 'The Cabin in the Woods', what is the purpose of the 'ritual' involving the college students?",
                options: ["To create a new monster", "To appease the 'Ancient Ones'", "A scientific experiment", "A reality TV show"],
                answer: "To appease the 'Ancient Ones'"
            },
            {
                question: "What is the name of the hotel room that is the focus of the horror film '1408'?",
                options: ["Room 237", "Room 1408", "Room 666", "Room 13"],
                answer: "Room 1408"
            },
            {
                question: "Which of these films is a well-known South Korean zombie horror film?",
                options: ["The Host", "The Wailing", "I Saw the Devil", "Train to Busan"],
                answer: "Train to Busan"
            },
            {
                question: "In 'Black Swan', what ballet role does Nina Sayers obsessively pursue?",
                options: ["The Sugar Plum Fairy in The Nutcracker", "Giselle in Giselle", "The Swan Queen in Swan Lake", "Kitri in Don Quixote"],
                answer: "The Swan Queen in Swan Lake"
            },
            {
                question: "What is the name of the asylum in 'Shutter Island', where Teddy Daniels investigates a disappearance?",
                options: ["Briarcliff Manor", "Ashecliffe Hospital", "Pennhurst Asylum", "Arkham Asylum"],
                answer: "Ashecliffe Hospital"
            }
        ],
        drama: [
            {
                question: "In 'The Shawshank Redemption', what is Andy Dufresne wrongly convicted of murdering?",
                options: ["A bank teller", "His business partner", "His wife and her lover", "A prison guard"],
                answer: "His wife and her lover"
            },
            {
                question: "According to Forrest Gump, 'Life is like a...'?",
                options: ["Rollercoaster, just gotta ride it", "Box of chocolates, you never know what you're gonna get", "Hurricane, it's a mess but it passes", "Dream, then you wake up"],
                answer: "Box of chocolates, you never know what you're gonna get"
            },
            {
                question: "What is the name of the newspaper magnate in 'Citizen Kane'?",
                options: ["William Randolph Hearst", "Joseph Pulitzer", "Charles Foster Kane", "Perry White"],
                answer: "Charles Foster Kane"
            },
            {
                question: "In 'Good Will Hunting', what subject is Will a prodigious, self-taught genius in?",
                options: ["Physics", "Literature", "Computer Science", "Mathematics"],
                answer: "Mathematics"
            },
            {
                question: "What is the name of the lawyer who defends Tom Robinson in 'To Kill a Mockingbird'?",
                options: ["Henry Drummond", "Atticus Finch", "Jake Brigance", "Vincent Gambini"],
                answer: "Atticus Finch"
            },
            {
                question: "Which film, directed by Steven Spielberg, won the Best Picture Oscar for 1993 and depicted the Holocaust?",
                options: ["Saving Private Ryan", "The Pianist", "Life is Beautiful", "Schindler's List"],
                answer: "Schindler's List"
            },
            {
                question: "In 'The Godfather', what is Vito Corleone's famous line about an offer?",
                options: ["It's an offer you can't pass up.", "I'm gonna make him an offer he can't refuse.", "This offer is too good to be true.", "Take the offer, or else."],
                answer: "I'm gonna make him an offer he can't refuse."
            },
            {
                question: "What is the name of the mental institution in 'One Flew Over the Cuckoo's Nest'?",
                options: ["Arkham Asylum", "Oregon State Hospital", "Bedlam Institute", "Shutter Island Asylum"],
                answer: "Oregon State Hospital"
            },
            {
                question: "In 'Dead Poets Society', what Latin phrase meaning 'Seize the day' does John Keating emphasize?",
                options: ["Caveat Emptor", "Carpe Diem", "Veni Vidi Vici", "E Pluribus Unum"],
                answer: "Carpe Diem"
            },
            {
                question: "Which movie tells the story of the sinking of the 'unsinkable' ship on its maiden voyage in 1912?",
                options: ["The Poseidon Adventure", "A Night to Remember", "Titanic", "Raise the Titanic"],
                answer: "Titanic"
            },
            {
                question: "In '12 Angry Men', what is the initial jury vote for 'guilty' before deliberations begin?",
                options: ["10 to 2", "9 to 3", "12 to 0", "11 to 1"],
                answer: "11 to 1"
            },
            {
                question: "What is the central theme of the Academy Award-winning South Korean film 'Parasite' by Bong Joon-ho?",
                options: ["Environmental disaster", "Political corruption", "Romantic love against odds", "Class struggle and social inequality"],
                answer: "Class struggle and social inequality"
            },
            {
                question: "What is the narrator's (Edward Norton) job before he meets Tyler Durden in 'Fight Club'?",
                options: ["Accountant", "Software Developer", "Recall Coordinator for an auto company", "Insurance Adjuster"],
                answer: "Recall Coordinator for an auto company"
            },
            {
                question: "Which film stars Tom Hanks as a FedEx executive stranded on a deserted island with a volleyball named Wilson?",
                options: ["The Terminal", "Sully", "Captain Phillips", "Cast Away"],
                answer: "Cast Away"
            },
            {
                question: "What sport is central to the film 'Rocky'?",
                options: ["Wrestling", "MMA", "Football", "Boxing"],
                answer: "Boxing"
            },
            {
                question: "In 'The Pursuit of Happyness', what medical device does Chris Gardner (Will Smith) try to sell?",
                options: ["Portable X-ray machines", "Ultrasound scanners", "Defibrillators", "Osteoporosis/Bone density scanners"],
                answer: "Osteoporosis/Bone density scanners"
            },
            {
                question: "What is the name of the iconic Southern plantation in 'Gone with the Wind'?",
                options: ["Twelve Oaks", "Monticello", "Pemberley", "Tara"],
                answer: "Tara"
            },
            {
                question: "Which film features Leonardo DiCaprio as a young con artist pursued by an FBI agent played by Tom Hanks?",
                options: ["The Departed", "Shutter Island", "Inception", "Catch Me If You Can"],
                answer: "Catch Me If You Can"
            },
            {
                question: "What is the profession of Jake LaMotta, portrayed by Robert De Niro, in the biographical film 'Raging Bull'?",
                options: ["Baseball Player", "Gangster", "Actor", "Boxer"],
                answer: "Boxer"
            },
            {
                question: "In 'A Few Good Men', what iconic line does Col. Nathan R. Jessup (Jack Nicholson) shout during his testimony?",
                options: ["You want the truth? You can't handle the truth!", "I am the law!", "There is no honor in this.", "I did what I had to do!"],
                answer: "You want the truth? You can't handle the truth!"
            },
            {
                question: "What is the name of the fictional African country in 'Hotel Rwanda' where the genocide occurs?",
                options: ["Nigeria", "Uganda", "Kenya", "Rwanda"],
                answer: "Rwanda"
            },
            {
                question: "Which film, directed by Damien Chazelle, features Miles Teller as a driven jazz drummer and J.K. Simmons as his abusive instructor?",
                options: ["La La Land", "First Man", "Guy and Madeline on a Park Bench", "Whiplash"],
                answer: "Whiplash"
            },
            {
                question: "What is the name of the main character, a widowed and retired balloon salesman, in Pixar's 'Up'?",
                options: ["Charles Muntz", "Russell", "Dug", "Carl Fredricksen"],
                answer: "Carl Fredricksen"
            },
            {
                question: "In 'The Social Network', what university do Mark Zuckerberg and his friends attend when Facebook is created?",
                options: ["Stanford University", "MIT", "Yale University", "Harvard University"],
                answer: "Harvard University"
            },
            {
                question: "What is the profession of the character played by Tom Hanks in 'Philadelphia' (1993), who sues his firm for discrimination?",
                options: ["Doctor", "Teacher", "Accountant", "Lawyer"],
                answer: "Lawyer"
            },
            {
                question: "Which film depicts the true story of mathematician Alan Turing and his role in breaking the Enigma code during WWII?",
                options: ["A Beautiful Mind", "The Theory of Everything", "Hidden Figures", "The Imitation Game"],
                answer: "The Imitation Game"
            },
            {
                question: "In 'Million Dollar Baby', what sport does Maggie Fitzgerald (Hilary Swank) pursue under the training of Frankie Dunn (Clint Eastwood)?",
                options: ["MMA", "Wrestling", "Kickboxing", "Boxing"],
                answer: "Boxing"
            },
            {
                question: "What is the name of the compassionate executioner played by Tom Hanks in 'The Green Mile'?",
                options: ["Brutus 'Brutal' Howell", "Percy Wetmore", "Warden Hal Moores", "Paul Edgecomb"],
                answer: "Paul Edgecomb"
            },
            {
                question: "Which 1989 film, starring Robin Williams, tells the story of an unconventional English teacher at an all-boys preparatory school?",
                options: ["Good Morning, Vietnam", "Awakenings", "Patch Adams", "Dead Poets Society"],
                answer: "Dead Poets Society"
            },
            {
                question: "What is the name of the protagonist, a South African anti-apartheid activist, in 'Cry Freedom' (1987)?",
                options: ["Nelson Mandela", "Desmond Tutu", "Walter Sisulu", "Steve Biko"],
                answer: "Steve Biko"
            },
            {
                question: "In 'Casablanca', what is the name of Rick Blaine's café?",
                options: ["The Blue Parrot", "The Maltese Falcon", "Sam's Place", "Rick's Café Américain"],
                answer: "Rick's Café Américain"
            },
            {
                question: "What type of musical instrument does Andrew Neiman play with obsessive dedication in 'Whiplash'?",
                options: ["Piano", "Saxophone", "Trumpet", "Drums"],
                answer: "Drums"
            },
            {
                question: "Which film tells the story of Oskar Schindler, a German businessman who saved the lives of more than a thousand Polish-Jewish refugees during the Holocaust?",
                options: ["The Pianist", "Life is Beautiful", "Sophie's Choice", "Schindler's List"],
                answer: "Schindler's List"
            },
            {
                question: "In 'Glengarry Glen Ross', what are the coveted leads that the real estate salesmen are desperate to get?",
                options: ["The 'platinum' leads", "The 'gold standard' leads", "The 'premium' leads", "The 'Glengarry' leads"],
                answer: "The 'Glengarry' leads"
            },
            {
                question: "What is the famous last word spoken by Charles Foster Kane in 'Citizen Kane'?",
                options: ["Susan", "Xanadu", "Inquirer", "Rosebud"],
                answer: "Rosebud"
            },
            {
                question: "Which film, based on a Stephen King novella, is about two young boys who embark on a journey to find the body of a missing boy?",
                options: ["The Body", "It", "The Goonies", "Stand by Me"],
                answer: "Stand by Me"
            },
            {
                question: "In 'Network' (1976), what phrase does news anchor Howard Beale famously shout on air?",
                options: ["This is not fake news!", "I'm as mad as hell, and I'm not going to take this anymore!", "The truth shall set you free!", "We are the champions!"],
                answer: "I'm as mad as hell, and I'm not going to take this anymore!"
            },
            {
                question: "What is the name of the ship on which the story of 'Amistad' (1997) primarily unfolds?",
                options: ["La Amistad", "The Mayflower", "The Black Pearl", "The Pequod"],
                answer: "La Amistad"
            },
            {
                question: "Which film depicts the rivalry between Austrian composer Wolfgang Amadeus Mozart and Italian composer Antonio Salieri?",
                options: ["Immortal Beloved", "Shine", "The Red Violin", "Amadeus"],
                answer: "Amadeus"
            },
            {
                question: "In 'The King's Speech', who is the speech therapist that helps King George VI overcome his stutter?",
                options: ["Winston Churchill", "Geoffrey Rush", "Lionel Logue", "David Seidler"],
                answer: "Lionel Logue"
            },
            {
                question: "What job does Travis Bickle hold in the movie 'Taxi Driver'?",
                options: ["Bus Driver", "Police Officer", "Taxi Driver", "Private Investigator"],
                answer: "Taxi Driver"
            },
            {
                question: "In 'Boyhood' (2014), how many years was the film shot over to capture the main character's growth?",
                options: ["5 years", "8 years", "10 years", "12 years"],
                answer: "12 years"
            },
            {
                question: "Which David Fincher film details the hunt for the Zodiac Killer in the San Francisco Bay Area?",
                options: ["Se7en", "Gone Girl", "The Game", "Zodiac"],
                answer: "Zodiac"
            },
            {
                question: "What is the name of the oil prospector played by Daniel Day-Lewis in 'There Will Be Blood'?",
                options: ["Eli Sunday", "H.W. Plainview", "Daniel Plainview", "H.M. Tilford"],
                answer: "Daniel Plainview"
            },
            {
                question: "In 'Moonlight' (2016), what is the main character's nickname in the third chapter of the film?",
                options: ["Chiron", "Little", "Kevin", "Black"],
                answer: "Black"
            },
            {
                question: "What is the primary setting for the 2017 film 'Dunkirk'?",
                options: ["The beaches of Normandy", "The city of London during the Blitz", "The beaches and sea at Dunkirk, France", "The deserts of North Africa"],
                answer: "The beaches and sea at Dunkirk, France"
            },
            {
                question: "Which actress won an Oscar for her role as a determined mother seeking justice in 'Three Billboards Outside Ebbing, Missouri'?",
                options: ["Sally Hawkins", "Margot Robbie", "Saoirse Ronan", "Frances McDormand"],
                answer: "Frances McDormand"
            },
            {
                question: "In the film 'Lincoln' (2012), what constitutional amendment is President Lincoln trying to pass?",
                options: ["The 1st Amendment (Free Speech)", "The 19th Amendment (Women's Suffrage)", "The 13th Amendment (Abolishing Slavery)", "The 14th Amendment (Citizenship)"],
                answer: "The 13th Amendment (Abolishing Slavery)"
            },
            {
                question: "What is the name of the protagonist, a young girl living in the Florida projects, in 'The Florida Project' (2017)?",
                options: ["Jancey", "Halley", "Ashley", "Moonee"],
                answer: "Moonee"
            },
            {
                question: "Which film, based on a true story, recounts the story of the first all-black volunteer company in the U.S. Civil War?",
                options: ["Gettysburg", "Gods and Generals", "12 Years a Slave", "Glory"],
                answer: "Glory"
            },
            {
                question: "What is the name of the main character, a troubled war veteran, in 'The Master' (2012)?",
                options: ["Lancaster Dodd", "Clark", "Val Dodd", "Freddie Quell"],
                answer: "Freddie Quell"
            },
            {
                question: "In 'No Country for Old Men', what does Llewelyn Moss stumble upon in the desert that kicks off the plot?",
                options: ["A hidden treasure map", "A crashed airplane", "A drug deal gone wrong", "A lost child"],
                answer: "A drug deal gone wrong"
            },
            {
                question: "Which film, starring Natalie Portman, portrays a ballerina's psychological breakdown while striving for the lead role in 'Swan Lake'?",
                options: ["The Red Shoes", "Center Stage", "Save the Last Dance", "Black Swan"],
                answer: "Black Swan"
            },
            {
                question: "In 'Goodfellas', what is the name of the nightclub that Henry Hill and his associates frequent and eventually take over?",
                options: ["The Stork Club", "The Copacabana", "The 500 Club", "The Rainbow Room"],
                answer: "The Copacabana"
            },
            {
                question: "Which Spike Lee film chronicles a day in the life of a Brooklyn neighborhood on a sweltering summer day, culminating in racial tension and tragedy?",
                options: ["Malcolm X", "Jungle Fever", "She's Gotta Have It", "Do the Right Thing"],
                answer: "Do the Right Thing"
            },
            {
                question: "What is the name of the AI companion that the main character, Theodore, falls in love with in the film 'Her'?",
                options: ["Alexa", "Cortana", "Siri", "Samantha"],
                answer: "Samantha"
            },
            {
                question: "In 'Brokeback Mountain', what is the primary occupation of Ennis Del Mar and Jack Twist when they first meet?",
                options: ["Ranch hands", "Cowboys", "Coal miners", "Sheep herders"],
                answer: "Sheep herders"
            },
            {
                question: "Which film tells the story of the Washington Post journalists who exposed the Watergate scandal?",
                options: ["The Post", "Spotlight", "Frost/Nixon", "All the President's Men"],
                answer: "All the President's Men"
            },
            {
                question: "What is the name of the cruise ship that sinks in 'The Poseidon Adventure' (1972)?",
                options: ["SS Poseidon", "SS Neptune", "SS Titanic", "SS Andrea Doria"],
                answer: "SS Poseidon"
            }
        ],
        suspense: [
            {
                question: "In 'The Silence of the Lambs', what kind of insect does Hannibal Lecter associate with Clarice Starling?",
                options: ["A spider", "A butterfly (Death's-head Hawkmoth)", "A beetle", "A praying mantis"],
                answer: "A butterfly (Death's-head Hawkmoth)"
            },
            {
                question: "What is famously delivered in the box at the end of David Fincher's 'Se7en'?",
                options: ["A diamond necklace", "The killer's detailed confession", "Detective Mills' wife's head", "A bomb"],
                answer: "Detective Mills' wife's head"
            },
            {
                question: "In Alfred Hitchcock's 'Rear Window', what injury confines L.B. 'Jeff' Jefferies to his apartment?",
                options: ["A broken arm", "A sprained ankle", "A broken leg in a cast", "A severe back injury"],
                answer: "A broken leg in a cast"
            },
            {
                question: "What is the name of Amy Dunne's popular children's book series in 'Gone Girl'?",
                options: ["Cool Girl Chronicles", "Diary of a Perfect Girl", "Amazing Amy", "The Adventures of Amy and Friends"],
                answer: "Amazing Amy"
            },
            {
                question: "What unusual weapon does the antagonist Anton Chigurh frequently use in 'No Country for Old Men'?",
                options: ["A silenced pistol", "A cattle gun (captive bolt pistol)", "A hunting knife", "A sniper rifle"],
                answer: "A cattle gun (captive bolt pistol)"
            },
            {
                question: "In 'The Sixth Sense', what is Cole Sear's chilling secret that he reveals to Dr. Malcolm Crowe?",
                options: ["He can move objects with his mind.", "He can see the future.", "He can communicate with animals.", "He sees dead people."],
                answer: "He sees dead people."
            },
            {
                question: "What is the name of the infamous motel in Alfred Hitchcock's 'Psycho'?",
                options: ["The Overlook Motel", "The Rosebud Motel", "The Bates Motel", "The Last Resort Motel"],
                answer: "The Bates Motel"
            },
            {
                question: "In Christopher Nolan's 'Memento', what condition does the protagonist Leonard Shelby suffer from?",
                options: ["Retrograde amnesia", "Anterograde amnesia", "Dissociative amnesia", "Transient global amnesia"],
                answer: "Anterograde amnesia"
            },
            {
                question: "Which Christopher Nolan film involves a team that enters people's dreams to steal information or plant ideas?",
                options: ["The Prestige", "Interstellar", "Tenet", "Inception"],
                answer: "Inception"
            },
            {
                question: "What is the shocking twist regarding Kevin Spacey's character, Verbal Kint, in 'The Usual Suspects'?",
                options: ["He was an undercover cop.", "He was the one who died.", "He was Keyser Söze.", "He was related to Dean Keaton."],
                answer: "He was Keyser Söze."
            },
            {
                question: "Which film involves a U.S. Marshal investigating a disappearance at a mental institution on a remote island, only to uncover a conspiracy?",
                options: ["The Island", "Shutter Island", "Stonehearst Asylum", "Gothika"],
                answer: "Shutter Island"
            },
            {
                question: "What is the profession of Harry Caul, the protagonist in Francis Ford Coppola's 'The Conversation' (1974)?",
                options: ["Private Investigator", "Journalist", "Sound Engineer", "Surveillance expert"],
                answer: "Surveillance expert"
            },
            {
                question: "In Denis Villeneuve's 'Prisoners' (2013), who plays the determined Detective Loki investigating the missing children?",
                options: ["Hugh Jackman", "Ryan Gosling", "Christian Bale", "Jake Gyllenhaal"],
                answer: "Jake Gyllenhaal"
            },
            {
                question: "In Park Chan-wook's 'Oldboy' (2003), for how many years is the protagonist Oh Dae-su inexplicably imprisoned?",
                options: ["10 years", "20 years", "5 years", "15 years"],
                answer: "15 years"
            },
            {
                question: "Which David Fincher film revolves around a wealthy investment banker who receives an invitation to participate in a mysterious, life-altering 'game'?",
                options: ["Zodiac", "Panic Room", "Fight Club", "The Game"],
                answer: "The Game"
            },
            {
                question: "What is the sinister phrase repeated by the ghostly Grady twins to Danny Torrance in 'The Shining'?",
                options: ["Redrum, redrum.", "We've always been here.", "He's a bad boy.", "Come play with us, Danny. Forever and ever and ever."],
                answer: "Come play with us, Danny. Forever and ever and ever."
            },
            {
                question: "What is the occupation of Dr. Richard Kimble, the protagonist wrongly accused of murdering his wife in 'The Fugitive' (1993)?",
                options: ["Neurosurgeon", "Cardiologist", "Pediatrician", "Vascular Surgeon"],
                answer: "Vascular Surgeon"
            },
             {
                question: "In Alfred Hitchcock's 'Vertigo', what fear incapacitates John 'Scottie' Ferguson?",
                options: ["Claustrophobia (fear of enclosed spaces)", "Acrophobia (fear of heights)", "Agoraphobia (fear of open spaces)", "Arachnophobia (fear of spiders)"],
                answer: "Acrophobia (fear of heights)"
            },
            {
                question: "What is the name of the luxury train on which a murder occurs in Agatha Christie's 'Murder on the Orient Express'?",
                options: ["The Trans-Siberian Express", "The Blue Train", "The Flying Scotsman", "The Orient Express"],
                answer: "The Orient Express"
            },
            {
                question: "In 'The Talented Mr. Ripley', what is Tom Ripley's initial assignment regarding Dickie Greenleaf?",
                options: ["To murder him", "To persuade him to return to America", "To steal his identity", "To become his business partner"],
                answer: "To persuade him to return to America"
            },
            {
                question: "What is the profession of the protagonist in David Lynch's 'Blue Velvet' who discovers a severed human ear?",
                options: ["Police Detective", "Journalist", "Private Investigator", "College Student"],
                answer: "College Student"
            },
            {
                question: "In 'Cape Fear' (either 1962 or 1991 version), what is the name of the ex-convict who terrorizes Sam Bowden and his family?",
                options: ["Norman Bates", "Harry Powell", "Max Cady", "Frank Booth"],
                answer: "Max Cady"
            },
            {
                question: "What is the central object of desire and conflict in John Huston's classic film noir 'The Maltese Falcon'?",
                options: ["A priceless diamond necklace", "A jewel-encrusted statuette of a falcon", "A secret map to a treasure", "A set of incriminating photographs"],
                answer: "A jewel-encrusted statuette of a falcon"
            },
            {
                question: "In the film 'Basic Instinct', what is the murder weapon used in the opening scene?",
                options: ["A gun", "A knife", "An ice pick", "Poison"],
                answer: "An ice pick"
            },
            {
                question: "What is the name of the anmesiac protagonist in the 'Bourne' film series?",
                options: ["Ethan Hunt", "Jack Ryan", "James Bond", "Jason Bourne"],
                answer: "Jason Bourne"
            },
            {
                question: "Which Alfred Hitchcock film features a man mistaken for a government agent, leading to a cross-country chase that culminates at Mount Rushmore?",
                options: ["The Man Who Knew Too Much", "Strangers on a Train", "Notorious", "North by Northwest"],
                answer: "North by Northwest"
            },
            {
                question: "In 'Chinatown' (1974), what is private investigator Jake Gittes's famous line regarding the titular district?",
                options: ["'You can't fight City Hall.'", "'There's something rotten in Denmark.'", "'Forget it, Jake. It's Chinatown.'", "'Chinatown. It's a state of mind.'"],
                answer: "'Forget it, Jake. It's Chinatown.'"
            },
            {
                question: "What type of animal is the ominous presence in Hitchcock's 'The Birds'?",
                options: ["Bats", "Ravens", "Seagulls and Crows (various birds)", "Pigeons"],
                answer: "Seagulls and Crows (various birds)"
            },
            {
                question: "In 'Dial M for Murder', how does Tony Wendice plan to have his wife Margot murdered?",
                options: ["Poisoning her drink", "Hiring a hitman to strangle her", "Staging a car accident", "Pushing her off a balcony"],
                answer: "Hiring a hitman to strangle her"
            },
            {
                question: "What is the secret the protagonist uncovers about the seemingly idyllic town in 'The Stepford Wives' (1975)?",
                options: ["It's a government experiment.", "The women are alien replacements.", "The women are robots/androids.", "It's a cult practicing witchcraft."],
                answer: "The women are robots/androids."
            },
            {
                question: "Which Coen Brothers film features a Minnesota police chief investigating a series of bizarre murders linked to a staged kidnapping?",
                options: ["No Country for Old Men", "The Big Lebowski", "Blood Simple", "Fargo"],
                answer: "Fargo"
            },
            {
                question: "In 'Misery', what does Annie Wilkes do to Paul Sheldon to prevent him from escaping?",
                options: ["Locks him in the attic", "Poisons his food", "Chains him to the bed", "Breaks his ankles (hobbling)"],
                answer: "Breaks his ankles (hobbling)"
            },
            {
                question: "What is the primary setting for the suspenseful events in 'Panic Room' (2002)?",
                options: ["A bank vault", "A high-security prison", "A fortified safe room in a house", "A nuclear bunker"],
                answer: "A fortified safe room in a house"
            },
            {
                question: "In 'The Girl with the Dragon Tattoo' (Swedish version), what is the name of the investigative journalist who teams up with Lisbeth Salander?",
                options: ["Henrik Vanger", "Dirch Frode", "Dragan Armansky", "Mikael Blomkvist"],
                answer: "Mikael Blomkvist"
            },
            {
                question: "What is the name of the powerful, mind-altering drug in 'Limitless' (2011)?",
                options: ["Soma", "Nuke", "Clarity", "NZT-48"],
                answer: "NZT-48"
            },
            {
                question: "Which classic film noir features Fred MacMurray as an insurance salesman talked into a murder plot by Barbara Stanwyck?",
                options: ["The Postman Always Rings Twice", "Out of the Past", "The Big Sleep", "Double Indemnity"],
                answer: "Double Indemnity"
            },
            {
                question: "In 'Unbreakable' (2000), what is David Dunn's unique ability that Elijah Price helps him discover?",
                options: ["Super speed", "Flight", "Telekinesis", "Invulnerability and sensing others' misdeeds"],
                answer: "Invulnerability and sensing others' misdeeds"
            },
            {
                question: "In 'The Prestige', what are the three parts of a magic trick as explained in the film?",
                options: ["The Setup, The Performance, The Reveal", "The Pledge, The Turn, The Prestige", "The Promise, The Deception, The Astonishment", "The Method, The Misdirection, The Miracle"],
                answer: "The Pledge, The Turn, The Prestige"
            },
            {
                question: "Which Denis Villeneuve film follows an FBI agent enlisted by a government task force to aid in the escalating war against drugs at the border area between the U.S. and Mexico?",
                options: ["Prisoners", "Arrival", "Blade Runner 2049", "Sicario"],
                answer: "Sicario"
            },
            {
                question: "What is the name of the ship that goes missing in the Bermuda Triangle in 'Close Encounters of the Third Kind'?",
                options: ["The Mary Celeste", "The USS Eldridge", "The SS Cotopaxi", "The Carroll A. Deering"],
                answer: "The SS Cotopaxi"
            },
            {
                question: "In 'Collateral' (2004), what is the profession of Vincent (Tom Cruise), the antagonist who hires cab driver Max?",
                options: ["Drug Dealer", "FBI Agent", "Hitman", "Private Investigator"],
                answer: "Hitman"
            },
            {
                question: "What item does a group of friends find that gives them telekinetic abilities in the found-footage film 'Chronicle'?",
                options: ["A glowing meteorite", "An ancient artifact", "A crashed alien spaceship", "A mysterious crystal"],
                answer: "A mysterious crystal"
            },
            {
                question: "In 'Insomnia' (2002), directed by Christopher Nolan, what symptom plagues Detective Will Dormer (Al Pacino) in Alaska?",
                options: ["Hallucinations", "Paranoia", "Inability to sleep", "Memory loss"],
                answer: "Inability to sleep"
            },
            {
                question: "What is the famous line whispered by Bill Murray to Scarlett Johansson at the end of 'Lost in Translation'?",
                options: ["'I'll see you again.'", "'Don't forget me.'", "'The audience cannot hear it.'", "'I love you.'"],
                answer: "'The audience cannot hear it.'"
            },
            {
                question: "Which South Korean film features a family that slowly infiltrates the lives of a wealthy household?",
                options: ["The Host", "Oldboy", "Train to Busan", "Parasite"],
                answer: "Parasite"
            },
            {
                question: "In the film 'Identity' (2003), where do the ten strangers find themselves stranded during a storm?",
                options: ["An abandoned hospital", "A remote desert motel", "A secluded mountain cabin", "An underground bunker"],
                answer: "A remote desert motel"
            },
            {
                question: "What is the central concept behind the suspense in 'Source Code' (2011)?",
                options: ["Time travel to prevent future crimes", "Entering a person's last 8 minutes of life", "Living the same day repeatedly", "Predicting deaths through a computer simulation"],
                answer: "Entering a person's last 8 minutes of life"
            },
            {
                question: "In 'Arlington Road', what does Michael Faraday (Jeff Bridges) begin to suspect about his new neighbors?",
                options: ["They are in a witness protection program.", "They are running a smuggling ring.", "They are domestic terrorists.", "They are spies for a foreign government."],
                answer: "They are domestic terrorists."
            },
            {
                question: "What is the name of the deadly AI system that the protagonist must deactivate in '2001: A Space Odyssey'?",
                options: ["Skynet", "VIKI", "HAL 9000", "GLaDOS"],
                answer: "HAL 9000"
            },
            {
                question: "Which film by M. Night Shyamalan features a village living in fear of creatures in the surrounding woods?",
                options: ["Signs", "The Sixth Sense", "The Village", "Unbreakable"],
                answer: "The Village"
            },
            {
                question: "In 'The Others' (2001), what is the rule Grace (Nicole Kidman) imposes on her children regarding doors?",
                options: ["All doors must be locked at night.", "No door can be opened until the previous one is closed.", "The cellar door must never be opened.", "Only Grace can open the front door."],
                answer: "No door can be opened until the previous one is closed."
            },
            {
                question: "What is the occupation of the main character, played by Ryan Reynolds, for the majority of the film 'Buried' (2010)?",
                options: ["Soldier", "Journalist", "Doctor", "Civilian truck driver"],
                answer: "Civilian truck driver"
            },
            {
                question: "In 'Searching' (2018), how does David Kim primarily investigate his daughter's disappearance?",
                options: ["By hiring a private investigator", "By reviewing security camera footage", "By going through her laptop and social media", "By interviewing her friends and teachers"],
                answer: "By going through her laptop and social media"
            },
            {
                question: "Which David Lynch film is known for its surreal, non-linear narrative involving a mysterious blue box?",
                options: ["Eraserhead", "Wild at Heart", "Mulholland Drive", "Blue Velvet"],
                answer: "Mulholland Drive"
            },
            {
                question: "What is the profession of the main character in 'Nightcrawler' (2014), played by Jake Gyllenhaal?",
                options: ["News reporter", "Police detective", "Stringer (freelance crime journalist)", "Paramedic"],
                answer: "Stringer (freelance crime journalist)"
            },
            {
                question: "In the film 'Triangle' (2009), what strange phenomenon affects the characters aboard the abandoned ocean liner?",
                options: ["A supernatural storm", "A time loop", "A deadly virus outbreak", "A ghost haunting"],
                answer: "A time loop"
            },
            {
                question: "What is the primary setting for the suspenseful horror film 'The Descent'?",
                options: ["A haunted house", "An abandoned space station", "A deep-sea research facility", "An uncharted cave system"],
                answer: "An uncharted cave system"
            }
        ],
        comedy: [
            {
                question: "In 'Dumb and Dumber', what are Harry and Lloyd trying to return to Mary Swanson (last name Samsonite in error)?",
                options: ["Her lost poodle", "A briefcase full of money", "Her prized ski equipment", "A winning lottery ticket"],
                answer: "A briefcase full of money"
            },
            {
                question: "What is Ron Burgundy's signature, often nonsensical, sign-off in 'Anchorman: The Legend of Ron Burgundy'?",
                options: ["Good night, and good luck.", "Stay classy, San Diego.", "That's the way the news goes.", "Keep it real, Channel 4 viewers."],
                answer: "Stay classy, San Diego."
            },
            {
                question: "In 'Bridesmaids', what disastrous event happens after the bridal party eats at a Brazilian steakhouse?",
                options: ["They all get arrested.", "They get into a fight with another party.", "They suffer from severe food poisoning.", "They miss their flight to Vegas."],
                answer: "They suffer from severe food poisoning."
            },
            {
                question: "What is McLovin's first name on his infamous fake ID in 'Superbad'?",
                options: ["McLovin (as a first name)", "Evan", "Seth", "Fogell"],
                answer: "Fogell"
            },
            {
                question: "What unexpected animal do the friends find in their hotel bathroom in 'The Hangover'?",
                options: ["A monkey", "A lion", "A tiger", "A bear"],
                answer: "A tiger"
            },
            {
                question: "In 'Airplane!', what is Dr. Rumack's deadpan response to Ted Striker's line, 'Surely you can't be serious!'?",
                options: ["Yes, I am, and stop asking.", "Of course, I'm serious, son.", "I am serious. And don't call me Shirley.", "This is no time for jokes!"],
                answer: "I am serious. And don't call me Shirley."
            },
            {
                question: "What is the name of the high school Ferris Bueller is famously skipping in 'Ferris Bueller's Day Off'?",
                options: ["Ridgemont High", "Shermer High School", "North Shore High", "West Beverly High"],
                answer: "Shermer High School"
            },
            {
                question: "In 'Office Space', what piece of office equipment do Peter, Michael, and Samir gleefully destroy in a field?",
                options: ["A computer monitor", "A fax machine", "A photocopier/printer", "A water cooler"],
                answer: "A photocopier/printer"
            },
            {
                question: "What is the profession of Phil Connors, who relives the same day repeatedly in 'Groundhog Day'?",
                options: ["News Anchor", "TV Weatherman", "Newspaper Reporter", "Local Radio DJ"],
                answer: "TV Weatherman"
            },
            {
                question: "Which classic British comedy film features the Knights Who Say 'Ni!' and a demand for a shrubbery?",
                options: ["Life of Brian", "Monty Python and the Holy Grail", "Meaning of Life", "A Fish Called Wanda"],
                answer: "Monty Python and the Holy Grail"
            },
            {
                question: "In 'This Is Spinal Tap', what is the recurring problem with their drummers?",
                options: ["They always quit.", "They spontaneously combust or die in bizarre accidents.", "They demand too much money.", "They get lost on the way to gigs."],
                answer: "They spontaneously combust or die in bizarre accidents."
            },
            {
                question: "What is the name of the fictional Eastern European country Borat Sagdiyev hails from in 'Borat'?",
                options: ["Slovenia", "Moldova", "Uzbekistan", "Kazakhstan"],
                answer: "Kazakhstan"
            },
            {
                question: "What type of store does Dante Hicks work at, providing the setting for Kevin Smith's 'Clerks'?",
                options: ["Video Rental Store", "Bookstore", "Record Shop", "Convenience store (Quick Stop)"],
                answer: "Convenience store (Quick Stop)"
            },
            {
                question: "In 'Zoolander', what is the name of Derek Zoolander's signature facial expression/pose?",
                options: ["Magnum", "Le Tigre", "Ferrari", "Blue Steel"],
                answer: "Blue Steel"
            },
            {
                question: "What job does The Dude (Jeffrey Lebowski) primarily try to avoid throughout 'The Big Lebowski'?",
                options: ["Private investigation", "Sales", "Customer service", "Regular employment"],
                answer: "Regular employment"
            },
            {
                question: "What board game comes to life, unleashing jungle-based chaos in a 1995 film starring Robin Williams?",
                options: ["Zathura", "Ouija", "Candyland", "Jumanji"],
                answer: "Jumanji"
            },
            {
                question: "In 'Mean Girls', on what day of the week do 'The Plastics' traditionally wear pink?",
                options: ["Monday", "Friday", "Tuesday", "Wednesday"],
                answer: "Wednesday"
            },
            {
                question: "What is the name of Austin Powers' arch-nemesis, famously played by Mike Myers?",
                options: ["Goldmember", "Number Two", "Fat Bastard", "Dr. Evil"],
                answer: "Dr. Evil"
            },
            {
                question: "Which Adam Sandler movie features him as a hot-tempered hockey player who discovers an unlikely talent for golf?",
                options: ["Billy Madison", "The Waterboy", "Big Daddy", "Happy Gilmore"],
                answer: "Happy Gilmore"
            },
            {
                question: "In 'Step Brothers', what is the name of Dale and Brennan's combined entertainment company?",
                options: ["Entertainment 720", "Prestige Worldwide", "Funkhousers Inc.", "The Catalina Wine Mixer Co."],
                answer: "Prestige Worldwide"
            },
            {
                question: "What is the name of the band that the protagonists try to reunite in 'The Blues Brothers'?",
                options: ["The Good Ole Boys", "The Blues Brothers Band", "The Soul Men", "The Mission from God"],
                answer: "The Blues Brothers Band"
            },
            {
                question: "In 'Coming to America', what fast-food restaurant does Prince Akeem work at?",
                options: ["Burger King", "McDonald's", "McDowell's", "Wendy's"],
                answer: "McDowell's"
            },
            {
                question: "What item is stolen from The Dude that 'really tied the room together' in 'The Big Lebowski'?",
                options: ["His bowling ball", "His car", "His rug", "His white Russian glass"],
                answer: "His rug"
            },
            {
                question: "In 'Shaun of the Dead', what is Shaun's preferred weapon for fighting zombies, found in his shed?",
                options: ["A shotgun", "A cricket bat", "A shovel", "A chainsaw"],
                answer: "A cricket bat"
            },
            {
                question: "What is the name of the fictional country General Aladeen rules in 'The Dictator'?",
                options: ["Elbonia", "Krakozhia", "Wadiya", "Genovia"],
                answer: "Wadiya"
            },
            {
                question: "Which character in 'Ghostbusters' (1984) famously says, 'He slimed me'?",
                options: ["Ray Stantz", "Egon Spengler", "Winston Zeddemore", "Peter Venkman"],
                answer: "Peter Venkman"
            },
            {
                question: "In 'Hot Fuzz', what is Nicholas Angel's former job in London before being transferred to Sandford?",
                options: ["Traffic Warden", "Police Constable", "Chief Inspector", "Sergeant (Metropolitan Police)"],
                answer: "Sergeant (Metropolitan Police)"
            },
            {
                question: "What is the profession of the main characters in the mockumentary 'Best in Show'?",
                options: ["Competitive eaters", "Beauty pageant contestants", "Dog show participants", "Ballroom dancers"],
                answer: "Dog show participants"
            },
            {
                question: "In 'Tropic Thunder', what controversial role does Kirk Lazarus (Robert Downey Jr.) undergo surgery for?",
                options: ["A mentally challenged farmhand", "An African-American soldier", "A Vietnamese child soldier", "A one-armed war veteran"],
                answer: "An African-American soldier"
            },
            {
                question: "What is the name of the high school attended by the characters in 'American Pie'?",
                options: ["Shermer High", "Ridgemont High", "East Great Falls High", "North Shore High"],
                answer: "East Great Falls High"
            },
            {
                question: "In 'DodgeBall: A True Underdog Story', what is the name of Peter LaFleur's gym?",
                options: ["Globo Gym", "Average Joe's Gymnasium", "The Purple Cobras", "Iron Fist Fitness"],
                answer: "Average Joe's Gymnasium"
            },
            {
                question: "What is the name of the titular character's best friend, a talking teddy bear, in the movie 'Ted'?",
                options: ["Barnaby", "Rupert", "Paddington", "Ted"],
                answer: "Ted"
            },
            {
                question: "Which movie features Bill Murray as a cynical TV weatherman who finds himself reliving the same day over and over?",
                options: ["Scrooged", "What About Bob?", "Lost in Translation", "Groundhog Day"],
                answer: "Groundhog Day"
            },
            {
                question: "In 'There's Something About Mary', what gets famously stuck in Ted's zipper?",
                options: ["His tie", "A piece of lint", "His 'frank and beans'", "A small dog"],
                answer: "His 'frank and beans'"
            },
            {
                question: "What is the name of Will Ferrell's character in 'Elf', a human raised by elves?",
                options: ["Papa Elf", "Miles Finch", "Walter Hobbs", "Buddy Hobbs"],
                answer: "Buddy Hobbs"
            },
            {
                question: "Which Edgar Wright film is the first in the 'Three Flavours Cornetto' trilogy?",
                options: ["Hot Fuzz", "The World's End", "Scott Pilgrim vs. the World", "Shaun of the Dead"],
                answer: "Shaun of the Dead"
            },
            {
                question: "In 'Wedding Crashers', what are John Beckwith and Jeremy Grey's main 'rules' for crashing weddings?",
                options: ["Always bring a gift, blend in, find the open bar", "Never use your real name, dance with the bride, leave before cake", "Target vulnerable bridesmaids, have an alias, free food and booze", "Rule #76: No excuses, play like a champion."],
                answer: "Rule #76: No excuses, play like a champion."
            },
            {
                question: "What is the name of the a cappella group Beca Mitchell reluctantly joins in 'Pitch Perfect'?",
                options: ["The Treblemakers", "The Tone Hangers", "Divisi", "The Barden Bellas"],
                answer: "The Barden Bellas"
            },
            {
                question: "In 'Napoleon Dynamite', what skill does Napoleon showcase in the student body election talent show?",
                options: ["Playing the tetherball", "Drawing ligers", "Impressive dance moves", "Bo staff skills"],
                answer: "Impressive dance moves"
            },
            {
                question: "In 'The 40-Year-Old Virgin', what does Andy get waxed in a famously painful scene?",
                options: ["His back", "His legs", "His chest", "His eyebrows"],
                answer: "His chest"
            },
            {
                question: "Which Coen Brothers film features 'The Dude', a slacker mistaken for a millionaire?",
                options: ["Fargo", "O Brother, Where Art Thou?", "The Big Lebowski", "Raising Arizona"],
                answer: "The Big Lebowski"
            },
            {
                question: "What is the name of the fictional news network where Ron Burgundy works in 'Anchorman'?",
                options: ["WBN", "GNN", "KVWN Channel 4", "Action News"],
                answer: "KVWN Channel 4"
            },
            {
                question: "In 'Planes, Trains and Automobiles', what is the profession of Del Griffith (John Candy)?",
                options: ["Marketing Executive", "Software Engineer", "Shower curtain ring salesman", "Accountant"],
                answer: "Shower curtain ring salesman"
            },
            {
                question: "Which mockumentary by Christopher Guest is about a small town's 150th anniversary celebration?",
                options: ["Best in Show", "A Mighty Wind", "For Your Consideration", "Waiting for Guffman"],
                answer: "Waiting for Guffman"
            },
            {
                question: "In 'What We Do in the Shadows', what mundane task do the vampire roommates argue about?",
                options: ["Taking out the trash", "Doing the bloody dishes", "Paying the rent", "Mowing the lawn"],
                answer: "Doing the bloody dishes"
            },
            {
                question: "What is the name of the band that performs the iconic 'Wyld Stallyns' in the 'Bill & Ted' series?",
                options: ["Wyld Stallyns", "Atomic Punks", "The Barbarians", "Future Stallions"],
                answer: "Wyld Stallyns"
            },
            {
                question: "In 'Super Troopers', what is the name of the prank where they chug maple syrup?",
                options: ["The Syrup Chug", "The Maple Challenge", "The Chugging Game", "The Syrup Slam"],
                answer: "The Chugging Game"
            },
            {
                question: "Which Mike Judge film satirizes corporate office culture at a company called Initech?",
                options: ["Idiocracy", "Beavis and Butt-Head Do America", "Extract", "Office Space"],
                answer: "Office Space"
            },
            {
                question: "In 'Booksmart', what is the primary motivation for Molly and Amy's night of partying?",
                options: ["To find boyfriends", "To get revenge on a teacher", "To make up for lost time studying", "To crash a popular kid's party"],
                answer: "To make up for lost time studying"
            },
            {
                question: "What is the name of the rival news anchor to Ron Burgundy, played by Christina Applegate?",
                options: ["Veronica Corningstone", "Champ Kind", "Brick Tamland", "Brian Fantana"],
                answer: "Veronica Corningstone"
            },
            {
                question: "In 'School of Rock', what song does Dewey Finn teach the kids for the Battle of the Bands?",
                options: ["'Smoke on the Water' by Deep Purple", "'Immigrant Song' by Led Zeppelin", "'School of Rock (Teacher's Pet)' - original song", "'Iron Man' by Black Sabbath"],
                answer: "'School of Rock (Teacher's Pet)' - original song"
            },
            {
                question: "Which film stars Eddie Murphy as multiple members of the Klump family?",
                options: ["Coming to America", "The Nutty Professor", "Trading Places", "Beverly Hills Cop"],
                answer: "The Nutty Professor"
            },
            {
                question: "In 'Caddyshack', what is the gopher's main antagonist at the golf course?",
                options: ["Judge Smails", "Ty Webb", "Danny Noonan", "Carl Spackler"],
                answer: "Carl Spackler"
            },
            {
                question: "What is the name of the company that owns the television network in 'Network' (1976), a dark comedy/satire?",
                options: ["UBS", "CNN", "NBS", "RCA"],
                answer: "UBS"
            },
            {
                question: "Which movie features the iconic line 'I'm not even supposed to be here today!'?",
                options: ["Mallrats", "Clerks", "Chasing Amy", "Dogma"],
                answer: "Clerks"
            },
            {
                question: "In 'When Harry Met Sally...', where does Sally famously fake an orgasm?",
                options: ["In a bookstore", "In a department store", "In a deli", "In a movie theater"],
                answer: "In a deli"
            },
            {
                question: "What is the name of the fictional theme park in 'National Lampoon's Vacation'?",
                options: ["Six Flags Fun Park", "Happy World", "Walley World", "Moose Mountain"],
                answer: "Walley World"
            },
            {
                question: "In 'Dr. Strangelove', what is the subtitle of the film?",
                options: ["or: How to Wage Nuclear War", "or: How I Learned to Stop Worrying and Love the Bomb", "or: A Tale of Two Bombs", "or: The Day the World Ended"],
                answer: "or: How I Learned to Stop Worrying and Love the Bomb"
            },
            {
                question: "Which actor plays the lead role of 'Ace Ventura: Pet Detective'?",
                options: ["Adam Sandler", "Mike Myers", "Ben Stiller", "Jim Carrey"],
                answer: "Jim Carrey"
            }
        ],
        kids: [
            {
                question: "In 'Toy Story', who is Buzz Lightyear's original owner that receives him as a birthday present?",
                options: ["Sid Phillips", "Molly Davis", "Andy Davis", "Bonnie Anderson"],
                answer: "Andy Davis"
            },
            {
                question: "What is the name of Simba's carefree warthog companion in Disney's 'The Lion King'?",
                options: ["Timon", "Zazu", "Pumbaa", "Rafiki"],
                answer: "Pumbaa"
            },
            {
                question: "In Disney's 'Frozen', what is Queen Elsa's powerful magical ability?",
                options: ["Control over fire and heat", "Control over ice and snow", "The ability to fly", "Superhuman strength"],
                answer: "Control over ice and snow"
            },
            {
                question: "What is the name of Shrek's talkative, annoying, yet loyal donkey sidekick?",
                options: ["Horse", "Mule", "Puss in Boots", "Donkey"],
                answer: "Donkey"
            },
            {
                question: "In 'Finding Nemo', what type of fish is Dory, who suffers from short-term memory loss?",
                options: ["Clownfish", "Anglerfish", "Moorish Idol", "Regal Blue Tang"],
                answer: "Regal Blue Tang"
            },
            {
                question: "What is the name of the young wizard who attends Hogwarts School of Witchcraft and Wizardry?",
                options: ["Ron Weasley", "Draco Malfoy", "Neville Longbottom", "Harry Potter"],
                answer: "Harry Potter"
            },
            {
                question: "Which Disney princess loses a glass slipper at a royal ball?",
                options: ["Belle", "Ariel", "Aurora", "Cinderella"],
                answer: "Cinderella"
            },
            {
                question: "What is the name of the toy cowboy who is Andy's long-time favorite in 'Toy Story'?",
                options: ["Jessie", "Stinky Pete", "Sheriff Woody Pride", "Bullseye"],
                answer: "Sheriff Woody Pride"
            },
            {
                question: "In 'How to Train Your Dragon', what is the name of Hiccup's rare Night Fury dragon?",
                options: ["Stormfly", "Meatlug", "Hookfang", "Toothless"],
                answer: "Toothless"
            },
            {
                question: "What kind of animal is Po, the main character in 'Kung Fu Panda'?",
                options: ["A tiger", "A red panda", "A snow leopard", "A giant panda"],
                answer: "A giant panda"
            },
            {
                question: "What are the five main emotions personified inside Riley's head in Disney-Pixar's 'Inside Out'?",
                options: ["Happy, Grumpy, Sleepy, Dopey, Bashful", "Joy, Sadness, Anger, Fear, Disgust", "Love, Hate, Peace, Worry, Excitement", "Curiosity, Boredom, Surprise, Confusion, Confidence"],
                answer: "Joy, Sadness, Anger, Fear, Disgust"
            },
            {
                question: "What coveted racing trophy does Lightning McQueen aspire to win in the movie 'Cars'?",
                options: ["The Daytona 500", "The Indy 500", "The Piston Cup", "The Radiator Springs Grand Prix"],
                answer: "The Piston Cup"
            },
            {
                question: "In Disney's 'Moana', what is the name of the demigod Maui's magical item that allows him to shapeshift?",
                options: ["The Heart of Te Fiti", "His magical oar", "His giant fishhook", "The Kakamora coconut"],
                answer: "His giant fishhook"
            },
            {
                question: "What is the name of the fictional city where Judy Hopps, a bunny, becomes a police officer in 'Zootopia'?",
                options: ["Animatropolis", "Bunnyburrow", "Savanna Central", "Zootopia"],
                answer: "Zootopia"
            },
            {
                question: "Which animated movie features a rat named Remy who dreams of becoming a chef in a famous Parisian restaurant?",
                options: ["Flushed Away", "The Great Mouse Detective", "An American Tail", "Ratatouille"],
                answer: "Ratatouille"
            },
            {
                question: "What is the name of the young boy who befriends a giant alien robot in 'The Iron Giant'?",
                options: ["Eliot", "David", "Christopher Robin", "Hogarth Hughes"],
                answer: "Hogarth Hughes"
            },
            {
                question: "In 'The Incredibles', what is the superhero name of the father of the Parr family, Bob Parr?",
                options: ["Elastiguy", "Frozone", "Syndrome", "Mr. Incredible"],
                answer: "Mr. Incredible"
            },
            {
                question: "What is the name of the fictional kingdom where Princess Rapunzel is kept in a tower in Disney's 'Tangled'?",
                options: ["Arendelle", "DunBroch", "Agrabah", "Corona"],
                answer: "Corona"
            },
            {
                question: "Which Dr. Seuss book, adapted into multiple films, features a character who tries to stop Christmas by stealing presents?",
                options: ["The Lorax", "Horton Hears a Who!", "The Cat in the Hat", "How the Grinch Stole Christmas!"],
                answer: "How the Grinch Stole Christmas!"
            },
            {
                question: "In 'The Wizard of Oz', what does Dorothy famously say to Toto when she realizes they're not in Kansas anymore?",
                options: ["'Toto, I don't think we're home.'", "'Toto, we're on an adventure!'", "'Toto, I've a feeling we're not in Kansas anymore.'", "'Toto, where did the house land?'"],
                answer: "'Toto, I've a feeling we're not in Kansas anymore.'"
            },
            {
                question: "What type of mythical creature is Falkor in 'The NeverEnding Story'?",
                options: ["A Griffin", "A Pegasus", "A Luckdragon", "A Unicorn"],
                answer: "A Luckdragon"
            },
            {
                question: "In Disney's 'Aladdin', how many wishes does the Genie grant Aladdin?",
                options: ["One", "Unlimited", "Three", "Five"],
                answer: "Three"
            },
            {
                question: "What is the name of the young lion who is Simba's love interest in 'The Lion King'?",
                options: ["Sarabi", "Sarafina", "Kiara", "Nala"],
                answer: "Nala"
            },
            {
                question: "Which classic children's movie features a boy named Elliott befriending an extraterrestrial?",
                options: ["Flight of the Navigator", "Mac and Me", "Close Encounters of the Third Kind", "E.T. the Extra-Terrestrial"],
                answer: "E.T. the Extra-Terrestrial"
            },
            {
                question: "In 'Paddington', what is Paddington Bear's favorite food?",
                options: ["Honey sandwiches", "Fish and chips", "Marmalade sandwiches", "Chocolate cake"],
                answer: "Marmalade sandwiches"
            },
            {
                question: "What is the name of the mischievous group of yellow, pill-shaped creatures who serve Gru in 'Despicable Me'?",
                options: ["The Oompa Loompas", "The Smurfs", "The Minions", "The Rabbids"],
                answer: "The Minions"
            },
            {
                question: "In 'Beauty and the Beast', what enchanted object is Cogsworth?",
                options: ["A candelabra", "A teapot", "A wardrobe", "A mantel clock"],
                answer: "A mantel clock"
            },
            {
                question: "What is the name of the friendly ghost in the 1995 film of the same name?",
                options: ["Slimer", "Beetlejuice", "Casper", "Moaning Myrtle"],
                answer: "Casper"
            },
            {
                question: "In 'The Princess Bride', what phrase does Westley (as the Man in Black) repeatedly say to Buttercup?",
                options: ["'As you command.'", "'Anything for you, my love.'", "'As you wish.'", "'Your wish is my command.'"],
                answer: "'As you wish.'"
            },
            {
                question: "What is the name of the enormous, gentle robot that Baymax inflates into in 'Big Hero 6'?",
                options: ["Healthbot 5000", "Personal Healthcare Companion", "Mega-Nurse", "Sentry Bot"],
                answer: "Personal Healthcare Companion"
            },
            {
                question: "Which Hayao Miyazaki film features two young sisters befriending forest spirits, including the large, furry Totoro?",
                options: ["Spirited Away", "Princess Mononoke", "Howl's Moving Castle", "My Neighbor Totoro"],
                answer: "My Neighbor Totoro"
            },
            {
                question: "In 'Shrek 2', who hires Puss in Boots to deal with Shrek?",
                options: ["Lord Farquaad", "The Fairy Godmother", "Prince Charming", "King Harold"],
                answer: "King Harold"
            },
            {
                question: "What is the name of the house-elf who serves the Malfoy family and is later freed by Harry Potter?",
                options: ["Kreacher", "Winky", "Hokey", "Dobby"],
                answer: "Dobby"
            },
            {
                question: "In 'Coco', what is the name of the land where Miguel travels to meet his ancestors?",
                options: ["The Spirit Realm", "The Afterworld", "Xibalba", "The Land of the Dead"],
                answer: "The Land of the Dead"
            },
            {
                question: "What type of creature is an 'Ewok' from 'Star Wars: Return of the Jedi'?",
                options: ["A Wookiee", "A Jawa", "A small, furry, bipedal species", "A Gungan"],
                answer: "A small, furry, bipedal species"
            },
            {
                question: "In 'The Little Mermaid', what does Ariel trade to Ursula for a pair of human legs?",
                options: ["Her collection of human treasures", "Her beautiful voice", "Her memories of Prince Eric", "Her royal title"],
                answer: "Her beautiful voice"
            },
            {
                question: "What is the name of the winter-loving snowman brought to life by Elsa's magic in 'Frozen'?",
                options: ["Frosty", "Snowy", "Marshmallow", "Olaf"],
                answer: "Olaf"
            },
            {
                question: "Which Roald Dahl book, adapted into films, tells the story of a poor boy who wins a tour of a magical chocolate factory?",
                options: ["Matilda", "James and the Giant Peach", "The BFG", "Charlie and the Chocolate Factory"],
                answer: "Charlie and the Chocolate Factory"
            },
            {
                question: "In 'Mary Poppins', what word does Mary teach Jane and Michael that means 'extraordinarily good'?",
                options: ["Supercalifragilisticexpialidocious", "Gobbledygook", "Bibbidi-Bobbidi-Boo", "Chim Chim Cher-ee"],
                answer: "Supercalifragilisticexpialidocious"
            },
            {
                question: "In 'Wreck-It Ralph', what is Ralph's job in his home video game, 'Fix-It Felix Jr.'?",
                options: ["The hero", "The bonus character", "The villain", "A side character"],
                answer: "The villain"
            },
            {
                question: "What type of animal is Master Shifu in 'Kung Fu Panda'?",
                options: ["A red panda", "A snow leopard", "A monkey", "A crane"],
                answer: "A red panda"
            },
            {
                question: "In 'The Lego Movie', what is the name of the ordinary construction worker who is prophesied to be 'The Special'?",
                options: ["President Business", "Vitruvius", "Benny", "Emmet Brickowski"],
                answer: "Emmet Brickowski"
            },
            {
                question: "What is the name of the spider who befriends Wilbur the pig in 'Charlotte's Web'?",
                options: ["Aragog", "Shelob", "Anansi", "Charlotte"],
                answer: "Charlotte"
            },
            {
                question: "In 'Mulan', what is the name of Mulan's small, red dragon companion voiced by Eddie Murphy?",
                options: ["Li Shang", "Yao", "Mushu", "Cri-Kee"],
                answer: "Mushu"
            },
            {
                question: "Which movie features a group of children who discover a treasure map and embark on an adventure to find pirate treasure?",
                options: ["Hook", "The Goonies", "Peter Pan", "Pirates of the Caribbean"],
                answer: "The Goonies"
            },
            {
                question: "In 'Lilo & Stitch', what is Stitch's original experiment number?",
                options: ["Experiment 621", "Experiment 626", "Experiment 628", "Experiment 625"],
                answer: "Experiment 626"
            },
            {
                question: "What is the name of the magical, flying car in 'Chitty Chitty Bang Bang'?",
                options: ["The Fantasmagorical Machine", "The Paragon Panther", "Chitty Chitty Bang Bang", "The Scrumptious Sweetliner"],
                answer: "Chitty Chitty Bang Bang"
            },
            {
                question: "In Disney's 'Hercules', who are Hercules' two bumbling demon sidekicks?",
                options: ["Phobos and Deimos", "Heckle and Jeckle", "Pain and Panic", "Rosencrantz and Guildenstern"],
                answer: "Pain and Panic"
            },
            {
                question: "What is the name of the main character in Tim Burton's 'The Nightmare Before Christmas'?",
                options: ["Oogie Boogie", "Dr. Finkelstein", "The Mayor of Halloween Town", "Jack Skellington"],
                answer: "Jack Skellington"
            },
            {
                question: "In the movie 'Home Alone', what is the name of the young boy left behind by his family?",
                options: ["Fuller McCallister", "Buzz McCallister", "Kevin McCallister", "Rod McCallister"],
                answer: "Kevin McCallister"
            },
            {
                question: "Which Studio Ghibli film tells the story of a young girl named Chihiro who gets trapped in a world of spirits?",
                options: ["My Neighbor Totoro", "Kiki's Delivery Service", "Spirited Away", "Howl's Moving Castle"],
                answer: "Spirited Away"
            },
            {
                question: "In 'Spider-Man: Into the Spider-Verse', who is the main protagonist that gets bitten by a radioactive spider?",
                options: ["Peter Parker", "Gwen Stacy", "Miles Morales", "Peni Parker"],
                answer: "Miles Morales"
            },
            {
                question: "What is the name of WALL-E's love interest, a sleek white robot, in the movie 'WALL-E'?",
                options: ["AUTO", "M-O", "EVE", "PR-T"],
                answer: "EVE"
            },
            {
                question: "In 'The Parent Trap' (1998), where do the twin sisters, Hallie and Annie, first meet?",
                options: ["At school", "At a summer camp", "On a cruise ship", "At an airport"],
                answer: "At a summer camp"
            },
            {
                question: "Which movie is about a young girl who uses her telekinetic powers to deal with her neglectful family and cruel headmistress?",
                options: ["Harriet the Spy", "Akeelah and the Bee", "Annie", "Matilda"],
                answer: "Matilda"
            },
            {
                question: "In 'Cloudy with a Chance of Meatballs', what does Flint Lockwood's machine turn water into?",
                options: ["Ice cream", "Candy", "Soda", "Food"],
                answer: "Food"
            },
            {
                question: "What is the name of the one-eyed green monster who is Mike Wazowski's best friend in 'Monsters, Inc.'?",
                options: ["Randall Boggs", "Henry J. Waternoose", "James P. 'Sulley' Sullivan", "The Abominable Snowman"],
                answer: "James P. 'Sulley' Sullivan"
            },
            {
                question: "Which film features a young protagonist named Coraline Jones who discovers an idealized parallel universe behind a secret door?",
                options: ["The Corpse Bride", "ParaNorman", "James and the Giant Peach", "Coraline"],
                answer: "Coraline"
            },
            {
                question: "In 'Babe', what does the titular pig get trained to do?",
                options: ["Race", "Act in a movie", "Herd sheep", "Perform in a circus"],
                answer: "Herd sheep"
            }
        ]
    };

    // Game State Variables
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = 1;
    let currentQuestionIndex = 0;
    let questionsForCurrentGame = [];
    let selectedGenre = '';

    // --- Initialization and Screen Transitions ---

    function showWarningScreen() {
        if (warningScreen) warningScreen.classList.remove('hidden');
        if (appContainer) appContainer.classList.add('hidden');
    }

    function showGenreSelectionScreen() {
        if (warningScreen) warningScreen.classList.add('hidden');
        if (appContainer) appContainer.classList.remove('hidden');
        if (genreSelectionScreen) genreSelectionScreen.classList.remove('hidden');
        if (gameContainer) gameContainer.classList.add('hidden');

        if(genreFeedback) genreFeedback.textContent = 'Please select a genre to start.';
        if(genreButtons) genreButtons.forEach(btn => btn.classList.remove('selected'));
        selectedGenre = '';
    }

    // This is the crucial event listener for the button.
    if (warningContinueButton) {
        console.log("SUCCESS: 'Proceed' button found and listener is being attached."); // DEBUG LINE
        warningContinueButton.addEventListener('click', () => {
            console.log("CLICKED: 'Proceed' button was clicked."); // DEBUG LINE
            showGenreSelectionScreen();
        });
    } else {
        console.error("ERROR: Could not find the 'warning-continue-button' element. Check the ID in your index.html file.");
    }

    // --- Game Logic Functions ---

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function handleGenreSelection(event) {
        selectedGenre = event.target.dataset.genre;
        genreButtons.forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
        if(genreFeedback) genreFeedback.textContent = `Selected genre: ${event.target.textContent}. Loading questions...`;

        setTimeout(() => {
            initializeGame(selectedGenre);
        }, 1000);
    }

    function initializeGame(genre) {
        if (!genre || !allQuestions[genre] || allQuestions[genre].length === 0) {
            if(genreFeedback) genreFeedback.textContent = 'This genre has no questions yet or is invalid. Please select another or add questions.';
            showGenreSelectionScreen();
            return;
        }

        let tempQuestions = [...allQuestions[genre]];
        questionsForCurrentGame = tempQuestions.filter(q => q.options && q.options.length === 4 && q.answer);

        if (questionsForCurrentGame.length === 0) {
             if(genreFeedback) genreFeedback.textContent = `No valid multiple-choice questions found for ${genre}. Please update the question list.`;
            showGenreSelectionScreen();
            return;
        }

        shuffleArray(questionsForCurrentGame);

        player1Score = 0;
        player2Score = 0;
        currentPlayer = 1;
        currentQuestionIndex = 0;

        if(genreSelectionScreen) genreSelectionScreen.classList.add('hidden');
        if(gameContainer) gameContainer.classList.remove('hidden');
        if(gameOverSection) gameOverSection.classList.add('hidden');
        
        if(questionArea) questionArea.classList.remove('hidden');
        if(optionsArea) optionsArea.classList.remove('hidden');
        if(turnIndicator) turnIndicator.classList.remove('hidden');
        if(nextQuestionButton) nextQuestionButton.classList.add('hidden');

        const genreText = genre.charAt(0).toUpperCase() + genre.slice(1);
        if(currentGenreDisplay) currentGenreDisplay.textContent = `Genre: ${genreText}`;

        updateScoresDisplay();
        updateTurnDisplay();
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questionsForCurrentGame.length) {
            const currentQ = questionsForCurrentGame[currentQuestionIndex];
            if(questionText) questionText.textContent = currentQ.question;
            
            optionButtons.forEach((button, index) => {
                button.textContent = currentQ.options[index];
                button.disabled = false;
                button.className = 'option-btn'; 
            });
            
            if(feedbackMessage) feedbackMessage.textContent = '';
            if(nextQuestionButton) nextQuestionButton.classList.add('hidden');
        } else {
            endGame();
        }
    }

    function handleOptionClick(event) {
        const selectedButton = event.target;
        const userAnswer = selectedButton.textContent;
        const correctAnswer = questionsForCurrentGame[currentQuestionIndex].answer;

        optionButtons.forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.classList.add('correct-option');
            }
        });

        if (userAnswer === correctAnswer) {
            if(feedbackMessage) {
                feedbackMessage.textContent = "Correct!";
                feedbackMessage.className = 'feedback-message correct';
            }
            if (currentPlayer === 1) {
                player1Score++;
            } else {
                player2Score++;
            }
            if (correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(error => console.error("Error playing correct sound:", error));
            }
        } else {
            if(feedbackMessage) {
                feedbackMessage.textContent = `Incorrect! The answer was: ${correctAnswer}`;
                feedbackMessage.className = 'feedback-message incorrect';
            }
            selectedButton.classList.add('incorrect-choice');
            if (currentPlayer === 1) {
                player1Score--;
            } else {
                player2Score--;
            }
            if (incorrectSound) {
                incorrectSound.currentTime = 0;
                incorrectSound.play().catch(error => console.error("Error playing incorrect sound:", error));
            }
        }

        updateScoresDisplay();
        if(nextQuestionButton) {
            nextQuestionButton.classList.remove('hidden');
            nextQuestionButton.focus();
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateTurnDisplay();
        displayQuestion();
    }

    function updateScoresDisplay() {
        if(player1ScoreDisplay) player1ScoreDisplay.textContent = player1Score;
        if(player2ScoreDisplay) player2ScoreDisplay.textContent = player2Score;
    }

    function updateTurnDisplay() {
        if(turnIndicator) turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function endGame() {
        if(gameContainer) gameContainer.classList.add('hidden');
        if(gameOverSection) gameOverSection.classList.remove('hidden');

        let winnerMessageText;
        if (player1Score > player2Score) {
            winnerMessageText = "Player 1 Wins!";
        } else if (player2Score > player1Score) {
            winnerMessageText = "Player 2 Wins!";
        } else {
            winnerMessageText = "It's a Tie!";
        }
        if(gameOverMessage) gameOverMessage.textContent = `Game Over! ${winnerMessageText} Final Score - P1: ${player1Score}, P2: ${player2Score}`;
    }

    // --- Event Listeners ---
    if(genreButtons) {
        genreButtons.forEach(button => {
            button.addEventListener('click', handleGenreSelection);
        });
    }

    if(optionButtons) {
        optionButtons.forEach(button => {
            button.addEventListener('click', handleOptionClick);
        });
    }
    
    if(nextQuestionButton) nextQuestionButton.addEventListener('click', nextQuestion);
    
    if(restartButton) {
        restartButton.addEventListener('click', () => {
            gameOverSection.classList.add('hidden');
            initializeGame(selectedGenre); 
        });
    }
    if(changeGenreButton) changeGenreButton.addEventListener('click', showGenreSelectionScreen);

    // Initial call to show the warning screen when the page loads
    showWarningScreen();
});
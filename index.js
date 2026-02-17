// ================= BUTTONS =================
let startBtn = document.getElementById("start-btn")
let hitBtn = document.getElementById("hit-btn")
let standBtn = document.getElementById("stand-btn")
let resetBtn = document.getElementById("reset-btn")
let nameInput = document.getElementById("name-input")
let saveNameBtn = document.getElementById("save-name-btn")


// ================= SOUNDS =================
let hitSound = document.getElementById("hit-sound")
let winSound = document.getElementById("win-sound")
let loseSound = document.getElementById("lose-sound")
let drawSound = document.getElementById("draw-sound")
let resetSound = document.getElementById("reset-sound")
//let standSound = document.getElementById("stand-sound")

//added double button
let doubleBtn = document.getElementById("double-btn")
doubleBtn.style.display = "none"

//addded split button
let splitBtn = document.getElementById("split-btn")
splitBtn.style.display = "none"

function enterCasino() {

    const entry = document.getElementById("entry-screen")
    const game = document.getElementById("game-area")
    const nameInput = document.getElementById("name-input")

    if (!entry || !game) {
        console.log("Missing elements")
        return
    }

    let enteredName = nameInput.value.trim()

    if (!enteredName) {
        alert("Enter your name")
        return
    }

    player.name = enteredName
    playerEl.textContent = player.name + ": $" + player.chips

    entry.style.display = "none"
    game.style.display = "flex"
}



function stopAllSounds() {
    let sounds = [hitSound, winSound, loseSound, drawSound, resetSound]
    // sounds.forEach(sound => {
    //     sound.pause()
    //     sound.currentTime = 0
    // })
    sounds.forEach(sound => {
    if (sound) {
        sound.pause()
        sound.currentTime = 0
        }
    })
}

// ================= PLAYER =================
let player = {
    name: "Player",
    chips: 500
}
//added save
// Load saved data
let savedData = localStorage.getItem("blackjackPlayer")

if (savedData) {
    player = JSON.parse(savedData)
}

// ================= GAME STATE =================
let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let isAlive = false
let currentBet = 0

// ================= DOM =================
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let playerEl = document.getElementById("player-el")
let betEl = document.getElementById("bet-el")

playerEl.textContent = player.name + ": $" + player.chips

// ================= INITIAL SCREEN =================
hitBtn.style.display = "none"
standBtn.style.display = "none"
resetBtn.style.display = "none"

cardsEl.style.display = "none"
dealerCardsEl.style.display = "none"
sumEl.style.display = "none"
dealerSumEl.style.display = "none"

// ================= DECK =================
const suits = ["clubs", "diamonds", "hearts", "spades"]
const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "jack", "queen", "king", "ace"
]

let deck = []

function createDeck() {
    deck = []
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit })
        }
    }
}

function shuffleDeck() {
    deck.sort(() => Math.random() - 0.5)
}

function getCardValue(card) {
    if (card.value === "ace") return 11
    if (["king", "queen", "jack"].includes(card.value)) return 10
    return Number(card.value)
}

// ⭐ REAL ACE LOGIC
function calculateHandValue(hand) {
    let total = 0
    let aceCount = 0

    for (let card of hand) {
        total += getCardValue(card)
        if (card.value === "ace") aceCount++
    }

    while (total > 21 && aceCount > 0) {
        total -= 10
        aceCount--
    }

    return total
}

function drawCard() {
    return deck.pop()
}

// ================= START GAME =================
function startGame() {

    currentBet = Number(betEl.value)

    if (currentBet > player.chips || currentBet <= 0) {
        alert("Invalid Bet")
        return
    }

    stopAllSounds()

    startBtn.style.display = "none"
    hitBtn.style.display = "inline-block"
    standBtn.style.display = "inline-block"
    resetBtn.style.display = "inline-block"
    doubleBtn.style.display = "inline-block"

    cardsEl.style.display = "block"
    dealerCardsEl.style.display = "block"
    sumEl.style.display = "block"
    dealerSumEl.style.display = "block"

    player.chips -= currentBet

    createDeck()
    shuffleDeck()

    isAlive = true
    cards = []
    dealerCards = []

    // 🎴 DRAW CARDS FIRST
    cards.push(drawCard(), drawCard())
    dealerCards.push(drawCard(), drawCard())

    sum = calculateHandValue(cards)
    dealerSum = calculateHandValue(dealerCards)

    // ✅ NOW check split safely
    if (
        cards.length === 2 &&
        cards[0].value === cards[1].value
    ) {
        splitBtn.style.display = "inline-block"
    } else {
        splitBtn.style.display = "none"
    }

    messageEl.textContent = "Hit or Stand?"

    renderGame()
}


// ================= RENDER =================
function renderGame() {

    // PLAYER
    cardsEl.innerHTML = ""
    for (let card of cards) {
        cardsEl.innerHTML += `
            <img class="card-img" 
            src="cards/${card.value}_of_${card.suit}.png">
        `
    }

    sumEl.textContent = "Sum: " + sum

    // DEALER
    dealerCardsEl.innerHTML = ""

    if (isAlive) {
        dealerCardsEl.innerHTML += `
            <img class="card-img"
            src="cards/${dealerCards[0].value}_of_${dealerCards[0].suit}.png">
            <img class="card-img" src="cards/back.png">
        `
        dealerSumEl.textContent = "Sum: ?"
    } else {
        for (let card of dealerCards) {
            dealerCardsEl.innerHTML += `
                <img class="card-img"
                src="cards/${card.value}_of_${card.suit}.png">
            `
        }
        dealerSumEl.textContent = "Sum: " + dealerSum
    }

    playerEl.textContent = player.name + ": $" + player.chips
    localStorage.setItem("blackjackPlayer", JSON.stringify(player))

}

// ================= HIT =================
function newCard() {

    if (!isAlive) return

    stopAllSounds()
    hitSound.play()

    cards.push(drawCard())
    sum = calculateHandValue(cards)

    if (sum > 21) {
        messageEl.textContent = "You busted! Dealer wins."
        isAlive = false

        stopAllSounds()
        loseSound.play()

        hitBtn.style.display = "none"
        standBtn.style.display = "none"
        doubleBtn.style.display = "none"

    }

    renderGame()
}

// ================= STAND =================
function stand() {

    if (!isAlive) return

    stopAllSounds()

    // Dealer draws until 17+
    while (dealerSum < 17) {
        dealerCards.push(drawCard())
        dealerSum = calculateHandValue(dealerCards)
    }

    // Now compare safely
    if (dealerSum > 21) {
        // Dealer bust
        messageEl.textContent = "Dealer busted! You win!"
        player.chips += currentBet * 2
        winSound.play()

    } else if (sum > 21) {
        // Player already bust (extra safety)
        messageEl.textContent = "You busted! Dealer wins!"
        loseSound.play()

    } else if (sum > dealerSum) {
        // Player higher
        messageEl.textContent = "You win!"
        player.chips += currentBet * 2
        winSound.play()

    } else if (sum < dealerSum) {
        // Dealer higher
        messageEl.textContent = "Dealer wins!"
        loseSound.play()

    } else {
        // Equal
        messageEl.textContent = "Draw!"
        player.chips += currentBet
        drawSound.play()
    }

    isAlive = false
    hitBtn.style.display = "none"
    standBtn.style.display = "none"
    doubleBtn.style.display = "none"


    renderGame()
}


// ================= RESET =================
function resetGame() {

    stopAllSounds()
    resetSound.play()

    cards = []
    dealerCards = []
    sum = 0
    dealerSum = 0

    messageEl.textContent = ""

    cardsEl.style.display = "none"
    dealerCardsEl.style.display = "none"
    sumEl.style.display = "none"
    dealerSumEl.style.display = "none"

    startBtn.style.display = "inline-block"
    hitBtn.style.display = "none"
    standBtn.style.display = "none"
    resetBtn.style.display = "none"
}

//player name logic added
function savePlayerName() {

    let enteredName = nameInput.value.trim()

    if (enteredName === "") {
        alert("Please enter your name")
        return
    }

    player.name = enteredName
    playerEl.textContent = player.name + ": $" + player.chips

    // Hide input after saving
    nameInput.style.display = "none"
    saveNameBtn.style.display = "none"
}

function doubleDown() {

    if (!isAlive) return
    if (player.chips < currentBet) return

    stopAllSounds()

    player.chips -= currentBet
    currentBet *= 2

    cards.push(drawCard())
    sum = calculateHandValue(cards)

    if (sum > 21) {
        messageEl.textContent = "Busted after Double!"
        loseSound.play()
    } else {
        stand()
        return
    }

    isAlive = false
    renderGame()
}

function splitHand() {

    if (cards.length !== 2) return
    if (cards[0].value !== cards[1].value) return
    if (player.chips < currentBet) return

    player.chips -= currentBet

    let hand1 = [cards[0], drawCard()]
    let hand2 = [cards[1], drawCard()]

    // For simplicity, play first hand only
    cards = hand1
    sum = calculateHandValue(cards)

    splitBtn.style.display = "none"

    renderGame()
}

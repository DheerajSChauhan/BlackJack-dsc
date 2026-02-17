🎰 Blackjack Casino

A fully interactive, animated Blackjack web game built using HTML, CSS, and JavaScript.

This project simulates a real casino-style Blackjack experience with betting, animations, sound effects, split & double down features, and responsive design.

🚀 Live Features

🎴 Real 52-card deck

💰 Betting system

🪙 Chip balance tracking (saved with LocalStorage)

🃏 Real Ace logic (11 → 1 adjustment automatically)

🎭 Dealer logic (draws until 17+)

🔥 Split option (if first two cards match)

⚡ Double Down feature

🎬 Card flip animation

⏳ 1-second dealer reveal delay

🔊 Sound effects (hit, win, lose, draw, reset)

📱 Fully responsive (desktop + mobile)

🎨 Premium casino UI (3-column layout)

🖥️ Layout Structure
3-Column Professional Casino Layout
| LEFT PANEL  |  CENTER TABLE  | RIGHT CONTROLS |
|-------------|----------------|----------------|
| Title       | Dealer Cards   | Name Input     |
| Balance     | Player Cards   | Bet Input      |
| Game Status | Card Sums      | Action Buttons |

🎮 Game Rules

Player places a bet

Dealer receives 2 cards (1 hidden)

Player can:

HIT

STAND

DOUBLE

SPLIT (if possible)

Dealer draws until total ≥ 17

Winner determined based on Blackjack rules

💰 Payout System
Result	Payout
Win	2 × Bet (1:1 payout)
Draw (Push)	Bet returned
Loss	Bet lost
🃏 Ace Logic

Ace initially counts as 11

If total exceeds 21, Ace automatically converts to 1

💾 Player Progress

Player name saved for session

Chip balance stored using:

localStorage


Progress remains after refresh

🛠️ Tech Stack

HTML5

CSS3 (Grid + Flexbox + Animations)

Vanilla JavaScript (ES6)

LocalStorage API

📂 Project Structure
blackjack-casino/
│
├── index.html
├── index.css
├── index.js
│
├── cards/
│   ├── 52 card images
│   └── back.png
│
└── sounds/
    ├── hit.mp3
    ├── win.mp3
    ├── lose.mp3
    ├── draw.mp3
    └── reset.mp3

🎨 UI Highlights

Dark green casino theme

Gold glowing typography

Radial gradient background

Smooth hover effects

Animated card flip transitions

Delayed dealer reveal (realistic feel)

📱 Responsive Design

Desktop → 3-column layout

Tablet → Adjusted spacing

Mobile → Vertical stacked layout

No unwanted scrolling

🧠 Advanced Features Implemented

Dynamic deck generation

Card shuffling

Delayed recursive dealer draw

Split hand logic

Double down bet handling

Sound control & stopAllSounds system

Smooth DOM re-rendering

🔥 Future Improvements (Optional Enhancements)

3:2 Blackjack payout

Insurance feature

Multiplayer mode

Statistics tracker

Animations for chips

Casino ambient background music

Backend authentication system

🎯 Learning Outcomes

This project demonstrates:

DOM manipulation mastery

State management without frameworks

Game logic implementation

Responsive layout engineering

Animation integration

LocalStorage usage

Clean UI structuring

📸 Preview

(Add screenshots here if uploading to GitHub)

👨‍💻 Author

Dheeraj Singh Chauhan
B.Tech CSE
Frontend Developer

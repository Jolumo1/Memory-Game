# Memory Card Game - Jlm

**Memory Card Game** is an interactive memory game where players need to match cards based on the countries' flags. The goal is to find all pairs of matching cards in the shortest possible time and with the fewest attempts. This game is designed to challenge your memory and attention to detail, with a timer and attempt counter to keep track of your progress.

## Live Demo:
https://jolumo1.github.io/Memory-Game/

<br>

![Vista previa de la tienda](img_readme/1.png)

<br>


## Features:
- **Flag Matching**: The game displays cards with flags of different countries. The player needs to match pairs of flags by flipping cards.
- **Timer**: A timer tracks how long the player takes to complete the game.
- **Attempt Counter**: Tracks the number of attempts (card flips) made by the player.
- **Sound Effects**: When the player wins, a victory sound is played using Howler.js.

## How It Works:
1. **Start the Game**: Click the "Start Game" button to begin.
2. **Flip the Cards**: Click on the cards to flip them and try to find matching pairs of flags.
3. **Win Condition**: The game ends when all pairs are matched. A victory message will appear, displaying the time taken and the number of attempts.
4. **Timer**: The game keeps track of the time it takes to finish, which is displayed in the format `MM:SS`.
5. **Attempts**: Every time a player flips two cards, it counts as one attempt.

## Technologies Used:
- **HTML**: Structure of the game interface.
- **CSS**: Styling the game layout with a grid of cards and a user-friendly interface.
- **JavaScript**: Game logic, including card shuffling, handling clicks, timing, and tracking attempts.
- **Howler.js**: Used to play sound effects when the game is won.
- **Custom Fonts**: Custom fonts from Google Fonts to enhance the visual appearance of the game.

## How to Play:
- Click the "Start Game" button to start the game.
- Flip two cards at a time to reveal their faces.
- Try to remember the flags and match all the pairs to win.
- The game will show you how many attempts it took and the time taken once you win.

## Installation:
- Clone or download the repository to your local machine, then open the `index.html` file in your web browser to start playing.
- Use the Github Pages version: https://jolumo1.github.io/Memory-Game/

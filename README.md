<p align="center">
  <br>
  <img width="240" src="./assets/logo.jpg" alt="web app game logo">
  <br>
</p>

# Telegram `Snake Game` Web App generator Example
This is a basic Telegram Web App implemented using plain JavaScript, HTML, and CSS. This app is to show how a developer can create and configure an interactive cool game.

- App is available via Bot: https://t.me/SunwebMyBot
- Deployment URL: [https://maryjanyes.github.io/snake-game-telegram-mini-app/](https://maryjanyes.github.io/snake-game-telegram-mini-app/)

## Features
- Game board and characters configuration.
- Easy to understand and modify.

## Getting Started
#### Short description of this Mini App
A mini app that provides a demo of sample fun Snake Game, so we can bring more developers to work on similar apps

### Prerequisites

To run this example, you'll need a modern web browser with JavaScript enabled.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/maryjanyes/snake-game-telegram-mini-app

2. Navigate to the project directory:

Open `index.html` in your preferred code editor or IDE.

### Customization
Feel free to customize this web app to suit your needs. You can modify the HTML, CSS, and JavaScript files as required.

Let's take simple modification example:
##### Before
<code>
    class GameBoard {
        skins = {
            forest: 'forest',
            ground: 'ground',
        };
    }
</code>

##### After
<code>
    // Modify game board skin theme
    class GameBoard {
        skins = {
            forest: 'forest',
            south: 'south',
        };
    }
</code>
<style>
    <!-- Add different screen theme -->
    div.gamePlayer.gamePlayerSkin_ocean {
        background-color: blue;
    }
</style>

## License
This project is licensed under the MIT License - see the LICENSE file for details.

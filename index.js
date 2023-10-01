// @name SnakeGame
// @description A simple, fun game supports Web UI that allows user to play snake in real time and earn rewards.

// Real user data.
class SnakeGame {
    players;
    gameInProgress;
    winner;
    board;
    uiControls;
    uiElements;

    constructor() {
        this.players = [];
        this.gameInProgress = false;
        this.winner = null;
        this.board = null;
        this.uiControls = {
            launchGame: document.getElementById('gameBoardAction__Launch'),
            pickGameLevel: document.getElementById('gameBoardAction__PickLevel'),
            pickGameHero: document.getElementById('gameBoardAction__PickHero'),
        };
        this.uiElements = {
            gameBoard: document.getElementById('gameBoard'),
        };
        this.initUI();
    }

    initUI() {
        if (this.uiControls.launchGame) {
            this.uiControls.launchGame.onclick = this.start.bind(this);
        }
    }

    start(theme, maxСollisionsToLoose) {
       this.gameInProgress = true;
       this.board = new SnakeGameBoard(theme, maxСollisionsToLoose);
       this.board.initUI(this.uiElements.gameBoard);

       // TODO: show TG alert.
    }

    end() {
        this.gameInProgress = false;
        this.winner = null;
        this.board = null;
        this.players = [];

        // TODO: show TG alert.
    }

    joinGame(newPlayer) {
        if (!this.players.find(player => player.name === newPlayer.name)) {
            this.players.push(newPlayer);
        } else {
           throw new Error('Ohh, player with this name already existed!'); 
        }
    }

    leaveGame(playerName) {
        this.players = this.players.filter(player => player.name !== playerName);
    }

    winGame(playerName) {
        this.winner = this.players.find(player => player.name === playerName);
        this.end();
    }

    looseGame(playerName) {
        this.leaveGame(playerName);

        // TODO: show TG alert.
    }
}

class SnakeGamePlayer {
    rewards;
    score;
    name;
    character;

    constructor(name, existedRewards) {
        this.name = name;
        this.score = 0;
        this.rewards = existedRewards || 0;
        this.character = null;
    }

    bindCharacter(skinColor, bodyLength, mood) {
        this.character = new SnakeGameCharacter(skinColor, bodyLength, mood);
    }

    unbindCharacter() {
        this.character = null;
    }

    walk(distance, direction) {
        console.log(`Snake crawls to distance ${distance} and direction ${direction}...`);
    }
}

// Virtual user data.
class SnakeGameCharacter {
    skinColor;
    bodyLength;
    mood;

    constructor(skinColor, bodyLength, mood) {
        this.skinColor = skinColor || SnakeGameCharacter.getSkins().punshGreen;
        this.bodyLength = bodyLength || 100;
        this.mood = mood || SnakeGameCharacter.getMoods().soHappy;
    }

    static getSkins() {
        return {
            punshRed: 'punshRed',
            punshGreen: 'punshGreen',
        };
    }

    static getMoods() {
        return {
            soHappy: 'soHappy',
            soSad: 'soSad',
        };
    }
}

class SnakeGameBoard {
    theme;
    maxСollisionsToLoose;
    uiElements;

    constructor(theme, maxСollisionsToLoose) {
        this.theme = theme || SnakeGameBoard.getSkins().ground;
        this.maxСollisionsToLoose = maxСollisionsToLoose || 10;
        this.uiElements = {
            mainView: null,
        };
    }

    initUI(mainGameView) {
        this.uiElements.mainView = document.createElement('div');
        this.uiElements.mainView.setAttribute('id', 'gameBoardViews__MainGame');

        // TODO: Set skin color, etc.
        
        mainGameView.innerHTML = '';
        mainGameView.appendChild(this.uiElements.mainView);
    }

    static getSkins() {
        return {
            forest: 'forest',
            ground: 'ground',
        };
    }
}

const snakeGame = new SnakeGame();

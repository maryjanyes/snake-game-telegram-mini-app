// @name SnakeGame
// @description A simple, fun game supports Web UI that allows user to play snake in real time and earn rewards.

// TODO:
// Define movements.
// Define collisions.
// Real user data.
class SnakeGame {
    players;
    playerSettings;
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
            gameHeroVariants: document.getElementById('gameBoardViews__HeroVariants'),
            gameLevelVariants: document.getElementById('gameBoardViews__LevelVariants'),
        };
        this.playerSettings = {
            level: null,
            player: null,
        };
        this.initUI();
    }

    initUI() {
        if (this.uiControls.launchGame) {
            this.uiControls.launchGame.onclick = this.start.bind(this);
        }

        if (this.uiElements.gameHeroVariants) {
            const heroSkins = SnakeGameCharacter.getSkins();
            const heroMoods = SnakeGameCharacter.getMoods();
            const gameLevels = SnakeGameBoard.getSkins();
            const heroSkinsContainer = document.querySelector('#gameBoardViews__HeroSkins .skinsContainer');
            const heroMoodsContainer = document.querySelector('#gameBoardViews__HeroMoods .moodsContainer');
            const levelVariants = document.querySelector('#gameBoardViews__LevelVariants .levelVariantsContainer');

            Object.keys(heroSkins).map(skin => {
                const skinElement = document.createElement('div');
                skinElement.id = `heroSkin_${heroSkins[skin]}`;
                skinElement.className = "heroSkinAny";

                heroSkinsContainer.appendChild(skinElement);
            });

            Object.keys(heroMoods).map(mood => {
                const moodElement = document.createElement('div');
                moodElement.id = `heroMood_${heroMoods[mood]}`;
                moodElement.className = "heroMoodAny";

                heroMoodsContainer.appendChild(moodElement);
            });

            Object.keys(gameLevels).map(level => {
                const levelElement = document.createElement('div');
                levelElement.id = `gameLevel_${gameLevels[level]}`;
                levelElement.className = "gameLevelAny";

                levelVariants.appendChild(levelElement);
            });
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
    levelTime;
    name;
    speed;
    character;
    uiControls;
    uiElements;

    constructor(name) {
        this.name = name;
        this.score = 0;
        this.levelTime = 0;
        this.speed = 10;
        this.character = null;
        this.uiElements = {
            player: null,
        };
    }

    initUI(gameView) {
        const playerElement = document.createElement('div');
        playerElement.setAttribute('player-name', this.name);
        playerElement.className = `gamePlayer gamePlayerSkin_${this.character.skinColor}`;
        playerElement.style.width = this.character.bodyLength + 'px';
        this.uiElements.player = playerElement;

        gameView.appendChild(playerElement);
    }

    bindCharacter(gameView, skinColor, bodyLength, mood) {
        this.character = new SnakeGameCharacter(skinColor, bodyLength, mood);
        this.initUI(gameView, this.name);
    }

    unbindCharacter() {
        this.character = null;
    }

    move(distanceInPixels, direction) {
        console.log(`Snake crawls to distance ${distanceInPixels} and to ${direction}...`);

        this.uiElements.player.style[direction] = `${distanceInPixels}px`;
    }

    increaseReward(add) {
        this.rewards = this.rewards + add;
    }

    increaseSpeed(add) {
        this.speed = this.speed + add;
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
            movePlayerControls: null,
        };
    }

    initUI(mainGameView, heroName) {
        mainGameView.innerHTML =
            '<div id="gameBoardViews__PlayerControls">' +
                '<button id="controlLeft">l</button>' +
                '<button id="controlTop">t</button>' +
                '<button id="controlRight">r</button>' +
                '<button id="controlBottom">b</button>' +
            '</div>' +
            '<div id="gameBoardViews__MainGame"></div>';
        this.uiElements.mainView = document.getElementById('gameBoardViews__MainGame');
        this.uiElements.movePlayerControls = document.getElementById('gameBoardViews__PlayerControls');

        const player = new SnakeGamePlayer();
        player.bindCharacter(this.uiElements.mainView);

        ['left', 'right', 'top', 'bottom'].forEach(control => {
            const controlElement =
                document.getElementById(`control${control[0].toUpperCase()}${control.slice(1, control.length)}`);
            
            controlElement.addEventListener('click', e => {
                e.preventDefault();

                let reverseDirection;

                if (control === 'left') {
                    reverseDirection = 'right';
                } else if (control === 'right') {
                    reverseDirection = 'left';
                } else if (control === 'top') {
                    reverseDirection = 'bottom';
                } else if (control === 'bottom') {
                    reverseDirection = 'top';
                }

                const currentDistance = parseInt(player.uiElements.player.style[reverseDirection] || 0);

                player.move(currentDistance + 2, reverseDirection);
            });
        });
    }

    static getSkins() {
        return {
            forest: 'forest',
            ground: 'ground',
        };
    }
}

const snakeGame = new SnakeGame();

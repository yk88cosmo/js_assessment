const prompt = require("prompt-sync")({ sigint: true });

// Game elements/assets constants
const GRASS = "░";
const HOLE = "O";
const CARROT = "^";
const PLAYER = "*";

// WIN / LOSE / OUT / QUIT messages constants
const WIN = "Congratulations, you won the game!";                                                                 // TODO: customise message when player wins
const LOST = "You fell down the hole, you lost!";                                                                // TODO: customise message when player lose
const OUT = "You are out of the game.";                                                                 // TODO: customise message when player is out of bounds (lose)
const QUIT = "Game Ended."                                                      // customise message when player quits

// MAP ROWS AND COLUMNS
const ROWS = 8;                                                                 // the game map will have 8 rows
const COLS = 5;                                                                 // the game map will have 5 cols
const PERCENT = .2;                                                             // % of holes for the map

class Field{

    // create the constructor
    constructor(field = [[]]){
        this.field = field; // Field is a property of a class field
        this.gamePlay = false; // instance of game starts at false
    }

    static welcomeMsg(msg){                                                     // static Method to show game's welcome message
        console.log(msg);
    }

    static generateField(ROWS, COLS, PERCENT) {                              // static method that generates and returns a 2D map
        const map = [[]];
        for(let i = 0; i < ROWS; i++) { // create the map with 8 rows
            map[i] = [];                // each row will have have 5 cols
            for(let j = 0; j < COLS; j++) {
                map[i][j] = Math.random() > PERCENT ? GRASS : HOLE; // per col in each row, we generate grass(80%)/hole(20%)
            }
        }
        return map;
    }

    printField(){                                                               // print the game field (used to update during gameplay)       
        this.field.forEach(element => {
            console.log(element.join(""));
        });
    }

    updateGame(input){                                                          // TODO: Refer to details in the method's codeblock
        
        const userInput = String(input).toLowerCase();
    
        /*   
        if the user arrives at the carrot
        end the game - set gamePlay = false;
        inform the user that he WIN the game 
        */
        if(this.field[this.rowindex][this.colindex] === CARROT){
            console.log(WIN);
            this.gamePlay = false;
        }
        /* 
        if the user arrives at the hole
        end the game - set the gamePlay = false;
        inform the user that he LOST the game
        */
        if(this.field[this.rowindex][this.colindex] === HOLE){
            console.log(LOST);
            this.gamePlay = false;
        }
        /*  
        if the user exits out of the field
        end the game - set the gamePlay = false;
        inform the user that he step OUT of the game
        */
        if(this.rowindex < 0 ||
            this.rowindex > this.ROWS - 1 ||
            this.colindex < 0 ||
            this.colindex > this.COLS - 1){
            console.log(OUT);
            this.gamePlay = false;
        }
        /*  
        if the user ends the game
        end the game - set the gamePlay = false;
        inform the user that he QUIT the game
        */
        if(userInput === "q"){
            this.quitGame();
        }

        /* 
        otherwise, move player on the map: this.field[rowindex][colindex] = PLAYER;
        update this.field to show the user had moved to the new area on map 
        */
        else{
            this.field[this.rowindex][this.colindex] = PLAYER;
            this.printField(); // update field
        }
    }

    plantCarrot(){
        // plant the carrot by randomize the X and Y location in the form of variables
        const X = Math.floor(Math.random() * (ROWS - 1)) + 1;
        const Y = Math.floor(Math.random() * (COLS - 1)) + 1;
        this.field[X][Y] = CARROT;
        //console.log(X, Y);
    }

    startGame(){
        this.gamePlay = true;                                       // set this.gamePlay = true to keep the game running
        
        let colindex = 0;
        let rowindex = 0;

        this.field[colindex][rowindex] = PLAYER;                                  // at the start of the game, we insert the player
        this.plantCarrot();                                         // plant the carrot to the game
        this.printField();
        while(this.gamePlay) {                                      // while the gamePlay is happening
            
            //this.printField();

            let flagInvalid = false;                                // flag to check if any invalid input is entered
            const input = prompt("Which way: ");                    // obtain the user's direction(up, down, left, right)
            console.log("(u)p, (d)own, (l)eft, (r)ight, (q)uit");   // provide instruction for player to move
            switch(input.toLowerCase()) {                           // acknowledging the user's input
                case "u":
                    rowindex -= 1; // move the player up
                    this.colindex = colindex;
                    this.rowindex = rowindex;
                    console.log("up");
                    break;
                case "d":
                    rowindex += 1; // move the player down
                    this.colindex = colindex;
                    this.rowindex = rowindex;
                    console.log("down");
                    break;
                case "l":
                    colindex -= 1; // move the player left
                    this.colindex = colindex;
                    this.rowindex = rowindex;
                    console.log("left");
                    break;
                case "r":
                    colindex += 1; // move the player right
                    this.colindex = colindex;
                    this.rowindex = rowindex;
                    console.log("right");
                    break;
                case "q":
                    console.log("quit");
                    this.quitGame();
                    break;
                default:
                    console.log("Invalid input");
                    flagInvalid = !flagInvalid;
                    break;
            }
            if(!flagInvalid){
                this.updateGame(input);
            }
        }
    }

    endGame(){                                                                  
        this.gamePlay = false;                                                  // set property gamePlay to false
        process.exit();                                                         // end the Node app
    }

    quitGame(){
        console.log(QUIT);
        this.endGame();
    }

}



// Instantiate a new instance of Field Class
const createField = Field.generateField(ROWS, COLS, PERCENT);
const gameField = new Field(createField);

Field.welcomeMsg("Welcome to Find Your Hat!\n**************************************************\\n");

gameField.startGame();
//gameField.printField();                                                         // to test only
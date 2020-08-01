// Global Variables
// ---------------------------------------

/** The game grid */
var g_snake_grid = new Grid(20,20,15);
/** Snake character */
const g_char_snake_head = 'H';
/** Snake character */
const g_char_snake_body = 'S';
/** Fruit character */
const g_char_fruit = 'F';

/** Current length of the snake */
var g_snake_length = 3;
/** Head position of the snake */
var g_snake_head_position = { x: 0, y: 0 }
/** Neck position of the snake */
var g_snake_neck_position = { x: 0, y: 0 }
/** Position of the fruit */
var g_fruit_position = { x: 0, y: 0 }
/** Array of snake segments */
var g_snakeArray = [];
/** Squares to pass to the driver for deletion */
var g_squaresToDelete = [];

/** Direction inputed by the user */
var input_direction = { x: 1, y: 0 }


// Gameplay Methods
// ---------------------------------------

/**
 * @function initGame
 * 
 * @description Setups the game
 */
function initGame(){

    /** Starting position for the snake */
    var t_startPosition = { x: Math.floor(Math.random() * 14) + 2, y: Math.floor(Math.random() * 20) }

    // Put snake head at t_startPosition
    g_snake_grid.map[t_startPosition.x - 2][t_startPosition.y] = g_char_snake_body;
    g_snake_grid.map[t_startPosition.x - 1][t_startPosition.y] = g_char_snake_body;
    g_snake_grid.map[t_startPosition.x ][t_startPosition.y] = g_char_snake_head;

    // Init the head and neck position
    g_snake_head_position = t_startPosition;
    g_snake_neck_position = { x: t_startPosition.x - 1, y: t_startPosition.y}

    // Init the snake array
    g_snakeArray = [
        t_startPosition,
        { x: t_startPosition.x - 1, y: t_startPosition.y },
        { x: t_startPosition.x - 2, y: t_startPosition.y }
    ];

    // Place a fruit
    generateFruit();
}    

/**
 * @function moveTowards
 * 
 * @param {Object} t_direction A pair of x,y grid coordinates
 * 
 * @description Moves the snake towards the direction
 */
function moveTowards(a_direction){
    // Temporary array to set as the new g_snake_array
    var t_array = [];

    // End game if user leaves upper or lower bounds
    if(g_snake_head_position.y + a_direction.y < 0 || g_snake_head_position.y + a_direction.y > 20){
        alert("Game over: length " + g_snake_length);
    }

    try{
        // What char is the snake trying to move to
        var t_char = g_snake_grid.map[g_snake_head_position.x + a_direction.x][g_snake_head_position.y + a_direction.y];

        // Move head
        g_snake_neck_position = g_snake_head_position;
        g_snake_head_position = { x: g_snake_head_position.x + a_direction.x, y: g_snake_head_position.y + a_direction.y }
        
        // Add positions to t_array
        t_array[0] = g_snake_head_position;
        t_array[1] = g_snake_neck_position;

        // Update map chars
        g_snake_grid.map[g_snake_head_position.x][g_snake_head_position.y] = g_char_snake_head;
        g_snake_grid.map[g_snake_neck_position.x][g_snake_neck_position.y] = g_char_snake_body;

        // If space is empty
        if(t_char === g_snake_grid.chars.space || t_char === undefined){
            // Move snake segments up one
            for(let i = 2; i < g_snake_length; i++){
                t_array[i] = g_snakeArray[i - 1];
            }

            // Empty out the last square of the previous snake
            g_snake_grid.map[g_snakeArray[g_snakeArray.length - 1 ].x][g_snakeArray[g_snakeArray.length - 1].y] = g_snake_grid.chars.space;

            // Push square to driver for deletion
            g_squaresToDelete.push(g_snakeArray[g_snakeArray.length - 1]);
        }
        // If space is a fruit
        else if(t_char === g_char_fruit){
            // Add segments to new snake
            for(let i = 1; i < g_snake_length; i++){
                t_array[i + 1] = g_snakeArray[i];
            }

            // Increment length
            g_snake_length++;

            // Generate new fruit
            generateFruit();
        }
        else if(t_char === g_char_snake_body){
            alert("game over: length " + g_snake_length);
        }
    }
    catch(a_error){
        alert("game over: length " + g_snake_length);
    }

    // Update g_snakeArray
    g_snakeArray = Array.from(t_array);
}

/**
 * @function generateFruit
 * 
 * @description Generates a fruit and places it on the board
 */
function generateFruit(){
    // Calculate the number of open squares
    var t_openSquares = 400 - g_snake_length;
    // Pick a random square
    var t_chosenSquare = Math.floor(t_openSquares * Math.random());
    console.log(t_chosenSquare);

    // Counter variable
    var t_count = 0;

    // For each open square
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            // If square is empty
            if(g_snake_grid.map[i][j] === g_snake_grid.chars.space || g_snake_grid.map[i][j] === undefined){
                // If square is the chosen one
                if(t_count === t_chosenSquare){
                    // Assign j,i to g_fruit_position
                    g_fruit_position = { x: i, y: j }

                    // Update map square
                    g_snake_grid.map[g_fruit_position.x][g_fruit_position.y] = g_char_fruit;
                    return;
                }   
                // If the square is not the chosen one
                else{ 
                    t_count++;
                }
            }
        }
    }
}

/**
 * @function handleUserInput
 * 
 * @param {Event} a_event Event of a specific key press
 * 
 * @description Event handler for WASD and arrow keys
 */
function handleUserInput(a_event){
    // Get the key
    var t_key = a_event.key;

    // Store the current direction
    var t_direction = input_direction;

    // Up key
    if(t_key === "w" || t_key === "W" || t_key === "ArrowUp"){
        input_direction = { x: 0, y: -1 }
    }
    // Down key
    else if(t_key === "s" || t_key === "S" || t_key === "ArrowDown"){
        input_direction = { x: 0, y: 1 }
    }
    // Right key
    else if(t_key === "d" || t_key === "D" || t_key === "ArrowRight"){
        input_direction = { x: 1, y: 0 }
    }
    // Left key
    else if(t_key === "a" || t_key === "A" || t_key === "ArrowLeft"){
        input_direction = { x: -1, y: 0 }
    }

    // If the input direction would put the head in the neck, don't change direction
    if(( g_snake_neck_position.x === g_snake_head_position.x + input_direction.x ) && ( g_snake_neck_position.y === g_snake_head_position.y + input_direction.y )){
        input_direction = t_direction;
    }
}



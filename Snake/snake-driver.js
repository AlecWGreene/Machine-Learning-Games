// Global Variables
// ---------------------------------------

/** The game canvas */
const $canvas = $("#snake-canvas")[0];

/** The canvas drawing object */
const ctx = $canvas.getContext("2d");

/** Tick length */
const g_tickLength = 200;



// Graphics Methods
// ---------------------------------------

/**
 * @function renderBoard
 * 
 * @param {CanvasRenderingContext2D} ctx Context for a 2D canvas
 * 
 * @param {Grid} a_grid Game grid
 * 
 * @description Renders the grid by coloring in the squares according to the char values of the grid
 */
function renderBoard(ctx, a_grid){
    // For each cell
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            // Draw snake head
            if(a_grid.map[i][j] === g_char_snake_head){
                ctx.fillStyle = "skyblue";
                ctx.beginPath();
                ctx.fillRect(i * a_grid.cellsize, j * a_grid.cellsize, a_grid.cellsize, a_grid.cellsize);
                ctx.stroke();
            }
            // Draw snake body
            else if(a_grid.map[i][j] === g_char_snake_body){
                ctx.fillStyle = "navy";
                ctx.beginPath();
                ctx.fillRect(i * a_grid.cellsize, j * a_grid.cellsize, a_grid.cellsize, a_grid.cellsize);
                ctx.stroke();
            }
            // Draw fruit
            else if(a_grid.map[i][j] === g_char_fruit){
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.fillRect(i * a_grid.cellsize, j * a_grid.cellsize, a_grid.cellsize, a_grid.cellsize);
                ctx.stroke();
            }
            // Draw empty space
            else if(a_grid.map[i][j] === undefined || a_grid.map[i][j] === g_snake_grid.chars.space){
                // Fill square as white
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.fillRect(i * a_grid.cellsize, j * a_grid.cellsize, a_grid.cellsize, a_grid.cellsize);
                ctx.stroke();

                // Replace borders
                ctx.strokeStyle = "black";
                ctx.beginPath();
                ctx.rect(i * a_grid.cellsize, j * a_grid.cellsize, a_grid.cellsize, a_grid.cellsize);
                ctx.stroke();
            }
        }
    }
}


// Runtime
// ---------------------------------------

// Script to run on document ready
$(document).ready(function(){

    // Move the origin 200 units down
    ctx.translate(0,200);

    // Initialize the game
    initGame();

    // Draw the board
    renderBoard(ctx, g_snake_grid);

    $(window).on("keydown",handleUserInput);

    // Handle user inputs
    var gameInterval = setInterval(function(){
        // Move the snake
        moveTowards(input_direction); 

        // Render the board
        renderBoard(ctx, g_snake_grid);

        // Clear g_squaresToDelete
        g_squaresToDelete = [];
    }, g_tickLength);

});
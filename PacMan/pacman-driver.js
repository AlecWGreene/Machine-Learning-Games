/** @type {Element} @description Canvas description */
const $canvas = $("#pacman-canvas")[0];
/** @type {CanvasRenderingContext2D} @description Canvas context */
const ctx = $canvas.getContext("2d");
/** @type {Object} Amount in pixels that the map is offset from the game frame */
const g_map_offset = { x:0.5 * g_grid_map.cellsize, y:g_grid_map.cellsize }

/** Length of a tick in ms */
const g_tickLength = 50;
/** Flag for pausing the game */
let g_flags_paused = false;

/** Background color */
const g_color_background = "darkblue";
/** Wall color */
const g_color_wall = "blue";

/** Object holding the arrays for each gameObject type */
let g_gameObjects = {
    agents: [], // Let agents[0] be pacman, the rest are ghosts
    dots: [],
    powerUps: []
}

/**
 * @function initMap
 * 
 * @param {CanvasRenderingContext2D} ctx Canvas drawing context
 * 
 * @description Draws the base map
 */
function initMap(ctx){
    // Fill in background
    ctx.fillStyle = g_color_background;
    ctx.beginPath();
    ctx.fillRect(0,0,300,300);
    ctx.stroke();

    // Translate to offset map
    ctx.translate(5 + 0.5 *g_grid_map.cellsize,5 + 0.5 * g_grid_map.cellsize);

    // Draw wall border
    ctx.strokeStyle = g_color_wall;
    ctx.beginPath();
    ctx.rect(0.5 * g_grid_map.cellsize, 0.5 * g_grid_map.cellsize, (g_grid_map.width - 2) * g_grid_map.cellsize, (g_grid_map.height + 2) * g_grid_map.cellsize);
    ctx.lineWidth = g_grid_map.cellsize;
    ctx.stroke();

    // For each row
    for(let i = 0; i < g_grid_map.height; i++){
        // For each column
        for(let j = 0; j < g_grid_map.width; j++){
            if(g_grid_map.map[i][j] === g_grid_map.chars.wall){
                // Fill square
                ctx.fillStyle = g_color_wall;
                ctx.beginPath();
                ctx.fillRect( (j + 1) * g_grid_map.cellsize, (i + 1) * g_grid_map.cellsize, g_grid_map.cellsize, g_grid_map.cellsize);
                ctx.stroke();
            }
        }
    }
}


/** Redraws the map for a frame */
function updateMap(ctx){
    // Redraw map
    ctx.translate(-(5 + 0.5 *g_grid_map.cellsize),-(5 + 0.5 * g_grid_map.cellsize));
    initMap(ctx);

    /** @todo Draw dots */

    // Draw PacMan
    g_gameObjects.agents[0].render(ctx);
}


// Runtime
$(document).ready(function(){
    // Move ctx to start of board
    ctx.translate(0,200);

    // Setup Game
    initGame(g_gameObjects);
    initMap(ctx);

    // Add key listener
    $(window).on("keydown",{ agent: g_gameObjects.agents[0] },g_gameObjects.agents[0].handleInput);

    // Tick interval
    setInterval(function(){
        // If game isn't paused update the map
        if(g_flags_paused === false){
            // Make pacman execute given command
            g_gameObjects.agents[0].executeCommand();

            // Update Map
            updateMap(ctx);
        }
    },g_tickLength);
    
});

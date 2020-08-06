/** @type {Element} @description Canvas description */
const $canvas = $("#pacman-canvas")[0];
/** @type {CanvasRenderingContext2D} @description Canvas context */
const ctx = $canvas.getContext("2d");

/** Background color */
const g_color_background = "darkblue";
/** Wall color */
const g_color_wall = "blue";

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
    ctx.translate(5 + 0.5 *g_pacman_grid.cellsize,5 + 0.5 * g_pacman_grid.cellsize);

    // Draw wall border
    ctx.strokeStyle = g_color_wall;
    ctx.beginPath();
    ctx.rect(0.5 * g_pacman_grid.cellsize, 0.5 * g_pacman_grid.cellsize, (g_pacman_grid.width - 2) * g_pacman_grid.cellsize, (g_pacman_grid.height + 2) * g_pacman_grid.cellsize);
    ctx.lineWidth = g_pacman_grid.cellsize;
    ctx.stroke();

    // For each row
    for(let i = 0; i < g_pacman_grid.height; i++){
        // For each column
        for(let j = 0; j < g_pacman_grid.width; j++){
            if(g_pacman_grid.map[i][j] === g_pacman_grid.chars.wall){
                // Fill square
                ctx.fillStyle = g_color_wall;
                ctx.beginPath();
                ctx.fillRect( (j + 1) * g_pacman_grid.cellsize, (i + 1) * g_pacman_grid.cellsize, g_pacman_grid.cellsize, g_pacman_grid.cellsize);
                ctx.stroke();
            }
        }
    }
}

function updateMap(arg_updateMap){}

function animateAgent(arg_agent){}



/** @type {Grid} @description The grid of characters representing the game state */
const g_pacman_grid = new Grid(25,29,10);

/** @type {Array<Array<String>>} @description Default pacman map */
const pacman_map = [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                    [" ", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "X", " "],
                    [" ", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "X", " "],
                    [" ", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "X", " "],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                    [" ", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", " "],
                    [" ", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", " "],
                    [" ", " ", " ", " ", " ", " ", "X", "X", " ", " ", " ", " ", "X", "X", " ", " ", " ", " ", "X", "X", " ", " ", " ", " ", " ", " "],
                    ["X", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", " ", "X", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", "X", " ", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", " ", " ", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", " ", "X", "X", " ", "X", " ", " ", " ", " ", " ", " ", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "X", " ", " ", " ", " ", " ", " ", "X", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                    ["X", "X", "X", "X", "X", " ", "X", "X", " ", "X", " ", " ", " ", " ", " ", " ", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", " ", "X", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", "X", " ", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X"],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                    [" ", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "X", " "],
                    [" ", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "X", " "],
                    [" ", " ", " ", "X", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", "X", " ", " ", " "],
                    ["X", "X", " ", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", " ", "X", "X"],
                    ["X", "X", " ", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", " ", "X", "X"],
                    [" ", " ", " ", " ", " ", " ", "X", "X", " ", " ", " ", " ", "X", "X", " ", " ", " ", " ", "X", "X", " ", " ", " ", " ", " ", " "],
                    [" ", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", " "],
                    [" ", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", " ", "X", "X", " ", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", " "],
                    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]];

/** Character for PacMan */
const g_char_pacman = "P";


function initGame(){
    g_pacman_grid.map = pacman_map;
}

/**
 * @function spawnGhost
 * 
 * @param {String} arg_ghost Character representing the ghost to spawn
 * 
 * @param {Number} arg_coordX An index for the column between 0 and 26
 * 
 * @param {Number} arg_coordY An index for the row between 0 and 29
 * 
 * @description Spawns a ghost at the grid coordinates
 */
function spawnGhost(arg_ghost,arg_coordX, arg_coordY){
    try{   
        // Get the char of the target space 
        const t_char = g_pacman_grid.map[arg_coordX][arg_coordY];
        // If space is occupied throw error
        if(t_char === g_char_pacman || t_char === g_pacman_grid.chars.wall){ /** @todo Add conditions for every ghost char */
            throw new Error("Ghost " + arg_ghost + "was not able to be spawned at " + arg_coordX + ", " + arg_coordY + " because the space is currently occupied by " + t_char);
        }
        // Else fill space with ghost
        else{
            g_pacman_grid.map[arg_coordX][arg_coordY] = arg_ghost;
        }
    }
    catch(arg_error){
        throw new Error("Ghost " + arg_ghost + "was not able to be spawned at " + arg_coordX + ", " + arg_coordY);
    }
}


 
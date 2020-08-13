/** @type {Grid} @description Grid of characters representing the game state */
const g_grid_map = new Grid(25,29,10);

/** @type {Grid} @description Grid of waypoints for agents to travel */
const g_grid_rail = new Grid(25,29,10);

/** @type {Object} 
 * @description Object of flags used to indicate which 
 * @property {BinaryType} none No rail connections
 * @property {BinaryType} right Rail runs right
 * @property {BinaryType} left Rail runs left
 * @property {BinaryType} down Rail runs down
 * @property {BinaryType} up Rail runs up
 */
const g_grid_rail_flags = {
    none: 0b0000, // 8
    right: 0b0001, // 1
    left: 0b0010, // 2
    down: 0b0100, // 4
    up: 0b1000  // 8
}

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


/**
 * @function initRails
 * 
 * @param {Grid} arg_grid Grid with spaces for empty squares
 * 
 * @augments g_grid_rail
 * 
 * @description Generates a grid using the spaces as corridors, and updates the g_grid_rail based on the available corridors and the g_grid_rail_flags
 */
function initRails(arg_grid){
    // Create empty grid
    let return_grid = new Grid(arg_grid.width, arg_grid.height, arg_grid.cellsize);
    
    // For each cell
    for(let i = 0; i < return_grid.width; i++){
        for(let j = 0; j < return_grid.height; j++){
            // If g_grid_map has an empty space add a entry to the rails
            if(g_grid_map.map[j][i] === g_grid_map.chars.space){
                // Create empty flag
                let t_flag = g_grid_rail_flags.none;

                try{
                    // Check for corridors
                    if(g_grid_map.map[j][i + 1] === g_grid_map.chars.space){ t_flag += g_grid_rail_flags.right; }
                    if(g_grid_map.map[j][i - 1] === g_grid_map.chars.space){ t_flag += g_grid_rail_flags.left; }
                    if(g_grid_map.map[j - 1][i] === g_grid_map.chars.space){ t_flag += g_grid_rail_flags.up; }
                    if(g_grid_map.map[j + 1][i] === g_grid_map.chars.space){ t_flag += g_grid_rail_flags.down; }
                }
                catch(arg_error){}

                // Set the flag at j,i
                return_grid.map[j][i] = t_flag;
            }
        }
    }

    // Assign grid to the global variable
    g_grid_rail.map = Array.from(return_grid.map);
}

/**
 * @function initGame
 * 
 * @description Initializes the game so that it is ready to start
 */
function initGame(arg_gameObjectArray){
    g_grid_map.map = pacman_map;
    initRails(g_grid_map);

    // Init PacMan
    const t_pacman = new PacMan(g_grid_rail, g_grid_map.cellsize);
    t_pacman.spawn(10, 11);
    arg_gameObjectArray.agents.push(t_pacman);
}

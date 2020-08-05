class Agent{
    constructor(arg_char){
        this.char = arg_char;

        this.position = { x: 0, y: 0 }
        this.alive = false;
    }

    /**
     * @function moveDirection
     * 
     * @param {Object} arg_direction An object with properties x and y
     * 
     * @description Moves the agent in the x and y direction passed to it
     */
    moveDirection(arg_direction){ 
        try{
            // Update grid
            g_pacman_grid.map[this.position.x + arg_direction.x][this.position.y + arg_direction.y] = this.arg_char;
            g_pacman_grid.map[this.position.x][this.position.y] = g_pacman_grid.chars.space;
            // Update position
            this.position = { x: this.position.x + arg_direction.x, y: this.position.y + arg_direction.y }
        }
        // If movement would be out of bounds
        catch{}
    }
}

class Ghost extends Agent{}

class PacMan extends Agent{}


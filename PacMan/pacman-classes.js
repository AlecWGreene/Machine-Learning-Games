/** Parent class for ghosts and pacman */
class Agent{
    constructor(arg_grid){
        /** Flag indicating Agent's life status */
        this.alive = false;

        /** Tracks which axis pacman can travel on */
        this.corridor = 0b0000;

        /** World position of the Agent */
        this.anchor = { x: 0, y: 0 }
        /** Approximate grid position of the Agent */ 
        this.position = { x: 0, y: 0 }
        /** Local tracker for the grid's cellsize */
        this.g_grid_cellsize = 0;
        /** How many pixels the agent moves per frame */
        this.moveSpeed = 1;
        /** Make base hitbox size 1 */
        this.hitboxSize = 1;

        /** Store a reference to the game grid */
        this.grid = arg_grid;
    }

    /** Spawns Agent at arg_x and arg_y index in the grid*/
    spawn(arg_x, arg_y){
        // Update 
        this.anchor.x = (arg_x + 0.5) * this.g_grid_cellsize;
        this.anchor.y = (arg_y + 0.5) * this.g_grid_cellsize;
        this.alive = true;

        // Select axis
        this.updateAxis();
    }

    updateAxis(){
        // Get the grid indices
        const t_xIndex = (this.anchor.x - 0.5 * this.g_grid_cellsize) / this.g_grid_cellsize;
        const t_yIndex = (this.anchor.y - 0.5 * this.g_grid_cellsize) / this.g_grid_cellsize;

        //If the agent lies on the center of an axis
        if( t_xIndex == Math.floor(t_xIndex) && t_yIndex == Math.floor(t_yIndex) ){
            this.corridor = this.grid.map[t_xIndex][t_yIndex];
        }
    }

    /** Moves the Agent right arg_x pixels and down arg_y pixels*/
    move(arg_x, arg_y){
        try{
            // Update anchor
            this.anchor.x += arg_x;
            this.anchor.y += arg_y;
        }
        catch(arg_error){

        }
    }

    /** Sets this.alive to false and makes the position irrelevant */
    kill(){
        // Update
        this.alive = false;
        this.position = { x: -1, y: -1 }
    }

    /** Calculates whether the Agent is colliding with another Agent */
    isCollidingWith(arg_agent){
        // Check both hitboxes
        if( ((this.position.x - arg_agent.position.x) + (this.position.y - arg_agent.position.y) < this.hitboxSize) 
            || (this.position.x - arg_agent.position.x) + (this.position.y - arg_agent.position.y) < arg_agent.hitboxSize){
                return true;
        }
        else{
            return false;
        }
    }
}

/** PacMan Agent */
class PacMan extends Agent{
    /** Constructs the PacMan Agent */
    constructor(arg_grid, arg_cellsize){
        super(arg_grid);

        /** Grab the cellsize */
        this.g_grid_cellsize = arg_cellsize;

        /** Start PacMan on first frame of his animation */
        this.state_animation = 0;
        /** The next command to be executed, as a binary flag */
        this.nextCommand = 0b0000;
        /** Flag indicating if commands come from user or AI */
        this.userControlled = 1;
        /** Override base hitbox  */
        this.hitboxSize = 0.5 * this.g_grid_cellsize;
    }

    /** Changes the PacMan sprite */
    executeCommand(){
        // Switch based on nextCommand 
        switch(this.nextCommand){
            case 0b0000: // none
                break;
            case 0b0001: // right
                if(this.corridor & 0b0001 != 0){
                    this.move(this.moveSpeed, 0);
                }
                break;
            case 0b0010: // left
                if(this.corridor & 0b0010 != 0){
                    this.move(-this.moveSpeed, 0);
                }
                break;
            case 0b0100: // down
                if(this.corridor & 0b0100 != 0){
                    this.move(0, this.moveSpeed);
                }
                break;
            case 0b1000:  // up
                if(this.corridor & 0b1000 != 0){
                    this.move(0, -this.moveSpeed);
                }
                break;
        }

        // Reset next command
        this.nextCommand = 0b0000;
    }

    /** Handle input */
    handleInput(arg_event){ 
        // Handle user control
        if(arg_event.data.agent.userControlled === 1){
            // Get the key
            var t_key = arg_event.key;

            // Set default to no movement
            var t_direction = 0b0000;

            // Up key
            if(t_key === "w" || t_key === "W" || t_key === "ArrowUp"){
                t_direction = 0b1000;
            }
            // Down key
            else if(t_key === "s" || t_key === "S" || t_key === "ArrowDown"){
                t_direction = 0b0100;
            }
            // Right key
            else if(t_key === "d" || t_key === "D" || t_key === "ArrowRight"){
                t_direction = 0b0001;
            }
            // Left key
            else if(t_key === "a" || t_key === "A" || t_key === "ArrowLeft"){
                t_direction = 0b0010;
            }

            // Update nextCommand
            arg_event.data.agent.nextCommand = t_direction;

        } 
    }

    /** Collision detector */
    checkCollision(arg_gameObjectArray){
        // For each gameObject in the array
        for(const t_gameObject in arg_gameObjectArray){
            // If PacMan collides with the object
            if(this.isCollidingWith(t_gameObject)){
                this.hanldeCollision(t_gameObject);
            }
        }
    }

    /** Handles the event of PacMan colliding with a gameObject */
    hanldeCollision(arg_gameObject){}

    /** Takes a context and renders pacman */
    render(ctx){
        // Preserve ctx style
        const t_ctx_style = { fill: ctx.fillStyle, stroke: ctx.strokeStyle, lineWidth: ctx.lineWidth};

        // Draw body
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.anchor.x, this.anchor.y, this.hitboxSize, Math.PI * 1/4, 14/8 * Math.PI);
        ctx.lineTo(this.anchor.x, this.anchor.y);
        ctx.fill();

        // Restote ctx styles
        ctx.fillStyle = t_ctx_style.fill;
        ctx.strokeStyle = t_ctx_style.stroke;
        ctx.lineWidth = t_ctx_style.lineWidth;
    }

}

class Ghost extends Agent{
    
}




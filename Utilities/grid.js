class Grid{
    constructor(a_width, a_height, a_cellsize){
        // The map for tracking object placement
        this.map = [];

        // The cell size
        this.cellsize = a_cellsize;

        // Dimensions of the grid
        this.width = a_width;
        this.height = a_height;

        // Initialize map
        for(let i = 0; i < a_height; i++){
            this.map[i] = new Array(a_width);
        }

        // Characters representing different objects
        this.chars = { wall: 'X', space: ' ' }
    }
}


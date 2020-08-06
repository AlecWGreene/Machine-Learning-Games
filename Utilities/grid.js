/**
 * @class
 * 
 * @classdesc A grid of characters to represent a game state
 * 
 * @property {Array<Array<String>>} map 2D array of game state
 * 
 * @property {Number} width Number of columns
 * 
 * @property {Number} height Number of rows 
 * 
 * @property {Number} cellsize Dimensions in pixels of a grid square
 */
class Grid{
    /**
     * @constructor 
     * 
     * @constructs Grid
     * 
     * @param {Number} a_height
     * 
     * @param {Number} a_width
     * 
     * @param {Number} a_cellsize
     * 
     * @description Constructs a a_height x a_width grid with the specified cellsize 
     * 
     * @returns {Grid}
     */
    constructor(a_height, a_width, a_cellsize){
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


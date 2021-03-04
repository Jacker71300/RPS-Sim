import * as classes from "./classes.js";
import * as utils from "./utils.js";

let ctx, canvas;
let canvasWidth = 800;
let canvasHeight = 800;
let numLoaded = 0;

export function init(){
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    
    //preload images
    utils.loadImages(SetUpInitialBoard);
}

function SetUpInitialBoard(numToAdd){
    if(numLoaded != 6){
        numLoaded += numToAdd;
    }
    if(numLoaded == 6)
    {
        let p1 = new classes.Paper(ctx, 20, 20, 15, 15, 5, "seek");
        let r1 = new classes.Rock(ctx, 50, 50, 15, 15, 5, "seek");
        let s1 = new classes.Scissors(ctx,70, 70, 15, 15, 5, "seek");

        p1.Draw();
        r1.Draw();
        s1.Draw();
    }
}

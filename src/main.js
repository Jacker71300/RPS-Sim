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
    loop();
}

function SetUpInitialBoard(numToAdd){
    if(numLoaded != 6){
        numLoaded += numToAdd;
    }
    if(numLoaded == 6)
    {
        for(let i = 0; i < 10; i++){
            AddRandomMover("paper");
            AddRandomMover("rock");
            AddRandomMover("scissors");
        }        
    }
}

function loop(){
    requestAnimationFrame(loop);

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore();

    for(let p = 0; p < utils.paperList.length; p++){
        utils.paperList[p].Draw();
        utils.paperList[p].Move();
    }

    for(let r = 0; r < utils.rockList.length; r++){
        utils.rockList[r].Draw();
        utils.rockList[r].Move();
    }

    for(let s = 0; s < utils.scissorList.length; s++){
        utils.scissorList[s].Draw();
        utils.scissorList[s].Move();
    }

    utils.DetectCollisions();
}

function AddRandomMover(type){
    if(type == "paper"){
        utils.paperList.push(new classes.Paper(ctx, Math.random() * 800, Math.random() * 800, 30, 30, 5, "wander"))
    }
    else if(type == "rock"){
        utils.rockList.push(new classes.Rock(ctx, Math.random() * 800, Math.random() * 800, 30, 30, 5, "wander"))
    }
    else if(type == "scissors"){
        utils.scissorList.push(new classes.Scissors(ctx, Math.random() * 800, Math.random() * 800, 30, 30, 5, "wander"))
    }
}

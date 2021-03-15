import * as classes from "./classes.js";
import * as utils from "./utils.js";

let ctx, canvas;
let canvasWidth = 800;
let canvasHeight = 800;
let numLoaded = 0;
let currentMoveState = "wander";
let globalMoveSpeed = 1;
let globalDetectionRange = 800;
let paused = true;
export let zombieMode = false;

export function init(){
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    
    //preload images
    utils.loadImages(SetUpInitialBoard);

    //link controls from index
    document.querySelector('#clear').onclick = function(){ClearBoard()};
    document.querySelector('#zombieMode').onclick = function(){ToggleZombieMode()};
    document.querySelector('#wanderButton').onclick = function(){ChangeSeekMode()};
    document.querySelector('#pausePlay').onclick = function(){paused = !paused};
    document.querySelector('#moveSpeed').onchange = function(){ChangeGlobalMoveSpeed(document.getElementById("moveSpeed").value)};
    document.querySelector('#detectionRange').onchange = function(){utils.maxFindDistance = document.getElementById("detectionRange").value};

    loop();
}

function SetUpInitialBoard(numToAdd){
    //this verifies that all images are loaded before adding movers
    if(numLoaded != 6){
        numLoaded += numToAdd;
    }
    if(numLoaded == 6)
    {
        AddRandomMover("paper", 10);
        AddRandomMover("rock", 10);
        AddRandomMover("scissors", 10);      
    }
}

function loop(){
    requestAnimationFrame(loop);

    if(!paused){
        11
        //reset background (wipe frame)
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        ctx.restore();

        //loop through each list
        //draw the mover
        //then move it to prepare for next frame
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
}

function AddRandomMover(type, num){
    //randomly assigns x and y value to new mover of specified type
    if(type == "paper"){
        for(let i = 0; i < num; i++)
            utils.paperList.push(new classes.Paper(ctx, Math.random() * 800, Math.random() * 800, 30, 30, globalMoveSpeed, currentMoveState))
    }
    else if(type == "rock"){
        for(let i = 0; i < num; i++)
            utils.rockList.push(new classes.Rock(ctx, Math.random() * 800, Math.random() * 800, 30, 30, globalMoveSpeed, currentMoveState))
    }
    else if(type == "scissors"){
        for(let i = 0; i < num; i++)
            utils.scissorList.push(new classes.Scissors(ctx, Math.random() * 800, Math.random() * 800, 30, 30, globalMoveSpeed, currentMoveState))
    }
}

function ClearBoard(){
    if(numLoaded == 6)
    {
        // clear all 3 arrays
        while(utils.paperList.length > 0)
            utils.paperList.pop();
        while(utils.rockList.length > 0)
            utils.rockList.pop();
        while(utils.scissorList.length > 0)
            utils.scissorList.pop();      
    }
}

function ToggleZombieMode(){
    zombieMode = !zombieMode;
}

//this changes the internal seek modes of all the movers, but also tracks the universal move state for the whole scene, for resetting purposes
function ChangeSeekMode(){
    for(let i = 0; i < utils.paperList.length; i++){
        utils.paperList[i].UpdateMoveState();
    }

    for(let i = 0; i < utils.rockList.length; i++){
        utils.rockList[i].UpdateMoveState();
    }

    for(let i = 0; i < utils.scissorList.length; i++){
        utils.scissorList[i].UpdateMoveState();
    }

    if(currentMoveState == "wander")
        currentMoveState = "seek"
    else
        currentMoveState = "wander";
}

function ChangeGlobalMoveSpeed(speed){
    globalMoveSpeed = speed;
        for(let i = 0; i < utils.paperList.length; i++)
            utils.paperList[i].moveSpeed = globalMoveSpeed;
        
        for(let i = 0; i < utils.rockList.length; i++)
            utils.rockList[i].moveSpeed = globalMoveSpeed;
        
        for(let i = 0; i < utils.scissorList.length; i++)
            utils.scissorList[i].moveSpeed = globalMoveSpeed;
}
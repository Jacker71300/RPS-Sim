import * as classes from "./classes.js";
import * as main from "./main.js";

export let paperList = [];
export let rockList = [];
export let scissorList = [];
let maxFindDistance = 800;
let ScissorImage;
let PaperImage;
let RockImage;

export function FindNearestMover(x, y, classRef){
    let distance = maxFindDistance;
    let closest = null;
    //create loop for each mover type
    if(classRef == classes.Paper){
        //loop through all movers of specified type
        for(let i = 0; i < paperList.length; i++){
            //if the mover is less than the max range,
            if(Math.sqrt(Math.pow((paperList[i].x - x), 2) + Math.pow((paperList[i].y - y), 2)) < distance){
                //store closest
                closest = paperList[i];
                //change distance
                distance = Math.sqrt(Math.pow((paperList[i].x - x), 2) + Math.pow((paperList[i].y - y), 2));
            }
        }
    }
    else if(classRef == classes.Rock){
        for(let i = 0; i < rockList.length; i++){
            if(Math.sqrt(Math.pow((rockList[i].x - x), 2) + Math.pow((rockList[i].y - y), 2)) < distance){
                closest = rockList[i];
                distance = Math.sqrt(Math.pow((rockList[i].x - x), 2) + Math.pow((rockList[i].y - y), 2));
            }
        }
    }
    else if(classRef == classes.Scissors){
        for(let i = 0; i < scissorList.length; i++){
            if(Math.sqrt(Math.pow((scissorList[i].x - x), 2) + Math.pow((scissorList[i].y - y), 2)) < distance){
                closest = scissorList[i];
                distance = Math.sqrt(Math.pow((scissorList[i].x - x), 2) + Math.pow((scissorList[i].y - y), 2));
            }
        }
    }

    return closest;
}

export function loadImages(callback){
    // 1 - create a new Image object
    let scissors = new Image();
    let scissorUrl = "./img/Scissors.png";
    
    // 2 - set up event handlers for the Image object
    scissors.onload = _=>{
    // 4 - when the image shows up, call `init(img)`
    ScissorImage = scissors;
    callback(3);
    };

    scissors.onerror = _=>{
    // 4B - called if there is an error
    console.log(`Image at url "${scissorUrl}" wouldn't load! Check your URL!`);
    };

    // 3 - start downloading the image (it is located on an RIT server)
        scissors.src = scissorUrl;

    // 1 - create a new Image object
    let paper = new Image();
    let paperUrl = "./img/Paper.png";
    
    // 2 - set up event handlers for the Image object
    paper.onload = _=>{
    // 4 - when the image shows up, call `init(img)`
    PaperImage = paper;
    callback(2);
    };

    paper.onerror = _=>{
    // 4B - called if there is an error
    console.log(`Image at url "${paperUrl}" wouldn't load! Check your URL!`);
    };

    // 3 - start downloading the image (it is located on an RIT server)
    paper.src = paperUrl;

    // 1 - create a new Image object
    let rock = new Image();
    let rockUrl = "./img/Rock.png";
    
    // 2 - set up event handlers for the Image object
    rock.onload = _=>{
    // 4 - when the image shows up, call `init(img)`
    RockImage = rock;
    callback(1);
    };

    rock.onerror = _=>{
    // 4B - called if there is an error
    console.log(`Image at url "${rockUrl}" wouldn't load! Check your URL!`);
    };

    // 3 - start downloading the image (it is located on an RIT server)
    rock.src = rockUrl;
}

export function getScissorsImage(){
    return ScissorImage;
}

export function getPaperImage(){
    return PaperImage;
}
export function getRockImage(){
    return RockImage;
}

export function DetectCollisions(){
    //THIS DETECTS FOR LOSSES ONLY
    //So the paper list checks if it collides with scissors, rock checks for collision with paper, the paper checks if it collides with rock
    //this is still checking everything all the time, but at least it checks everything only once

    //loop through each paper mover
    for(let p = 0; p < paperList.length; p++){
        //for each paper, check every scissor in the scene
        for(let s = 0; s < scissorList.length; s++){
            //if the distance between the centers of the two movers is less than their combined widths, they're colliding
            if(Math.sqrt(Math.pow((paperList[p].x - scissorList[s].x), 2) + Math.pow((paperList[p].y - scissorList[s].y), 2)) < 
                (paperList[p].width + scissorList[s].width) / 2){
                    //check if new mover needs to be created
                    if(main.zombieMode)
                        //create new scissor with all the properties of the pervious paper
                        scissorList.push(new classes.Scissors(paperList[p].ctx, paperList[p].x, paperList[p].y, paperList[p].width, paperList[p].height, 1, paperList[p].moveState))
                    //remove paper from the scene
                    paperList.splice(p, 1);
                    //leave loop to prevent off by one errors
                    return;
            }
        }
    }

    //exact same as above, just changed the mover types
    for(let r = 0; r < rockList.length; r++){
        for(let p = 0; p < paperList.length; p++){
            if(Math.sqrt(Math.pow((rockList[r].x - paperList[p].x), 2) + Math.pow((rockList[r].y - paperList[p].y), 2)) < 
                (rockList[r].width + paperList[p].width) / 2){
                    if(main.zombieMode)
                        paperList.push(new classes.Paper(rockList[r].ctx, rockList[r].x, rockList[r].y, rockList[r].width, rockList[r].height, 1, rockList[r].moveState))
                    
                    rockList.splice(r, 1);
                return;
            }
        }
    }

    for(let s = 0; s < scissorList.length; s++){
        for(let r = 0; r < rockList.length; r++){
            if(Math.sqrt(Math.pow((scissorList[s].x - rockList[r].x), 2) + Math.pow((scissorList[s].y - rockList[r].y), 2)) < 
                (scissorList[s].width + rockList[r].width) / 2){
                    if(main.zombieMode)
                        rockList.push(new classes.Rock(scissorList[s].ctx, scissorList[s].x, scissorList[s].y, scissorList[s].width, scissorList[s].height, 1, scissorList[s].moveState))
                
                    scissorList.splice(s, 1);
                return;
            }
        }
    }
}
import * as classes from "./classes.js";

let paperList = [];
let rockList = [];
let scissorList = [];
let maxFindDistance = 100;
let ScissorImage;
let PaperImage;
let RockImage;

export function FindNearestMover(x, y, classRef){
    let distance = maxFindDistance;
    let closest = null;
    if(classRef == classes.Paper){
        for(let i = 0; i < paperList.length; i++){
            if(Math.sqrt(Math.pow((paperList[i].x - x), 2) + Math.pow((paperList[i].y - y), 2)) < distance)
                closest = paperList[i];
        }
    }
    else if(classRef == classes.Rock){
        for(let i = 0; i < rockList.length; i++){
            if(Math.sqrt(Math.pow((rockList[i].x - x), 2) + Math.pow((rockList[i].y - y), 2)) < distance)
                closest = rockList[i];
        }
    }
    else if(classRef == classes.Scissors){
        for(let i = 0; i < scissorList.length; i++){
            if(Math.sqrt(Math.pow((scissorList[i].x - x), 2) + Math.pow((scissorList[i].y - y), 2)) < distance)
                closest = scissorList[i];
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
import * as classes from "./classes.js";

let paperList = [];
let rockList = [];
let scissorList = [];
let maxFindDistance = 100;

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

import * as classes from "./classes.js";

let ctx, canvas;
let canvasWidth = 800;
let canvasHeight = 800;

export function init(){
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    let p1 = new classes.Paper(ctx, 20, 20, 15, 15, 5, "seek");
    let r1 = new classes.Rock(ctx, 50, 50, 15, 15, 5, "seek");
    let s1 = new classes.Scissors(ctx,70, 70, 15, 15, 5, "seek");

    p1.Draw();
    r1.Draw();
    s1.Draw();
}

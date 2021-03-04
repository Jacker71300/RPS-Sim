import * as utils from "./utils.js";
import * as init from "./init.js";

class Mover{
    constructor(ctx, x = 0, y = 0, width = 15, height = 15, moveSpeed = 5, moveState = "wander"){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = "../img/Paper.png";
        this.target = null;
        this.avoidWeight = 5;

        //vairables related to movement
        this.moveState = moveState;
        this.moveSpeed = 5;
        this.wanderTimeLeft = 0.0;
        this.sitTimeLeft = 0.0;
        this.currentDirection = {x:1, y:0};

        this.currentFPS = 1/60;
        this.maxWidth = 800;
        this.maxHeight = 800;
    }

    Move()
    {
        this.AvoidFriends();
        this.Seek();
    }

    Wander()
    {
        if(this.wanderTimeLeft <= 0)
        {
            if(this.sitTimeLeft <= 0)
            {
                // Generate a random time to walk in a direction
                this.wanderTimeLeft = Math.random() * 10;

                // Generate a random direction
                this.currentDirection.x = Math.random() * 2 - 1;
                this.currentDirection.y = Math.random() * 2 - 1;

                // Normalize the direction
                if(Math.abs(this.currentDirection.x) + Math.abs(this.currentDirection.y) >= 1)
                {
                    this.currentDirection.x /= Math.abs(this.currentDirection.x) + Math.abs(this.currentDirection.y);
                    this.currentDirection.y /= Math.abs(this.currentDirection.x) + Math.abs(this.currentDirection.y);
                }
            }
            else
            {
                this.sitTimeLeft -= this.currentFPS;
            }
        }
        else
        {
            // Don't allow the object to leave the screen horizontally
            if(this.x >= this.maxWidth)
            {
                this.currentDirection.x = Math.random() * -1;
            }
            else if(this.x <= 0)
            {
                this.currentDirection.x = Math.random();
            }
            
            // Don't allow the object to leave the screen vertically
            if(this.y >= this.maxHeight)
            {
                this.currentDirection.y = Math.random() * -1;
            }
            else if(this.y <= 0)
            {
                this.currentDirection.y = Math.random();
            }

            // Move towards the specified location
            this.wanderTimeLeft -= this.currentFPS;
            this.x += this.currentDirection.x * this.moveSpeed;
            this.y += this.currentDirection.y * this.moveSpeed;
        }
    }

    Seek()
    {
        if(this.target == null || this.target.x == null || this.target.y == null)
        {
            this.Wander();
        }
        else
        {
            // Get heading to target
            this.currentDirection.x = this.target.x - this.x;
            this.currentDirection.y = this.target.y - this.y;
            this.AvoidFriends();

            // Normalize the direction
            this.currentDirection.x /= Math.abs(this.currentDirection.x) + Math.abs(this.currentDirection.y);
            this.currentDirection.y /= Math.abs(this.currentDirection.x) + Math.abs(this.currentDirection.y);

            // Don't allow the object to leave the screen horizontally
            if(this.x >= this.maxWidth || this.x <= 0)
            {
                this.currentDirection.x = 0;
            }
            
            // Don't allow the object to leave the screen vertically
            if(this.y >= this.maxHeight || this.y <= 0)
            {
                this.currentDirection.y = 0;
            }

            // Move towards the area
            this.x += this.currentDirection.x * this.moveSpeed;
            this.y += this.currentDirection.y * this.moveSpeed;
        }
    }

    AvoidFriends(){}

    UpdateMoveState(){
        if(this.moveState == "wander")
            this.moveState = "seek";
        else
            this.moveState = "wander";
    }

    Draw(){
        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore();
    }
}

export class Paper extends Mover{
    constructor(ctx, x = 0, y = 0, width = 15, height = 15, moveSpeed = 5, moveState = "wander"){
        super(ctx, x, y, width, height, moveSpeed, moveState);
        this.image = utils.getPaperImage();
    }

    Move(){
        this.target = utils.FindNearestMover(this.x, this.y, Rock);
        super.Move();
    }

    Draw(){
        super.Draw();
    }

    AvoidFriends(){
        for(let p = 0; p < utils.paperList.length; p++){
            if(utils.paperList[p] != this){
                // Get heading to target
                this.currentDirection.x += this.avoidWeight / (this.x - utils.paperList[p].x);
                this.currentDirection.y +=  this.avoidWeight / (this.y - utils.paperList[p].y);
            }
        }
    }
}

export class Rock extends Mover{
    constructor(ctx, x = 0, y = 0, width = 15, height = 15, moveSpeed = 5, moveState = "wander"){
        super(ctx, x, y, width, height, moveSpeed, moveState);
        this.image = utils.getRockImage();
    }

    Move(){
        this.target = utils.FindNearestMover(this.x, this.y, Scissors);
        super.Move();
    }

    Draw(){
        super.Draw();
    }

    AvoidFriends(){
        for(let p = 0; p < utils.rockList.length; p++){
            if(utils.rockList[p] != this){
                // Get heading to target
                this.currentDirection.x += this.avoidWeight / (this.x - utils.rockList[p].x);
                this.currentDirection.y +=  this.avoidWeight / (this.y - utils.rockList[p].y);
            }
        }
    }
}

export class Scissors extends Mover{
    constructor(ctx, x = 0, y = 0, width = 15, height = 15, moveSpeed = 5, moveState = "wander"){
       super(ctx, x, y, width, height, moveSpeed, moveState);
       this.image = utils.getScissorsImage();
    }

    Move(){
        this.target = utils.FindNearestMover(this.x, this.y, Paper);
        super.Move();
    }

    Draw(){
        super.Draw();
    }

    AvoidFriends(){
        for(let p = 0; p < utils.scissorList.length; p++){
            if(utils.scissorList[p] != this){
                // Get heading to target
                this.currentDirection.x += this.avoidWeight / (this.x - utils.rockList[p].x);
                this.currentDirection.y +=  this.avoidWeight / (this.y - utils.rockList[p].y);
            }
        }
    }
}
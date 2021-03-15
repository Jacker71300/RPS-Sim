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
        this.avoidWeight = 0.1;
        this.avoidRadius = 45;
        this.seekWeight = 0.9;
        this.wanderWeight = 0.9;

        //vairables related to movement
        this.moveState = moveState;
        this.moveSpeed = moveSpeed;
        this.wanderTimeLeft = 0.0;
        this.sitTimeLeft = 0.0;
        this.currentDirection = {x:1, y:0};

        this.currentFPS = 1/60;
        this.maxWidth = 800;
        this.maxHeight = 800;
    }

    Move()
    {
        //this.AvoidFriends();
        switch(this.moveState){
            case "wander":
                this.Wander();
                break;
            case "seek":
                this.Seek();
                break;
        }

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
                let x = Math.random() * 2 - 1;
                let y = Math.random() * 2 - 1;

                // Normalize the direction
                let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                x /= distance;
                y /= distance;

                this.currentDirection.x += x * this.wanderWeight;
                this.currentDirection.y += y * this.wanderWeight;

                // Avoid others
                this.AvoidFriends();

                // Normalize the direction
                if(Math.abs(this.currentDirection.x) + Math.abs(this.currentDirection.y) >= 1)
                {
                    distance = Math.sqrt(Math.pow(this.currentDirection.x, 2) + Math.pow(this.currentDirection.y, 2));
                    this.currentDirection.x /= distance;
                    this.currentDirection.y /= distance;
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
            let x = this.target.x - this.x;
            let y = this.target.y - this.y;
            this.AvoidFriends();

            // Normalize the direction
            let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            x /= distance;
            y /= distance;

            this.currentDirection.x += x * this.seekWeight;
            this.currentDirection.y += y * this.seekWeight;

            distance = Math.sqrt(Math.pow(this.currentDirection.x, 2) + Math.pow(this.currentDirection.y, 2));
            this.currentDirection.x /= distance;
            this.currentDirection.y /= distance;

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
                let x = this.x - utils.paperList[p].x;
                let y = this.y - utils.paperList[p].y;

                let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

                if(distance <= this.avoidRadius)
                {
                    x /= distance;
                    y /= distance;

                    this.currentDirection.x += x * this.avoidWeight;
                    this.currentDirection.y +=  y * this.avoidWeight;
                }
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
                let x = this.x - utils.rockList[p].x;
                let y = this.y - utils.rockList[p].y;

                let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

                if(distance <= this.avoidRadius)
                {
                    x /= distance;
                    y /= distance;

                    this.currentDirection.x += x * this.avoidWeight;
                    this.currentDirection.y +=  y * this.avoidWeight;
                }
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
                let x = this.x - utils.scissorList[p].x;
                let y = this.y - utils.scissorList[p].y;

                let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                if(distance <= this.avoidRadius)
                {
                    x /= distance;
                    y /= distance;

                    this.currentDirection.x += x * this.avoidWeight;
                    this.currentDirection.y +=  y * this.avoidWeight;
                }
            }
        }
    }
}
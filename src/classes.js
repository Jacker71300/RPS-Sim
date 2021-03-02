import * as utils from "./utils.js";
import * as init from "./init.js";

class Mover{
    constructor(ctx, x = 0, y = 0, width = 15, height = 15, moveSpeed = 5, moveState = "wander"){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.target = null;

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

    move()
    {
        switch(this.moveState)
        {
            case "wander":
                this.Wander();
            break;
            
            case "seek":
                this.Seek();
            break;

            case "flee":
                // TODO: implement later
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
            if(this.x >= this.maxWidth || this.x <= 0)
            {
                this.currentDirection.x = 0;
            }
            
            // Don't allow the object to leave the screen vertically
            if(this.y >= this.maxHeight || this.y <= 0)
            {
                this.currentDirection.y = 0;
            }

            // Move towards the specified location
            this.wanderTimeLeft -= this.currentFPS;
            x += this.currentDirection.x * this.moveSpeed;
            y += this.currentDirection.y * this.moveSpeed;
        }
    }

    Seek()
    {
        if(target == null || target.x == null || target.y == null)
        {
            this.Wander();
        }
        else
        {
            // Get heading to target
            this.currentDirection.x = target.x - this.x;
            this.currentDirection.y = target.y - this.y;

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
            x += this.currentDirection.x * this.moveSpeed;
            y += this.currentDirection.y * this.moveSpeed;
        }
    }

    UpdateMoveState(){
        if(this.moveState == "wander")
            this.moveState = "seek";
        else
            this.moveState = "wander";
    }
}

export class Paper extends Mover{
    constructor(ctx, x = 0, y = 0, width = 15, height = 15, moveSpeed = 5, moveState = "wander"){
        super(ctx, x, y, width, height, moveeSpeed, moveState);
        this.image = "../img/Paper.png";
    }

    Move(){
        target = utils.FindNearestMover(this.x, this.y, Rock);
        super();
    }
}

export class Rock extends Mover{
    constructor(ctx, x = 0, y = 0, width = 15, height = 15, moveSpeed = 5, moveState = "wander"){
        super(ctx, x, y, width, height, moveeSpeed, moveState);
        this.image = "../img/Rock.png";
    }

    Move(){
        target = utils.FindNearestMover(this.x, this.y, Scissors);
        super();
    }
}

export class Scissors extends Mover{
    constructor(ctx, x = 0, y = 0, width = 15, height = 15, moveSpeed = 5, moveState = "wander"){
        super(ctx, x, y, width, height, moveeSpeed, moveState);
        this.image = "../img/Scissors.png";
    }

    Move(){
        target = utils.FindNearestMover(this.x, this.y, Paper);
        super();
    }
}
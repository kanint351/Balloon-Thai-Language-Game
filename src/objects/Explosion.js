export default class Explosion {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.color = color;

        this.life = 0.35;

        this.alive = true;

        this.parts = [];

        for(let i=0;i<18;i++){

            this.parts.push({

                x,
                y,

                vx:(Math.random()-0.5)*250,

                vy:(Math.random()-0.5)*250,

                r:3+Math.random()*5

            });

        }

    }

    update(dt){

        this.life-=dt;

        if(this.life<=0){

            this.alive=false;

            return;

        }

        for(const p of this.parts){

            p.x+=p.vx*dt;

            p.y+=p.vy*dt;

            p.vy+=450*dt;

        }

    }

    draw(ctx){

        ctx.save();

        ctx.globalAlpha=this.life/0.35;

        ctx.fillStyle=this.color;

        for(const p of this.parts){

            ctx.beginPath();

            ctx.arc(

                p.x,

                p.y,

                p.r,

                0,

                Math.PI*2

            );

            ctx.fill();

        }

        ctx.restore();

    }

}
function Vehicle(x,y,speed,w,h,maxSpeed,vehicles){
    this.vehicles=vehicles;
    this.counter=1000;
    //console.log(x);
    this.location=createVector(x,y);
    this.w=w;
    this.h=h;
    this.maxSpeed=maxSpeed;
	this.speed=speed;
    this.update=function(){
        
        if (this.target){
            this.seek(this.target);
            this.groupSeparation(0.3);
            this.wander(0.3);
            this.keepAwayFromWalls(2);
        } else{
            this.desires();
        }
        if (this.speed.mag()<0.01){
                this.target=null;
                this.speed.x=random(-5,5);
                this.speed.y=random(-5,5);
        }
        this.location.add(this.speed);
        

        this.show();
    }

    this.setTarget=function(target){
        if (target.x>this.w){
            target.x=this.w;
        } else if (target.x<0){
            target.x=0;
        } 
        if (target.y>this.h){
            target.y=this.h;
        } else if (target.y<0){
            target.y=0;
        } 
        this.target=target;
    }
    
    this.show=function(){
        push();
        translate(this.location.x,this.location.y);
        var theta = this.speed.heading() + PI/2;
        rotate(theta);
        var r=3;
        beginShape();
        vertex(0, -r*2);
        vertex(-r, r*2);
        vertex(r, r*2);
        endShape(CLOSE);
        pop();
        if (this.location.x>this.w){
            this.location.x=0;
        } else if (this.location.y>this.h){
            this.location.y=0;        
        } else if (this.location.x<0){
            this.location.x=this.w;        
        } else if (this.location.y<0){
            this.location.y=this.h;        
        }
    }
    this.applyForce=function(force){
        this.speed.x+=force.x;
        this.speed.y+=force.y;
        this.speed.limit(this.maxSpeed);
    }
    
    this.seek=function(target,weight) {
        var desired = p5.Vector.sub(target,this.location);
        var d = desired.mag();
        if (d < 100) {
            var m = map(d,0,100,0,maxSpeed);
            desired.limit(m);
        } else {
            desired.limit(maxSpeed);
        }
        
        var steer = p5.Vector.sub(desired,this.speed);
        steer.limit(0.1*weight);
        this.applyForce(steer);
    }
    
    this.desires=function(){
        this.groupAllign(4);
        this.groupSeparation(3);
        this.wander(2);
        this.keepAwayFromWalls(2);
    }

    this.wander=function(weight){
        if (this.speed.mag()<0.0001){
            return;
        }
        var futureLocation=createVector(this.location.x+this.speed.x*60,this.location.y+this.speed.y*60);
        var r=this.speed.mag()*10;
        //console.log(speedd.mag()+"-"+r);
        var theta=random(0,2*PI);
        var futureTarget=createVector(futureLocation.x+r*cos(theta),futureLocation.y+r*sin(theta));
        this.seek(futureTarget,weight);
    }
    this.keepAwayFromWalls=function(weight){
        if (this.location.x<100){
            this.applyForce(createVector(this.maxSpeed*weight*(1/this.location.x),0));
        }else if ((this.w-this.location.x)<100){
            this.applyForce(createVector((-this.maxSpeed)*weight*(1/(this.w-this.location.x)),0));    
        }
        if (this.location.y<100){
            this.applyForce(createVector(0,this.maxSpeed*weight*(1/this.location.y)));
        }else if ((this.h-this.location.y)<100){
            this.applyForce(createVector(0,(-this.maxSpeed)*weight*(1/(this.h-this.location.y))));    
        }

    }
    this.groupAllign=function(weight){
        var sum=createVector(0,0);
        var count=0;
        for (var i=0;i<this.vehicles.length;i++) {
            var d = p5.Vector.dist(this.location, vehicles[i].location);
            if (d<35){
                if (this.isVisible(vehicles[i])){
                    count++;
                    sum.add(this.vehicles[i].speed);                
                }
            }
        }
        if (count > 0) {
            sum.div(count);
        }
        sum.limit(maxSpeed);
        var steer = p5.Vector.sub(sum,this.speed);
        steer.limit(0.1*weight);
        this.applyForce(steer);
    }
   
     this.groupSeparation=function(weight){
        var desiredseparation = 15;
        var count=0;
        var sum=createVector(0,0);
        for (var i=0;i<this.vehicles.length;i++) {
            var d = p5.Vector.dist(this.location, vehicles[i].location);
            if ((d < desiredseparation)) {
                if (this.isVisible(vehicles[i])){
                    var diff = p5.Vector.sub(this.location, vehicles[i].location);
                    sum.add(diff);
                    count++;
                }
            }
        }
        if (count > 0) {
            sum.div(count);
        }
        sum.limit(maxSpeed);
        var steer = p5.Vector.sub(sum,this.speed);
        steer.limit(0.1*weight);
        this.applyForce(steer); 
    }
     
     this.isVisible=function(otherVehicle){
         var speedNorm=speed.copy();
         speedNorm.normalize();
         var diff= p5.Vector.sub(otherVehicle.location,this.location);
         var theta=speed.angleBetween(diff);
//         console.log(theta);
//         console.log(PI/4);
         if (theta<PI){             
             return 1;
         } else {
//             console.log("not visible");
             return 0;
         }
     }
     
}